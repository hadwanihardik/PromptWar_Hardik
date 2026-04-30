/**
 * Theme Module
 * Handles Light/Dark mode switching
 */
const Theme = (() => {
  let currentTheme = localStorage.getItem('vw-theme') || 'dark';

  function init() {
    applyTheme();
  }

  function toggle() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('vw-theme', currentTheme);
    applyTheme();
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle icon if it exists
    const icon = document.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    }
  }

  return { init, toggle, current: () => currentTheme };
})();
