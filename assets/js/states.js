/**
 * States Page
 * Renders the state-wise distribution of Parliament seats using Google GeoChart and a card grid.
 * Displays individual member lists for the 18th Lok Sabha based on official Sansad data.
 */
const States = (() => {
  let isMapLoaded = false;
  let activeHouse = 'lokSabha'; // Default to Lok Sabha map view
  let currentView = 'map'; // 'map' or 'cards'
  let chart = null;

  function init() {
    renderBase();
    if (!isMapLoaded) {
      loadGoogleCharts();
    } else {
      drawRegionsMap();
    }
    renderCards();
    updateViewToggles();
  }

  function loadGoogleCharts() {
    if (window.google && window.google.visualization) {
      isMapLoaded = true;
      drawRegionsMap();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.onload = () => {
      google.charts.load('current', {
        'packages': ['geochart'],
      });
      google.charts.setOnLoadCallback(() => {
        isMapLoaded = true;
        drawRegionsMap();
      });
    };
    document.head.appendChild(script);
  }

  function setHouse(house) {
    activeHouse = house;
    document.querySelectorAll('.states-house-btn').forEach(btn => {
      btn.classList.toggle('states-house-btn--active', btn.dataset.house === house);
    });
    if (currentView === 'map') drawRegionsMap();
    renderCards(); // Re-render to update click behavior (members only for Lok Sabha right now)
  }

  function setView(view) {
    currentView = view;
    updateViewToggles();
    
    document.getElementById('states-map-container').style.display = view === 'map' ? 'block' : 'none';
    document.getElementById('states-cards-container').style.display = view === 'cards' ? 'block' : 'none';
    
    if (view === 'map' && isMapLoaded) {
      drawRegionsMap();
    }
  }

  function updateViewToggles() {
    document.querySelectorAll('.states-view-btn').forEach(btn => {
      btn.classList.toggle('states-view-btn--active', btn.dataset.view === currentView);
    });
  }

  function drawRegionsMap() {
    if (!isMapLoaded || currentView !== 'map') return;
    
    const container = document.getElementById('geochart-regions');
    if (!container) return;

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'State');
    data.addColumn('number', activeHouse === 'lokSabha' ? 'Lok Sabha Seats' : 'Rajya Sabha Seats');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

    STATES_DATA.forEach(state => {
      const seats = activeHouse === 'lokSabha' ? state.lokSabha : state.rajyaSabha;
      const tooltip = createTooltip(state.name, state.lokSabha, state.rajyaSabha);
      data.addRow([{ v: state.id, f: state.name }, seats, tooltip]);
    });

    const options = {
      region: 'IN',
      domain: 'IN',
      displayMode: 'regions',
      resolution: 'provinces',
      colorAxis: {
        colors: activeHouse === 'lokSabha' 
          ? ['#e0e7ff', '#818cf8', '#4f46e5', '#312e81']
          : ['#dcfce7', '#34d399', '#059669', '#064e3b']
      },
      backgroundColor: 'transparent',
      datalessRegionColor: 'rgba(255,255,255,0.05)',
      defaultColor: '#64748B',
      tooltip: { isHtml: true, trigger: 'focus' },
      keepAspectRatio: true,
      legend: 'none'
    };

    chart = new google.visualization.GeoChart(container);

    // Listen for select event to show members
    google.visualization.events.addListener(chart, 'select', () => {
      const selection = chart.getSelection();
      if (selection.length > 0) {
        const row = selection[0].row;
        const stateName = data.getFormattedValue(row, 0);
        showMembers(stateName);
      }
    });

    chart.draw(data, options);
  }

  function createTooltip(name, lsSeats, rsSeats) {
    return `
      <div style="padding:12px; background:#111638; border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#F1F5F9; font-family:'Inter', sans-serif;">
        <h4 style="margin:0 0 8px; font-family:'Outfit', sans-serif; font-size:1.1rem; color:#818CF8;">${name}</h4>
        <div style="display:flex; justify-content:space-between; gap:16px; margin-bottom:4px;">
          <span style="color:#94A3B8;">Lok Sabha:</span> <strong>${lsSeats}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; gap:16px; margin-bottom:8px;">
          <span style="color:#94A3B8;">Rajya Sabha:</span> <strong>${rsSeats}</strong>
        </div>
        <div style="font-size:0.75rem; color:#F59E0B; border-top:1px solid rgba(255,255,255,0.1); padding-top:6px; text-align:center;">Click to view members</div>
      </div>
    `;
  }

  function renderCards() {
    const container = document.getElementById('states-cards-container');
    if (!container) return;

    const sortedData = [...STATES_DATA].sort((a, b) => a.name.localeCompare(b.name));

    container.innerHTML = `
      <div class="state-cards-grid">
        ${sortedData.map(state => `
          <div class="state-card" onclick="States.showMembers('${state.name}')" style="cursor:pointer;" title="Click to view members">
            <div class="state-card__header">
              <h3 class="state-card__name">${state.name}</h3>
              <span class="state-card__type ${state.type === 'UT' ? 'state-card__type--ut' : ''}">${state.type}</span>
            </div>
            <div class="state-card__stats">
              <div class="state-stat state-stat--ls">
                <span class="state-stat__label">Lok Sabha</span>
                <span class="state-stat__value">${state.lokSabha}</span>
              </div>
              <div class="state-stat state-stat--rs">
                <span class="state-stat__label">Rajya Sabha</span>
                <span class="state-stat__value">${state.rajyaSabha}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function showMembers(stateName) {
    // Both LS and RS members are now available
    const stateMembers = typeof MEMBERS_DATA !== 'undefined' 
      ? MEMBERS_DATA.filter(m => m.house === activeHouse && (m.state === stateName || m.state.includes(stateName) || stateName.includes(m.state)))
      : [];

    const modal = document.getElementById('members-modal');
    const title = document.getElementById('members-modal-title');
    const content = document.getElementById('members-modal-content');

    const houseLabel = activeHouse === 'lokSabha' ? 'Lok Sabha' : 'Rajya Sabha';
    title.innerHTML = `${houseLabel} Members <span style="color:var(--text-muted); font-size:0.9rem; font-weight:400;">(${stateName})</span>`;
    
    if (stateMembers.length === 0) {
      content.innerHTML = `<div style="text-align:center; padding:40px; color:var(--text-secondary);">No member data currently available for ${stateName}.</div>`;
    } else {
      content.innerHTML = `
        <div class="members-grid">
          ${stateMembers.map(m => `
            <div class="member-card" 
              ${m.house === 'lokSabha' ? `
                onclick="States.showMemberDetails(${m.id}, '${m.house}')" 
                onmouseenter="States.prefetchDetails(${m.id})"
                style="cursor:pointer;" title="Click for details"` : ''}>
              <div class="member-card__photo" style="background-image: url('${m.photo ? 'https://wsrv.nl/?url=' + encodeURIComponent(m.photo) : 'https://wsrv.nl/?url=sansad.in/images/default_photo.jpg'}')"></div>
              <div class="member-card__info">
                <h4 class="member-card__name">${m.name}</h4>
                <div class="member-card__meta">📍 ${m.constituency}</div>
                <div class="member-card__party">${m.party}</div>
              </div>
              ${m.house === 'lokSabha' ? '<div class="member-card__chevron">›</div>' : ''}
            </div>
          `).join('')}
        </div>
      `;
    }

    modal.classList.add('members-modal--active');
  }

  function closeMembers() {
    document.getElementById('members-modal').classList.remove('members-modal--active');
    if (chart && currentView === 'map') chart.setSelection([]); // clear selection
  }

  const detailsCache = {}; // In-memory cache for the current session

  async function prefetchDetails(mpCode) {
    // If already cached or prefetching, skip
    if (detailsCache[mpCode] || localStorage.getItem(`vw-mp-${mpCode}`)) return;
    
    // Low priority fetch in background
    try {
      const response = await fetch(`https://sansad.in/api_ls/member/${mpCode}?locale=en`);
      if (response.ok) {
        const data = await response.json();
        detailsCache[mpCode] = data;
        localStorage.setItem(`vw-mp-${mpCode}`, JSON.stringify(data));
      }
    } catch (e) { /* ignore prefetch errors */ }
  }

  async function showMemberDetails(mpCode, house) {
    if (house !== 'lokSabha') return;
    
    // Find basic member info
    const m = MEMBERS_DATA.find(x => x.id == mpCode);
    if (!m) return;

    const modal = document.getElementById('members-modal');
    const title = document.getElementById('members-modal-title');
    const content = document.getElementById('members-modal-content');

    // 1. Check in-memory cache first
    if (detailsCache[mpCode]) {
      renderDetails(detailsCache[mpCode], m);
      return;
    }

    // 2. Check localStorage cache for persistence
    const savedData = localStorage.getItem(`vw-mp-${mpCode}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        detailsCache[mpCode] = parsed;
        renderDetails(parsed, m);
        return;
      } catch (e) { localStorage.removeItem(`vw-mp-${mpCode}`); }
    }

    // Show loading state
    title.innerHTML = `<button onclick="States.showMembers('${m.state}')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;margin-right:8px;">← Back</button> Member Details`;
    content.innerHTML = `<div style="text-align:center; padding:40px; color:var(--text-secondary);"><div class="spinner"></div><br>Loading details from sansad.in...</div>`;
    
    try {
      let data = null;
      try {
        const response = await fetch(`https://sansad.in/api_ls/member/${mpCode}?locale=en`);
        if (response.ok) data = await response.json();
        else throw new Error('CORS or Network issue');
      } catch (err) {
        // Fallback to CORS proxy
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://sansad.in/api_ls/member/'+mpCode+'?locale=en')}`;
        const proxyRes = await fetch(proxyUrl);
        const proxyData = await proxyRes.json();
        data = JSON.parse(proxyData.contents);
      }

      if (!data) throw new Error("No data returned");

      // Save to cache
      detailsCache[mpCode] = data;
      localStorage.setItem(`vw-mp-${mpCode}`, JSON.stringify(data));

      renderDetails(data, m);
    } catch (err) {
      content.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <p style="color:var(--red-light); margin-bottom:16px;">❌ Could not load details.</p>
          <button class="btn btn--secondary" onclick="States.showMemberDetails(${mpCode}, '${house}')">Retry</button>
        </div>
      `;
    }
  }

  function renderDetails(data, m) {
    const title = document.getElementById('members-modal-title');
    const content = document.getElementById('members-modal-content');

    title.innerHTML = `<button onclick="States.showMembers('${m.state}')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;margin-right:8px;">← Back</button> Member Details`;

    // Format emails removing anti-spam brackets
    let emailStr = (data.email || '').replace(/\[at\]/g, '@').replace(/\[dot\]/g, '.').replace(/<br>/g, ', ');

      content.innerHTML = `
        <div class="member-detail">
          <div class="member-detail__header" style="display:flex; gap:24px; align-items:center; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <div style="width:100px; height:100px; border-radius:50%; background-image:url('${data.photoUrl ? 'https://wsrv.nl/?url=' + encodeURIComponent(data.photoUrl) : m.photo ? 'https://wsrv.nl/?url=' + encodeURIComponent(m.photo) : 'https://wsrv.nl/?url=sansad.in/images/default_photo.jpg'}'); background-size:cover; background-position:top center; border:3px solid var(--accent-light);"></div>
            <div>
              <h2 style="font-family:'Outfit', sans-serif; font-size:1.5rem; margin-bottom:4px;">${data.fullName || m.name}</h2>
              <div style="color:var(--text-secondary); margin-bottom:8px;">📍 ${data.constituency || m.constituency} (${data.stateName || m.state})</div>
              <span class="member-card__party" style="font-size:0.8rem; padding:4px 10px;">${data.partyFname || m.party}</span>
            </div>
          </div>
          
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:24px;">
            <div class="member-detail__card" style="background:var(--bg-glass); padding:16px; border-radius:var(--radius-sm);">
              <h4 style="color:var(--accent-light); margin-bottom:12px; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em;">Personal Info</h4>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">DOB:</strong> ${data.dateOfBirth || 'N/A'}</p>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">Education:</strong> ${data.qualificationName || 'N/A'}</p>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">Profession:</strong> ${data.mainProfessionName || 'N/A'}</p>
            </div>
            
            <div class="member-detail__card" style="background:var(--bg-glass); padding:16px; border-radius:var(--radius-sm);">
              <h4 style="color:var(--green-light); margin-bottom:12px; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em;">Contact Info</h4>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">Email:</strong> ${emailStr || 'N/A'}</p>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">Delhi Address:</strong> ${data.presentFaddr || 'N/A'} ${data.presentLaddr || ''}</p>
              <p style="margin-bottom:8px; font-size:0.9rem;"><strong style="color:var(--text-muted);">Permanent:</strong> ${data.permanentFaddr || 'N/A'} ${data.permanentLaddr || ''}</p>
            </div>
          </div>

          ${data.social || data.interest ? `
          <div style="margin-top:24px; background:var(--bg-glass); padding:16px; border-radius:var(--radius-sm);">
            <h4 style="color:var(--amber-light); margin-bottom:12px; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em;">Interests & Social</h4>
            ${data.interest ? `<p style="margin-bottom:8px; font-size:0.9rem; line-height:1.5;">${data.interest}</p>` : ''}
            ${data.social ? `<p style="font-size:0.9rem; line-height:1.5;">${data.social}</p>` : ''}
          </div>
          ` : ''}
        </div>
      `;
    } catch (e) {
      console.error(e);
      content.innerHTML = `<div style="text-align:center; padding:40px; color:var(--red-light);">Failed to fetch detailed info from Sansad API.<br><br><button class="btn btn--secondary" onclick="States.showMembers('${m.state}')">Go Back</button></div>`;
    }
  }

  function renderBase() {
    const section = document.getElementById('page-states');
    if (!section) return;

    section.innerHTML = `
      <div class="states-page">
        <div class="leaders-hero">
          <div class="leaders-hero__badge">🗺️ State-wise Distribution</div>
          <h2 class="leaders-hero__title">Parliamentary <span>Constituencies</span></h2>
          <p class="leaders-hero__subtitle">Explore the seat distribution across India. Click on a state to view its MPs!</p>
        </div>

        <div class="states-controls">
          <div class="states-house-toggles">
            <button class="states-house-btn states-house-btn--active" data-house="lokSabha" onclick="States.setHouse('lokSabha')">Lok Sabha</button>
            <button class="states-house-btn" data-house="rajyaSabha" onclick="States.setHouse('rajyaSabha')">Rajya Sabha</button>
          </div>
          
          <div class="states-view-toggles">
            <button class="states-view-btn states-view-btn--active" data-view="map" onclick="States.setView('map')">🗺️ Map</button>
            <button class="states-view-btn" data-view="cards" onclick="States.setView('cards')">📋 Cards</button>
          </div>
        </div>

        <div id="states-map-container" class="states-map-wrapper">
          <div id="geochart-regions" style="width: 100%; height: 500px; max-width: 800px; margin: 0 auto;"></div>
        </div>

        <div id="states-cards-container" class="states-cards-wrapper" style="display:none;"></div>

        <!-- Members Modal -->
        <div class="members-modal" id="members-modal">
          <div class="members-modal__backdrop" onclick="States.closeMembers()"></div>
          <div class="members-modal__container">
            <div class="members-modal__header">
              <h3 id="members-modal-title">Members</h3>
              <button class="members-modal__close" onclick="States.closeMembers()">✕</button>
            </div>
            <div class="members-modal__content" id="members-modal-content"></div>
          </div>
        </div>

      </div>
    `;
  }

  window.addEventListener('resize', () => {
    if (document.getElementById('page-states')?.classList.contains('page--active') && currentView === 'map') {
      drawRegionsMap();
    }
  });

  return { init, setHouse, setView, showMembers, closeMembers, showMemberDetails, prefetchDetails };
})();
