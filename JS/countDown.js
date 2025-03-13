document.addEventListener("DOMContentLoaded", function () {
    function updateCountdown() {
        const targetDate = new Date("2025-09-01T00:00:00").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("timer").innerText =
                `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
        } else {
            document.getElementById("timer").innerText = "お祝いの日です！";
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
