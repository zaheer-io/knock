// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
const brandLogo = document.querySelector('.brand-logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Logo click to scroll to top
if (brandLogo) {
    brandLogo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"], .btn-secondary').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href === '#' ? '#what-is-knock' : href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ==================== FLOATING ORBS MOUSE TRACKING ====================
const orbs = document.querySelectorAll('.orb');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateOrbs() {
    orbs.forEach((orb, index) => {
        const rect = orb.getBoundingClientRect();
        const orbX = rect.left + rect.width / 2;
        const orbY = rect.top + rect.height / 2;

        const deltaX = (mouseX - orbX) * 0.02;
        const deltaY = (mouseY - orbY) * 0.02;

        const currentTransform = orb.style.transform || '';
        orb.style.transform = `${currentTransform} translate(${deltaX}px, ${deltaY}px)`;
    });

    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ==================== CARD TILT EFFECT ====================
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ==================== DEMO SCREEN CAROUSEL ====================
let currentScreen = 1;
const totalScreens = 4;
let autoPlayInterval;

function showScreen(screenNumber) {
    document.querySelectorAll('.demo-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.querySelectorAll('.demo-dot').forEach(dot => {
        dot.classList.remove('active');
    });

    const targetScreen = document.querySelector(`.demo-screen[data-screen="${screenNumber}"]`);
    const targetDot = document.querySelector(`.demo-dot[data-screen="${screenNumber}"]`);

    if (targetScreen) targetScreen.classList.add('active');
    if (targetDot) targetDot.classList.add('active');

    currentScreen = screenNumber;
}

function nextScreen() {
    currentScreen = currentScreen >= totalScreens ? 1 : currentScreen + 1;
    showScreen(currentScreen);
}

// Auto-play carousel
function startAutoPlay() {
    autoPlayInterval = setInterval(nextScreen, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

startAutoPlay();

// Manual controls
document.querySelectorAll('.demo-dot').forEach(dot => {
    dot.addEventListener('click', function () {
        stopAutoPlay();
        showScreen(parseInt(this.dataset.screen));
        startAutoPlay();
    });
});

// Pause on hover
const demoContainer = document.querySelector('.demo-container');
if (demoContainer) {
    demoContainer.addEventListener('mouseenter', stopAutoPlay);
    demoContainer.addEventListener('mouseleave', startAutoPlay);
}

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }

    // Parallax for orbs
    orbs.forEach((orb, index) => {
        const speed = 0.05 + (index * 0.02);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== BATTLE TIMER ANIMATION ====================
function animateBattleTimer() {
    const timers = document.querySelectorAll('.card-timer');

    timers.forEach(timer => {
        let minutes = 25;
        let seconds = 0;
        let counting = false;

        timer.addEventListener('click', function () {
            if (!counting) {
                counting = true;
                const interval = setInterval(() => {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(interval);
                            counting = false;
                            timer.textContent = '25:00';
                            return;
                        }
                        minutes--;
                        seconds = 59;
                    } else {
                        seconds--;
                    }

                    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }, 100);
            }
        });
    });
}

animateBattleTimer();

// ==================== FORM HANDLING ====================
const waitlistForm = document.getElementById('waitlist-form');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const userType = document.getElementById('user-type').value;

        if (name && email && userType) {
            // Success animation
            const btn = this.querySelector('.btn-primary');
            const originalText = btn.textContent;

            btn.textContent = '✓ Added to Waitlist!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            // Reset form
            setTimeout(() => {
                this.reset();
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);

            // Show alert
            alert(`Thanks ${name}! You've been added to the Knock waitlist. Get ready to level up your productivity! 🚀`);
        }
    });
}

// ==================== BUTTON CLICK EFFECTS ====================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== SCROLL TO TOP ON TAB/LOGO ====================
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    }
});

// ==================== WAITLIST BUTTON SCROLL ====================
const waitlistBtn = document.getElementById('waitlist-btn');
if (waitlistBtn) {
    waitlistBtn.addEventListener('click', () => {
        document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
    });
}

const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        document.getElementById('what-is-knock').scrollIntoView({ behavior: 'smooth' });
    });
}

// ==================== CURSOR GLOW EFFECT ====================
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent);
    pointer-events: none;
    z-index: 9999;
    filter: blur(10px);
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ==================== CONSOLE EASTER EGG ====================
console.log('%c🎯 KNOCK - Gamified Productivity', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
console.log('%cFocus. Battle. Level Up.', 'font-size: 14px; color: #3b82f6;');
console.log('%cInterested in joining the team? Email us at knock.focus@gmail.com', 'font-size: 12px; color: #a8a8b8;');

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
