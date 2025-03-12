document.addEventListener("DOMContentLoaded", function () {
    generateShapes();
});

function generateShapes() {
    const shapeCount = Math.floor(Math.random() * 31) + 20; // 20〜50個
    const shapes = ["★", "■", "▲", "●", "◆", "♦", "□", "○", "△", "☆"];
    const body = document.body;
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement("div");
        shape.classList.add("shape");
        shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];

        /* ランダムな位置 & サイズ設定 */
        const size = Math.random() * 30 + 10; // 10px〜40px
        shape.style.fontSize = `${size}px`;
        shape.style.position = "absolute";
        shape.style.left = `${Math.random() * width}px`;
        shape.style.top = `${Math.random() * height}px`;
        shape.style.color = "rgba(173, 216, 230, 0.3)"; // より薄い水色
        shape.style.userSelect = "none"; // 選択不可
        shape.style.opacity = "1"; // 初期状態は透明ではない
        shape.style.transition = "left 2s linear, top 2s linear, opacity 1s"; // スムーズな移動とフェード

        body.appendChild(shape);
        moveShape(shape);
        
        /* 10秒後にフェードアウトしつつ削除 */
        setTimeout(() => {
            shape.style.opacity = "0"; // 透明にする
            setTimeout(() => shape.remove(), 1000); // 透明化のアニメーション後に削除
        }, 10000);
    }
}

function moveShape(shape) {
    function updatePosition() {
        /* ランダムな方向にスムーズに移動 */
        const xMove = (Math.random() - 0.5) * 50; // -25px 〜 +25px の範囲
        const yMove = (Math.random() - 0.5) * 50; // -25px 〜 +25px の範囲

        /* 現在の位置を取得 */
        const currentX = parseFloat(shape.style.left);
        const currentY = parseFloat(shape.style.top);

        /* 画面内に収める */
        const newX = Math.min(Math.max(currentX + xMove, 0), window.innerWidth - 40);
        const newY = Math.min(Math.max(currentY + yMove, 0), window.innerHeight - 40);

        shape.style.left = `${newX}px`;
        shape.style.top = `${newY}px`;

        /* 再度移動を設定 */
        if (shape.style.opacity !== "0") {
            setTimeout(updatePosition, 1000); // 2秒ごとにゆっくり動く
        }
    }

    updatePosition(); // 初回実行
}
