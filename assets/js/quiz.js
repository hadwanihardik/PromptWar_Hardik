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
    if (fresh.length < 3) {
      localStorage.removeItem(RECENT_KEY);
      return pool;
    }
    return fresh;
  }

  function markUsed(questions) {
    const recent = getRecentIds();
    questions.forEach(q => recent.add(q.id));
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
    if (typeof App !== 'undefined') App.trackEvent('quiz_start');
  }

  function selectQuestions() {
    const lang = I18n.currentLang();
    
    // Prioritize translated questions if not English
    const hasTranslation = q => q[`question_${lang}`] !== undefined;
    
    const easy = filterFresh(QUESTION_BANK.filter(q => q.difficulty === 'easy'));
    const medium = filterFresh(QUESTION_BANK.filter(q => q.difficulty === 'medium'));
    const hard = filterFresh(QUESTION_BANK.filter(q => q.difficulty === 'hard'));

    // Sort to put translated ones first (within each difficulty)
    if (lang !== 'en') {
      easy.sort((a, b) => (hasTranslation(b) ? 1 : 0) - (hasTranslation(a) ? 1 : 0));
      medium.sort((a, b) => (hasTranslation(b) ? 1 : 0) - (hasTranslation(a) ? 1 : 0));
      hard.sort((a, b) => (hasTranslation(b) ? 1 : 0) - (hasTranslation(a) ? 1 : 0));
    } else {
      shuffle(easy); shuffle(medium); shuffle(hard);
    }

    // Still shuffle the top slice to keep it fresh
    const easySelection = easy.slice(0, 8); shuffle(easySelection);
    const mediumSelection = medium.slice(0, 8); shuffle(mediumSelection);
    const hardSelection = hard.slice(0, 4); shuffle(hardSelection);

    const selected = [...easySelection.slice(0, 4), ...mediumSelection.slice(0, 4), ...hardSelection.slice(0, 2)];
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

    const lang = I18n.currentLang();
    const questionText = q[`question_${lang}`] || q.question;
    const optionsText = q[`options_${lang}`] || q.options;

    // Update progress
    const pct = ((currentIndex) / TOTAL_QUESTIONS) * 100;
    const progressFill = document.getElementById('quiz-progress-fill');
    progressFill.style.width = pct + '%';
    progressFill.setAttribute('role', 'progressbar');
    progressFill.setAttribute('aria-valuemin', '0');
    progressFill.setAttribute('aria-valuemax', '100');
    progressFill.setAttribute('aria-valuenow', Math.round(pct));
    
    const qLabel = I18n.get('quiz_question_label') || 'Question';
    const ofLabel = I18n.get('quiz_of_label') || 'of';
    document.getElementById('quiz-progress-text').textContent = `${qLabel} ${I18n.num(currentIndex + 1)} ${ofLabel} ${I18n.num(TOTAL_QUESTIONS)}`;
    document.getElementById('quiz-score-display').textContent = `⭐ ${I18n.num(score)} ${I18n.get('score')}`;
    document.getElementById('quiz-score-display').setAttribute('aria-live', 'polite');

    let letters = ['A', 'B', 'C', 'D'];
    if (lang === 'hi' || lang === 'mr') {
      letters = ['अ', 'ब', 'क', 'ड'];
    } else if (lang === 'gu') {
      letters = ['અ', 'બ', 'ક', 'ડ'];
    }
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
      <div class="quiz-card">
        <span class="quiz-card__difficulty quiz-card__difficulty--${q.difficulty}">${I18n.get(q.difficulty)}</span>
        <div class="quiz-card__question">${questionText}</div>
        <div class="quiz-options">
          ${optionsText.map((opt, i) => `
            <button class="quiz-option" id="quiz-opt-${i}" data-action="quiz-answer" data-val="${i}">
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

    const lang = I18n.currentLang();
    const explanationText = q[`explanation_${lang}`] || q.explanation;

    document.getElementById(`quiz-opt-${q.correct}`).classList.add('quiz-option--correct');
    if (!isCorrect) {
      document.getElementById(`quiz-opt-${selectedIndex}`).classList.add('quiz-option--wrong');
      streak = 0;
    } else {
      score += q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 20 : 30;
      streak++;
      if (streak > bestStreak) bestStreak = streak;
      if (streak >= 3) score += 5;
    }

    document.getElementById('quiz-score-display').textContent = `⭐ ${I18n.num(score)} ${I18n.get('score')}`;
    adaptDifficulty(isCorrect);
    
    if (typeof App !== 'undefined') {
      App.trackEvent('quiz_answer', { 
        correct: isCorrect, 
        difficulty: q.difficulty,
        question_id: q.id
      });
    }

    const card = document.querySelector('.quiz-card');
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'quiz-explanation';
    explanationDiv.setAttribute('aria-live', 'assertive');
    
    const statusText = isCorrect ? I18n.get('correct') : I18n.get('wrong');
    explanationDiv.innerHTML = `<strong>${statusText}!</strong> ${explanationText}`;
    card.appendChild(explanationDiv);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-next-btn';
    nextBtn.innerHTML = currentIndex < TOTAL_QUESTIONS - 1 ? `${I18n.get('btn_next')} →` : `${I18n.get('btn_finish')} 🏆`;
    nextBtn.dataset.action = 'quiz-next';
    card.appendChild(nextBtn);
  }

  function adaptDifficulty(wasCorrect) {
    const lang = I18n.currentLang();
    if (wasCorrect && streak >= 2) {
      if (difficultyLevel === 'easy') difficultyLevel = 'medium';
      else if (difficultyLevel === 'medium') difficultyLevel = 'hard';
    } else if (!wasCorrect) {
      if (difficultyLevel === 'hard') difficultyLevel = 'medium';
      else if (difficultyLevel === 'medium') difficultyLevel = 'easy';
    }

    if (currentIndex + 1 < currentQuestions.length) {
      const pool = QUESTION_BANK.filter(q => q.difficulty === difficultyLevel && !currentQuestions.includes(q));
      if (pool.length > 0) {
        // Prioritize translated ones if possible
        if (lang !== 'en') {
           const translatedPool = pool.filter(q => q[`question_${lang}`] !== undefined);
           if (translatedPool.length > 0) {
             currentQuestions[currentIndex + 1] = translatedPool[Math.floor(Math.random() * translatedPool.length)];
             return;
           }
        }
        const replacement = pool[Math.floor(Math.random() * pool.length)];
        currentQuestions[currentIndex + 1] = replacement;
      }
    }
  }

  function renderComplete() {
    const maxScore = TOTAL_QUESTIONS * 20;
    const pct = Math.min(Math.round((score / maxScore) * 100), 100);
    const accuracy = Math.round((score / (TOTAL_QUESTIONS * 30)) * 100);

    document.getElementById('quiz-progress-fill').style.width = '100%';
    document.getElementById('quiz-progress-text').textContent = I18n.get('btn_finish');

    let message = I18n.get('quiz_complete_msg') || 'Quiz Complete!';
    let icon = '🎉';

    document.getElementById('quiz-container').innerHTML = `
      <div class="quiz-complete">
        <div class="quiz-complete__icon">${icon}</div>
        <h2 class="quiz-complete__title">${I18n.get('quiz_finish_title')}</h2>
        <div class="quiz-complete__score">${I18n.num(score)} ${I18n.get('score')}</div>
        <p class="quiz-complete__message">${message}<br>${I18n.get('best_streak')}: ${I18n.num(bestStreak)} 🔥</p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn--primary" data-action="quiz-start">${I18n.get('btn_retry')} 🔄</button>
          <button class="btn btn--accent" data-action="share-quiz">📤 ${I18n.get('share_score') || 'Share Score'}</button>
          <button class="btn btn--secondary" data-action="navigate" data-val="journey">${I18n.get('nav_journey')}</button>
        </div>
      </div>
    `;

    saveStats(accuracy);
    if (pct >= 60) fireConfetti();

    if (typeof App !== 'undefined') {
      App.trackEvent('quiz_complete', { 
        score: score, 
        accuracy: accuracy,
        streak: bestStreak
      });
    }
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

  window.addEventListener('langChanged', () => {
    if (document.getElementById('page-quiz')?.classList.contains('page--active')) {
      if (currentIndex < currentQuestions.length) renderQuestion();
      else renderComplete();
    }
  });

  return { start, answer, next: () => { currentIndex++; renderQuestion(); } };
})();
