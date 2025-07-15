// 背景テーマ管理システム
class BackgroundThemeManager {
    constructor() {
        this.themes = {
            normal: {
                name: '通常モード',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                particleType: 'hearts',
                particleColor: '#ff6b6b',
                textColor: '#333333',
                cardBackground: 'rgba(255, 255, 255, 0.95)',
                bodyClass: 'theme-normal'
            },
            space: {
                name: '宇宙モード',
                background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
                particleType: 'stars',
                particleColor: '#ffffff',
                textColor: '#ffffff',
                cardBackground: 'rgba(30, 30, 60, 0.9)',
                bodyClass: 'theme-space'
            },
            sakura: {
                name: '桜モード',
                background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
                particleType: 'sakura',
                particleColor: '#ff7675',
                textColor: '#2d3436',
                cardBackground: 'rgba(255, 255, 255, 0.9)',
                bodyClass: 'theme-sakura'
            },
            ocean: {
                name: '海モード',
                background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                particleType: 'bubbles',
                particleColor: '#00cec9',
                textColor: '#2d3436',
                cardBackground: 'rgba(255, 255, 255, 0.9)',
                bodyClass: 'theme-ocean'
            },
            sunset: {
                name: '夕焼けモード',
                background: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 50%, #e17055 100%)',
                particleType: 'sparkles',
                particleColor: '#fdcb6e',
                textColor: '#2d3436',
                cardBackground: 'rgba(255, 255, 255, 0.9)',
                bodyClass: 'theme-sunset'
            }
        };
        
        this.currentTheme = this.getStoredTheme() || 'normal';
        this.particleTypes = {
            hearts: '❤️',
            stars: '⭐',
            sakura: '🌸',
            bubbles: '🫧',
            sparkles: '✨',
            snowflakes: '❄️'
        };
        
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.createParticleContainer();
        this.setupStarField();
        
        // ページ読み込み時にテーマコントロールを作成（home.htmlのみ）
        if (window.location.pathname.includes('home.html')) {
            this.createThemeControls();
        }
    }
    
    getStoredTheme() {
        return localStorage.getItem('backgroundTheme');
    }
    
    saveTheme(themeName) {
        localStorage.setItem('backgroundTheme', themeName);
    }
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;
        
        this.currentTheme = themeName;
        this.saveTheme(themeName);
        
        // 既存のテーマクラスを削除
        Object.values(this.themes).forEach(t => {
            document.body.classList.remove(t.bodyClass);
        });
        
        // 新しいテーマクラスを追加
        document.body.classList.add(theme.bodyClass);
        
        // 背景を変更
        document.body.style.background = theme.background;
        
        // CSS変数を設定
        document.documentElement.style.setProperty('--theme-text-color', theme.textColor);
        document.documentElement.style.setProperty('--theme-card-background', theme.cardBackground);
        document.documentElement.style.setProperty('--theme-particle-color', theme.particleColor);
        
        // パーティクルシステムを更新
        this.updateParticleSystem(theme.particleType, theme.particleColor);
        
        // 宇宙モード専用の星座効果
        if (themeName === 'space') {
            this.createStarsEffect();
        } else {
            this.removeStarsEffect();
        }
    }
    
    createThemeControls() {
        // テーマ選択ボタンがない場合は作成
        if (!document.getElementById('theme-controls')) {
            const themeSection = document.createElement('section');
            themeSection.className = 'theme-section';
            themeSection.id = 'theme-controls';
            
            const themeTitle = document.createElement('h2');
            themeTitle.textContent = '🎨 背景テーマ設定';
            themeSection.appendChild(themeTitle);
            
            const themeContainer = document.createElement('div');
            themeContainer.className = 'theme-container';
            
            Object.keys(this.themes).forEach(themeKey => {
                const theme = this.themes[themeKey];
                const button = document.createElement('button');
                button.className = `theme-btn ${themeKey === this.currentTheme ? 'active' : ''}`;
                button.textContent = theme.name;
                button.onclick = () => this.switchTheme(themeKey);
                themeContainer.appendChild(button);
            });
            
            themeSection.appendChild(themeContainer);
            
            // パーティクル設定セクション
            const particleSection = document.createElement('div');
            particleSection.className = 'particle-section';
            
            const particleTitle = document.createElement('h3');
            particleTitle.textContent = '🌟 流れる要素設定';
            particleSection.appendChild(particleTitle);
            
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particle-container';
            
            Object.keys(this.particleTypes).forEach(particleKey => {
                const button = document.createElement('button');
                button.className = 'particle-btn';
                button.textContent = this.particleTypes[particleKey] + ' ' + this.getParticleName(particleKey);
                button.onclick = () => this.changeParticleType(particleKey);
                particleContainer.appendChild(button);
            });
            
            particleSection.appendChild(particleContainer);
            themeSection.appendChild(particleSection);
            
            // home.htmlのgift-sectionの後に挿入
            const giftSection = document.querySelector('.gift-section');
            if (giftSection) {
                giftSection.parentNode.insertBefore(themeSection, giftSection.nextSibling);
            }
        }
    }
    
    getParticleName(particleKey) {
        const names = {
            hearts: 'ハート',
            stars: '星',
            sakura: '桜',
            bubbles: '泡',
            sparkles: 'キラキラ',
            snowflakes: '雪'
        };
        return names[particleKey] || particleKey;
    }
    
    switchTheme(themeName) {
        this.applyTheme(themeName);
        
        // ボタンのアクティブ状態を更新
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const buttons = document.querySelectorAll('.theme-btn');
        const index = Object.keys(this.themes).indexOf(themeName);
        if (buttons[index]) {
            buttons[index].classList.add('active');
        }
    }
    
    changeParticleType(particleType) {
        const theme = this.themes[this.currentTheme];
        this.updateParticleSystem(particleType, theme.particleColor);
    }
    
    createParticleContainer() {
        // パーティクルコンテナを作成
        if (!document.getElementById('particle-container')) {
            const container = document.createElement('div');
            container.id = 'particle-container';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '1';
            document.body.appendChild(container);
        }
    }
    
    updateParticleSystem(particleType, particleColor) {
        const container = document.getElementById('particle-container');
        if (!container) return;
        
        // 既存のパーティクルをクリア
        container.innerHTML = '';
        
        // 新しいパーティクルを作成
        const particleChar = this.particleTypes[particleType] || '❤️';
        
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = particleChar;
            particle.style.position = 'absolute';
            particle.style.fontSize = Math.random() * 20 + 15 + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.color = particleColor;
            container.appendChild(particle);
        }
    }
    
    setupStarField() {
        // 星座背景用のキャンバス準備
        if (!document.getElementById('star-field')) {
            const canvas = document.createElement('canvas');
            canvas.id = 'star-field';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '0';
            document.body.appendChild(canvas);
        }
    }
    
    createStarsEffect() {
        const canvas = document.getElementById('star-field');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const stars = [];
        const numStars = 150;
        
        // 星を生成
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
        
        // 星座の線を描画するための星のペア
        const constellations = [];
        for (let i = 0; i < 8; i++) {
            const star1 = stars[Math.floor(Math.random() * stars.length)];
            const star2 = stars[Math.floor(Math.random() * stars.length)];
            if (star1 !== star2) {
                const distance = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2));
                if (distance < 200) {
                    constellations.push({ star1, star2, opacity: 0.3 });
                }
            }
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 星座の線を描画
            constellations.forEach(constellation => {
                ctx.beginPath();
                ctx.moveTo(constellation.star1.x, constellation.star1.y);
                ctx.lineTo(constellation.star2.x, constellation.star2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${constellation.opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            });
            
            // 星を描画
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                
                // 星の瞬き効果
                star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
                star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            });
            
            if (document.body.classList.contains('theme-space')) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
        
        // ウィンドウリサイズ対応
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    removeStarsEffect() {
        const canvas = document.getElementById('star-field');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}

// グローバルに利用可能にする
window.backgroundThemeManager = new BackgroundThemeManager();

// 他のページでも同じテーマを適用
document.addEventListener('DOMContentLoaded', () => {
    if (window.backgroundThemeManager) {
        window.backgroundThemeManager.applyTheme(window.backgroundThemeManager.currentTheme);
    }
});
