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

    // ★★ 追加機能：回答チェック ★★
    const answerInput = document.getElementById("answer-input");
    const answerSubmit = document.getElementById("answer-submit");
    const answerResult = document.getElementById("answer-result");

    // 正解リスト（服を表す単語）
    const correctAnswers = ["服", "洋服", "シャツ", "コート", "ジャケット", "ワンピース"];

    answerSubmit.addEventListener("click", function () {
        const userAnswer = answerInput.value.trim(); // 入力値を取得＆前後の空白を削除
        if (correctAnswers.includes(userAnswer)) {
            answerResult.innerText = "正解ぬ！🎉　さすがですわ";
            answerResult.style.color = "green";
        } else {
            answerResult.innerText = "違いますぬぬ！";
            answerResult.style.color = "red";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const correctAnswer = "服"; // 正解の答え
    const answerInput = document.getElementById("answer-input");
    const answerSubmit = document.getElementById("answer-submit");
    const answerResult = document.getElementById("answer-result");
    const detailsSection = document.querySelector(".details-section");

    answerSubmit.addEventListener("click", function () {
        const userAnswer = answerInput.value.trim();
        if (userAnswer === correctAnswer) {
            answerResult.textContent = "正解！🎉";
            answerResult.className = "correct-answer";
            detailsSection.classList.remove("hidden"); // 詳細ページを表示
            detailsSection.style.opacity = "1"; // フェードイン
            detailsSection.style.transform = "translateY(0)";
        } else {
            answerResult.textContent = "違うみたい…💦";
            answerResult.className = "wrong-answer";
        }
    });
});


