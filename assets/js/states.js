/**
 * States Map & Member Listing
 * Integrates Google GeoCharts with a custom member directory
 */
const States = (() => {
  let activeHouse = 'lokSabha'; // lokSabha or rajyaSabha
  let currentView = 'map'; // map or cards
  let chart = null;
  let detailsCache = {};

  function init() {
    activeHouse = 'lokSabha';
    currentView = 'map';
    render();
  }

  function setHouse(house) {
    activeHouse = house;
    document.querySelectorAll('.states-house-btn').forEach(btn => {
      btn.classList.toggle('states-house-btn--active', btn.dataset.house === house);
    });
    if (currentView === 'map') drawRegionsMap();
    else renderCards();
  }

  function setView(view) {
    currentView = view;
    document.querySelectorAll('.states-view-btn').forEach(btn => {
      btn.classList.toggle('states-view-btn--active', btn.dataset.view === view);
    });
    document.getElementById('states-map-container').style.display = view === 'map' ? 'block' : 'none';
    document.getElementById('states-cards-container').style.display = view === 'cards' ? 'block' : 'none';
    
    if (view === 'map') {
        // Small delay to ensure container is visible before drawing
        setTimeout(drawRegionsMap, 100);
    } else {
        renderCards();
    }
  }

  function drawRegionsMap() {
    if (typeof google === 'undefined' || !google.visualization) {
      google.charts.load('current', {
        'packages': ['geochart'],
        'mapsApiKey': '' // Add if needed for higher limits
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
      return;
    }

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Region');
    data.addColumn('number', activeHouse === 'lokSabha' ? I18n.get('lok_sabha_seats') : I18n.get('rajya_sabha_seats'));
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

    const lang = I18n.currentLang();
    STATES_DATA.forEach(state => {
      const seats = activeHouse === 'lokSabha' ? state.lokSabha : state.rajyaSabha;
      const stateName = state[`name_${lang}`] || state.name;
      const tooltip = createTooltip(stateName, state.lokSabha, state.rajyaSabha);
      data.addRow([{ v: state.id, f: stateName }, seats, tooltip]);
    });

    const options = {
      region: 'IN',
      displayMode: 'regions',
      resolution: 'provinces',
      colorAxis: { colors: ['#E0E7FF', '#6366F1', '#4338CA'] },
      backgroundColor: 'transparent',
      datalessRegionColor: 'rgba(255,255,255,0.05)',
      defaultColor: '#f5f5f5',
      tooltip: { isHtml: true }
    };

    const container = document.getElementById('geochart-regions');
    if (!container) return;
    chart = new google.visualization.GeoChart(container);

    google.visualization.events.addListener(chart, 'select', () => {
      const selection = chart.getSelection();
      if (selection.length > 0) {
        const row = selection[0].row;
        const stateId = data.getValue(row, 0);
        const state = STATES_DATA.find(s => s.id === stateId);
        if (state) showMembers(state.name);
      }
    });

    chart.draw(data, options);
  }

  function createTooltip(name, ls, rs) {
    return `
      <div class="map-tooltip">
        <div class="map-tooltip__title">${name}</div>
        <div class="map-tooltip__row">
          <span>${I18n.get('lok_sabha_seats')}:</span>
          <strong>${I18n.num(ls)}</strong>
        </div>
        <div class="map-tooltip__row">
          <span>${I18n.get('rajya_sabha_seats')}:</span>
          <strong>${I18n.num(rs)}</strong>
        </div>
      </div>
    `;
  }

  function renderCards() {
    const container = document.getElementById('states-cards-container');
    if (!container) return;

    const sortedData = [...STATES_DATA].sort((a, b) => a.name.localeCompare(b.name));

    const lang = I18n.currentLang();
    container.innerHTML = `
      <div class="state-cards-grid">
        ${sortedData.map(state => `
          <div class="state-card" onclick="States.showMembers('${state.name}')" style="cursor:pointer;" title="Click to view members">
              <div class="state-card__header">
                <span class="state-card__name">${state[`name_${lang}`] || state.name}</span>
                <span class="state-card__type ${state.type === 'UT' ? 'state-card__type--ut' : 'state-card__type--state'}">${state.type === 'UT' ? I18n.get('ut') : I18n.get('state_label')}</span>
              </div>
            <div class="state-card__stats">
              <div class="state-card__stat">
                <span class="state-card__stat-val">${I18n.num(state.lokSabha)}</span>
                <span class="state-card__stat-label">${I18n.get('lok_sabha')}</span>
              </div>
              <div class="state-card__stat">
                <span class="state-card__stat-val">${I18n.num(state.rajyaSabha)}</span>
                <span class="state-card__stat-label">${I18n.get('rajya_sabha')}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function showMembers(stateName) {
    const modal = document.getElementById('members-modal');
    const title = document.getElementById('members-modal-title');
    const content = document.getElementById('members-modal-content');
    
    modal.classList.add('members-modal--active');
    
    const stateObj = STATES_DATA.find(s => s.name === stateName);
    const lang = I18n.currentLang();
    const displayName = stateObj ? (stateObj[`name_${lang}`] || stateObj.name) : stateName;
    
    title.textContent = `${displayName} | ${I18n.get('members')}`;
    content.innerHTML = `<div style="text-align:center; padding:40px;"><div class="loading-spinner"></div><p>${I18n.get('loading')}</p></div>`;

    const members = MEMBERS_DATA.filter(m => m.state === stateName && m.house.toLowerCase() === activeHouse.toLowerCase());
    
    if (members.length === 0) {
      content.innerHTML = `<div style="text-align:center; padding:40px;"><p style="color:var(--text-secondary)">${I18n.get('no_members_found')}</p></div>`;
      return;
    }

    content.innerHTML = `
      <div class="members-grid">
        ${members.map(m => `
          <div class="member-card">
            <div class="member-card__avatar" style="background-image: url('https://wsrv.nl/?url=${encodeURIComponent(m.photo || 'sansad.in/images/default_photo.jpg')}');"></div>
            <div class="member-card__info">
              <div class="member-card__name">${m[`name_${lang}`] || m.name}</div>
              <div class="member-card__party">${I18n.getParty(m.party)}</div>
              <div class="member-card__const">${m[`constituency_${lang}`] || m.constituency}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  async function showMemberDetails(mpCode, house) {
    const content = document.getElementById('members-modal-content');
    content.innerHTML = `<div style="text-align:center; padding:40px;"><div class="loading-spinner"></div><p>${I18n.get('loading')}</p></div>`;

    if (detailsCache[mpCode]) {
      renderDetails(detailsCache[mpCode], MEMBERS_DATA.find(x => x.mpCode == mpCode));
      return;
    }

    try {
      let data;
      try {
        const response = await fetch('https://sansad.in/api_ls/member/'+mpCode+'?locale=en');
        if (response.ok) data = await response.json();
        else throw new Error('CORS');
      } catch (err) {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://sansad.in/api_ls/member/'+mpCode+'?locale=en')}`;
        const proxyRes = await fetch(proxyUrl);
        const proxyData = await proxyRes.json();
        data = JSON.parse(proxyData.contents);
      }
      if (!data) throw new Error("No data");
      detailsCache[mpCode] = data;
      localStorage.setItem(`vw-mp-${mpCode}`, JSON.stringify(data));
      renderDetails(data, MEMBERS_DATA.find(x => x.mpCode == mpCode));
    } catch (err) {
      content.innerHTML = `<div style="text-align:center; padding:40px;"><p style="color:var(--red-light);">${I18n.get('failed_load_details')}</p><button class="btn btn--secondary" onclick="States.showMemberDetails(${mpCode}, '${house}')">${I18n.get('retry')}</button></div>`;
    }
  }

  function renderDetails(data, m) {
    const title = document.getElementById('members-modal-title');
    const content = document.getElementById('members-modal-content');
    const lang = I18n.currentLang();
    title.innerHTML = `<button onclick="States.showMembers('${m.state}')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;margin-right:8px;">← ${I18n.get('btn_back')}</button> ${I18n.get('member_details')}`;
    
    let emailStr = (data.email || '').replace(/\[at\]/g, '@').replace(/\[dot\]/g, '.').replace(/<br>/g, ', ');
    
    content.innerHTML = `
        <div class="member-detail">
          <div class="member-detail__header" style="display:flex; gap:24px; align-items:center; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <div style="width:100px; height:100px; border-radius:50%; background-image:url('${data.photoUrl ? 'https://wsrv.nl/?url=' + encodeURIComponent(data.photoUrl) : m.photo ? 'https://wsrv.nl/?url=' + encodeURIComponent(m.photo) : 'https://wsrv.nl/?url=sansad.in/images/default_photo.jpg'}'); background-size:cover; background-position:top center; border:3px solid var(--accent-light);"></div>
            <div>
              <h2 style="font-family:'Outfit', sans-serif; font-size:1.5rem; margin-bottom:4px;">${data.fullName || m.name}</h2>
              <div style="color:var(--text-secondary); margin-bottom:8px;">📍 ${data.constituency || m.constituency} (${(() => { const so = STATES_DATA.find(s => s.name === (data.stateName || m.state)); return so ? (so[`name_${lang}`] || so.name) : (data.stateName || m.state); })()})</div>
              <span class="member-card__party" style="font-size:0.8rem; padding:4px 10px;">${I18n.getParty(data.partyFname || m.party)}</span>
            </div>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:24px;">
            <div class="member-detail__card" style="background:var(--bg-glass); padding:16px; border-radius:var(--radius-sm);">
              <h4 style="color:var(--accent-light); margin-bottom:12px; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em;">${I18n.get('personal_info')}</h4>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">${I18n.get('dob')}:</strong> ${I18n.num(data.dateOfBirth) || 'N/A'}</p>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">${I18n.get('education')}:</strong> ${I18n.num(data.qualificationName) || 'N/A'}</p>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">${I18n.get('profession')}:</strong> ${I18n.num(data.mainProfessionName) || 'N/A'}</p>
            </div>
            <div class="member-detail__card" style="background:var(--bg-glass); padding:16px; border-radius:var(--radius-sm);">
              <h4 style="color:var(--green-light); margin-bottom:12px; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em;">${I18n.get('contact_info')}</h4>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">Email:</strong> ${emailStr || 'N/A'}</p>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">${I18n.get('delhi_address')}:</strong> ${I18n.num(data.presentFaddr) || 'N/A'} ${I18n.num(data.presentLaddr) || ''}</p>
            </div>
          </div>
        </div>
    `;
  }

  function closeMembers() {
    document.getElementById('members-modal').classList.remove('members-modal--active');
    if (chart && currentView === 'map') chart.setSelection([]);
  }

  function render() {
    const section = document.getElementById('page-states');
    if (!section) return;

    section.innerHTML = `
      <div class="states-page">
        <div class="leaders-hero">
          <div class="leaders-hero__badge" data-i18n="states_title">${I18n.get('states_title')}</div>
          <h2 class="leaders-hero__title" data-i18n="states_title">${I18n.get('states_title')}</h2>
          <p class="leaders-hero__subtitle" data-i18n="states_desc">${I18n.get('states_desc')}</p>
        </div>

        <div class="states-controls">
          <div class="states-view-toggles">
            <button class="states-view-btn ${currentView === 'map' ? 'states-view-btn--active' : ''}" data-view="map" onclick="States.setView('map')">🗺️ ${I18n.get('map')}</button>
            <button class="states-view-btn ${currentView === 'cards' ? 'states-view-btn--active' : ''}" data-view="cards" onclick="States.setView('cards')">📇 ${I18n.get('cards')}</button>
          </div>
          <div class="states-house-toggles">
            <button class="states-house-btn ${activeHouse === 'lokSabha' ? 'states-house-btn--active' : ''}" data-house="lokSabha" onclick="States.setHouse('lokSabha')">${I18n.get('lok_sabha')}</button>
            <button class="states-house-btn ${activeHouse === 'rajyaSabha' ? 'states-house-btn--active' : ''}" data-house="rajyaSabha" onclick="States.setHouse('rajyaSabha')">${I18n.get('rajya_sabha')}</button>
          </div>
        </div>

        <div id="states-map-container" class="states-map-container" style="display: ${currentView === 'map' ? 'block' : 'none'}">
          <div id="geochart-regions" style="width: 100%; height: 500px;"></div>
        </div>
        <div id="states-cards-container" style="display: ${currentView === 'cards' ? 'block' : 'none'}"></div>
      </div>
    `;

    if (currentView === 'map') setTimeout(drawRegionsMap, 100);
    else renderCards();
  }

  window.addEventListener('langChanged', () => {
    if (document.getElementById('page-states')?.classList.contains('page--active')) {
      render();
    }
  });

  return { init, setHouse, setView, showMembers, showMemberDetails, closeMembers };
})();
