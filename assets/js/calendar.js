/**
 * Google Calendar Integration
 * Creates election reminder events using Google Calendar
 */
const Calendar = (() => {

  function addReminder() {
    // Create a Google Calendar event URL
    // This uses the "Add to Google Calendar" deep link — no API key needed
    const title = encodeURIComponent('🗳️ Election Day - Remember to Vote!');
    const details = encodeURIComponent(
      'Election Day Checklist:\\n' +
      '✅ Carry your Voter ID (EPIC)\\n' +
      '✅ Carry one additional photo ID\\n' +
      '✅ Know your polling station location\\n' +
      '✅ Polling hours: 7:00 AM - 6:00 PM\\n' +
      '✅ Exercise your democratic right!\\n\\n' +
      'Powered by VoteWise - Election Education Assistant'
    );

    // Default to a reasonable upcoming election date placeholder
    // Users can adjust in their calendar
    const startDate = getNextElectionDate();
    const endDate = startDate; // Same day

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}&sf=true&output=xml`;

    window.open(calendarUrl, '_blank');

    // Show success feedback
    showToast('📅 Opening Google Calendar to add your election reminder!');

    // Award XP
    const state = App.getState();
    state.totalXP = (state.totalXP || 0) + 10;
    App.saveState();
    App.updateUI();
  }

  function getNextElectionDate() {
    // Generate a placeholder date (next year, in April-May which is typical for Indian general elections)
    const now = new Date();
    let year = now.getFullYear();
    // If we're past May, set it to next year
    if (now.getMonth() > 4) year++;
    // Format: YYYYMMDDTHHMMSSZ
    return `${year}0415T070000Z/${year}0415T180000Z`;
  }

  function showToast(message) {
    // Create a temporary toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
      padding: 14px 28px; border-radius: 12px; background: rgba(16,185,129,0.9);
      backdrop-filter: blur(12px); color: #fff; font-weight: 500; font-size: 0.9rem;
      z-index: 10000; animation: fadeIn 0.3s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  return { addReminder };
})();
