// --- 1. HIỆU ỨNG TRÁI TIM BAY LÊN (TRANG 1 & KHI MỞ THƯ) ---
const heartContainer = document.getElementById('heart-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '&#x2764;'; 
    const randomLeft = Math.random() * window.innerWidth;
    heart.style.left = `${randomLeft}px`; 
    const randomSize = Math.floor(Math.random() * 18) + 18;
    heart.style.fontSize = `${randomSize}px`;
    const randomDuration = Math.random() * 3 + 5;
    heart.style.animationDuration = `${randomDuration}s`;
    const randomDelay = Math.random() * 0.5;
    heart.style.animationDelay = `${randomDelay}s`;
    heartContainer.appendChild(heart);
    setTimeout(() => { heart.remove(); }, (randomDuration + randomDelay) * 1000 + 100); 
}

function startCoverHearts() {
    // Trái tim nhẹ nhàng ở trang bìa
    for (let i = 0; i < 5; i++) {
        setTimeout(() => { createHeart(); }, i * 500); 
    }
    // Lặp lại hiệu ứng trái tim nhẹ nhàng mỗi 5 giây
    setInterval(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => { createHeart(); }, i * 500);
        }
    }, 5000); 
}
document.addEventListener('DOMContentLoaded', startCoverHearts);


// --- 2. HÀM TẠO VÀ KIỂM SOÁT SAO BĂNG ---
let starIntervalHigh = null; 
let starIntervalLow = null; 

function createStar(messageArea) {
    if (!messageArea) return; 
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 80}vw`; 
    star.style.top = `${Math.random() * 30}vh`;
    const randomDuration = Math.random() * 1 + 3.5; 
    star.style.setProperty('--duration', `${randomDuration}s`); 
    messageArea.appendChild(star);
    star.addEventListener('animationend', () => {
        star.remove();
    });
}

function startShootingStars(frequency) {
    const messageArea = document.getElementById('message-area');
    if (!messageArea) return;
    
    // Luôn dừng tần suất cũ để tránh hiệu ứng bị chồng lên nhau
    if (starIntervalHigh) clearInterval(starIntervalHigh);
    if (starIntervalLow) clearInterval(starIntervalLow);
    starIntervalHigh = null;
    starIntervalLow = null;
    
    // Thiết lập tần suất
    const initialCount = (frequency === 'high') ? 15 : 5;
    const intervalTime = (frequency === 'high') ? 1500 : 3000;
    
    // Bắn sao băng ban đầu
    for (let i = 0; i < initialCount; i++) {
        setTimeout(() => { createStar(messageArea); }, i * 300); 
    }
    
    // Tạo sao băng liên tục
    if (frequency === 'high') {
        starIntervalHigh = setInterval(() => { createStar(messageArea); }, intervalTime);
    } else {
        starIntervalLow = setInterval(() => { createStar(messageArea); }, intervalTime);
    }
}


// --- 3. CHỨC NĂNG CHUYỂN CẢNH KHI NHẤN MŨI TÊN ---
function scrollToNext() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.transform = 'translateY(-100vh)';
        const arrow = document.querySelector('.scroll-down-arrow');
        if (arrow) {
            arrow.onclick = null;
            arrow.style.opacity = '0.5'; 
        }
        // KÍCH HOẠT SAO BĂNG TẦN SỐ CAO (TRANG 2)
        startShootingStars('high'); 
    } else {
        console.error("Lỗi: Không tìm thấy div#main-content!");
    }
}


// --- 4. LOGIC MỞ PHONG BÌ (SAO BĂNG THẤP + TRÁI TIM + NỘI DUNG THƯ) ---
function openAndRevealMessage() {
    const envelopeScene = document.getElementById('envelope-scene');
    const fixedLetter = document.getElementById('fixed-letter'); 
    
    // 1. KÍCH HOẠT HIỆU ỨNG MỞ THƯ (Gần như ngay lập tức)
    envelopeScene.classList.add('opened');
    fixedLetter.classList.add('opened'); 
    envelopeScene.onclick = null; 

    // 2. CHUYỂN SAO BĂNG SANG TẦN SỐ THẤP (Ngay sau khi click)
    // Tự động gọi startShootingStars('low') sẽ dừng high interval và bắt đầu low interval
    startShootingStars('low'); 

    // 3. KÍCH HOẠT HIỆU ỨNG TRÁI TIM MẠNH (Sau khi hiệu ứng mở thư bắt đầu)
    setTimeout(() => {
        // Trái tim bay lên mạnh (burst)
        for (let i = 0; i < 15; i++) {
            setTimeout(() => { createHeart(); }, i * 150); 
        }
    }, 1500); 
}