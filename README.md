# 🗳️ VoteWise — Election Process Education Assistant

> An AI-powered interactive web assistant that teaches citizens about the Indian election process through gamified quizzes, guided journeys, localized content, and an intelligent chatbot.

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
- 🏛️ **Parliament Leaders & States Map** — Explore members of parliament and state seat distributions
- 🤖 **AI Chat Assistant** — Gemini-powered contextual Q&A about elections
- 🌍 **Multi-language Support** — Full localization in English, Hindi, Gujarati, and Marathi
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

### 3. Parliament & States Exploration
- **Leaders Tab**: Meet the current leaders of Lok Sabha & Rajya Sabha — their roles, powers, and constitutional responsibilities.
- **States Map**: Interactive map (via Google Charts) showing how Parliament seats are distributed across India's States and UTs. Clicking a state reveals the list of its members.

### 4. Smart AI Assistant (Gemini-powered)
- Natural language Q&A about election topics
- Typing animation and conversation history
- Pre-filled suggestion chips for common questions
- **Offline fallback** — comprehensive local knowledge base works without API key

### 5. Multi-Language & Progress System
- **Real-time Localization**: Seamlessly switch between English, Hindi, Gujarati, and Marathi. Translates UI elements, member constituencies, party names, and even uses localized numerals (e.g., १, २, ૩, ૪).
- **Progress Dashboard**: Total XP, quizzes completed, accuracy tracking, best streak display, and 10 earnable badges.
- Persistent progress via `localStorage`.

---

## ⚙️ How to Use the Web App

1. **Launch the App**: Simply open `index.html` in any modern web browser (no server needed).
2. **Choose Your Language**: Use the language selector (`EN`, `HI`, `GU`, `MR`) in the top navigation bar to translate the entire app instantly.
3. **Toggle Theme**: Click the moon/sun icon in the top right to switch between Dark Mode and Light Mode.
4. **Navigate**: Use the navigation bar (or hamburger menu on mobile) to switch between:
   - **Home**: View your progress and select a module.
   - **Quiz**: Test your election knowledge and earn XP.
   - **Journey**: Follow the interactive voter registration guide.
   - **Leaders**: Learn about key figures in the Lok Sabha and Rajya Sabha.
   - **States Map**: Hover over states to see seat distributions, and click to view the local Members of Parliament.
   - **Assistant**: Chat with the Gemini-powered AI to ask specific election questions.
   - **Progress**: View your XP, accuracy, and unlocked badges.

---

## 🔗 Google Services Integration

| Service | Usage | Implementation |
|---|---|---|
| **Gemini API** | AI assistant responses + contextual quiz explanations | REST calls to `generativelanguage.googleapis.com` |
| **Google Charts** | Interactive geo-map of Indian states | `gstatic.com/charts/loader.js` |
| **Google Maps** | Find nearest polling stations with geolocation | Maps embed/deep link with user's coordinates |
| **Google Calendar** | Add election day reminders with voting checklist | Calendar event creation via deep link |

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **AI Engine:** Google Gemini API (with offline fallback)
- **Data Visualization:** Google Charts API (GeoChart)
- **Design:** Custom glassmorphism design system, CSS animations
- **Fonts:** Google Fonts (Outfit + Inter)
- **State/i18n:** `localStorage` for persistence and custom JSON dictionary for translations
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
        ├── i18n.js               # Localization engine (EN, HI, GU, MR)
        ├── theme.js              # Dark/Light mode manager
        ├── quiz.js               # Adaptive quiz engine
        ├── journey.js            # 5-step election journey simulator
        ├── leaders.js            # Parliament leaders module
        ├── states.js             # Interactive map and state members logic
        ├── assistant.js          # AI chat with typing animation
        ├── gemini.js             # Gemini API wrapper + offline knowledge base
        ├── maps.js               # Google Maps integration
        ├── calendar.js           # Google Calendar integration
        └── data/
            ├── questions.js      # Localized 65-question bank
            ├── leaders.js        # Localized Parliament leaders data
            ├── states.js         # Localized state-wise seat data
            └── members.js        # Data for 700+ MPs with localized constituencies
```

---

## 📈 Evaluation Focus Areas

As per the PromptWar Challenge guidelines, VoteWise addresses the evaluation criteria as follows:

- **Code Quality**: Structured into modular, self-contained ES6 modules (`quiz.js`, `journey.js`, `states.js`, `i18n.js`). Uses clean abstractions and standard conventions without bloated dependencies.
- **Security**: No sensitive user data is transmitted. Quiz progress is stored safely in local `localStorage`. API calls to Google Gemini use the REST API over HTTPS, and any user input sent to the DOM is safely inserted using `.textContent` to prevent XSS.
- **Efficiency**: Zero-build architecture. Extremely lightweight payload (< 300KB). Caching mechanisms for translations and Google Charts. UI updates happen instantly without page reloads.
- **Testing**: Manual testing ensures that quizzes adapt properly, questions do not repeat, localization cascades perfectly to deep nested elements (like the States map members), and offline fallback works flawlessly when Gemini is unavailable.
- **Accessibility**: Semantic HTML tags, high-contrast dark and light modes, scalable fonts, descriptive headings, and proper keyboard navigation structure make the app inclusive.
- **Google Services**: Meaningful integrations including Google Gemini for contextual explanations, Google Maps for polling station localization, Google Charts for interactive seat mapping, and Google Calendar for election day reminders.

---

## ⚡ Efficiency & Accessibility

- **Efficiency**: Zero build dependencies (no npm, no bundler). Lightweight repository. CSS animations use GPU-accelerated properties.
- **Accessibility**: Semantic HTML5 elements, high contrast text on dark backgrounds, simple jargon-free language, and fully responsive mobile-first design.

---

*Built for PromptWar Challenge — Civic Education Vertical*