let chunks = 1024; // in KB
let threads = 1;
let dataWasted = 0;
let stopAfter = 0; // in MB
let running = false;
let time = 0;
let loader = 0;

const threadsArr = [];

const element = document.getElementById("startBtn");
const timeObject = document.getElementById("timeRunningText");
const speedObject = document.getElementById("averageSpeedText");
const dataWastedObject = document.getElementById("dataWatsedText");
const threadCountDisplay = document.getElementById("threadCount");
const threadsRange = document.getElementById("threadsRange");
const stopAfterInput = document.getElementById("stopafter");

let timer;

threadsRange.addEventListener("input", () => {
  threadCountDisplay.textContent = parseInt(threadsRange.value) + 1;
});

function updateTimeDisplay() {
  if (time < 60) {
    timeObject.textContent = `${time} sec`;
  } else if (time < 3600) {
    timeObject.textContent = `${Math.floor(time / 60)} min ${time % 60} sec`;
  } else {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    timeObject.textContent = `${hrs} hrs ${mins} min ${time % 60} sec`;
  }
}

function timeRunningUpdate() {
  timer = setInterval(() => {
    time += 1;
    updateTimeDisplay();
  }, 1000);
}

async function fetchChunk() {
  const startTime = Date.now();
  try {
    const res = await fetch(`https://i.ibb.co/qJPr4nz/data-waster-hosting.png?${Math.random()}`);
    if (res.ok) {
      dataWasted += chunks;
      dataWastedObject.textContent = `${Math.floor(dataWasted / 1024)} MB`;

      if (loader % threads === 0) {
        const durationSec = (Date.now() - startTime) / 1000;
        const speedKbps = Math.floor((chunks / durationSec) * 8);
        speedObject.textContent = `${speedKbps} Kbps`;
      }

      loader++;
    }
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

function startThreads() {
  for (let i = 0; i < threads; i++) {
    const interval = setInterval(() => {
      if (running) {
        if (stopAfter > 0 && dataWasted / 1024 >= stopAfter) {
          stop();
        } else {
          fetchChunk();
        }
      }
    }, 3000);
    threadsArr.push(interval);
  }
}

function stopThreads() {
  threadsArr.forEach(clearInterval);
  threadsArr.length = 0;
  clearInterval(timer);
}

function stop() {
  running = false;
  stopThreads();
  element.classList.remove("btn-danger");
  element.classList.add("btn-success");
  element.textContent = "Start Wasting";
}

function start() {
  running = true;
  element.classList.remove("btn-success");
  element.classList.add("btn-danger");
  element.textContent = "Stop Wasting";
  startThreads();
  timeRunningUpdate();
}

element.addEventListener("click", () => {
  threads = parseInt(threadsRange.value) + 1;
  const stopValue = parseInt(stopAfterInput.value);
  stopAfter = isNaN(stopValue) ? 0 : stopValue;

  if (running) {
    stop();
  } else {
    start();
  }
});
///////////////////////////////////////////////////////////
