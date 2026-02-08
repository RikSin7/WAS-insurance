# WAS Travel Insurance

A modern travel insurance quote application built with HTML5, CSS3 (Tailwind), and vanilla JavaScript.

## Features

- **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- **Quote Form** - Multi-destination selector with chip UI
- **Plan Selection** - Compare Voyager vs Voyager Plus plans
- **Mega Menu Navigation** - Desktop dropdowns with mobile accordion
- **Accessibility** - ARIA labels, skip links, semantic HTML
- **SEO Optimized** - Meta descriptions, Open Graph tags, preloads

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| Tailwind CSS | Styling |
| Vanilla JavaScript | Interactivity |
| Google Fonts | Saira, Lato |

## Project Structure

```
WASinsurance/
├── index.html              # Home page with quote form
├── quote.html              # Plan selection page
├── css/        
│   └── output.css          # Compiled CSS (gitignored)
├── js/
│   ├── navbar.js           # Navigation & mobile menu
│   └── form.js             # Form interactions
├── partials/
│   ├── hero-navbar.html    # Header component
│   ├── form.html           # Quote form component
│   └── steps/
│       └── step-1-plan.html
└── assets/
    ├── favicon/
    └── images/
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

# Clone the repository
git clone https://github.com/RikSin7/WAS-insurance.git
cd WAS-insurance

# Install dependencies
npm install

# Build CSS and start watching for changes
npm run dev

# In another terminal, start local server
npx serve


The app will be available at `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Tailwind in watch mode |
| `npm run build` | Build production CSS |
| `npx serve` | Start local development server |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
