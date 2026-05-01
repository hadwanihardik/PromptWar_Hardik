/**
 * Voter Services Module
 * Guides users on checking their voter status
 */
const Services = (() => {
  function init() {
    const container = document.getElementById('page-services');
    if (!container) return;

    container.innerHTML = `
      <div class="container">
        <h2 style="font-size: 1.5rem; margin-bottom: 16px;" data-i18n="services_title">Voter Services</h2>
        <p style="color: var(--text-secondary); margin-bottom: 32px;" data-i18n="services_subtitle">Check your voter registration status, find your polling booth, and download your EPIC.</p>

        <div class="dash-card">
          <h3 style="margin-bottom: 16px; color: var(--accent);" data-i18n="services_check_status">Check Voter Status</h3>
          <p style="margin-bottom: 16px;" data-i18n="services_portal_desc">The Election Commission of India provides a dedicated portal to search your name in the electoral roll.</p>
          
          <div style="background: var(--bg-secondary); padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <h4 style="margin-bottom: 12px;" data-i18n="services_guide_title">Step-by-Step Guide:</h4>
            <ol style="margin-left: 20px; line-height: 1.6; display: flex; flex-direction: column; gap: 8px;">
              <li data-i18n-html="services_step_1">Click the button below to visit the official ECI Electoral Search portal.</li>
              <li data-i18n-html="services_step_2">You can search by <strong>Details</strong> (Name, Relatives Name, Age, State).</li>
              <li data-i18n-html="services_step_3">Alternatively, search by <strong>EPIC Number</strong> (Voter ID Number) for faster results.</li>
              <li data-i18n-html="services_step_4">Or search by your registered <strong>Mobile Number</strong>.</li>
              <li data-i18n-html="services_step_5">Enter the Captcha code shown on the screen and click Search.</li>
            </ol>
          </div>

          <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn--primary" style="display: inline-block; text-decoration: none; text-align: center; width: 100%;">
            <span data-i18n="services_btn_portal">Go to electoralsearch.eci.gov.in ↗</span>
          </a>
        </div>
      </div>
    `;
    if (typeof I18n !== 'undefined') I18n.updateUI();
  }

  return { init };
})();
