/**
 * Sidebar Module
 * Handles mobile navigation sidebar
 */
const Sidebar = (() => {
  // Select elements lazily
  const getSidebar = () => document.getElementById('sidebar');
  const getOverlay = () => document.getElementById('sidebar-overlay');

  function toggle() {
    const sidebar = getSidebar();
    const isActive = sidebar.classList.contains('sidebar--active');
    if (isActive) close();
    else open();
  }

  function open() {
    const sidebar = getSidebar();
    const overlay = getOverlay();
    sidebar.classList.add('sidebar--active');
    overlay.classList.add('sidebar-overlay--active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function close() {
    const sidebar = getSidebar();
    const overlay = getOverlay();
    if (sidebar) sidebar.classList.remove('sidebar--active');
    if (overlay) overlay.classList.remove('sidebar-overlay--active');
    document.body.style.overflow = '';
  }

  function navigate(page) {
    App.navigate(page);
    close();
  }

  return { toggle, open, close, navigate };
})();
