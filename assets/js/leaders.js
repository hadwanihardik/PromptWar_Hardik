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

    document.querySelectorAll('.leaders-tab-btn').forEach(btn => {
      btn.classList.toggle('leaders-tab-btn--active', btn.dataset.tab === tab);
    });

    renderLeaderCards();
    updateHouseInfo();
  }

  function toggleCard(id) {
    expandedCard = expandedCard === id ? null : id;
    document.querySelectorAll('.leader-card').forEach(card => {
      const isExpanded = card.dataset.id === id && expandedCard === id;
      card.classList.toggle('leader-card--expanded', isExpanded);
      card.setAttribute('aria-expanded', isExpanded);
      const details = card.querySelector('.leader-card__details');
      if (details) {
        details.style.maxHeight = isExpanded ? details.scrollHeight + 'px' : '0';
        details.setAttribute('aria-hidden', !isExpanded);
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

    const lang = I18n.currentLang();
    const houseData = LEADERS_DATA[activeTab];
    container.innerHTML = houseData.leaders.map(leader => {
      const role = I18n.num(leader[`role_${lang}`] || leader.role);
      const constituency = I18n.num(leader[`constituency_${lang}`] || leader.constituency);
      const tenure = I18n.num(leader[`tenure_${lang}`] || leader.tenure);
      const about = I18n.num(leader[`about_${lang}`] || leader.about);

      const education = I18n.num(leader[`education_${lang}`] || leader.education);
      const keyFacts = (leader[`keyFacts_${lang}`] || leader.keyFacts).map(f => I18n.num(f));
      const constitutionalRole = I18n.num(leader[`constitutionalRole_${lang}`] || leader.constitutionalRole);

      return `
      <div class="leader-card" data-id="${leader.id}" data-action="leaders-toggle" data-val="${leader.id}" role="button" aria-expanded="false" aria-controls="details-${leader.id}" tabindex="0">
        <div class="leader-card__header">
          <div class="leader-card__role-badge">
            <span class="leader-role-icon" aria-hidden="true">${leader.roleIcon}</span>
            <span class="leader-role-text">${role}</span>
          </div>
          <span class="leader-card__chevron" aria-hidden="true">▼</span>
        </div>
        <div class="leader-card__identity">
          <div class="leader-card__avatar">
            <img src="https://wsrv.nl/?url=${encodeURIComponent(leader.photo)}&w=200&h=200&fit=cover&a=top" 
                 alt="${leader[`name_${lang}`] || leader.name}" 
                 loading="lazy" 
                 class="leader-card__avatar-img">
          </div>
          <div class="leader-card__info">
            <h3 class="leader-card__name">${leader[`name_${lang}`] || leader.name}</h3>
            <div class="leader-card__meta">
              <span class="leader-party-tag" style="border-left-color: ${leader.partyColor}">${I18n.getParty(leader.party)}</span>
              ${constituency !== '—' ? `<span class="leader-constituency" aria-label="Constituency">📍 ${constituency}</span>` : ''}
            </div>
            <div class="leader-card__since">${leader.since !== '—' ? `${I18n.get('since')} ${I18n.num(leader.since)} · ${tenure}` : tenure}</div>
          </div>
        </div>
        <div class="leader-card__details" id="details-${leader.id}" aria-hidden="true">
          <div class="leader-card__details-inner">
            <div class="leader-about">
              <h4>📋 ${I18n.get('about')}</h4>
              <p>${about}</p>
            </div>
            <div class="leader-keyfacts">
              <h4>⚡ ${I18n.get('key_facts')}</h4>
              <ul>
                ${keyFacts.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
            <div class="leader-constitutional">
              <h4>📜 ${I18n.get('constitutional_role')}</h4>
              <p class="leader-constitutional__text">${constitutionalRole}</p>
            </div>
            ${education !== '—' ? `
            <div class="leader-education">
              <h4>🎓 ${I18n.get('education')}</h4>
              <p>${education}</p>
            </div>` : ''}
            <div class="leader-card__share-row">
              <button class="btn btn--secondary" data-action="share-leader" data-val="${leader[`name_${lang}`] || leader.name}" data-val2="${role}">
                📤 ${I18n.get('share_info') || 'Share Info'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `; }).join('');
  }

  function render() {
    const section = document.getElementById('page-leaders');
    if (!section) return;

    section.innerHTML = `
      <div class="leaders-page">
        <div class="leaders-hero">
          <div class="leaders-hero__badge" data-i18n="parliament_of_india">${I18n.get('parliament_of_india')}</div>
          <h2 class="leaders-hero__title">${I18n.get('leaders_of_parliament')}</h2>
          <p class="leaders-hero__subtitle" data-i18n="leaders_subtitle">${I18n.get('leaders_subtitle')}</p>
        </div>

        <div class="house-info-banner" id="house-info-banner"></div>

        <div class="leaders-tabs">
          <button class="leaders-tab-btn ${activeTab === 'lokSabha' ? 'leaders-tab-btn--active' : ''}" data-action="leaders-tab" data-val="lokSabha">
            🏛️ ${I18n.get('lok_sabha')}
            <span class="tab-subtitle" data-i18n="lower_house">${I18n.get('lower_house')}</span>
          </button>
          <button class="leaders-tab-btn ${activeTab === 'rajyaSabha' ? 'leaders-tab-btn--active' : ''}" data-action="leaders-tab" data-val="rajyaSabha">
            🏛️ ${I18n.get('rajya_sabha')}
            <span class="tab-subtitle" data-i18n="upper_house">${I18n.get('upper_house')}</span>
          </button>
        </div>

        <div class="house-stats-row" id="house-stats-row"></div>

        <div class="leader-cards-grid" id="leaders-cards-container"></div>

        <div class="leaders-info-footer">
          <span>ℹ️</span>
          <span data-i18n="leaders_footer">${I18n.get('leaders_footer')}</span>
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
    const lang = I18n.currentLang();

    const fullName = houseData[`fullName_${lang}`] || houseData.fullName;
    const description = houseData[`description_${lang}`] || houseData.description;

    if (banner) {
      banner.innerHTML = `
        <div class="house-banner-content">
          <div class="house-banner-icon">${activeTab === 'lokSabha' ? '🏛️' : '📜'}</div>
          <div>
            <div class="house-banner-name">${fullName}</div>
            <div class="house-banner-desc">${description}</div>
          </div>
          <div class="house-banner-article">
            <span>${I18n.get('constitution')}</span>
            <strong>${I18n.num(houseData[`constitution_${lang}`] || houseData.constitution)}</strong>
          </div>
        </div>
      `;
    }
    if (statsRow) {
      statsRow.innerHTML = `
        <div class="house-stat-chip">
          <span class="house-stat-chip__label" data-i18n="total_seats">${I18n.get('total_seats')}</span>
          <span class="house-stat-chip__value">${I18n.num(houseData.totalSeats)}</span>
        </div>
        <div class="house-stat-chip">
          <span class="house-stat-chip__label" data-i18n="current_term">${I18n.get('current_term')}</span>
          <span class="house-stat-chip__value" style="font-size:0.85rem">${I18n.num(houseData.term)}</span>
        </div>
        <div class="house-stat-chip">
          <span class="house-stat-chip__label" data-i18n="key_leaders">${I18n.get('key_leaders')}</span>
          <span class="house-stat-chip__value">${I18n.num(houseData.leaders.length)}</span>
        </div>
      `;
    }
  }

  window.addEventListener('langChanged', () => {
    if (document.getElementById('page-leaders')?.classList.contains('page--active')) {
      render();
    }
  });

  return { init, switchTab, toggleCard };
})();
