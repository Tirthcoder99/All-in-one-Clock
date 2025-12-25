/* ---------------- TAB SWITCHING ---------------- */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

/* ---------------- YEAR COUNTDOWN ---------------- */
function updateYearCountdown() {
  const now = new Date();
  const end = new Date(now.getFullYear() + 1, 0, 1);
  const diff = end - now;

  if (diff <= 0) {
    document.getElementById("celebration").style.display = "block";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("year-timer").innerText =
    `${d} Days ${h} Hours ${m} Minutes ${s} Seconds`;
}

setInterval(updateYearCountdown, 1000);
updateYearCountdown();

/* ---------------- TIMER ---------------- */
let timerInterval;
let timerEnd;

function startTimer() {
  clearInterval(timerInterval);

  const min = parseInt(document.getElementById("t-min").value) || 0;
  const sec = parseInt(document.getElementById("t-sec").value) || 0;
  const total = (min * 60 + sec) * 1000;

  if (total <= 0) return;

  timerEnd = Date.now() + total;

  timerInterval = setInterval(() => {
    const remaining = timerEnd - Date.now();

    if (remaining <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timer-display").innerText = "00:00";
      alert("Timer Finished");
      return;
    }

    const m = Math.floor(remaining / 60000);
    const s = Math.floor((remaining / 1000) % 60);

    document.getElementById("timer-display").innerText =
      `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer-display").innerText = "00:00";
}

/* ---------------- STOPWATCH ---------------- */
let swInterval;
let swStart = 0;
let swElapsed = 0;

function startStopwatch() {
  if (swInterval) return;

  swStart = Date.now() - swElapsed;
  swInterval = setInterval(() => {
    swElapsed = Date.now() - swStart;

    const ms = Math.floor((swElapsed % 1000) / 10);
    const s = Math.floor((swElapsed / 1000) % 60);
    const m = Math.floor((swElapsed / 60000) % 60);

    document.getElementById("sw-display").innerText =
      `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
  }, 10);
}

function stopStopwatch() {
  clearInterval(swInterval);
  swInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  swElapsed = 0;
  document.getElementById("sw-display").innerText = "00:00:00";
}

/* ---------------- WORLD CLOCK ---------------- */
function updateWorldClock() {
  const format = (zone) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      timeStyle: "medium"
    }).format(new Date());

  document.getElementById("ny").innerText = format("America/New_York");
  document.getElementById("london").innerText = format("Europe/London");
  document.getElementById("tokyo").innerText = format("Asia/Tokyo");
  document.getElementById("india").innerText = format("Asia/Kolkata");
}

setInterval(updateWorldClock, 1000);
updateWorldClock();
