document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // すべてのセクションを取得

    function fadeInSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.8) { // 80% の位置に来たら表示
                section.classList.add("active");
            }
        });
    }

    // 初回チェック
    fadeInSections();

    // スクロールイベントでチェック
    window.addEventListener("scroll", fadeInSections);

    // 初期状態でクラスを適用
    sections.forEach(section => section.classList.add("fade-in"));
});
