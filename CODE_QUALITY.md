# VoteWise Code Quality Skill

This guide defines the standards and procedures for maintaining high code quality, security, and accessibility in the VoteWise project. Use this as a checklist during development and code reviews.

## 1. Quality Standards

### JavaScript (Vanilla ES6+)
- **Modular Pattern**: Use the IIFE module pattern (`const Module = (() => { ... })();`) to prevent global namespace pollution.
- **Naming Conventions**:
  - Functions/Variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - DOM Elements: Suffix with `El` (e.g., `submitBtnEl`) or use clear IDs.
- **State Management**: Keep state in `App.state` and use `App.saveState()` for persistence.

### HTML & CSS
- **Semantic HTML**: Always use `<main>`, `<section>`, `<nav>`, `<aside>`, etc.
- **BEM Naming**: Use Block-Element-Modifier syntax for CSS classes (e.g., `navbar__link--active`).
- **CSS Variables**: Use variables defined in `style.css` for colors, spacing, and transitions.

## 2. Accessibility (a11y) Checklist

- [ ] **Interactive Elements**: All buttons and links must have `aria-label` if they don't contain descriptive text.
- [ ] **Keyboard Navigation**: 
  - Ensure all `[data-action]` elements are reachable via Tab.
  - Interactive non-button elements must have `role="button"` and `tabindex="0"`.
  - Handle `Enter` and `Space` keys for these elements (already globally handled in `app.js`).
- [ ] **Color Contrast**: Ensure text contrast meets WCAG AA standards (checked via DevTools).
- [ ] **Alt Text**: All meaningful images (`<img>`) must have `alt` attributes. Decorative icons should have `aria-hidden="true"`.
- [ ] **Dynamic Content**: Use `aria-live="polite"` for chat messages and `aria-live="assertive"` for error/critical alerts.

## 3. Security Checklist

- [ ] **XSS Prevention**:
  - Never use `innerHTML` with unsanitized user or API input.
  - Use `textContent` or `innerText` for plain text.
  - If HTML is needed, use the `escapeHtml` + `formatMarkdown` pattern found in `assistant.js`.
- [ ] **Content Security Policy (CSP)**: 
  - Do not use inline scripts (`onclick="..."`).
  - All external domains must be whitelisted in the `index.html` meta tag.
- [ ] **Data Handling**: Never store sensitive API keys or user data in `localStorage`.

## 4. Localization (i18n) Rules

- [ ] **Data Attributes**: Use `data-i18n="key"` for text and `data-i18n-html="key"` for HTML content.
- [ ] **Numbers**: Wrap all numbers in `I18n.num(val)` to support different digit sets.
- [ ] **Dates**: Use `new Date().toLocaleDateString(I18n.currentLang())` and wrap in `I18n.num()`.
- [ ] **Dynamic Content**: Call `I18n.updateUI()` after updating `innerHTML`.

## 5. Verification Commands

Run these before submitting any changes:

```bash
# 1. Check for linting errors
npm run lint

# 2. Format code
npm run format

# 3. Run unit tests
npm run test
```

---
*Last updated: 2026-05-01*
