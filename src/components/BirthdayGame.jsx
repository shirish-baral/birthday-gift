import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
  SAMPLE TEXTS PROVIDED BY GPT — edit these strings:
  PRIZES, FINAL_MESSAGE, LOVE_POEM, SOCIAL_CAPTION, COUPONS, EXTRA_MESSAGES
*/

const GIRLFRIEND_NAME = "CUTU PIE";
const GRID_SIZE = 9;

const PRIZES = [
  "A surprise date. I'll plan everything from start to finish ✨❤️",
  "Any souverenir or accesries that you like 🪞🪷",
  "One full day where you do anything you want ani ma kei vandina 😌😇",
  "Unlimited hug coupon. You can redeem anytime, anywhere 🤗♾️",
  "A special gift… but you'll have to meet me to get it 😉🎁",
  "Suprise dish for you, maile banako 😋🌶️",
  "I will cook anything you want, chef mode ON 👨‍🍳❤️",
  "Secret chcolate hehe🍫",
  "Final gift —> open all boxes to see 🔐✨",
];

const FINAL_MESSAGE = `Happy Birthday, ${GIRLFRIEND_NAME}!\n\nBirthday girl for one day but my pookie, cutu and baby shark everyday. I know you don't like your birthday. But, I made these little surprises to you. I love you dherai baby. Always, Nerdish❤️`;

const LOVE_POEM = `The eyes that made me fall in love,
The smile I can never resist,
The hand I hold that reminds me
I’m strong enough to face the world.

The lap where I find my peace,
The person with whom pain disappears.
Happy birthday, my love 
Today, and for all my days with you. ❤️`;

const SOCIAL_CAPTION = `Happy Birthday to the one who feels like home to me. 🎂❤️`;

const PHOTO_PLACEHOLDER = "/assets/photo.jpeg";
const MUSIC_PLACEHOLDER = "/assets/birthday-music.mp3";

export default function BirthdayGame({ recipientName = GIRLFRIEND_NAME }) {
  const [opened, setOpened] = useState(new Array(GRID_SIZE).fill(false));
  const [showFinal, setShowFinal] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [currentGiftIndex, setCurrentGiftIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [pin, setPin] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [pinError, setPinError] = useState('');

  // Clear localStorage on component mount and save changes
  useEffect(() => {
    localStorage.removeItem('birthdayBoxesOpened');
    localStorage.setItem('birthdayBoxesOpened', JSON.stringify(opened));
  }, [opened]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === '0926') {
      setAccessGranted(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  const handleOpenBox = (index) => {
    if (!opened[index]) {
      // Show full-screen modal first
      setCurrentGiftIndex(index);
      setShowGiftModal(true);
      // Trigger confetti
      triggerConfetti();
    }
  };

  const handleCloseGiftModal = () => {
    if (currentGiftIndex !== null) {
      // Now add to opened list
      const newOpened = [...opened];
      newOpened[currentGiftIndex] = true;
      setOpened(newOpened);

      // Check if all boxes are opened
      if (newOpened.every((o) => o)) {
        setTimeout(() => setShowFinal(true), 800);
      }
    }
    setShowGiftModal(false);
    setCurrentGiftIndex(null);
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 20 }).map((_, i) => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem('birthdayBoxesOpened');
    setOpened(new Array(GRID_SIZE).fill(false));
    setShowFinal(false);
    setSelectedBox(null);
  };

  const handlePlayMusic = () => {
    if (audioRef) {
      audioRef.play();
      setIsPlaying(true);
    }
  };

  const handlePauseMusic = () => {
    if (audioRef) {
      audioRef.pause();
      setIsPlaying(false);
    }
  };

  const allOpened = opened.every((o) => o);

  // PIN Entry Screen
  if (!accessGranted) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-pink-50 to-rose-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-2">
              Enter PIN
            </h1>
            <p className="text-gray-600">Enter the PIN to access the birthday surprise</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Enter PIN"
              className="w-full px-4 py-3 text-center text-2xl font-bold border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
              maxLength={4}
            />
            {pinError && (
              <p className="text-red-500 text-sm font-semibold">{pinError}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors"
            >
              Unlock 🎁
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main Birthday Game
  return (
    <div className="w-full h-screen bg-gradient-to-b from-pink-50 to-rose-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Audio */}
      <audio
        ref={(el) => setAudioRef(el)}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={MUSIC_PLACEHOLDER} type="audio/mpeg" />
      </audio>

      {/* Header */}
      <div className="mb-8 text-center relative">
        {/* Music Control Button */}
        <button
          onClick={isPlaying ? handlePauseMusic : handlePlayMusic}
          className="absolute top-0 right-0 px-3 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          {isPlaying ? '🔊' : '🔇'} {isPlaying ? 'Pause' : 'Play'} Music
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-2">
          Happy Birthday! 🎉
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Open the gift boxes to reveal surprises
        </p>
        {allOpened && !showFinal && (
          <p className="text-sm text-rose-600 font-semibold animate-bounce">
            ✨ You opened them all! Check the final message ✨
          </p>
        )}
      </div>

      {/* Gift Grid */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
        {PRIZES.map((prize, index) => (
          <motion.div
            key={index}
            onClick={() => handleOpenBox(index)}
            className="cursor-pointer perspective"
            whileHover={{ scale: opened[index] ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-20 h-20 md:w-28 md:h-28 rounded-lg shadow-lg flex items-center justify-center text-4xl font-bold transition-all duration-300 ${
                opened[index]
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100'
                  : 'bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Gift box ${index + 1}${opened[index] ? ' opened' : ''}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenBox(index);
                }
              }}
            >
              {opened[index] ? '✓' : '🎁'}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Opened Gifts Display */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8 max-h-48 overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Your Opened Gifts:</h2>
        <div className="space-y-3">
          <AnimatePresence>
            {opened.map((isOpened, index) =>
              isOpened ? (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border-l-4 border-pink-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Gift {opened.slice(0, index + 1).filter(Boolean).length}
                  </p>
                  <p className="text-gray-800 font-semibold">{PRIZES[index]}</p>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Reset All Boxes
      </button>

      {/* Gift Modal - Full Screen */}
      <AnimatePresence>
        {showGiftModal && currentGiftIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="mb-8 text-6xl">🎁</div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-6">
                You Found a Gift!
              </h2>
              <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
                <p className="text-xl font-semibold text-gray-800">
                  {PRIZES[currentGiftIndex]}
                </p>
              </div>
              <button
                onClick={handleCloseGiftModal}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors text-lg"
              >
                Accept Gift ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="fixed w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
          }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: '100vh', rotate: 360 }}
          transition={{
            duration: 2,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}

      {/* Final Modal */}
      <AnimatePresence>
        {showFinal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {/* Photo */}
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <img
                  src={PHOTO_PLACEHOLDER}
                  alt="Final message photo"
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Main Message */}
              <p className="text-center text-gray-800 font-semibold mb-6 whitespace-pre-line">
                {FINAL_MESSAGE.replace('[HER NAME]', recipientName)}
              </p>

              {/* Love Poem */}
              <div className="bg-pink-50 rounded-lg p-4 mb-6">
                <p className="text-center text-gray-700 italic text-sm whitespace-pre-line">
                  {LOVE_POEM}
                </p>
              </div>

              {/* Social Caption */}
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-center text-gray-600 text-xs">
                  {SOCIAL_CAPTION}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowFinal(false)}
                className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}