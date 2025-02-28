const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const fullscreenEl = document.getElementById("fullscreen");
const timerEl = document.getElementById("timer");
const stopwatchEl = document.getElementById("stopwatch");
const clockEl = document.getElementById("clock");
const alarmHoursEl = document.getElementById("alarm-hours");
const alarmMinutesEl = document.getElementById("alarm-minutes");
const alarmSecondsEl = document.getElementById("alarm-seconds");
const setAlarmEl = document.getElementById("set-alarm");
const clearAlarmEl = document.getElementById("clear-alarm");
const alarmStatusEl = document.getElementById("alarm-status");

const navTimerEl = document.getElementById("nav-timer");
const navStopwatchEl = document.getElementById("nav-stopwatch");
const navClockEl = document.getElementById("nav-clock");
const navAlarmEl = document.getElementById("nav-alarm");

const timerSection = document.getElementById("timer-section");
const stopwatchSection = document.getElementById("stopwatch-section");
const clockSection = document.getElementById("clock-section");
const alarmSection = document.getElementById("alarm-section");

const startStopwatchEl = document.getElementById("start-stopwatch");
const stopStopwatchEl = document.getElementById("stop-stopwatch");
const resetStopwatchEl = document.getElementById("reset-stopwatch");
const lapStopwatchEl = document.getElementById("lap-stopwatch");
const lapTimesEl = document.getElementById("lap-times");

const setHoursEl = document.getElementById("set-hours");
const setMinutesEl = document.getElementById("set-minutes");
const setSecondsEl = document.getElementById("set-seconds");
const setTimeEl = document.getElementById("set-time");

const decreaseHoursEl = document.getElementById("decrease-hours");
const increaseHoursEl = document.getElementById("increase-hours");
const decreaseMinutesEl = document.getElementById("decrease-minutes");
const increaseMinutesEl = document.getElementById("increase-minutes");
const decreaseSecondsEl = document.getElementById("decrease-seconds");
const increaseSecondsEl = document.getElementById("increase-seconds");

const decreaseAlarmHoursEl = document.getElementById("decrease-alarm-hours");
const increaseAlarmHoursEl = document.getElementById("increase-alarm-hours");
const decreaseAlarmMinutesEl = document.getElementById("decrease-alarm-minutes");
const increaseAlarmMinutesEl = document.getElementById("increase-alarm-minutes");
const decreaseAlarmSecondsEl = document.getElementById("decrease-alarm-seconds");
const increaseAlarmSecondsEl = document.getElementById("increase-alarm-seconds");

let interval;
let timeLeft = 0; // Default: 0 seconds
let stopwatchTime = 0;
let stopwatchInterval;
let alarmTime = null;
let lapTimes = [];

// Audio for timer and alarm
const audio = new Audio("s2.ogg");

// Timer Functions
function updateTimer() {
  if (timeLeft < 0) {
    timeLeft = 0; // Ensure time doesn't go negative
  }
  let hours = Math.floor(timeLeft / 3600);
  let minutes = Math.floor((timeLeft % 3600) / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  timerEl.innerHTML = formattedTime;
}

function startTimer() {
  if (timeLeft <= 0) {
    alert("Please set a valid time before starting the timer.");
    return;
  }

  interval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(interval);
      alert("Time's up!");
      audio.play(); // Play sound when time is up
      timeLeft = 0; // Reset to 0
      updateTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  audio.pause(); // Stop the sound when timer is stopped
  audio.currentTime = 0; // Reset audio to start
}

function resetTimer() {
  clearInterval(interval);
  timeLeft = 0; // Reset to 0
  updateTimer();
  audio.pause(); // Stop the sound when timer is reset
  audio.currentTime = 0; // Reset audio to start
}

function setManualTime() {
  const hours = parseInt(setHoursEl.value) || 0;
  const minutes = parseInt(setMinutesEl.value) || 0;
  const seconds = parseInt(setSecondsEl.value) || 0;

  if (hours < 0 || minutes < 0 || seconds < 0 || minutes > 59 || seconds > 59) {
    alert("Please enter valid time values.");
    return;
  }

  timeLeft = hours * 3600 + minutes * 60 + seconds;
  updateTimer();
}

// Time Adjust Functions for Timer
decreaseHoursEl.addEventListener("click", () => {
  setHoursEl.value = Math.max(0, parseInt(setHoursEl.value || 0) - 1);
  setManualTime();
});

increaseHoursEl.addEventListener("click", () => {
  setHoursEl.value = Math.max(0, parseInt(setHoursEl.value || 0) + 1);
  setManualTime();
});

decreaseMinutesEl.addEventListener("click", () => {
  setMinutesEl.value = Math.max(0, parseInt(setMinutesEl.value || 0) - 1);
  setManualTime();
});

increaseMinutesEl.addEventListener("click", () => {
  setMinutesEl.value = Math.min(59, parseInt(setMinutesEl.value || 0) + 1);
  setManualTime();
});

decreaseSecondsEl.addEventListener("click", () => {
  setSecondsEl.value = Math.max(0, parseInt(setSecondsEl.value || 0) - 1);
  setManualTime();
});

increaseSecondsEl.addEventListener("click", () => {
  setSecondsEl.value = Math.min(59, parseInt(setSecondsEl.value || 0) + 1);
  setManualTime();
});

// Alarm Functions
function setAlarm() {
  const hours = parseInt(alarmHoursEl.value) || 0;
  const minutes = parseInt(alarmMinutesEl.value) || 0;
  const seconds = parseInt(alarmSecondsEl.value) || 0;

  if (hours < 0 || minutes < 0 || seconds < 0 || minutes > 59 || seconds > 59) {
    alert("Please enter valid time values for the alarm.");
    return;
  }

  alarmTime = { hours, minutes, seconds };
  alarmStatusEl.innerHTML = `Alarm set for ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function clearAlarm() {
  alarmTime = null;
  alarmStatusEl.innerHTML = "";
}

function checkAlarm() {
  if (!alarmTime) return;

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  if (
    currentHours === alarmTime.hours &&
    currentMinutes === alarmTime.minutes &&
    currentSeconds === alarmTime.seconds
  ) {
    alert("Alarm! Wake up!");
    audio.play(); // Play sound when alarm goes off
    alarmTime = null;
    alarmStatusEl.innerHTML = "";
  }
}

// Time Adjust Functions for Alarm
decreaseAlarmHoursEl.addEventListener("click", () => {
  alarmHoursEl.value = Math.max(0, parseInt(alarmHoursEl.value || 0) - 1);
});

increaseAlarmHoursEl.addEventListener("click", () => {
  alarmHoursEl.value = Math.max(0, parseInt(alarmHoursEl.value || 0) + 1);
});

decreaseAlarmMinutesEl.addEventListener("click", () => {
  alarmMinutesEl.value = Math.max(0, parseInt(alarmMinutesEl.value || 0) - 1);
});

increaseAlarmMinutesEl.addEventListener("click", () => {
  alarmMinutesEl.value = Math.min(59, parseInt(alarmMinutesEl.value || 0) + 1);
});

decreaseAlarmSecondsEl.addEventListener("click", () => {
  alarmSecondsEl.value = Math.max(0, parseInt(alarmSecondsEl.value || 0) - 1);
});

increaseAlarmSecondsEl.addEventListener("click", () => {
  alarmSecondsEl.value = Math.min(59, parseInt(alarmSecondsEl.value || 0) + 1);
});

// Stopwatch Functions
function updateStopwatch() {
  let hours = Math.floor(stopwatchTime / 3600);
  let minutes = Math.floor((stopwatchTime % 3600) / 60);
  let seconds = stopwatchTime % 60;
  let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  stopwatchEl.innerHTML = formattedTime;
}

function startStopwatch() {
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    updateStopwatch();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  lapTimes = [];
  updateStopwatch();
  lapTimesEl.innerHTML = "";
}

function lapStopwatch() {
  lapTimes.push(stopwatchTime);
  const lapTimeFormatted = formatTime(stopwatchTime);
  const lapItem = document.createElement("div");
  lapItem.textContent = `Lap ${lapTimes.length}: ${lapTimeFormatted}`;
  lapTimesEl.appendChild(lapItem);
}

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Clock Functions
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  clockEl.innerHTML = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// Navigation Functions
navTimerEl.addEventListener("click", () => {
  timerSection.style.display = "block";
  stopwatchSection.style.display = "none";
  clockSection.style.display = "none";
  alarmSection.style.display = "none";
});

navStopwatchEl.addEventListener("click", () => {
  timerSection.style.display = "none";
  stopwatchSection.style.display = "block";
  clockSection.style.display = "none";
  alarmSection.style.display = "none";
});

navClockEl.addEventListener("click", () => {
  timerSection.style.display = "none";
  stopwatchSection.style.display = "none";
  clockSection.style.display = "block";
  alarmSection.style.display = "none";
});

navAlarmEl.addEventListener("click", () => {
  timerSection.style.display = "none";
  stopwatchSection.style.display = "none";
  clockSection.style.display = "none";
  alarmSection.style.display = "block";
});

// Event Listeners
startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
setTimeEl.addEventListener("click", setManualTime);

startStopwatchEl.addEventListener("click", startStopwatch);
stopStopwatchEl.addEventListener("click", stopStopwatch);
resetStopwatchEl.addEventListener("click", resetStopwatch);
lapStopwatchEl.addEventListener("click", lapStopwatch);

setAlarmEl.addEventListener("click", setAlarm);
clearAlarmEl.addEventListener("click", clearAlarm);

// Fullscreen Functionality
fullscreenEl.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Check Alarm Every Second
setInterval(checkAlarm, 1000);