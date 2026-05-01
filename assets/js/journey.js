/**
 * Election Journey Simulator
 * 5-step guided walkthrough from eligibility to post-vote
 */
const Journey = (() => {
  let currentStep = 0;

  const STEPS = [
    {
      key: 'journey_step_0',
      icon: '✅',
      actions: [
        { label: 'btn_next', type: 'next' }
      ]
    },
    {
      key: 'journey_step_1',
      icon: '📋',
      actions: [
        { label: 'btn_next', type: 'next' }
      ]
    },
    {
      key: 'journey_step_2',
      icon: '🔍',
      actions: [
        { label: 'btn_next', type: 'next' }
      ]
    },
    {
      key: 'journey_step_3',
      icon: '🛡️',
      actions: [
        { label: 'btn_next', type: 'next' }
      ]
    },
    {
      key: 'journey_step_4',
      icon: '📠',
      actions: [
        { label: 'btn_finish', type: 'next' }
      ]
    }
  ];

  function init() {
    currentStep = 0;
    render();
  }

  function render() {
    const header = document.getElementById('journey-header');
    if (!header) return;

    header.innerHTML = `
      <div class="journey__header" style="text-align:center; margin-bottom:40px;">
        <h2 class="journey__title" data-i18n="journey_title" style="margin-bottom:24px;">Interactive Voter Journey</h2>
        <p style="color: var(--text-muted); margin-bottom:32px;" data-i18n="journey_subtitle_page">Follow these steps to become a confident voter</p>
        <div class="journey-stepper" role="progressbar" aria-valuemin="1" aria-valuemax="${STEPS.length}" aria-valuenow="${currentStep + 1}">
          ${STEPS.map((_, i) => `
            <div class="journey-step-indicator" aria-hidden="true">
              <div class="journey-step-dot ${i === currentStep ? 'journey-step-dot--active' : i < currentStep ? 'journey-step-dot--done' : ''}">${I18n.num(i + 1)}</div>
              ${i < STEPS.length - 1 ? `<div class="journey-step-line ${i < currentStep ? 'journey-step-line--done' : ''}"></div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    renderStep();
  }

  function renderStep() {
    const step = STEPS[currentStep];
    const container = document.getElementById('journey-container');
    if (!container) return;

    const title = I18n.get(`${step.key}_title`);
    const content = I18n.get(`${step.key}_content`);

    container.innerHTML = `
      <div class="journey-content" aria-live="polite">
        <div class="journey-content__step-label">${I18n.get('journey_step_label')} ${I18n.num(currentStep + 1)}</div>
        <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
          <span style="font-size:2.5rem" aria-hidden="true">${step.icon}</span>
          <h3 class="journey-content__title" style="margin:0">${title}</h3>
        </div>
        <div class="journey-content__body">${content}</div>
        <div class="journey-actions">
          ${step.actions.map(action => `
            <button class="btn ${action.type === 'next' ? 'btn--primary' : 'btn--secondary'}" 
              data-action="journey-action" data-val="${action.type}" data-val2="${action.url || ''}">
              ${I18n.get(action.label)}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    // Ensure the new content is localized
    I18n.updateUI();
  }

  function handleAction(type, url) {
    if (type === 'next') {
      if (currentStep < STEPS.length - 1) {
        currentStep++;
        
        // XP Reward for progress
        const state = App.getState();
        state.totalXP = (state.totalXP || 0) + 20;
        state.journeyProgress = Math.max(state.journeyProgress || 0, currentStep);
        App.saveState();
        App.updateUI();

        render();
      } else {
        // Finished
        const state = App.getState();
        state.totalXP = (state.totalXP || 0) + 50;
        App.saveState();
        App.updateUI();
        App.navigate('dashboard');
      }
    } else if (type === 'link') {
      window.open(url, '_blank');
    } else if (type === 'calendar') {
      if (typeof Calendar !== 'undefined') Calendar.addReminder();
    }
  }

  window.addEventListener('langChanged', () => {
    if (document.getElementById('page-journey')?.classList.contains('page--active')) {
      render();
    }
  });

  return { init, handleAction };
})();
