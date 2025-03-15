document.addEventListener("DOMContentLoaded", function () {
    // ヒントボタンとヒント表示エリア
    const hintBtn = document.querySelector(".hint-btn");
    const hintsSection = document.querySelector(".hints");
    const contentBox = document.querySelector(".content-box");
    const hiddenContent = document.querySelector(".hidden-content");

    // ヒントボタンのクリックイベント
    hintBtn.addEventListener("click", function () {
        // プレゼント内容が見えるようにする
        hiddenContent.style.visibility = "visible";
        // ヒント表示を開く
        hintsSection.style.display = "block";
    });

    // さらにヒントを見るボタンのクリックイベント
    const moreHintsBtns = document.querySelectorAll(".more-hints");
    moreHintsBtns.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
            switch (index) {
                case 0: // 1つ目のヒントボタン
                    btn.previousElementSibling.innerText = "これは1つ目のヒントです!";
                    break;
                case 1: // 2つ目のヒントボタン
                    // 2つ目のヒントの内容を変更
                    btn.previousElementSibling.innerText = "これは2つ目のヒントです!";
                    break;
                case 2: // 3つ目のヒントボタン
                    // 3つ目のヒントの内容を変更
                    btn.previousElementSibling.innerText = "これは3つ目のヒントです!";
                    break;
                default:
                    break;
            }
        });
    });
});
