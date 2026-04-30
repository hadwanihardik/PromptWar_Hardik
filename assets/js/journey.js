/**
 * Election Journey Simulator
 * 5-step guided walkthrough from eligibility to post-vote
 */
const Journey = (() => {
  let currentStep = 0;

  const STEPS = [
    {
      title: 'Check Your Eligibility',
      icon: '✅',
      content: `
        <p>Before you can vote, make sure you meet these requirements:</p>
        <ul>
          <li>You must be an Indian citizen</li>
          <li>You must be at least 18 years old on the qualifying date (January 1st of the year)</li>
          <li>You must be a resident of the constituency where you want to vote</li>
          <li>You must not be disqualified under any law (e.g., unsound mind, electoral offence)</li>
        </ul>
        <p style="margin-top:16px; color:var(--accent-light);">💡 <strong>Tip:</strong> Even if you turn 18 after January 1st but before the election, you may still need to wait for the next electoral roll revision.</p>
      `,
      actions: [
        { label: '📅 Check qualifying dates', type: 'calendar' },
        { label: 'Next: Register →', type: 'next' }
      ]
    },
    {
      title: 'Register as a Voter',
      icon: '📋',
      content: `
        <p>Follow these steps to get registered:</p>
        <ul>
          <li><strong>Online:</strong> Visit <a href="https://nvsp.in" target="_blank" style="color:var(--accent-light)">nvsp.in</a> → Click "New Voter Registration" → Fill Form 6</li>
          <li><strong>Offline:</strong> Visit your local ERO office with filled Form 6</li>
          <li><strong>Via App:</strong> Download "Voter Helpline" app from Play Store / App Store</li>
        </ul>
        <p style="margin-top:16px;"><strong>Documents Required:</strong></p>
        <ul>
          <li>Proof of age (Birth certificate, School marksheet, Passport)</li>
          <li>Proof of address (Aadhaar, Utility bills, Bank statement)</li>
          <li>Recent passport-size photograph</li>
        </ul>
        <p style="margin-top:16px; color:var(--green-light);">✅ After submission, you'll receive an acknowledgment. Your application will be verified by BLO (Booth Level Officer) through a field visit.</p>
      `,
      actions: [
        { label: '🔗 Open NVSP Portal', type: 'link', url: 'https://nvsp.in' },
        { label: 'Next: Verify →', type: 'next' }
      ]
    },
    {
      title: 'Verify Your Registration',
      icon: '🔍',
      content: `
        <p>After applying, verify that your name appears on the electoral roll:</p>
        <ul>
          <li>Visit <a href="https://electoralsearch.eci.gov.in" target="_blank" style="color:var(--accent-light)">electoralsearch.eci.gov.in</a></li>
          <li>Search by name or Voter ID (EPIC number)</li>
          <li>Verify your details: Name, Age, Address, Constituency, Polling Station</li>
          <li>If details are wrong, submit Form 8 for corrections</li>
        </ul>
        <p style="margin-top:16px; color:var(--amber-light);">⚠️ <strong>Important:</strong> Check your registration well before election day. Last-minute corrections may not be processed in time.</p>
      `,
      actions: [
        { label: '🔍 Check Electoral Roll', type: 'link', url: 'https://electoralsearch.eci.gov.in' },
        { label: 'Next: Model Code of Conduct →', type: 'next' }
      ]
    },
    {
      title: 'Model Code of Conduct & cVIGIL',
      icon: '🛡️',
      content: `
        <p>Before elections, a set of guidelines called the <strong>Model Code of Conduct (MCC)</strong> comes into force to ensure free and fair elections.</p>
        <ul>
          <li>Politicians cannot announce new financial grants or make promises that influence voters.</li>
          <li>Use of official government machinery for campaigning is strictly prohibited.</li>
          <li>No campaigning is allowed based on caste or religion.</li>
        </ul>
        <p style="margin-top:16px;"><strong>Empowering Citizens:</strong></p>
        <p>You can report MCC violations anonymously using the Election Commission's <strong>cVIGIL app</strong>. Take a photo or 2-minute video of illegal money distribution, hate speech, or liquor distribution, and authorities will respond within 100 minutes!</p>
        <p style="margin-top:16px; color:var(--accent-light);">💡 <strong>Tip:</strong> The cVIGIL app empowers every citizen to act as an election observer.</p>
      `,
      actions: [
        { label: '📱 Get cVIGIL App', type: 'link', url: 'https://cvigil.eci.gov.in/' },
        { label: 'Next: EVM & VVPAT →', type: 'next' }
      ]
    },
    {
      title: 'Understanding EVM & VVPAT',
      icon: '📠',
      content: `
        <p>India uses Electronic Voting Machines (EVMs) to record votes. It has two main components at the booth:</p>
        <ul>
          <li><strong>Ballot Unit (BU):</strong> Contains the names and symbols of candidates. You press the blue button next to your choice.</li>
          <li><strong>VVPAT:</strong> Voter Verifiable Paper Audit Trail. A transparent machine that prints a paper slip of your vote.</li>
        </ul>
        <p style="margin-top:16px;"><strong>How to verify your vote:</strong></p>
        <p>When you press the button, the VVPAT will print a slip showing the serial number, name, and symbol of your chosen candidate. This slip is visible through a glass window for <strong>7 seconds</strong> before it drops into a sealed drop-box.</p>
        <p style="margin-top:16px; color:var(--amber-light);">⚠️ <strong>NOTA:</strong> If you don't want to vote for any candidate, press the "None of the Above" (NOTA) button at the bottom of the list.</p>
      `,
      actions: [
        { label: 'Next: Find Polling Station →', type: 'next' }
      ]
    },
    {
      title: 'Find Your Polling Station',
      icon: '📍',
      content: `
        <p>On election day, you need to visit your assigned polling station:</p>
        <ul>
          <li>Your polling station is shown on the electoral roll search result</li>
          <li>It's usually a school, community hall, or government building near your home</li>
          <li>Polling hours are typically 7:00 AM to 6:00 PM</li>
          <li>Carry your Voter ID and one additional photo ID for verification</li>
        </ul>
        <div id="journey-map-container" style="margin-top:20px;"></div>
        <p style="margin-top:16px; color:var(--accent-light);">💡 <strong>Tip:</strong> Visit your polling station a day before to familiarize yourself with the location.</p>
      `,
      actions: [
        { label: '📍 Show Nearby Stations', type: 'map' },
        { label: '📅 Add Election Day Reminder', type: 'calendar' },
        { label: 'Next: Voting Day →', type: 'next' }
      ]
    },
    {
      title: 'Voting Day Guide',
      icon: '🗳️',
      content: `
        <p>Here's what to expect on election day:</p>
        <ul>
          <li><strong>Step 1:</strong> Arrive at your polling station. Join the queue.</li>
          <li><strong>Step 2:</strong> Show your Voter ID to the polling officer for verification.</li>
          <li><strong>Step 3:</strong> Your finger will be marked with indelible ink.</li>
          <li><strong>Step 4:</strong> Receive a slip and proceed to the EVM booth.</li>
          <li><strong>Step 5:</strong> Press the button next to your preferred candidate on the Ballot Unit.</li>
          <li><strong>Step 6:</strong> Check the VVPAT display — your vote will show for 7 seconds.</li>
          <li><strong>Step 7:</strong> Exit the booth. Congratulations, you've voted! 🎉</li>
        </ul>
        <p style="margin-top:16px; color:var(--green-light);">🗳️ <strong>Remember:</strong> Your vote is SECRET. No one can see who you voted for. Don't share photos of the EVM.</p>
      `,
      actions: [
        { label: '🏠 Back to Home', type: 'home' },
        { label: '🎮 Take the Quiz', type: 'quiz' },
        { label: '📊 View Progress', type: 'dashboard' }
      ]
    }
  ];

  function init() {
    currentStep = 0;
    render();
  }

  function render() {
    renderStepper();
    renderContent();
  }

  function renderStepper() {
    const container = document.getElementById('journey-stepper');
    let html = '';
    STEPS.forEach((step, i) => {
      const dotClass = i < currentStep ? 'journey-step-dot--done' : i === currentStep ? 'journey-step-dot--active' : '';
      const lineClass = i < currentStep ? 'journey-step-line--done' : '';
      html += `<div class="journey-step-indicator">`;
      html += `<div class="journey-step-dot ${dotClass}" onclick="Journey.goTo(${i})" title="${step.title}">${i < currentStep ? '✓' : i + 1}</div>`;
      if (i < STEPS.length - 1) html += `<div class="journey-step-line ${lineClass}"></div>`;
      html += `</div>`;
    });
    container.innerHTML = html;
  }

  function renderContent() {
    const step = STEPS[currentStep];
    const container = document.getElementById('journey-content-area');

    let actionsHtml = step.actions.map(action => {
      if (action.type === 'next') {
        return `<button class="btn btn--primary" onclick="Journey.next()">${action.label}</button>`;
      } else if (action.type === 'link') {
        return `<a href="${action.url}" target="_blank" class="btn btn--secondary">${action.label}</a>`;
      } else if (action.type === 'map') {
        return `<button class="btn btn--green" onclick="Maps.showInJourney()">${action.label}</button>`;
      } else if (action.type === 'calendar') {
        return `<button class="btn btn--amber" onclick="Calendar.addReminder()">${action.label}</button>`;
      } else if (action.type === 'home') {
        return `<button class="btn btn--primary" onclick="App.navigate('home')">${action.label}</button>`;
      } else if (action.type === 'quiz') {
        return `<button class="btn btn--secondary" onclick="App.navigate('quiz')">${action.label}</button>`;
      } else if (action.type === 'dashboard') {
        return `<button class="btn btn--secondary" onclick="App.navigate('dashboard')">${action.label}</button>`;
      }
      return '';
    }).join('');

    container.innerHTML = `
      <div class="journey-content">
        <div class="journey-content__step-label">Step ${currentStep + 1} of ${STEPS.length}</div>
        <h2 class="journey-content__title">${step.icon} ${step.title}</h2>
        <div class="journey-content__body">${step.content}</div>
        <div class="journey-actions">${actionsHtml}</div>
      </div>
    `;

    // Track journey progress
    const state = App.getState();
    state.journeyStep = Math.max(state.journeyStep || 0, currentStep);
    App.saveState();
  }

  function next() {
    if (currentStep < STEPS.length - 1) {
      currentStep++;
      render();
      // Award XP for completing steps
      const state = App.getState();
      state.totalXP = (state.totalXP || 0) + 15;
      App.saveState();
      App.updateUI();
    }
  }

  function goTo(step) {
    if (step <= (App.getState().journeyStep || 0) + 1) {
      currentStep = step;
      render();
    }
  }

  return { init, next, goTo };
})();
