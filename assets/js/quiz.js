/**
 * Adaptive Quiz Engine
 * - Selects questions based on user's current performance level
 * - Tracks score, streak, XP
 * - Adapts difficulty dynamically
 */
const Quiz = (() => {
  const TOTAL_QUESTIONS = 10;
  const RECENT_KEY = 'votewise_recent_questions';
  let currentQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let streak = 0;
  let bestStreak = 0;
  let answered = false;
  let difficultyLevel = 'easy'; // easy, medium, hard

  // ── Repetition Prevention ──
  function getRecentIds() {
    try {
      return new Set(JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'));
    } catch { return new Set(); }
  }

  function saveRecentIds(ids) {
    try { localStorage.setItem(RECENT_KEY, JSON.stringify([...ids])); } catch {}
  }

  function filterFresh(pool) {
    const recent = getRecentIds();
    const fresh = pool.filter(q => !recent.has(q.id));
    // If too few fresh questions, reset history
    if (fresh.length < 3) {
      localStorage.removeItem(RECENT_KEY);
      return pool;
    }
    return fresh;
  }

  function markUsed(questions) {
    const recent = getRecentIds();
    questions.forEach(q => recent.add(q.id));
    // Keep only last 40 IDs so older questions rotate back in
    const arr = [...recent];
    saveRecentIds(arr.length > 40 ? arr.slice(arr.length - 40) : arr);
  }

  function start() {
    currentIndex = 0;
    score = 0;
    streak = 0;
    answered = false;
    difficultyLevel = 'easy';
    currentQuestions = selectQuestions();
    markUsed(currentQuestions);
    renderQuestion();
  }

  function selectQuestions() {
    const easy = filterFresh(QUESTION_BANK.filter(q => q.difficulty === 'easy'));
    const medium = filterFresh(QUESTION_BANK.filter(q => q.difficulty === 'medium'));
    const hard = filterFresh(QUESTION_BANK.filter(q => q.difficulty === 'hard'));

    // Shuffle each pool
    shuffle(easy); shuffle(medium); shuffle(hard);

    // Start with 4 easy, 4 medium, 2 hard — then adapt
    const selected = [...easy.slice(0, 4), ...medium.slice(0, 4), ...hard.slice(0, 2)];
    shuffle(selected);
    return selected.slice(0, TOTAL_QUESTIONS);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderQuestion() {
    if (currentIndex >= currentQuestions.length) {
      renderComplete();
      return;
    }

    const q = currentQuestions[currentIndex];
    answered = false;

    // Update progress
    const pct = ((currentIndex) / TOTAL_QUESTIONS) * 100;
    document.getElementById('quiz-progress-fill').style.width = pct + '%';
    document.getElementById('quiz-progress-text').textContent = `Question ${currentIndex + 1} of ${TOTAL_QUESTIONS}`;
    document.getElementById('quiz-score-display').textContent = `⭐ ${score} pts`;

    const letters = ['A', 'B', 'C', 'D'];
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
      <div class="quiz-card">
        <span class="quiz-card__difficulty quiz-card__difficulty--${q.difficulty}">${q.difficulty}</span>
        <div class="quiz-card__question">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" id="quiz-opt-${i}" onclick="Quiz.answer(${i})">
              <span class="quiz-option__letter">${letters[i]}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function answer(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = currentQuestions[currentIndex];
    const isCorrect = selectedIndex === q.correct;

    // Highlight correct/wrong
    document.getElementById(`quiz-opt-${q.correct}`).classList.add('quiz-option--correct');
    if (!isCorrect) {
      document.getElementById(`quiz-opt-${selectedIndex}`).classList.add('quiz-option--wrong');
      streak = 0;
    } else {
      score += q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 20 : 30;
      streak++;
      if (streak > bestStreak) bestStreak = streak;
      // Bonus for streaks
      if (streak >= 3) score += 5;
    }

    document.getElementById('quiz-score-display').textContent = `⭐ ${score} pts`;

    // Adapt difficulty
    adaptDifficulty(isCorrect);

    // Show explanation
    const card = document.querySelector('.quiz-card');
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'quiz-explanation';
    explanationDiv.innerHTML = `<strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> ${q.explanation}`;
    card.appendChild(explanationDiv);

    // Show next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-next-btn';
    nextBtn.innerHTML = currentIndex < TOTAL_QUESTIONS - 1 ? 'Next Question →' : 'See Results 🏆';
    nextBtn.onclick = () => { currentIndex++; renderQuestion(); };
    card.appendChild(nextBtn);
  }

  function adaptDifficulty(wasCorrect) {
    if (wasCorrect && streak >= 2) {
      if (difficultyLevel === 'easy') difficultyLevel = 'medium';
      else if (difficultyLevel === 'medium') difficultyLevel = 'hard';
    } else if (!wasCorrect) {
      if (difficultyLevel === 'hard') difficultyLevel = 'medium';
      else if (difficultyLevel === 'medium') difficultyLevel = 'easy';
    }

    // Replace upcoming questions with new difficulty if possible
    if (currentIndex + 1 < currentQuestions.length) {
      const pool = QUESTION_BANK.filter(q => q.difficulty === difficultyLevel && !currentQuestions.includes(q));
      if (pool.length > 0) {
        const replacement = pool[Math.floor(Math.random() * pool.length)];
        currentQuestions[currentIndex + 1] = replacement;
      }
    }
  }

  function renderComplete() {
    const maxScore = TOTAL_QUESTIONS * 20; // average expected
    const pct = Math.min(Math.round((score / maxScore) * 100), 100);
    const accuracy = Math.round((score / (TOTAL_QUESTIONS * 30)) * 100);

    document.getElementById('quiz-progress-fill').style.width = '100%';
    document.getElementById('quiz-progress-text').textContent = 'Complete!';

    let message = '';
    let icon = '';
    if (pct >= 80) { message = 'Outstanding! You\'re a civic champion! 🏆'; icon = '🎉'; }
    else if (pct >= 60) { message = 'Great job! You\'re well-informed about elections!'; icon = '👏'; }
    else if (pct >= 40) { message = 'Good effort! Keep learning to improve.'; icon = '💪'; }
    else { message = 'Don\'t worry! Try again to learn more.'; icon = '📚'; }

    document.getElementById('quiz-container').innerHTML = `
      <div class="quiz-complete">
        <div class="quiz-complete__icon">${icon}</div>
        <h2 class="quiz-complete__title">Quiz Complete!</h2>
        <div class="quiz-complete__score">${score} pts</div>
        <p class="quiz-complete__message">${message}<br>Best streak: ${bestStreak} 🔥</p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn--primary" onclick="Quiz.start()">Try Again 🔄</button>
          <button class="btn btn--secondary" onclick="App.navigate('journey')">Start Journey 🗺️</button>
          <button class="btn btn--secondary" onclick="App.navigate('dashboard')">View Progress 📊</button>
        </div>
      </div>
    `;

    // Save stats
    saveStats(accuracy);

    // Confetti!
    if (pct >= 60) fireConfetti();
  }

  function saveStats(accuracy) {
    const state = App.getState();
    state.quizzesCompleted = (state.quizzesCompleted || 0) + 1;
    state.totalXP = (state.totalXP || 0) + score;
    state.bestStreak = Math.max(state.bestStreak || 0, bestStreak);
    state.totalCorrect = (state.totalCorrect || 0) + Math.round(accuracy / 100 * TOTAL_QUESTIONS);
    state.totalQuestions = (state.totalQuestions || 0) + TOTAL_QUESTIONS;
    App.saveState();
    App.updateUI();
  }

  function fireConfetti() {
    const colors = ['#6366F1', '#F59E0B', '#10B981', '#EF4444', '#EC4899', '#8B5CF6'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }

  return { start, answer };
})();
