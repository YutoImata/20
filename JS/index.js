// JS/welcome.js
function goToNextPage() {
    // メッセージとボタンを非表示にする
    document.getElementById('welcome-screen').style.display = 'none';
    
    // 次のページへ遷移
    window.location.href = 'HTML/home.html'; // 次のページのURLを指定
}
