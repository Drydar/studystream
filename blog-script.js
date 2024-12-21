const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPause");
const seekBar = document.getElementById("seekBar");
const timeDisplay = document.getElementById("time");
const fullscreenBtn = document.getElementById("fullscreen");

// Toggle Play/Pause
playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = "Pause";
    } else {
        video.pause();
        playPauseBtn.textContent = "Play";
    }
});

// Update Seek Bar and Time Display
video.addEventListener("timeupdate", () => {
    const currentTime = video.currentTime;
    const duration = video.duration;
    seekBar.value = (currentTime / duration) * 100;

    // Format time as mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
});

// Seek Video
seekBar.addEventListener("input", () => {
    const duration = video.duration;
    video.currentTime = (seekBar.value / 100) * duration;
});

// Fullscreen Mode
fullscreenBtn.addEventListener("click", () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
});