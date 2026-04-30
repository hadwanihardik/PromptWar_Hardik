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
    addBotMessage('👋 Hello! I\'m **VoteWise**, your AI election education assistant.\n\nI can help you with:\n• 📋 Voter registration\n• 📄 Required documents\n• 🗳️ Voting process & EVMs\n• ✋ Your rights as a voter\n• 📍 Finding polling stations\n• 🏛️ Parliament leaders\n\nAsk me anything about elections!');
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
    isProcessing = true;
    showTyping();

    conversationHistory.push({ role: 'user', text });

    try {
      const response = await Gemini.ask(text, conversationHistory);
      hideTyping();
      addBotMessage(response);
      conversationHistory.push({ role: 'assistant', text: response });

      // XP for asking questions
      const state = App.getState();
      state.totalXP = (state.totalXP || 0) + 5;
      state.questionsAsked = (state.questionsAsked || 0) + 1;
      App.saveState();
      App.updateUI();
    } catch (err) {
      hideTyping();
      addBotMessage('Sorry, I encountered an error. Please try again!');
    }

    isProcessing = false;
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
    // Basic markdown: bold, bullet points, links
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• /gm, '&bull; ')
      .replace(/\n/g, '<br>');
  }

  return { init, send, sendChip };
})();
