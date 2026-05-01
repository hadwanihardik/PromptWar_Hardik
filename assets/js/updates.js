/**
 * Election Updates Module
 * Displays mock ECI press releases and current issues
 */
const Updates = (() => {
  const MOCK_UPDATES = [
    {
      id: 1,
      title: "ECI announces dates for upcoming assembly elections",
      date: "2024-05-01",
      category: "Press Release",
      desc: "The Election Commission of India has formally announced the schedule for the upcoming assembly elections in multiple states. The Model Code of Conduct comes into effect immediately."
    },
    {
      id: 2,
      title: "New guidelines for postal ballots issued",
      date: "2024-04-28",
      category: "Current Issue",
      desc: "To facilitate absentee voters, including senior citizens (85+) and PwDs, the ECI has issued revised operational guidelines for postal voting."
    },
    {
      id: 3,
      title: "Launch of nationwide voter awareness campaign",
      date: "2024-04-25",
      category: "Press Release",
      desc: "Under the SVEEP initiative, a new voter education and awareness campaign has been launched focusing on youth and first-time voters."
    },
    {
      id: 4,
      title: "Review of election preparedness in border states",
      date: "2024-04-20",
      category: "Current Issue",
      desc: "The Chief Election Commissioner held a high-level meeting to review security and logistical preparedness in border constituencies."
    }
  ];

  let currentFilter = 'All';

  function init() {
    render();
    bindEvents();
    
    // Refresh if language changes (for date localization)
    window.addEventListener('langChanged', () => {
      const container = document.getElementById('page-updates');
      if (container && container.classList.contains('page--active')) {
        render();
      }
    });
  }

  function render() {
    const container = document.getElementById('page-updates');
    if (!container) return;

    const filtered = currentFilter === 'All' 
      ? MOCK_UPDATES 
      : MOCK_UPDATES.filter(u => u.category === currentFilter);

    container.innerHTML = `
      <div class="container">
        <h2 style="font-size: 1.5rem; margin-bottom: 16px;" data-i18n="updates_title">Election Updates</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;" data-i18n="updates_subtitle">Official press releases and current issues from the Election Commission.</p>

        <div style="display: flex; gap: 8px; margin-bottom: 24px;">
          <button class="btn ${currentFilter === 'All' ? 'btn--accent' : 'btn--secondary'}" data-action="filter-updates" data-val="All" data-i18n="updates_filter_all">All</button>
          <button class="btn ${currentFilter === 'Press Release' ? 'btn--accent' : 'btn--secondary'}" data-action="filter-updates" data-val="Press Release" data-i18n="updates_filter_press">Press Releases</button>
          <button class="btn ${currentFilter === 'Current Issue' ? 'btn--accent' : 'btn--secondary'}" data-action="filter-updates" data-val="Current Issue" data-i18n="updates_filter_issues">Current Issues</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${filtered.map(u => `
            <div class="dash-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <span style="font-size: 0.8rem; font-weight: 600; color: ${u.category === 'Press Release' ? 'var(--green)' : 'var(--amber)'};" data-i18n="update_cat_${u.id}">${u.category}</span>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">${I18n.num(new Date(u.date).toLocaleDateString(I18n.currentLang()))}</span>
              </div>
              <h3 style="margin-bottom: 8px; font-size: 1.1rem;" data-i18n="update_title_${u.id}">${u.title}</h3>
              <p style="color: var(--text-muted); font-size: 0.95rem;" data-i18n="update_desc_${u.id}">${u.desc}</p>
            </div>
          `).join('')}
          
          ${filtered.length === 0 ? '<p style="text-align: center; color: var(--text-secondary);" data-i18n="updates_empty">No updates found for this category.</p>' : ''}
        </div>
      </div>
    `;
    if (typeof I18n !== 'undefined') I18n.updateUI();
  }

  function bindEvents() {
    const container = document.getElementById('page-updates');
    if (!container) return;
    
    // We bind globally or locally. For simplicity, we can use the global app.js event delegation if we prefer,
    // but the filter buttons need specific handling here.
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="filter-updates"]');
      if (btn) {
        currentFilter = btn.dataset.val;
        render(); // Re-render local content
      }
    });
  }

  return { init };
})();
