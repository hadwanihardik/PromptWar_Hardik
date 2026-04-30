/**
 * Leaders Page
 * Renders the Parliament Leaders section with tabs for Lok Sabha & Rajya Sabha
 */
const Leaders = (() => {
  let activeTab = 'lokSabha';
  let expandedCard = null;

  function init() {
    activeTab = 'lokSabha';
    expandedCard = null;
    render();
  }

  function switchTab(tab) {
    activeTab = tab;
    expandedCard = null;

    // Update tab buttons
    document.querySelectorAll('.leaders-tab-btn').forEach(btn => {
      btn.classList.toggle('leaders-tab-btn--active', btn.dataset.tab === tab);
    });

    // Re-render leader cards
    renderLeaderCards();
  }

  function toggleCard(id) {
    expandedCard = expandedCard === id ? null : id;
    document.querySelectorAll('.leader-card').forEach(card => {
      const isExpanded = card.dataset.id === id && expandedCard === id;
      card.classList.toggle('leader-card--expanded', isExpanded);
      const details = card.querySelector('.leader-card__details');
      if (details) {
        details.style.maxHeight = isExpanded ? details.scrollHeight + 'px' : '0';
      }
      const chevron = card.querySelector('.leader-card__chevron');
      if (chevron) chevron.textContent = isExpanded ? '▲' : '▼';
    });
  }

  function getPartyBadgeStyle(partyColor) {
    return `background: ${partyColor}22; border: 1px solid ${partyColor}55; color: ${partyColor};`;
  }

  function renderLeaderCards() {
    const container = document.getElementById('leaders-cards-container');
    if (!container) return;

    const houseData = LEADERS_DATA[activeTab];
    container.innerHTML = houseData.leaders.map(leader => `
      <div class="leader-card" data-id="${leader.id}" onclick="Leaders.toggleCard('${leader.id}')">
        <div class="leader-card__header">
          <div class="leader-card__role-badge">
            <span class="leader-role-icon">${leader.roleIcon}</span>
            <span class="leader-role-text">${leader.role}</span>
          </div>
          <span class="leader-card__chevron">▼</span>
        </div>
        <div class="leader-card__identity">
          <div class="leader-card__avatar" style="background-image: url('${leader.photo}'); background-size: cover; background-position: top center;"></div>
          <div class="leader-card__info">
            <h3 class="leader-card__name">${leader.name}</h3>
            <div class="leader-card__meta">
              <span class="leader-party-tag" style="${getPartyBadgeStyle(leader.partyColor)}">${leader.party}</span>
              ${leader.constituency !== '—' ? `<span class="leader-constituency">📍 ${leader.constituency}</span>` : ''}
            </div>
            <div class="leader-card__since">${leader.since !== '—' ? `Since ${leader.since} · ${leader.tenure}` : leader.tenure}</div>
          </div>
        </div>
        <div class="leader-card__details" style="max-height:0">
          <div class="leader-card__details-inner">
            <div class="leader-about">
              <h4>📋 About</h4>
              <p>${leader.about}</p>
            </div>
            <div class="leader-keyfacts">
              <h4>⚡ Key Facts</h4>
              <ul>
                ${leader.keyFacts.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
            <div class="leader-constitutional">
              <h4>📜 Constitutional Role</h4>
              <p class="leader-constitutional__text">${leader.constitutionalRole}</p>
            </div>
            ${leader.education !== '—' ? `
            <div class="leader-education">
              <h4>🎓 Education</h4>
              <p>${leader.education}</p>
            </div>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  function render() {
    const section = document.getElementById('page-leaders');
    if (!section) return;

    section.innerHTML = `
      <div class="leaders-page">
        <div class="leaders-hero">
          <div class="leaders-hero__badge">🏛️ Parliament of India</div>
          <h2 class="leaders-hero__title">Leaders of <span>Parliament</span></h2>
          <p class="leaders-hero__subtitle">Know your elected representatives & key constitutional offices</p>
        </div>

        <!-- House Info Banner -->
        <div class="house-info-banner" id="house-info-banner"></div>

        <!-- Tab Switcher -->
        <div class="leaders-tabs">
          <button class="leaders-tab-btn leaders-tab-btn--active" data-tab="lokSabha" onclick="Leaders.switchTab('lokSabha')" id="tab-lok-sabha">
            🏛️ Lok Sabha
            <span class="tab-subtitle">Lower House</span>
          </button>
          <button class="leaders-tab-btn" data-tab="rajyaSabha" onclick="Leaders.switchTab('rajyaSabha')" id="tab-rajya-sabha">
            🏛️ Rajya Sabha
            <span class="tab-subtitle">Upper House</span>
          </button>
        </div>

        <!-- House Stats -->
        <div class="house-stats-row" id="house-stats-row"></div>

        <!-- Leader Cards -->
        <div class="leader-cards-grid" id="leaders-cards-container"></div>

        <!-- Info Footer -->
        <div class="leaders-info-footer">
          <span>ℹ️</span>
          <span>Click on any card to expand and learn more about the leader's role, key facts, and constitutional responsibilities.</span>
        </div>
      </div>
    `;

    updateHouseInfo();
    renderLeaderCards();
  }

  function updateHouseInfo() {
    const houseData = LEADERS_DATA[activeTab];
    const banner = document.getElementById('house-info-banner');
    const statsRow = document.getElementById('house-stats-row');
    if (banner) {
      banner.innerHTML = `
        <div class="house-banner-content">
          <div class="house-banner-icon">${activeTab === 'lokSabha' ? '🏛️' : '📜'}</div>
          <div>
            <div class="house-banner-name">${houseData.fullName}</div>
            <div class="house-banner-desc">${houseData.description}</div>
          </div>
          <div class="house-banner-article">
            <span>Constitution</span>
            <strong>${houseData.constitution}</strong>
          </div>
        </div>
      `;
    }
    if (statsRow) {
      statsRow.innerHTML = `
        <div class="house-stat-chip">
          <span class="house-stat-chip__label">Total Seats</span>
          <span class="house-stat-chip__value">${houseData.totalSeats}</span>
        </div>
        <div class="house-stat-chip">
          <span class="house-stat-chip__label">Current Term</span>
          <span class="house-stat-chip__value" style="font-size:0.85rem">${houseData.term}</span>
        </div>
        <div class="house-stat-chip">
          <span class="house-stat-chip__label">Key Leaders</span>
          <span class="house-stat-chip__value">${houseData.leaders.length}</span>
        </div>
      `;
    }
  }

  return { init, switchTab, toggleCard };
})();
