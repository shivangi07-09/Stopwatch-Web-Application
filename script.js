let [minutes, seconds, milliseconds] = [0, 0, 0];
let timer = null;
let isRunning = false;

const minuteElem = document.getElementById('minutes');
const secondElem = document.getElementById('seconds');
const milliElem = document.getElementById('milliseconds');
const lapList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(runStopwatch, 10);
    isRunning = true;
  }
});

document.getElementById('pause').addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timer);
  [minutes, seconds, milliseconds] = [0, 0, 0];
  updateDisplay();
  lapList.innerHTML = '';
  isRunning = false;
});

document.getElementById('lap').addEventListener('click', () => {
  if (isRunning) {
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
});

function runStopwatch() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  updateDisplay();
}

function updateDisplay() {
  minuteElem.innerText = formatTime(minutes);
  secondElem.innerText = formatTime(seconds);
  milliElem.innerText = formatTime(milliseconds);
}

function formatTime(unit) {
  return unit < 10 ? `0${unit}` : unit;
}
