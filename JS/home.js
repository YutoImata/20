document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const buttons = document.querySelectorAll(".celebration-btn");

    buttons.forEach(button => {
        const unlockDate = new Date(button.getAttribute("data-unlock"));

        /* 現在の日付が解禁日を過ぎていたらロック解除 */
        if (today >= unlockDate) {
            button.classList.remove("locked");
        }

        /* ボタンをクリック時にページ遷移 */
        button.addEventListener("click", function () {
            if (!button.classList.contains("locked")) {
                window.location.href = button.getAttribute("data-url");
            }
        });
    });
});


document.getElementById('start-button').addEventListener('click', function() {
    // 非表示にする要素
    document.getElementById('initial-screen').style.display = 'none';
    
    // コンテンツ表示
    document.body.style.overflowY = 'auto';  // スクロール可能に戻す
});
