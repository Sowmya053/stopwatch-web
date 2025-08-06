function confetti() {
  const duration = 1 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confettiLib({
      particleCount: 40,
      origin: {
        x: randomInRange(0.1, 0.9),
        y: Math.random() - 0.2
      },
      ...defaults
    });
  }, 200);
}

// Include this in HTML with this CDN
// <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>