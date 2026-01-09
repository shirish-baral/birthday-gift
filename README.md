# Happy Birthday — Gift Box Interactive Game

A React + Vite + Tailwind CSS + Framer Motion birthday gift box game for your special someone.

## Setup

### 1. Update Sample Content
Open `src/components/BirthdayGame.jsx` and edit these variables at the top:
- `GIRLFRIEND_NAME` — her name
- `PRIZES` — the 9 gift box messages
- `FINAL_MESSAGE` — final birthday greeting
- `LOVE_POEM` — optional poem
- `COUPONS` — coupon messages
- `EXTRA_MESSAGES` — extra love notes

### 2. Add Assets
Replace placeholder files in `assets/`:
- `photo-placeholder.jpg` → your photo (or rename if you prefer)
- `happy-bday-placeholder.mp3` → birthday music (or rename if you prefer)

Update the paths in `src/components/BirthdayGame.jsx`:
```jsx
const PHOTO_PLACEHOLDER = "/assets/your-photo-name.jpg";
const MUSIC_PLACEHOLDER = "/assets/your-music-name.mp3";
```

### 3. Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` (or the URL shown in terminal).

### 4. Build for Production

```bash
npm run build
npm run preview
```

## Features

- ✨ 9 interactive gift boxes in a grid
- 🎊 Confetti animation on click
- 💾 localStorage saves progress across page refreshes
- 🎹 Keyboard accessible (Enter/Space to open)
- 📱 Responsive design (mobile & desktop)
- 🎬 Smooth Framer Motion animations
- 🎵 Background music placeholder
- 🎨 Tailwind CSS styling with gradients

## Project Structure

```
UI/
├── src/
│   ├── components/
│   │   └── BirthdayGame.jsx    # Main interactive component
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # React entry point
│   └── styles.css               # Tailwind + confetti keyframes
├── assets/                       # Photos, audio, etc.
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tailwind.config.cjs           # Tailwind config
├── postcss.config.cjs            # PostCSS config
└── README.md                     # This file
```

## Customization Tips

- **Change colors**: Edit Tailwind gradient classes in `BirthdayGame.jsx` (e.g., `from-pink-400 to-rose-400`)
- **Adjust grid size**: Change `GRID_SIZE` constant (currently 9)
- **Modify animations**: Edit Framer Motion `motion.*` components or add CSS in `styles.css`
- **Background music**: Add `autoPlay loop` attributes to `<audio>` tag (already configured)

## Notes

- All data persists in browser localStorage — use Reset button to clear.
- Placeholders for photo and music are required but can be empty URLs during development.
- Component is fully self-contained in `BirthdayGame.jsx` — easy to customize and share.

Enjoy! 🎂❤️

## Project Structure

```
UI/
├── src/
│   ├── components/
│   │   └── BirthdayGame.jsx    # Your birthday game component
│   ├── App.jsx                  # Main app wrapper
│   ├── main.jsx                 # React entry point
│   └── styles.css               # Tailwind + global styles
├── assets/                       # Add images, audio, etc. here
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tailwind.config.cjs           # Tailwind configuration
├── postcss.config.cjs            # PostCSS configuration
└── README.md                     # This file
```

## Assets

Add your photos, music, and other media files to the `assets/` folder. Reference them in your components as `import asset from '../assets/filename'`.
