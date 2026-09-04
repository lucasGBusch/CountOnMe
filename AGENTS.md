# AGENTS.md

> Development and security instructions for AI agents working on CountOnMe.

---

# CountOnMe

CountOnMe is a fitness tracking web application focused on:

- workout tracking;
- nutrition and macronutrient tracking;
- weight progression;
- BMI / IMC calculations;
- BMR / TMB calculations;
- bulk and cut planning;
- personal fitness dashboard.

The project is currently an MVP and must evolve incrementally without unnecessary rewrites.

---

# Current Architecture

The current application uses:

- HTML5;
- CSS3;
- Vanilla JavaScript (ES6+);
- localStorage for persistent browser data;
- sessionStorage for temporary MVP session behavior;
- Vercel for hosting and deployment.

Current structure follows page-oriented organization:

```text
CountOnMe/
├── css/
├── js/
├── dashboard.html
├── diario.html
├── index.html
├── login.html
├── treino.html
└── README.md
```

JavaScript is separated by page or responsibility.

Examples:

```text
js/auth.js
js/dashboard.js
js/diario.js
js/landing.js
js/treino.js
```

Preserve this architecture unless a change has a clear technical reason.

---

# Future Architecture

Supabase is planned for backend functionality.

Likely responsibilities include:

- authentication;
- PostgreSQL database;
- user-specific data;
- workout persistence;
- nutrition persistence;
- weight history.

Do NOT introduce Supabase architecture before the feature being implemented requires it.

Do NOT assume the use of Edge Functions, Vercel Functions or another backend execution model unless explicitly required.

Architecture decisions must be based on the actual feature requirements.

---

# Development Priorities

Every change must prioritize:

1. Security
2. Correctness
3. Preservation of existing behavior
4. Maintainability
5. Readability
6. Accessibility
7. Performance
8. Visual consistency

Never trade security or correctness for convenience.

---

# General Development Rules

Before modifying code:

1. Inspect the relevant existing files.
2. Understand the current implementation.
3. Identify HTML, CSS and JavaScript dependencies.
4. Identify selectors referenced by JavaScript.
5. Understand how current data is stored.
6. Make the smallest reasonable change.
7. Verify that existing functionality remains intact.

Do not rewrite a working file simply because a different implementation would be cleaner.

Prefer incremental improvements.

---

# Preserve Existing Code Style

New code should follow the style already used in the surrounding file.

Do not perform unrelated formatting or naming changes.

Do not rename existing:

- IDs;
- CSS classes;
- localStorage keys;
- sessionStorage keys;
- functions;
- DOM selectors;

unless the change requires it.

If one of these must change, update all dependencies.

---

# Scope Control

Do not make unrelated changes.

When fixing a bug:

- fix the bug;
- fix directly related issues if necessary;
- do not redesign unrelated components.

When implementing a feature:

- modify only the required files;
- reuse existing behavior where possible.

Large refactors must have a clear technical benefit.

---

# JavaScript Standards

Use modern JavaScript supported by current browsers.

Prefer:

```js
const
let
addEventListener()
textContent
classList
querySelector()
getElementById()
```

Avoid unnecessary dependencies.

---

# Variables

Use `const` by default.

Use `let` only when the value must change.

Avoid `var`.

Names must describe purpose.

Prefer:

```js
const dailyCalories;
const weightHistory;
const mealEntries;
```

Avoid unclear names such as:

```js
const x;
const temp;
const data2;
```

except for very small local scopes where the meaning is obvious.

---

# Functions

Functions should have one clear responsibility.

Split a function when doing so improves:

- readability;
- reuse;
- testing;
- error handling.

Do not split functions solely to satisfy arbitrary size limits.

Avoid deeply nested control flow.

Prefer early returns where they improve readability.

---

# DOM Manipulation

Cache frequently reused DOM references.

Avoid repeatedly querying the same element unnecessarily.

Example:

```js
const caloriesElement = document.getElementById('calories');
```

Reuse it instead of querying the DOM repeatedly.

---

# Event Handling

Use:

```js
addEventListener()
```

Avoid inline JavaScript such as:

```html
<button onclick="...">
```

unless existing code requires it and refactoring is outside the current task.

---

# User-Generated Content

Treat all user-controlled values as untrusted.

Prefer:

```js
element.textContent = value;
```

instead of:

```js
element.innerHTML = value;
```

Do not place unsanitized user-controlled data inside `innerHTML`, `insertAdjacentHTML` or equivalent HTML injection APIs.

Static developer-controlled templates may use HTML rendering when appropriate.

---

# Browser Storage

CountOnMe currently uses browser storage.

Treat both:

```text
localStorage
sessionStorage
```

as untrusted client-controlled data.

A user can inspect and modify these values manually.

Never use browser storage as proof of:

- identity;
- authorization;
- permissions;
- subscription status;
- administrative access.

---

# localStorage Safety

When reading structured data from localStorage:

- handle missing values;
- handle invalid JSON;
- validate the expected structure;
- use safe fallback values;
- prevent corrupted data from crashing the application.

Prefer defensive parsing.

Example pattern:

```js
function readStoredJson(key, fallback) {
    try {
        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);
    } catch (error) {
        console.error(`Failed to parse storage key: ${key}`, error);
        return fallback;
    }
}
```

Do not automatically refactor all existing storage calls merely to use this helper.

Apply improvements incrementally when touching related code.

---

# Current Authentication Warning

The current login/register behavior is an MVP placeholder.

The existing pattern based on browser storage must NOT be considered secure authentication.

Do not build authorization or sensitive functionality on top of a value such as:

```text
countonme_auth=true
```

Client-side storage can be modified by the user.

When real authentication is implemented, migrate authentication to Supabase Auth or another explicitly approved authentication provider.

Do not create custom password storage.

Never store passwords in:

- localStorage;
- sessionStorage;
- cookies created manually by frontend code;
- application database tables.

---

# Input Validation

All user input must be validated.

Validate according to the domain of the field.

Consider:

- expected type;
- required/optional status;
- minimum;
- maximum;
- allowed format;
- maximum string length;
- finite numbers.

Reject:

```js
NaN
Infinity
-Infinity
```

when numeric values are expected.

Do not rely exclusively on HTML attributes such as:

```html
min
max
required
pattern
```

JavaScript validation must protect application logic.

Backend validation will also be required when Supabase is introduced.

---

# Fitness Data Validation

Fitness-related input must use reasonable application boundaries.

Examples include:

- weight;
- height;
- calories;
- macronutrients;
- exercise sets;
- exercise repetitions;
- timer values.

Do not silently accept obviously invalid or malformed values.

Avoid presenting calculated health or nutrition values as medical diagnoses.

---

# Calculations

Calculations such as:

- BMI / IMC;
- BMR / TMB;
- calorie targets;
- macro targets;
- bulk/cut adjustments;

should have calculation logic separated from DOM rendering whenever practical.

Avoid duplicating formulas between pages.

If a formula changes, verify all places that depend on it.

---

# HTML Standards

Use semantic HTML where appropriate.

Prefer:

```html
<header>
<nav>
<main>
<section>
<form>
<label>
<button>
```

instead of unnecessary generic containers.

Do not replace existing markup solely for semantic cleanup unless the current task involves that area.

---

# Forms

Every form input should have an accessible label.

Buttons inside forms should explicitly specify their type when ambiguity exists:

```html
<button type="button">
<button type="submit">
```

Icon-only interactive controls require an accessible name.

---

# Accessibility

New functionality should support:

- keyboard interaction;
- visible focus states;
- semantic controls;
- meaningful labels;
- sufficient contrast.

Do not remove accessibility behavior when redesigning UI.

Prefer native HTML controls over manually recreating them with generic elements.

---

# CSS Standards

Maintain the existing CountOnMe visual identity.

New styles should match surrounding code.

Prefer:

- Flexbox;
- CSS Grid;
- reusable classes;
- existing CSS variables where available;
- responsive layouts.

Avoid:

- unnecessary `!important`;
- excessive absolute positioning;
- duplicated blocks;
- arbitrary design changes.

Do not introduce a new design system unless explicitly requested.

---

# Responsive Design

Changes to main interfaces must be checked conceptually for:

- desktop;
- tablet;
- mobile.

Avoid fixed widths that unnecessarily break smaller screens.

Interactive elements must remain usable on touch devices.

---

# Animations

Animations must serve a visual or interaction purpose.

Avoid excessive animation.

Prefer transform and opacity when possible for smooth UI animation.

Do not make important functionality depend exclusively on animation.

Respect reduced-motion preferences when adding significant motion.

---

# Error Handling

Do not intentionally hide unexpected errors.

Use clear error handling around operations that can fail.

User-facing errors should explain the problem without exposing internal implementation details.

Developer-facing logs should provide enough information to debug the issue without leaking secrets or sensitive data.

---

# Security

Security has the highest priority in CountOnMe.

Assume all client-side code and data can be inspected and modified.

Never implement security based only on frontend checks.

---

# Secrets

NEVER commit:

- passwords;
- database credentials;
- Supabase secret keys;
- access tokens;
- API secrets;
- private signing keys;
- service credentials;
- production environment secrets.

Never place secrets in:

```text
HTML
CSS
client-side JavaScript
localStorage
sessionStorage
Git history
README examples
```

Use environment variables or the appropriate secret management system.

---

# Supabase Key Rules

When Supabase is introduced:

Browser/client code may use only the project's Supabase publishable key:

```text
sb_publishable_...
```

Supabase secret keys:

```text
sb_secret_...
```

must NEVER be included in browser code or committed to the repository.

Secret keys bypass Row Level Security and must only exist in trusted server-side environments.

Legacy `anon` and `service_role` keys should not be chosen for new implementation when the current publishable/secret key system is available.

---

# Supabase Authentication

Use Supabase Auth when authentication is introduced unless another provider is explicitly selected.

Never implement custom password hashing or password authentication inside CountOnMe.

Authentication answers:

> Who is this user?

Authorization must separately answer:

> Is this user allowed to access this resource?

Never assume that an authenticated user can access every database row.

---

# Supabase Row Level Security

Any table exposed through Supabase APIs containing user-specific data must use Row Level Security.

RLS must be treated as a core security boundary.

A user should only be able to access data that belongs to them unless the product explicitly requires otherwise.

Never rely only on frontend filtering such as:

```js
.eq('user_id', user.id)
```

to protect private rows.

The database policy must enforce ownership.

---

# Supabase Policies

Policies should explicitly consider each operation:

- SELECT
- INSERT
- UPDATE
- DELETE

Do not create broad policies such as unrestricted authenticated access unless explicitly required.

For user-owned data, ownership should normally be derived from the authenticated Supabase user identity.

Never trust a client-provided `user_id` as authorization proof.

---

# Database Security

When the database is introduced:

- use migrations for schema changes;
- keep schema changes reproducible;
- enable RLS where appropriate;
- define constraints in the database;
- validate inputs server-side;
- avoid storing unnecessary personal data.

Database constraints should enforce important invariants where practical.

---

# Data Privacy

Collect only information needed by CountOnMe.

Fitness and account information should be considered private user data.

Do not expose another user's:

- weight;
- meals;
- workouts;
- profile information;
- progress;
- account information.

Do not place sensitive user data in URLs unless specifically required and reviewed.

---

# Logging

Never log:

- passwords;
- authentication tokens;
- Supabase secret keys;
- private credentials.

Avoid logging complete sensitive user objects.

Logs should contain only information necessary for debugging.

---

# Dependency Policy

Do not add libraries simply to avoid writing a small amount of straightforward code.

Before adding a dependency, consider:

1. Is it actually needed?
2. Can the existing stack solve the problem cleanly?
3. Is the project actively maintained?
4. Does it significantly increase bundle size?
5. Does it introduce security risk?
6. Does it overlap with something already present?

Dependencies require a clear reason.

---

# Framework Policy

CountOnMe currently uses vanilla HTML, CSS and JavaScript.

Do NOT migrate the project to:

- React;
- Next.js;
- Vue;
- Svelte;
- another framework;

unless explicitly requested.

Do not create framework configuration files preemptively.

---

# Performance

Avoid obvious performance problems such as:

- unnecessary DOM updates;
- repeated expensive calculations;
- unnecessary event listeners;
- loading large unused assets;
- blocking operations.

Optimize based on actual need rather than premature micro-optimization.

---

# Maintainability

When touching existing code, improve clarity where doing so is safe and directly related to the task.

Prefer:

- descriptive names;
- reusable helpers;
- consistent organization;
- clear responsibilities.

Avoid creating abstractions that are used only once unless they significantly improve clarity or safety.

---

# Large Files

Some existing JavaScript files contain substantial page logic.

Do not perform large modularization solely because a file is long.

When adding significant new functionality to an already large file, consider whether extracting a focused module would improve maintainability.

Any modularization must preserve current application behavior.

---

# Comments

Comments should explain:

- why something exists;
- unusual behavior;
- business rules;
- security-sensitive decisions;
- non-obvious calculations.

Avoid comments that merely repeat the code.

---

# Git Workflow

Protect the production branch.

Preferred workflow:

```text
feature/friendly-name
        ↓
develop
        ↓
main
```

Do not assume a branch exists without checking the repository.

Never commit directly to production when the requested workflow uses a development branch.

---

# Commit Messages

Prefer conventional, descriptive prefixes:

```text
feat:
fix:
refactor:
style:
docs:
security:
test:
chore:
```

Examples:

```text
feat: add workout history
fix: prevent invalid weight entries
security: validate stored dashboard data
refactor: extract calorie calculation helper
docs: document Supabase security model
```

Commits should describe the actual change.

---

# Deployment

CountOnMe is deployed through Vercel.

Do not introduce deployment configuration unless necessary.

Never expose secrets through frontend deployment configuration.

Production environment variables must be managed through the deployment platform or backend provider.

A deployment succeeding does not prove that the application is functionally correct.

---

# Testing Before Completion

Before considering a change complete, verify the relevant behavior.

At minimum check:

## Functionality

- feature works;
- existing related functionality still works;
- navigation remains valid;
- there are no obvious console errors.

## Security

- no secrets added;
- inputs are validated;
- user-controlled HTML is not injected unsafely;
- browser storage is not treated as trusted authorization;
- sensitive data is not exposed.

## UI

- layout remains consistent;
- responsive behavior is preserved;
- interactive controls remain usable;
- visual identity is maintained.

## Code Quality

- names are clear;
- unnecessary duplication was avoided;
- unrelated code was not changed;
- new complexity has a reason.

---

# Security Review Trigger

A security review is required when a change involves:

- authentication;
- authorization;
- Supabase;
- database access;
- API endpoints;
- user-generated content;
- file uploads;
- environment variables;
- secrets;
- external APIs;
- cookies;
- sessions;
- personal user data.

For these changes, explicitly evaluate:

1. What data is trusted?
2. What data is controlled by the user?
3. Where is authorization enforced?
4. Can another user access this resource?
5. Is any secret exposed to the browser?
6. Can the input produce script or query injection?
7. What happens when validation fails?

---

# AI Agent Rules

AI agents must not make architectural decisions silently.

For significant changes:

1. inspect existing implementation;
2. identify affected files;
3. preserve current conventions;
4. implement the smallest appropriate solution;
5. review the resulting code;
6. report important trade-offs or risks.

Do not fabricate existing APIs, files, environment variables or database tables.

Check the repository before assuming they exist.

Do not claim a change has been tested unless it was actually tested.

Do not claim a security issue is fixed without checking the relevant trust boundary.

---

# Definition of Done

A task is complete when:

- requested behavior works;
- existing related behavior remains intact;
- security implications were considered;
- code follows existing project conventions;
- no secrets were exposed;
- unnecessary dependencies were not introduced;
- relevant errors are handled;
- the implementation is understandable to another developer.

The goal is not merely to make CountOnMe work.

The goal is to evolve it into a secure, maintainable and reliable application without losing the simplicity of the current project.
