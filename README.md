# 🏋️‍♂️ CountOnMe

> A modern, web-based fitness ecosystem designed to help athletes track workouts, calculate vital health metrics, and manage daily nutrition.

---

## 📌 Features

- **🏠 Central Dashboard**: Monitor your current weight, body mass index (BMI), and daily caloric goals at a glance.
- **🏋️ Workouts & Rest Timer**: Complete workout management (Routine A, B, C) featuring an animated rest timer with realistic visual flame feedback (*🔥 BORA!*).
- **🥗 Diet & Macro Tracker**: Keep track of daily meals, calorie intake, and macronutrient targets (Protein, Carbs, Fats).
- **📊 Athlete Calculators**: Built-in fitness tools:
  - **BMI / IMC Calculator**: Body Mass Index assessment.
  - **BMR / TMB Calculator**: Basal Metabolic Rate calculation.
  - **Bulk & Cut Calculators**: Custom calorie surplus and deficit planning.
- **🔐 User Flow**: Landing page introducing the app followed by user login/registration.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic markup for structured content.
- **CSS3**: Modern layouts (Flexbox & Grid), custom dark-mode styling, and high-performance `@keyframes` animations.
- **JavaScript (ES6+)**: DOM manipulation, dynamic timer logic, and `localStorage` data persistence.
- *(Upcoming)* **GSAP**: Planned integration for ultra-smooth UI transitions and interactive animations.

---

## 📂 Project Structure

```text
CountOnMe/
├── css/
│   ├── auth.css
│   ├── dashboard.css
│   ├── diario.css
│   ├── style.css
│   └── treino.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── diario.js
│   └── treino.js
├── dashboard.html
├── diario.html
├── index.html
├── login.html
├── treino.html
└── README.md
