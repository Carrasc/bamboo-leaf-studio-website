# Bamboo Leaf Studios

Portfolio website for Bamboo Leaf Studios — built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Next.js 15** — App Router with static generation
- **TypeScript** — strict mode
- **Tailwind CSS v4** — utility-first styling with CSS-first configuration
- **next-intl** — internationalization (English, Spanish, Japanese)
- **next-themes** — dark/light mode with system preference detection
- **Framer Motion** — scroll-triggered animations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── [locale]/        # Locale-based routing (/en, /es, /ja)
│   │   ├── layout.tsx   # Root layout with providers
│   │   ├── page.tsx     # Home page
│   │   └── not-found.tsx
│   ├── globals.css      # Tailwind imports, theme tokens, keyframes
│   └── layout.tsx       # Bare root layout
├── components/
│   ├── layout/          # Navbar, MobileNav, Footer
│   ├── sections/        # Hero, About, Services, Process, Portfolio, Contact
│   ├── ui/              # Carousel, ThemeToggle, LanguageSwitcher, AnimateOnScroll
│   └── providers/       # ThemeProvider
├── i18n/                # next-intl routing and request config
├── messages/            # Translation JSON files (en, es, ja)
└── lib/                 # Fonts, constants, portfolio data
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
