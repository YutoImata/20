window.onload = function() {
    // 付き合い始めた日付 (6年前の7月14日)
    const startDate = new Date(2019, 6, 14); // 0が1月、6が7月

    // 今日の日付
    const today = new Date();

    // 日数の差を計算
    const timeDifference = today - startDate;
    const daysSinceStart = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // 計算した日数をページに反映
    document.getElementById('dating-days').textContent = `付き合って${daysSinceStart}日目です！`;
};
