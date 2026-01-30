# Nyxfolio

A modern portfolio website with an AI chatbot assistant named Nyx.

**Live:** [v1.shubhampatra.dev](https://v1.shubhampatra.dev)

## Features

- Responsive portfolio with Hero, About, Experience, Skills, Projects, and Contact sections
- AI-powered chatbot (Nyx) for interactive Q&A
- Contact form powered by Formspree
- PWA support with offline capabilities

## Tech Stack

- **Frontend:** React 19, CSS3
- **AI Backend:** Express.js, Google Gemini AI
- **Contact:** Formspree
- **Hosting:** GitHub Pages

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm start
```

### AI Chatbot Backend (optional for local dev)

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env`:
```
GOOGLE_API_KEY=your_google_ai_key
PORT=5000
```

## Project Structure

```
├── frontend/          # React app
│   ├── src/
│   │   ├── components/  # React components
│   │   └── styles/      # CSS files
│   └── public/          # Static assets
└── backend/           # AI chatbot server
```

## Deployment

Frontend deploys automatically via GitHub Actions on push to main.

```bash
git push origin main
```

## License

MIT

## Contact

**Shubham Patra** - [shubhampatra635@gmail.com](mailto:shubhampatra635@gmail.com)
