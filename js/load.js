const progress = document.getElementById('loading-progress');
const image = document.getElementById('loading-image');

function simulateLoading() {
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

function fadeOut() {
  const container = document.querySelector('.loading-container');
  container.style.opacity = '0';
  container.style.transition = 'opacity 1s ease-in-out';

  setTimeout(function() {
    container.style.display = 'none';
  }, 3000);
}

simulateLoading();
