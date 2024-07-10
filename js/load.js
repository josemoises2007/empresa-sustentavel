document.addEventListener('DOMContentLoaded', function() {
  const progress = document.getElementById('#loading-progress');
  const image = document.getElementById('#loading-image');

  function simulateLoading() {
    if (progress) {
      progress.value += 0.9;

      if (progress.value < progress.max) {
        requestAnimationFrame(simulateLoading);
      } else {
        image.style.display = 'block';
        setTimeout(function() {
          fadeOut();
        }, 3000);
      }
    }
  }

  function fadeOut() {
    const container = document.querySelector('loading-container');
    if (container) {
      container.style.opacity = '0';
      container.style.transition = 'opacity 1s ease-in-out';

      setTimeout(function() {
        container.style.display = 'none';
      }, 3000);
    }
  }

  simulateLoading();
});
