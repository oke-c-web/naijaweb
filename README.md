# NaijaWeb – Explore • Learn • Connect

A free, static community app for Nigerian states. Plain HTML, CSS and JavaScript: no build step, no paid service.

## Structure
```
naijaweb/
├── index.html          Page shell, loads CSS and scripts
├── serve.py            Optional local test server (python serve.py)
├── README.md
├── css/
│   └── style.css       Dark green + white theme, mint #12E3A4, rounded cards
├── js/
│   ├── data.js         37 states, zones, slogans, About cards, timeline, quiz bank, sample peers
│   ├── store.js        Saved data (localStorage, try/catch) + on-screen state
│   ├── ui.js           Shared helpers: flag logo, images with emoji fallback, nav bar, state grid, leaderboard
│   ├── views.js        User screens: login, welcome, select state, community, chat info, chat list, chat + game, profile
│   ├── admin.js        Admin dashboard (demo numbers)
│   └── app.js          Actions: login, matching, 30-question quiz builder, chat, profile, start-up
└── assets/images/      Your pictures (optional, see below)
```

## Run it
- Quickest: double-click `index.html`.
- Or: `python serve.py`, then open http://localhost:8000

## Host it free
- **GitHub Pages:** push the folder to a repo, then Settings → Pages → deploy from the main branch.
- **Netlify:** drag the whole folder onto app.netlify.com/drop.
- **Cloudflare Pages:** create a project and choose direct upload.

## Your images
Every picture falls back to an emoji, so the app works with no images. To use yours, add files with these names to `assets/images/`:
`avatar-f.png`, `avatar-m.png`, `user.png`, `landmarks/1.jpg` to `landmarks/12.jpg` (the welcome-page map), and `states/<state-name>.png` for crests, for example `states/lagos.png`, `states/akwa-ibom.png`.

## What is demo
- No server: accounts and passwords stay in your browser (passwords are never stored).
- Peers, chat replies, leaderboard names and all admin numbers are sample data. Real peer chat needs a backend (for example Supabase's free tier).
- The admin code `NAIJA-ADMIN` is checked in the browser, so it is not secure.
- Quiz: each state gets 30 questions (state capital, zone and slogan, extra questions from `STATE_Q`, then Nigeria general knowledge). Add state-specific questions in `STATE_Q` in `js/data.js`.
- State "About" text is placeholder except a couple of Lagos entries. Add yours in `STATE_INFO`.
- Safety rules built in: chat is for ages 13+, one-to-one only, 2 spaces per user, opposite gender, similar age, and under-18s are only matched with under-18s.