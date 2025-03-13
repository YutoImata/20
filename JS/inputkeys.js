/* 右クリックメニューを無効化 */
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

/* キーボードショートカットを無効化 */
document.addEventListener('keydown', function (event) {
    if (
        event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "U")
    ) {
        event.preventDefault();
    }
});

/* 開発者ツールの検出 */
(function() {
    let threshold = 160; // 開発者ツールのウィンドウサイズ閾値
    function detectDevTools() {
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            alert("開発者ツールが検出されました。ページをリロードします。");
            window.location.reload();
        }
    }
    setInterval(detectDevTools, 1000);
})();

/* コンソールの妨害 */
setInterval(() => {
    console.log("%c 開発者ツールを使用しないでください！", "color: red; font-size: 20px;");
}, 2000);

Object.defineProperty(window, "console", {
    get: function() {
        alert("開発者ツールの使用は禁止されています！");
        window.location.href = "about:blank";
    },
    configurable: false
});