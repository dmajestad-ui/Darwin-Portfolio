# Darwin Portfolio

A premium dark-first portfolio website for Darwin, focused on IT Support, business systems, and automation.

## Project structure

- `index.html` – main page structure and content
- `css/style.css` – all styling, responsive layout, animations, and dark/light mode
- `js/script.js` – interactivity, theme persistence, menu behavior, modal handling, and scroll reveal
- `assets/profile.png` – profile image placeholder
- `assets/projects/` – project media folder
- `docs/resume.pdf` – downloadable resume placeholder

## How to run locally

### Option 1: VS Code Live Server
1. Open this folder in VS Code.
2. Install the Live Server extension if needed.
3. Right-click `index.html` and choose **Open with Live Server**.

### Option 2: Python local server
From the project folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes
- This portfolio is built with plain HTML, CSS, and JavaScript.
- The theme is saved in localStorage.
- The contact form is frontend-only and does not send real submissions.
- Placeholder links for email, phone, LinkedIn, and GitHub are included.
