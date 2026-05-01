/**
 * AI Chat Assistant
 * Provides contextual election education via the Gemini API
 * with typing animation and conversation history
 */
const Assistant = (() => {
  let conversationHistory = [];
  let isProcessing = false;

  function init() {
    conversationHistory = [];
    const messages = document.getElementById('chat-messages');
    messages.innerHTML = '';
    addBotMessage(I18n.get('assistant_welcome'));
  }

  function send() {
    if (isProcessing) return;
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    addUserMessage(text);
    processQuery(text);
  }

  function sendChip(el) {
    if (isProcessing) return;
    const text = el.textContent.trim();
    addUserMessage(text);
    processQuery(text);
  }

  async function processQuery(text) {
    const chatContainer = document.getElementById('chat-container');
    isProcessing = true;
    if (chatContainer) chatContainer.setAttribute('aria-busy', 'true');
    showTyping();

    conversationHistory.push({ role: 'user', text });

    try {
      const response = await Gemini.ask(text, conversationHistory);
      hideTyping();
      addBotMessage(response);
      conversationHistory.push({ role: 'assistant', text: response });

      // XP and Stats update - wrap in separate try to not break UI if App fails
      try {
        if (typeof App !== 'undefined') {
          const state = App.getState();
          if (state) {
            state.totalXP = (state.totalXP || 0) + 5;
            state.questionsAsked = (state.questionsAsked || 0) + 1;
            App.saveState();
            App.updateUI();
          }
          App.trackEvent('assistant_query', { query: text });
        }
      } catch (appErr) {
        console.warn('App stats update failed:', appErr);
      }
    } catch (err) {
      console.error('Assistant processQuery error:', err);
      hideTyping();
      addBotMessage(I18n.get('assistant_error'));
    }

    isProcessing = false;
    if (chatContainer) chatContainer.setAttribute('aria-busy', 'false');
  }

  function addUserMessage(text) {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg--user';
    div.innerHTML = `
      <div class="chat-msg__avatar">👤</div>
      <div class="chat-msg__bubble">${escapeHtml(text)}</div>
    `;
    messages.appendChild(div);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg--bot';
    div.innerHTML = `
      <div class="chat-msg__avatar">🤖</div>
      <div class="chat-msg__bubble">${formatMarkdown(text)}</div>
    `;
    messages.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg--bot';
    div.id = 'typing-indicator';
    div.innerHTML = `
      <div class="chat-msg__avatar">🤖</div>
      <div class="chat-msg__bubble"><div class="chat-msg__typing"><span></span><span></span><span></span></div></div>
    `;
    messages.appendChild(div);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function scrollToBottom() {
    const messages = document.getElementById('chat-messages');
    messages.scrollTop = messages.scrollHeight;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatMarkdown(text) {
    // Escape HTML first for security
    let safeText = escapeHtml(text);
    
    // Basic markdown: bold, bullet points, line breaks
    return safeText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^&bull; /gm, '• ') // Handle already escaped bull
      .replace(/^• /gm, '&bull; ')
      .replace(/\n/g, '<br>');
  }

  return { init, send, sendChip };
})();
