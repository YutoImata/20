document.addEventListener("DOMContentLoaded", function () {
    // ヒントボタンとヒント表示エリア
    const hintBtn = document.querySelector(".hint-btn");
    const hintsSection = document.querySelector(".hints");
    const hiddenContent = document.querySelector(".hidden-content");

    // ヒントリスト
    const hintTexts = [
        "最近は買ってないかな？", 
        "毎日身につけるもの", 
        "季節によって変えたくなるもの"
    ];

    // ヒントボタンのクリックイベント
    hintBtn.addEventListener("click", function () {
        hiddenContent.style.visibility = "visible"; // プレゼント内容を表示
        hintsSection.style.display = "block"; // ヒントセクションを開く
    });

    // さらにヒントを見るボタンのクリックイベント
    const moreHintsBtns = document.querySelectorAll(".more-hints");
    moreHintsBtns.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const hintParagraph = document.createElement("p"); // ヒント用のp要素を作成
            hintParagraph.innerText = hintTexts[index]; // ヒントの内容を設定
            btn.parentNode.insertBefore(hintParagraph, btn.nextSibling); // ボタンの下に挿入
            btn.style.display = "none"; // ボタンを非表示にする
        });
    });

    // ★★ 回答チェック機能 ★★
    const answerInput = document.getElementById("answer-input");
    const answerSubmit = document.getElementById("answer-submit");
    const answerResult = document.getElementById("answer-result");
    const detailsSection = document.querySelector(".details-section");

    // 正解リスト（衣類系ワード）
    const correctAnswers = [
        "服", "洋服", "シャツ", "Tシャツ", "ズボン", "パンツ", "ジーンズ",
        "スカート", "ワンピース", "ジャケット", "コート", "パーカー",
        "靴下", "ソックス", "セーター", "トレーナー", "ポロシャツ",
        "スーツ", "ブレザー", "ベスト", "タイツ", "レギンス"
    ];

    // 回答のチェック
    answerSubmit.addEventListener("click", function () {
        const userAnswer = answerInput.value.trim();

        if (correctAnswers.includes(userAnswer)) {
            answerResult.innerText = "正解ぬ！🎉　さすがですわ";
            answerResult.style.color = "green";

            // 詳細ページを表示（フェードイン効果）
            detailsSection.classList.remove("hidden");
            detailsSection.style.opacity = "1";
            detailsSection.style.transform = "translateY(0)";
        } else {
            answerResult.innerText = "違いますぬ";
            answerResult.style.color = "red";
        }
    });
});
