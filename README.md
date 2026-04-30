# 🗳️ VoteWise — Election Process Education Assistant

> An AI-powered interactive web assistant that teaches citizens about the Indian election process through gamified quizzes, guided journeys, and an intelligent chatbot.

---

## 📌 Chosen Vertical

**Civic Education / Government** — Helping first-time voters and citizens understand the election process through interactive, AI-powered learning.

---

## 📌 Problem Statement

Many citizens, especially first-time voters, lack a clear understanding of the election process, timelines, and required steps. Traditional sources of information are often static, complex, or difficult to follow.

This leads to:
- Low voter awareness
- Confusion about registration and voting procedures
- Reduced civic participation

---

## 💡 Solution Overview

**VoteWise** is an AI-powered single-page web application that acts as a **personal civic tutor**. It transforms election education into an engaging, interactive experience through:

- 🎮 **Gamified Quizzes** — 65+ adaptive questions across 3 difficulty levels
- 🗺️ **Election Journey Simulator** — 5-step guided walkthrough from eligibility to voting day
- 🤖 **AI Chat Assistant** — Gemini-powered contextual Q&A about elections
- 📊 **Progress Dashboard** — XP points, streaks, and 10 earnable badges

---

## 🎯 Key Features

### 1. Interactive Quiz Mode
- 65+ questions covering basics, registration, voting process, rights, and law
- Adaptive difficulty (Easy → Medium → Hard) based on performance
- Streak tracking, XP scoring, and confetti celebrations
- **Repetition prevention** — questions don't repeat across sessions until pool is exhausted

### 2. Election Journey Simulator
- 5-step guided walkthrough:
  1. ✅ Check Eligibility
  2. 📋 Register as a Voter
  3. 🔍 Verify Registration
  4. 📍 Find Polling Station (Google Maps)
  5. 🗳️ Voting Day Guide
- Interactive buttons for Google Maps and Calendar integration

### 3. Smart AI Assistant (Gemini-powered)
- Natural language Q&A about election topics
- Typing animation and conversation history
- Pre-filled suggestion chips for common questions
- **Offline fallback** — comprehensive local knowledge base works without API key

### 4. Progress Dashboard
- Total XP, quizzes completed, accuracy tracking
- Best streak display
- 10 earnable badges (First Quiz, 80% Accuracy, Streak of 5, etc.)
- Persistent progress via localStorage

---

## 🔗 Google Services Integration

| Service | Usage | Implementation |
|---|---|---|
| **Gemini API** | AI assistant responses + contextual quiz explanations | REST calls to `generativelanguage.googleapis.com` |
| **Google Maps** | Find nearest polling stations with geolocation | Maps embed/deep link with user's coordinates |
| **Google Calendar** | Add election day reminders with voting checklist | Calendar event creation via deep link |

---

## 🧠 System Architecture

```
┌─────────────────────────────────────────┐
│              Input Layer                │
│  User queries • Quiz answers • Profile  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          Decision Layer (Core)          │
│  Intent classification • Quiz engine    │
│  Adaptive difficulty • Gemini API       │
│  Knowledge retrieval • State manager    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│             Output Layer                │
│  Quiz questions • Explanations          │
│  Step-by-step guidance • Chat responses │
│  Maps • Calendar events • Badges        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           Feedback Loop                 │
│  Track performance • Adjust difficulty  │
│  Award XP • Unlock badges              │
└─────────────────────────────────────────┘
```

---

## ⚙️ How It Works

1. User opens the app and sees the home screen with 3 modes
2. **Quiz Mode:** Adaptive questions → instant feedback with explanations → XP earned
3. **Journey Mode:** Step-by-step election walkthrough → Maps/Calendar integration
4. **Assistant Mode:** Type or tap a question → AI generates a contextual answer
5. System tracks progress, adapts difficulty, and awards badges
6. All progress persists across sessions via localStorage

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **AI Engine:** Google Gemini API (with offline fallback)
- **Design:** Custom glassmorphism design system, CSS animations
- **Fonts:** Google Fonts (Outfit + Inter)
- **State:** localStorage for persistence
- **No frameworks, no build tools** — pure web technologies

---

## 📁 Project Structure

```
PromptWar_Hardik/
├── index.html                    # Main SPA entry point
├── README.md                     # This file
├── .gitignore
└── assets/
    ├── css/
    │   └── style.css             # Design system (glassmorphism, animations)
    └── js/
        ├── app.js                # SPA router, state manager, badge system
        ├── quiz.js               # Adaptive quiz engine with repetition prevention
        ├── journey.js            # 5-step election journey simulator
        ├── assistant.js          # AI chat with typing animation
        ├── gemini.js             # Gemini API wrapper + offline knowledge base
        ├── maps.js               # Google Maps integration
        ├── calendar.js           # Google Calendar integration
        └── data/
            └── questions.js      # 65-question bank (easy/medium/hard)
```

---

## 🧪 Testing Strategy

- **Quiz Logic:** Verified adaptive difficulty scaling, score calculation, streak tracking
- **Repetition Prevention:** Questions tracked via localStorage; pool resets when exhausted
- **Offline Mode:** Full functionality without API keys via built-in knowledge base
- **Edge Cases:** Invalid inputs handled, empty states covered, error boundaries in API calls
- **Cross-browser:** Tested in Chrome, Safari, Firefox
- **Responsive:** Mobile-first design verified on multiple viewport sizes

---

## 🔐 Security Considerations

- Input validation and HTML escaping to prevent XSS
- No sensitive user data stored (only quiz progress in localStorage)
- API keys are client-side configurable (not hardcoded in repo)
- Secure external links with `target="_blank"` and `referrerpolicy`

---

## ⚡ Efficiency

- Zero build dependencies — no npm, no bundler
- Lightweight: entire repo < 250KB
- Minimal API calls — local fallback reduces Gemini API usage
- CSS animations use GPU-accelerated properties (transform, opacity)
- No external JS libraries loaded

---

## ♿ Accessibility

- Semantic HTML5 elements throughout
- Clear visual hierarchy with proper heading structure
- High contrast text on dark background
- Keyboard-navigable quiz options
- Simple, jargon-free language in all content
- Responsive design works on all screen sizes

---

## 📊 Assumptions

- Users have basic internet access and a modern browser
- Election data is based on Indian election processes (generalizable)
- Users are willing to engage interactively with quizzes
- Gemini API key is optional — app works fully offline

---

## 🚧 Limitations

- Not connected to real-time government databases
- AI responses depend on Gemini API availability (fallback provided)
- Quiz question bank is curated (not dynamically generated)
- Google Maps requires location permission for nearby stations

---

## 🚀 Future Improvements

- Regional language support (Hindi, Tamil, Bengali, etc.)
- Real-time election data from ECI APIs
- Voice-based interaction for accessibility
- Advanced analytics dashboard
- PWA support for offline mobile usage
- Multiplayer quiz mode

---

## 🏁 Conclusion

VoteWise transforms election education into an **interactive, engaging, and intelligent experience**, helping citizens move from confusion to confidence in the voting process. Built with clean, maintainable code and meaningful Google Services integration.

---

*Built for PromptWar Challenge — Civic Education Vertical*