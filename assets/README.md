# Assets Folder

Add your images and audio files here.

## Placeholders

This folder contains placeholders for:
- `photo-placeholder.jpg` — Replace with your special photo (or rename the file and update the path in `src/components/BirthdayGame.jsx`)
- `happy-bday-placeholder.mp3` — Replace with birthday music (or rename the file and update the path in `src/components/BirthdayGame.jsx`)

## Update Paths

To use your own files:

1. Add your files to this folder, e.g.:
   - `my-photo.jpg`
   - `birthday-song.mp3`

2. Update `src/components/BirthdayGame.jsx`:
```jsx
const PHOTO_PLACEHOLDER = "/assets/my-photo.jpg";
const MUSIC_PLACEHOLDER = "/assets/birthday-song.mp3";
```

That's it! The component will automatically load your files.

