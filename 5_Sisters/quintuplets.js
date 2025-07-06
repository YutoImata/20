document.addEventListener('DOMContentLoaded', function() {
    const planButtons = document.querySelectorAll('.plan-btn');
    const eventButtons = document.querySelectorAll('.event-btn');
    const planDetails = document.getElementById('plan-details');
    const scheduleDetails = document.getElementById('schedule-details');
    const inputs = document.querySelectorAll('input[type="number"]');
    
    let currentNights = 0;
    let selectedEvents = new Set(); // 複数選択のためのSet
    
    // プランボタンのクリックイベント
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブクラスの切り替え
            planButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentNights = parseInt(this.dataset.nights);
            updatePlanDetails();
            updateSchedule();
        });
    });

    // イベントボタンのクリックイベント（複数選択対応）
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventType = this.dataset.event;
            const checkbox = this.querySelector('.checkbox');
            
            if (selectedEvents.has(eventType)) {
                // 既に選択されている場合は解除
                selectedEvents.delete(eventType);
                this.classList.remove('selected');
                checkbox.textContent = '☐';
            } else {
                // 選択されていない場合は追加
                selectedEvents.add(eventType);
                this.classList.add('selected');
                checkbox.textContent = '☑';
            }
            
            if (currentNights > 0) {
                updatePlanDetails();
            }
        });
    });
    
    // 入力値変更時の更新
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (currentNights > 0) {
                updatePlanDetails();
            }
        });
    });
    
    function updatePlanDetails() {
        const flightPrice = parseInt(document.getElementById('flight-price').value) || 0;
        const hotelPrice = parseInt(document.getElementById('hotel-price').value) || 0;
        const dinnerPrice = parseInt(document.getElementById('dinner-price').value) || 0;
        const mealPrice = parseInt(document.getElementById('meal-price').value) || 0;
        const transportPrice = parseInt(document.getElementById('transport-price').value) || 0;
        const eventPrice = parseInt(document.getElementById('event-price').value) || 0;
        const potterPrice = parseInt(document.getElementById('potter-price').value) || 0;
        const noodlesPrice = parseInt(document.getElementById('noodles-price').value) || 0;
        const mongolPrice = parseInt(document.getElementById('mongol-price').value) || 0;
        const souvenirPrice = parseInt(document.getElementById('souvenir-price').value) || 0;
        
        const days = currentNights + 1;
        
        // 基本費用計算
        const totalHotelCost = hotelPrice * currentNights;
        const totalDinnerCost = dinnerPrice * currentNights;
        const totalMealCost = mealPrice * days;
        const totalTransportCost = transportPrice * days;
        
        // 選択されたイベント費用計算
        let additionalEventCost = 0;
        let eventDescriptions = [];
        
        if (selectedEvents.has('potter')) {
            additionalEventCost += potterPrice;
            eventDescriptions.push('ハリーポッターミュージアム');
        }
        if (selectedEvents.has('noodles')) {
            additionalEventCost += noodlesPrice;
            eventDescriptions.push('カップヌードルミュージアム');
        }
        if (selectedEvents.has('mongol')) {
            additionalEventCost += mongolPrice;
            eventDescriptions.push('蒙古タンメン中本');
        }
        
        const eventDescription = eventDescriptions.length > 0 
            ? eventDescriptions.join(' + ') 
            : '追加イベントなし';
        
        const totalCost = flightPrice + totalHotelCost + totalDinnerCost + 
                         totalMealCost + totalTransportCost + eventPrice + 
                         additionalEventCost + souvenirPrice;
        
        planDetails.innerHTML = `
            <h4>${currentNights}泊${days}日プラン + ${eventDescription}</h4>
            <div class="cost-breakdown">
                <div class="cost-item">
                    <span>✈️ 往復航空券</span>
                    <span>¥${flightPrice.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>🏨 ホテル代 (${currentNights}泊)</span>
                    <span>¥${totalHotelCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>🍽️ 夕食代 (${currentNights}回)</span>
                    <span>¥${totalDinnerCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>🥪 朝昼食代 (${days}日)</span>
                    <span>¥${totalMealCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>🚇 現地交通費 (${days}日)</span>
                    <span>¥${totalTransportCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>🎫 イベントチケット</span>
                    <span>¥${eventPrice.toLocaleString()}</span>
                </div>
                ${additionalEventCost > 0 ? `
                <div class="cost-item">
                    <span>🎪 追加イベント</span>
                    <span>¥${additionalEventCost.toLocaleString()}</span>
                </div>` : ''}
                <div class="cost-item">
                    <span>🎁 お土産代</span>
                    <span>¥${souvenirPrice.toLocaleString()}</span>
                </div>
            </div>
            <div class="total-cost">
                合計: ¥${totalCost.toLocaleString()}
            </div>
        `;
    }
    
    function updateSchedule() {
        const days = currentNights + 1;
        let scheduleHTML = `<h4>${currentNights}泊${days}日 スケジュール例</h4>`;
        
        for (let day = 1; day <= days; day++) {
            scheduleHTML += `<div class="day-schedule">`;
            scheduleHTML += `<div class="day-title">${day}日目 (${getDateString(day)})</div>`;
            
            if (day === 1) {
                scheduleHTML += `
                    <div class="schedule-item">🛫 新千歳空港発 → 羽田空港着</div>
                    <div class="schedule-item">🚇 ホテルへ移動・チェックイン</div>
                    <div class="schedule-item">🍱 昼食（コンビニ等）</div>
                    <div class="schedule-item">🗼 東京観光・自由時間</div>
                    <div class="schedule-item">🍽️ 夕食（外食）</div>
                `;
            } else if (day === 2 && currentNights >= 1) {
                scheduleHTML += `
                    <div class="schedule-item">🌅 朝食（コンビニ等）</div>
                    <div class="schedule-item">🎪 <strong>5等分の花嫁イベント</strong> (トヨタアリーナ)</div>
                    <div class="schedule-item">🍱 昼食（会場付近）</div>
                    <div class="schedule-item">🛍️ グッズ購入・アフター</div>
                    ${currentNights > 1 ? '<div class="schedule-item">🍽️ 夕食（外食）</div>' : '<div class="schedule-item">🛫 羽田空港発 → 新千歳空港着</div>'}
                `;
            } else if (day === 3 && currentNights >= 2) {
                scheduleHTML += `
                    <div class="schedule-item">🌅 朝食（コンビニ等）</div>
                    <div class="schedule-item">🗼 東京観光・ショッピング</div>
                    <div class="schedule-item">🍱 昼食（コンビニ等）</div>
                    ${currentNights > 2 ? '<div class="schedule-item">🍽️ 夕食（外食）</div>' : '<div class="schedule-item">🛫 羽田空港発 → 新千歳空港着</div>'}
                `;
            } else if (day === 4 && currentNights === 3) {
                scheduleHTML += `
                    <div class="schedule-item">🌅 朝食（コンビニ等）</div>
                    <div class="schedule-item">🏨 チェックアウト</div>
                    <div class="schedule-item">🛍️ 最後のお土産購入</div>
                    <div class="schedule-item">🛫 羽田空港発 → 新千歳空港着</div>
                `;
            }
            
            scheduleHTML += `</div>`;
        }
        
        scheduleDetails.innerHTML = scheduleHTML;
    }
    
    function getDateString(day) {
        const eventDate = new Date(2026, 4, 2); // 2026年5月2日
        const currentDate = new Date(eventDate);
        currentDate.setDate(eventDate.getDate() + day - 2);
        
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();
        const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
        const dayName = dayNames[currentDate.getDay()];
        
        return `${month}/${date}(${dayName})`;
    }
});