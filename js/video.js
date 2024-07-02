document.addEventListener("DOMContentLoaded", function() {
  const videos = Array.from(document.querySelectorAll('.video-container'));

  videos.forEach(videoContainer => {
    const video = videoContainer.querySelector('video');
    const controls = videoContainer.querySelector('.controls');
    const playPauseBtn = videoContainer.querySelector('.playPauseBtn');
    const volumeSlider = videoContainer.querySelector('.volumeSlider');
    const volumeMuteBtn = videoContainer.querySelector('.volumeMuteBtn');
    const progressBar = videoContainer.querySelector('.progress-bar');
    const progressContainer = videoContainer.querySelector('.progress-container');

    playPauseBtn.addEventListener('click', () => togglePlayPause(video, playPauseBtn));
    volumeSlider.addEventListener('input', () => adjustVolume(video, volumeSlider, volumeMuteBtn));
    volumeMuteBtn.addEventListener('click', () => toggleMute(video, volumeSlider, volumeMuteBtn));
    video.addEventListener('timeupdate', () => updateProgressBar(video, progressBar));
    progressContainer.addEventListener('mousedown', (e) => startDragging(e, video, progressContainer));
    progressContainer.addEventListener('touchstart', (e) => startDragging(e, video, progressContainer)); // Para dispositivos táctiles
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging); // Para dispositivos táctiles
    document.addEventListener('mousemove', (e) => dragProgress(e, video, progressContainer, progressBar));
    document.addEventListener('touchmove', (e) => dragProgress(e, video, progressContainer, progressBar)); // Para dispositivos táctiles
    video.addEventListener('click', () => toggleFullScreen(videoContainer));

    let isDragging = false;

    function togglePlayPause(video, playPauseBtn) {
      if (video.paused) {
        video.play();
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
      } else {
        video.pause();
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
      }
    }

    function adjustVolume(video, volumeSlider, volumeMuteBtn) {
      video.volume = volumeSlider.value;
      if (video.volume === 0) {
        volumeMuteBtn.classList.remove('volume-mute');
        volumeMuteBtn.classList.add('volume-unmute');
      } else {
        volumeMuteBtn.classList.remove('volume-unmute');
        volumeMuteBtn.classList.add('volume-mute');
      }
    }

    function toggleMute(video, volumeSlider, volumeMuteBtn) {
      if (video.volume === 0) {
        video.volume = 1;
        volumeSlider.value = 1;
        volumeMuteBtn.classList.remove('volume-unmute');
        volumeMuteBtn.classList.add('volume-mute');
      } else {
        video.volume = 0;
        volumeSlider.value = 0;
        volumeMuteBtn.classList.remove('volume-mute');
        volumeMuteBtn.classList.add('volume-unmute');
      }
    }

    function updateProgressBar(video, progressBar) {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = progress + '%';
    }

    function startDragging(e, video, progressContainer) {
      isDragging = true;
      const offsetX = e.clientX - progressContainer.getBoundingClientRect().left;
      const seekTime = (offsetX / progressContainer.offsetWidth) * video.duration;
      video.currentTime = seekTime;
    }

    function stopDragging() {
      isDragging = false;
    }

    function dragProgress(e, video, progressContainer, progressBar) {
      if (isDragging) {
        const offsetX = e.clientX - progressContainer.getBoundingClientRect().left;
        const progress = (offsetX / progressContainer.offsetWidth) * 100;
        if (progress >= 0 && progress <= 100) {
          progressBar.style.width = progress + '%';
          const seekTime = (offsetX / progressContainer.offsetWidth) * video.duration;
          video.currentTime = seekTime;
        }
      }
    }

    function toggleFullScreen(videoContainer) {
      if (!document.fullscreenElement) {
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
          videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { /* IE11 */
          videoContainer.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
      }
    }
  });
});
