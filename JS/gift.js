document.addEventListener("DOMContentLoaded", function() {
    // ヒントボタンとヒント表示エリア
    const hintBtn = document.querySelector(".hint-btn");
    const hintsSection = document.querySelector(".hints");
    const contentBox = document.querySelector(".content-box");
    const hiddenContent = document.querySelector(".hidden-content");

    // ヒントボタンのクリックイベント
    hintBtn.addEventListener("click", function() {
        // プレゼント内容が見えるようにする
        hiddenContent.style.visibility = "visible";
        // ヒント表示を開く
        hintsSection.style.display = "block";
    });

    // さらにヒントを見るボタンのクリックイベント
    const moreHintsBtns = document.querySelectorAll(".more-hints");
    moreHintsBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            alert("追加のヒントを表示できます！"); // ここを任意のアクションに変更可能
        });
    });
});
