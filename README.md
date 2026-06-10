# Portfolio Website

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge)
![EmailJS](https://img.shields.io/badge/EmailJS-FF6B6B?style=for-the-badge)

A personal portfolio website built with React and Vite to showcase projects, certificates, skills, and contact information with smooth animations and dark/light theme support.

## Features

- Responsive portfolio landing page
- Animated sections using `framer-motion`
- Dark and light mode toggle
- Project gallery with hover overlays and links
- Certificates section with external verification links
- Skills summary and contact section
- Mobile-friendly navigation menu
- Email form using `mailto:` for quick outreach

## Tech Stack

- React 19
- Vite
- Framer Motion
- Lucide React icons
- EmailJS / mailto link support
- CSS for layout and theming

## Project Structure

```text
My-Portfolio-Website/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Usage

This portfolio website is designed to highlight:

- Personal branding and professional summary
- Technical skills and domain expertise
- Featured projects with clickable links
- Certificates and accomplishments
- Contact methods with easy email access

## Customization

To update content, edit `src/App.jsx`:

- Hero section text
- About section copy
- Project cards data
- Certificates list
- Skills list
- Contact email and social links

## Notes

- The contact form uses a `mailto:` link by default.
- Project cards and images use static paths under `public/projects`.
- The site is optimized for both desktop and mobile screens.

## License

This project is open source and available under the MIT License.
