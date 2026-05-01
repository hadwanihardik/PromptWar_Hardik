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
    // Handle image errors globally (satisfies CSP by avoiding inline onerror)
    window.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%2364748b\'%3E%3Cpath d=\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\'/%3E%3C/svg%3E';
      }
    }, true);

    state = loadState();
    Theme.init();
    I18n.init();
    initFirebase();
    updateUI();
    
    // Check if URL has a page hash
    const hash = window.location.hash.replace('#', '');
    if (hash) navigate(hash);
    else navigate('home');
    
    bindEvents();
    trackEvent('app_load');
    console.log('🗳️ VoteWise Election Education Assistant loaded!');
  }

  function initFirebase() {
    if (typeof firebase === 'undefined') return;
    
    const firebaseConfig = {
      projectId: "votewise-dc42a",
      authDomain: "votewise-dc42a.firebaseapp.com",
      storageBucket: "votewise-dc42a.appspot.com",
    };

    firebase.initializeApp(firebaseConfig);
    console.log('🔥 Firebase Initialized');
  }

  function trackEvent(name, params = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', name, params);
    }
  }
  
  function bindEvents() {
    // Nav links
    document.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', (e) => {
        const page = e.currentTarget.dataset.page;
        if (page) navigate(page);
      });
    });

    // Logo & Back buttons
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.currentTarget.dataset.nav;
        if (page) navigate(page);
      });
    });

    // Language selector
    document.querySelectorAll('[data-set-lang]').forEach(el => {
      el.addEventListener('click', (e) => {
        const lang = e.currentTarget.dataset.setLang;
        if (lang && typeof I18n !== 'undefined') I18n.setLanguage(lang);
      });
    });

    // Menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle && typeof Sidebar !== 'undefined') {
      menuToggle.addEventListener('click', Sidebar.toggle);
    }

    // Chat send
    const chatSend = document.getElementById('chat-send-btn');
    if (chatSend && typeof Assistant !== 'undefined') {
      chatSend.addEventListener('click', Assistant.send);
    }

    const chatInput = document.getElementById('chat-input');
    if (chatInput && typeof Assistant !== 'undefined') {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') Assistant.send();
      });
    }

    // Global delegation for dynamic content
    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;

      const action = target.dataset.action;
      const val = target.dataset.val;
      const val2 = target.dataset.val2;

      switch(action) {
        case 'navigate': App.navigate(val); break;
        case 'quiz-start': Quiz.start(); break;
        case 'quiz-answer': Quiz.answer(parseInt(val)); break;
        case 'quiz-next': Quiz.next(); break; // Need to add Quiz.next
        case 'sidebar-navigate': Sidebar.navigate(val); break;
        case 'sidebar-close': Sidebar.close(); break;
        case 'assistant-chip': Assistant.sendChip(target); break;
        case 'states-view': States.setView(val); break;
        case 'states-house': States.setHouse(val); break;
        case 'states-close': States.closeMembers(); break;
        case 'states-members': States.showMembers(val); break;
        case 'leaders-tab': Leaders.switchTab(val); break;
        case 'leaders-toggle': Leaders.toggleCard(val); break;
        case 'share-app': Share.shareApp(); break;
        case 'share-quiz': 
          const s = App.getState();
          Share.shareQuiz(s.lastQuizScore || 0, s.lastQuizStreak || 0); 
          break;
        case 'share-leader': 
          const l = target.dataset;
          Share.shareLeader(l.val, l.val2); 
          break;
        case 'journey-action': Journey.handleAction(val, val2); break;
        case 'calendar-reminder': Calendar.addReminder(); break;
      }
    });
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
        menuToggle.classList.add('is-visible');
        backBtn.classList.remove('is-visible');
      } else {
        menuToggle.classList.remove('is-visible');
        backBtn.classList.add('is-visible');
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

    trackEvent('page_view', { page_title: page, page_path: '#' + page });

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
      if (el) el.textContent = I18n.num(state.totalXP || 0);
    });

    // Quiz count
    const quizEls = ['stat-quizzes', 'dash-quizzes'];
    quizEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = I18n.num(state.quizzesCompleted || 0);
    });

    // Accuracy
    const accEls = ['stat-accuracy', 'dash-accuracy'];
    accEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = I18n.num(accuracy) + '%';
    });

    // Streak
    const streakEl = document.getElementById('dash-streak');
    if (streakEl) streakEl.textContent = I18n.num(state.bestStreak || 0);
  }

  function renderDashboard() {
    updateUI();
    renderBadges();
  }

  function renderBadges() {
    const container = document.getElementById('badges-container');
    if (!container) return;

    const BADGES = [
      { icon: '🌱', key: 'badge_first_quiz', condition: (s) => s.quizzesCompleted >= 1 },
      { icon: '🎯', key: 'badge_accuracy', condition: (s) => s.totalQuestions > 0 && (s.totalCorrect / s.totalQuestions) >= 0.8 },
      { icon: '🔥', key: 'badge_streak', condition: (s) => s.bestStreak >= 5 },
      { icon: '⭐', key: 'badge_100xp', condition: (s) => s.totalXP >= 100 },
      { icon: '🏆', key: 'badge_500xp', condition: (s) => s.totalXP >= 500 },
      { icon: '🗺️', key: 'badge_journey_start', condition: (s) => s.journeyStep >= 1 },
      { icon: '🗳️', key: 'badge_journey_end', condition: (s) => s.journeyStep >= 4 },
      { icon: '🤖', key: 'badge_ai_questions', condition: (s) => s.questionsAsked >= 5 },
      { icon: '📚', key: 'badge_5quizzes', condition: (s) => s.quizzesCompleted >= 5 },
      { icon: '💎', key: 'badge_1000xp', condition: (s) => s.totalXP >= 1000 },
    ];

    container.innerHTML = BADGES.map(badge => {
      const earned = badge.condition(state);
      const badgeName = I18n.get(badge.key);
      return `
        <div class="badge-item ${earned ? 'badge-item--earned' : 'badge-item--locked'}" title="${badgeName}${earned ? ' ✅' : ' 🔒'}">
          ${badge.icon}
        </div>
      `;
    }).join('');
  }

  // Listen to language changes to update UI instantly
  window.addEventListener('langChanged', () => {
    updateUI();
    renderBadges();
  });

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', init);

  return { navigate, getState, saveState, updateUI, trackEvent };
})();
