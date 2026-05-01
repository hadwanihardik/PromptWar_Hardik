/**
 * Share Utility
 * Handles social sharing via Web Share API or fallbacks
 */
const Share = (() => {
  const APP_URL = window.location.href;
  const APP_TITLE = 'VoteWise — Election Process Education Assistant';
  const APP_DESC = 'Learn about voting, registration, and civic participation with AI!';

  async function shareApp() {
    const data = {
      title: APP_TITLE,
      text: APP_DESC,
      url: APP_URL
    };
    await performShare(data);
  }

  async function shareQuiz(score, streak) {
    const data = {
      title: 'My VoteWise Quiz Score',
      text: `I just scored ${score} on VoteWise Election Quiz with a ${streak} streak! 🗳️ Can you beat me?`,
      url: APP_URL
    };
    await performShare(data);
  }

  async function shareLeader(name, role) {
    const data = {
      title: `VoteWise: ${name}`,
      text: `Learning about ${name}, ${role} in Indian Parliament via VoteWise. 🏛️`,
      url: APP_URL
    };
    await performShare(data);
  }

  async function performShare(data) {
    if (navigator.share) {
      try {
        await navigator.share(data);
        if (typeof App !== 'undefined') App.trackEvent('share_success', { type: data.title });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Share failed:', err);
          fallbackShare(data);
        }
      }
    } else {
      fallbackShare(data);
    }
  }

  function fallbackShare(data) {
    const text = encodeURIComponent(`${data.text}\n\n${data.url}`);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank');
  }

  return { shareApp, shareQuiz, shareLeader };
})();
