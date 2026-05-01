/**
 * Video Learning Module
 * Provides a playlist-style UI for ECI educational videos
 */
const Videos = (() => {
  const VIDEOS_DATA = [
    {
      id: 'XGJQNKFYqYI', // Valid ECI video ID
      title: "Understanding the Indian Election Process",
      duration: "3:45",
      desc: "An official guide explaining the step-by-step process of casting your vote."
    },
    {
      id: 'mock1', // Mock ID for demonstration
      title: "EVM & VVPAT: How it works",
      duration: "5:20",
      desc: "Learn about the technology behind Electronic Voting Machines and Voter Verifiable Paper Audit Trails."
    },
    {
      id: 'mock2',
      title: "Rights and Responsibilities of a Voter",
      duration: "4:15",
      desc: "A short documentary on why every vote counts in a democracy."
    }
  ];

  let currentVideoId = VIDEOS_DATA[0].id;

  function init() {
    render();
    bindEvents();
  }

  function render() {
    const container = document.getElementById('page-videos');
    if (!container) return;

    const currentVideo = VIDEOS_DATA.find(v => v.id === currentVideoId);

    container.innerHTML = `
      <div class="container" style="max-width: 1000px;">
        <h2 style="font-size: 1.5rem; margin-bottom: 24px;" data-i18n="videos_title">Video Learning Center</h2>

        <div style="max-width: 800px; margin: 0 auto;" class="video-layout">
          <!-- Main Player -->
          <div class="dash-card" style="padding: 16px;">
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin-bottom: 16px; background: #000;">
              ${currentVideoId.startsWith('mock') 
                ? `<div style="position: absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:white;" data-i18n="video_unavailable">Video Unavailable (Mock Data)</div>`
                : `<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/${currentVideoId}" title="${currentVideo.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
              }
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;" data-i18n="video_title_${currentVideoId}">${currentVideo.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;" data-i18n="video_desc_${currentVideoId}">${currentVideo.desc}</p>
          </div>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    const container = document.getElementById('page-videos');
    if (!container) return;
    
    container.addEventListener('click', (e) => {
      const item = e.target.closest('[data-action="play-video"]');
      if (item) {
        currentVideoId = item.dataset.val;
        render(); // Re-render with new video
      }
    });
  }

  return { init };
})();
