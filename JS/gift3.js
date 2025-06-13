const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const timerEl = document.getElementById("timer");
const resultMessage = document.getElementById("result-message");
const detailsSection = document.querySelector(".details-section");
const openGiftSection = document.querySelector(".open-gift-section");
const openGiftBtn = document.getElementById("open-gift-btn");

let startTime = null;
let timerId = null;
let fadeTimeout = null;

function updateTimer() {
    const now = performance.now();
    const elapsed = (now - startTime) / 1000;
    timerEl.textContent = elapsed.toFixed(2) + "秒";
}

startBtn.addEventListener("click", () => {
    startTime = performance.now();
    timerEl.textContent = "0.00秒";
    resultMessage.textContent = "";
    resultMessage.style.opacity = "1";
    resultMessage.style.transition = "none";
    resultMessage.style.display = "block";

    detailsSection.classList.add("hidden");
    openGiftSection.classList.add("hidden");
    detailsSection.style.opacity = "0";
    detailsSection.style.transform = "translateY(20px)";

    if (timerId) clearInterval(timerId);
    timerId = setInterval(updateTimer, 10);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;

    if (fadeTimeout) clearTimeout(fadeTimeout);
    setTimeout(() => {
        resultMessage.style.transition = "opacity 1s ease";
        resultMessage.style.opacity = "0";
    }, 3000);
    fadeTimeout = setTimeout(() => {
        resultMessage.style.display = "none";
    }, 4000);
});

stopBtn.addEventListener("click", () => {
    if (!startTime || !timerId) return;

    clearInterval(timerId);
    timerId = null;

    const now = performance.now();
    const elapsed = (now - startTime) / 1000;
    timerEl.textContent = elapsed.toFixed(2) + "秒";

    resultMessage.style.display = "block";
    resultMessage.style.opacity = "1";
    resultMessage.style.transition = "opacity 0.3s";

    if (elapsed >= 1 && elapsed <= 5) {
        resultMessage.textContent = "テスト成功！プレゼントを開封できます。";
        openGiftSection.classList.remove("hidden");
        detailsSection.classList.add("hidden");
    } else {
        resultMessage.textContent = "残念！プレゼントはありません。";
        openGiftSection.classList.add("hidden");
        detailsSection.classList.add("hidden");
    }

    stopBtn.disabled = true;
    resetBtn.disabled = false;
});

resetBtn.addEventListener("click", () => {
    timerEl.textContent = "0.00秒";
    resultMessage.textContent = "";
    resultMessage.style.opacity = "1";
    resultMessage.style.display = "block";
    detailsSection.classList.add("hidden");
    openGiftSection.classList.add("hidden");
    detailsSection.style.opacity = "0";
    detailsSection.style.transform = "translateY(20px)";
    startTime = null;
    clearInterval(timerId);
    timerId = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
});

openGiftBtn.addEventListener("click", () => {
    detailsSection.classList.remove("hidden");
    detailsSection.style.opacity = "1";
    detailsSection.style.transform = "translateY(0)";
});
