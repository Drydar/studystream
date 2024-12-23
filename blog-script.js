document.querySelectorAll('.video-card').forEach((card) => {
    const video = card.querySelector('.video');
    const playPauseBtn = card.querySelector('.play-pause');
    const muteUnmuteBtn = card.querySelector('.mute-unmute');
    const volumeBar = card.querySelector('.volume-bar');
    const progressBar = card.querySelector('.progress-bar');
    const fullscreenBtn = card.querySelector('.fullscreen');
  
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause';
      } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
      }
    });
  
    // Mute/Unmute functionality
    muteUnmuteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteUnmuteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    });
  
    // Volume control
    volumeBar.addEventListener('input', (e) => {
      video.volume = e.target.value;
    });
  
    // Update progress bar as the video plays
    video.addEventListener('timeupdate', () => {
      progressBar.value = (video.currentTime / video.duration) * 100;
    });
  
    // Seek functionality
    progressBar.addEventListener('input', (e) => {
      video.currentTime = (e.target.value / 100) * video.duration;
    });
  
    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      }
    });
  });