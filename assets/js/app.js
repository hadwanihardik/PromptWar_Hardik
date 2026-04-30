/**
 * App — Main Router & State Manager
 * Handles navigation, persistent state (localStorage), and UI updates
 */
const App = (() => {
  const STATE_KEY = 'votewise_state';

  const defaultState = {
    totalXP: 0,
    quizzesCompleted: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    bestStreak: 0,
    journeyStep: 0,
    questionsAsked: 0,
    badges: []
  };

  let state = {};

  function init() {
    state = loadState();
    Theme.init();
    I18n.init();
    updateUI();
    
    // Check if URL has a page hash
    const hash = window.location.hash.replace('#', '');
    if (hash) navigate(hash);
    else navigate('home');
    
    console.log('🗳️ VoteWise Election Education Assistant loaded!');
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STATE_KEY);
      state = saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
      return state;
    } catch {
      state = { ...defaultState };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save state:', e);
    }
  }

  function getState() { return state; }

  function navigate(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('page--active'));

    // Show target page
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.add('page--active');

    // Update nav links
    document.querySelectorAll('.navbar__link').forEach(link => {
      link.classList.toggle('navbar__link--active', link.dataset.page === page);
    });

    // Handle Mobile Back Button vs Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const backBtn = document.getElementById('nav-back-btn');
    if (menuToggle && backBtn) {
      if (page === 'home') {
        menuToggle.style.display = '';
        backBtn.style.display = 'none';
      } else {
        menuToggle.style.display = 'none';
        backBtn.style.display = 'block';
      }
    }

    // Initialize page-specific content
    switch (page) {
      case 'quiz': Quiz.start(); break;
      case 'journey': Journey.init(); break;
      case 'leaders': Leaders.init(); break;
      case 'states': States.init(); break;
      case 'assistant': Assistant.init(); break;
      case 'dashboard': renderDashboard(); break;
      case 'home': updateUI(); break;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateUI() {
    const accuracy = state.totalQuestions > 0
      ? Math.round((state.totalCorrect / state.totalQuestions) * 100)
      : 0;

    // XP displays
    const xpEls = ['xp-value', 'xp-value-sidebar', 'stat-xp', 'dash-xp'];
    xpEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = state.totalXP || 0;
    });

    // Quiz count
    const quizEls = ['stat-quizzes', 'dash-quizzes'];
    quizEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = state.quizzesCompleted || 0;
    });

    // Accuracy
    const accEls = ['stat-accuracy', 'dash-accuracy'];
    accEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = accuracy + '%';
    });

    // Streak
    const streakEl = document.getElementById('dash-streak');
    if (streakEl) streakEl.textContent = state.bestStreak || 0;
  }

  function renderDashboard() {
    updateUI();
    renderBadges();
  }

  function renderBadges() {
    const container = document.getElementById('badges-container');
    if (!container) return;

    const BADGES = [
      { icon: '🌱', name: 'First Quiz', condition: (s) => s.quizzesCompleted >= 1 },
      { icon: '🎯', name: '80% Accuracy', condition: (s) => s.totalQuestions > 0 && (s.totalCorrect / s.totalQuestions) >= 0.8 },
      { icon: '🔥', name: 'Streak of 5', condition: (s) => s.bestStreak >= 5 },
      { icon: '⭐', name: '100 XP', condition: (s) => s.totalXP >= 100 },
      { icon: '🏆', name: '500 XP', condition: (s) => s.totalXP >= 500 },
      { icon: '🗺️', name: 'Journey Started', condition: (s) => s.journeyStep >= 1 },
      { icon: '🗳️', name: 'Journey Complete', condition: (s) => s.journeyStep >= 4 },
      { icon: '🤖', name: 'Asked 5 Questions', condition: (s) => s.questionsAsked >= 5 },
      { icon: '📚', name: '5 Quizzes Done', condition: (s) => s.quizzesCompleted >= 5 },
      { icon: '💎', name: '1000 XP', condition: (s) => s.totalXP >= 1000 },
    ];

    container.innerHTML = BADGES.map(badge => {
      const earned = badge.condition(state);
      return `
        <div class="badge-item ${earned ? 'badge-item--earned' : 'badge-item--locked'}" title="${badge.name}${earned ? ' ✅' : ' 🔒'}">
          ${badge.icon}
        </div>
      `;
    }).join('');
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', init);

  return { navigate, getState, saveState, updateUI };
})();
