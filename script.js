let [seconds, minutes, hours] = [0, 0, 0];
let timer = null;

const display = document.getElementById("display");
const progressCircle = document.getElementById("progress");
const laps = document.getElementById("laps");
const beep = document.getElementById("beep");
const tick = document.getElementById("tick");

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.textContent = `${h}:${m}:${s}`;

  let percent = (seconds % 60) / 60;
  let offset = 628.32 - (628.32 * percent);
  progressCircle.style.strokeDashoffset = offset;
}

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
  tick.play();
}

document.getElementById("start").onclick = () => {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 1000);
};

document.getElementById("stop").onclick = () => {
  clearInterval(timer);
  timer = null;
  beep.play();
};

document.getElementById("reset").onclick = () => {
  clearInterval(timer);
  timer = null;
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  progressCircle.style.strokeDashoffset = 628.32;
  laps.innerHTML = "";
  beep.play();

  if (typeof confetti === "function") confetti(); // Optional confetti
};

document.getElementById("lap").onclick = () => {
  if (timer !== null) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
};

updateDisplay();
