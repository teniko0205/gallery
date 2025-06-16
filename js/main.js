// 初始化 AOS 動畫
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 200,
        disable: 'mobile' // 在手機版停用動畫以提升效能
    });
});

// 響應式選單功能
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 點擊選單項目後關閉選單
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 平滑滾動功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 表單驗證函數
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    formGroup.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    formGroup.classList.remove('error');
}

// 聯絡表單提交處理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => removeError(input));
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // 驗證姓名
        if (!name.value.trim()) {
            showError(name, '請輸入您的姓名');
            isValid = false;
        }

        // 驗證電子郵件
        if (!email.value.trim()) {
            showError(email, '請輸入電子郵件');
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, '請輸入有效的電子郵件地址');
            isValid = false;
        }

        // 驗證訊息
        if (!message.value.trim()) {
            showError(message, '請輸入您的訊息');
            isValid = false;
        }

        if (isValid) {
            // 如果驗證通過，可以在這裡處理表單提交
            alert('表單提交成功！');
            contactForm.reset();
        }
    });
}

// 滾動時改變導覽列樣式
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        navbar.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(40, 44, 52, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// 作品集篩選功能
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 更新按鈕狀態
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        workItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === category) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    });
});

// Lightbox 功能
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-image');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxClose = lightbox.querySelector('.lightbox-close');

// 為每個作品項目添加點擊事件
workItems.forEach(item => {
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const desc = item.querySelector('p').textContent;

    item.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = `${title} - ${desc}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景捲動
    });
});

// 關閉 Lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// 捲動進度指示器
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// 優化作品集篩選動畫
workItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
});

// 當作品項目進入視窗時顯示
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

workItems.forEach(item => {
    observer.observe(item);
});

// 主題切換功能
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 檢查本地儲存的主題設定
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
} else {
    // 如果沒有儲存的主題，則使用系統預設
    const theme = prefersDarkScheme.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

// 切換主題
themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // 更新導覽列背景色（如果在頁面頂部）
    if (window.scrollY <= 50) {
        navbar.style.background = newTheme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(40, 44, 52, 0.95)';
    }
});

// 主題設定功能
const themeSettingsToggle = document.querySelector('.theme-settings-toggle');
const themeSettingsPanel = document.querySelector('.theme-settings-panel');
const colorInputs = document.querySelectorAll('.color-picker input[type="color"]');
const resetThemeButton = document.querySelector('.reset-theme');

// 預設主題顏色
const defaultTheme = {
    '--primary-color': '#282c34',
    '--secondary-color': '#61afef',
    '--text-color': '#abb2bf',
    '--accent-color': '#98c379'
};

// 從 localStorage 讀取保存的主題
function loadCustomTheme() {
    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        Object.entries(theme).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
            const input = document.querySelector(`input[data-var="${variable}"]`);
            if (input) input.value = value;
        });
    }
}

// 保存主題到 localStorage
function saveTheme(theme) {
    localStorage.setItem('customTheme', JSON.stringify(theme));
}

// 更新主題顏色
function updateThemeColor(variable, value) {
    document.documentElement.style.setProperty(variable, value);
    const currentTheme = JSON.parse(localStorage.getItem('customTheme') || '{}');
    currentTheme[variable] = value;
    saveTheme(currentTheme);
}

// 重置主題
function resetTheme() {
    Object.entries(defaultTheme).forEach(([variable, value]) => {
        document.documentElement.style.setProperty(variable, value);
        const input = document.querySelector(`input[data-var="${variable}"]`);
        if (input) input.value = value;
    });
    localStorage.removeItem('customTheme');
}

// 事件監聽器
themeSettingsToggle.addEventListener('click', () => {
    themeSettingsPanel.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!themeSettingsPanel.contains(e.target) && !themeSettingsToggle.contains(e.target)) {
        themeSettingsPanel.classList.remove('active');
    }
});

colorInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        updateThemeColor(e.target.dataset.var, e.target.value);
    });
});

resetThemeButton.addEventListener('click', resetTheme);

// 載入保存的主題
document.addEventListener('DOMContentLoaded', () => {
    loadCustomTheme();
});