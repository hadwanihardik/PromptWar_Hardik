/**
 * Google Maps Integration
 * Shows nearby polling stations using Google Maps Embed API
 */
const Maps = (() => {
  // Set your Google Maps API key here
  const API_KEY = '';

  function showInJourney() {
    const container = document.getElementById('journey-map-container');
    if (!container) return;

    if (navigator.geolocation) {
      container.innerHTML = '<p style="color:var(--text-muted); padding:16px;">📍 Detecting your location...</p>';

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          renderMap(container, latitude, longitude);
        },
        () => {
          // Fallback: show default location (New Delhi - India Gate area)
          renderMap(container, 28.6139, 77.2090);
        }
      );
    } else {
      renderMap(container, 28.6139, 77.2090);
    }
  }

  function renderMap(container, lat, lng) {
    const query = encodeURIComponent('polling station near me');

    if (API_KEY) {
      container.innerHTML = `
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed/v1/search?key=${API_KEY}&q=${query}&center=${lat},${lng}&zoom=14"
            allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      `;
    } else {
      // Fallback: regular Google Maps link
      const mapsUrl = `https://www.google.com/maps/search/polling+station/@${lat},${lng},14z`;
      container.innerHTML = `
        <div class="map-container" style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:var(--bg-glass);">
          <p style="font-size:2rem; margin-bottom:12px;">📍</p>
          <p style="color:var(--text-secondary); margin-bottom:16px; text-align:center; padding: 0 20px;">
            Click below to find polling stations near your location on Google Maps
          </p>
          <a href="${mapsUrl}" target="_blank" class="btn btn--primary" style="text-decoration:none;">
            Open Google Maps 🗺️
          </a>
        </div>
      `;
    }
  }

  return { showInJourney };
})();
