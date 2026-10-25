
const openBtn = document.getElementById('openBtn');
const envelope = document.getElementById('envelope');
const overlay = document.getElementById('letterOverlay');
const closeBtn = document.getElementById('closeBtn');
const musicBtn = document.getElementById('musicBtn');
const audio = document.getElementById('birthdayMusic');

let musicOn = false;

// Play the birthday instrumental
function startMusic() {
  audio.play().then(() => {
    musicOn = true;
    musicBtn.textContent = '♫ Pause birthday melody';
    musicBtn.setAttribute('aria-pressed', 'true');
  }).catch(() => {
    musicOn = false;
    musicBtn.textContent = '♫ Play birthday melody';
    musicBtn.setAttribute('aria-pressed', 'false');
  });
}

// Stop the instrumental
function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
  musicOn = false;

  musicBtn.textContent = '♫ Play birthday melody';
  musicBtn.setAttribute('aria-pressed', 'false');
}

// Birthday confetti animation
function confetti() {
  const holder = document.getElementById('confetti');

  const colors = [
    '#e5a7b5',
    '#b97e8f',
    '#e4c69b',
    '#fff7ec',
    '#d29aa7'
  ];

  for (let i = 0; i < 280; i++) {
    const piece = document.createElement('span');

    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty(
      '--duration',
      `${3 + Math.random() * 3.5}s`
    );

    piece.style.setProperty(
      '--delay',
      `${Math.random() * 1.8}s`
    );

    piece.style.width = `${5 + Math.random() * 7}px`;
    piece.style.height = `${7 + Math.random() * 11}px`;

    piece.style.setProperty(
      '--drift',
      `${Math.random() * 170 - 85}px`
    );

    holder.appendChild(piece);

    piece.addEventListener('animationend', () => {
      piece.remove();
    });
  }
}

// Open the birthday letter
openBtn.addEventListener('click', () => {
  envelope.classList.add('open');

  // Birthday confetti
  confetti();

  // Stop the instrumental when the letter opens
  stopMusic();

  setTimeout(() => {
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }, 850);
});

// Close the birthday letter
function closeLetter() {
  overlay.classList.remove('visible');
  overlay.setAttribute('aria-hidden', 'true');

  envelope.classList.remove('open');
  openBtn.focus();
}

closeBtn.addEventListener('click', closeLetter);

// Close when clicking outside the letter
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    closeLetter();
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Escape' &&
    overlay.classList.contains('visible')
  ) {
    closeLetter();
  }
});

// Music play/pause button
musicBtn.addEventListener('click', () => {
  if (musicOn) {
    audio.pause();
    musicOn = false;

    musicBtn.textContent = '♫ Play birthday melody';
    musicBtn.setAttribute('aria-pressed', 'false');
  } else {
    startMusic();
  }
});

// Birthday spa surprise
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseNote = document.getElementById('surpriseNote');

surpriseBtn.addEventListener('click', () => {
  const willOpen = surpriseNote.hidden;

  surpriseNote.hidden = !willOpen;

  surpriseBtn.setAttribute(
    'aria-expanded',
    String(willOpen)
  );

  surpriseBtn.textContent = willOpen
    ? '🎀 Your birthday surprise is here!'
    : '🎁 Click here for your birthday surprise!';

  if (willOpen) {
    // Extra confetti for the surprise!
    confetti();

    surpriseNote.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
});
