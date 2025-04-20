const clockDisplay = document.getElementById('clockDisplay');
const svgTime = document.getElementById('svgTime');
const progressCircle = document.getElementById('progressCircle');
const lapList = document.getElementById('lapList');

let stopwatchTime = 0;
let stopwatchInterval;

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  clockDisplay.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function updateCircularProgress(time) {
  const max = 600;
  const progress = Math.min(time / max, 1);
  const offset = 282.6 * (1 - progress);
  progressCircle.style.strokeDashoffset = offset;
  svgTime.textContent = formatTime(time);
}

function startStopwatch() {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateCircularProgress(stopwatchTime);
    }, 1000);
  }
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchTime = 0;
  updateCircularProgress(stopwatchTime);
  lapList.innerHTML = '';
}

function recordLap() {
  const li = document.createElement('li');
  li.textContent = `Lap: ${formatTime(stopwatchTime)}`;
  lapList.appendChild(li);
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
}

// STARFIELD BACKGROUND
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width
  });
}

function animateStars() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.z -= 1;
    if (star.z <= 0) star.z = canvas.width;

    let k = 128.0 / star.z;
    let x = star.x * k + canvas.width / 2;
    let y = star.y * k + canvas.height / 2;

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      let size = (1 - star.z / canvas.width) * 2;
      ctx.fillStyle = '#00ffee';
      ctx.fillRect(x, y, size, size);
    }
  }

  requestAnimationFrame(animateStars);
}
animateStars();
