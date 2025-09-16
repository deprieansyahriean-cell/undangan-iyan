// Background Music Control
let isPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIcon = document.getElementById('musicIcon');

function toggleMusic() {
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(e => {
            console.log('Audio play failed:', e);
        });
        musicIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        isPlaying = true;
    }
}

// Auto start music when content page is shown
function startBackgroundMusic() {
    backgroundMusic.play().then(() => {
        isPlaying = true;
        musicIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }).catch(e => {
        console.log('Autoplay prevented:', e);
    });
}
// Page Navigation
function showContentPage() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('contentPage').style.display = 'block';
    
    // Start background music
    startBackgroundMusic();
    
    // Initialize scroll animations
    initializeAnimations();
    
    // Animate section titles
    setTimeout(() => {
        const sectionTitles = document.querySelectorAll('.content-page .section-title');
        sectionTitles.forEach((title, index) => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(30px)';
            title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }, 200);
}

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2025-09-15T08:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Check if elements exist before updating
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        if (daysElement) daysElement.textContent = '00';
        if (hoursElement) hoursElement.textContent = '00';
        if (minutesElement) minutesElement.textContent = '00';
        if (secondsElement) secondsElement.textContent = '00';
    }
}

// Modal functions
function openModal(mediaId) {
    const modal = document.getElementById('mediaModal');
    const modalContent = document.getElementById('modalContent');
    
    modal.style.display = 'block';
    
    if (mediaId === 'img1') {
        modalContent.innerHTML = `<img src="prewed1.jpg" alt="Pre-wedding">`;
    } else if (mediaId === 'img2') {
        modalContent.innerHTML = `<img src="prewed2.jpg" alt="Pre-wedding">`;
    } else if (mediaId === 'img3') {
        modalContent.innerHTML = `<img src="prewed3.jpg" alt="Pre-wedding">`;
    }
}

function closeModal() {
    const modal = document.getElementById('mediaModal');
    const modalContent = document.getElementById('modalContent');
    modal.style.display = 'none';
    modalContent.innerHTML = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('mediaModal');
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // Close modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Smooth scrolling for navbar on content page
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar && document.getElementById('contentPage').style.display !== 'none') {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(20, 20, 20, 0.95)';
            } else {
                navbar.style.background = 'rgba(20, 20, 20, 0.9)';
            }
        }
    });
    
    // Initialize page - show main page
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('contentPage').style.display = 'none';
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Function to observe elements for animations
function observeElements() {
    const elementsToObserve = document.querySelectorAll('.character-card, .episode-card, .gallery-item, .countdown-item, .location-card');
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when content page is shown
function initializeAnimations() {
    setTimeout(() => {
        observeElements();
    }, 500);
}

// Enhanced showContentPage function
function showContentPage() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('contentPage').style.display = 'block';
    
    // Start background music
    startBackgroundMusic();
    
    // Initialize scroll animations
    initializeAnimations();
    
    // Animate section titles
    setTimeout(() => {
        const sectionTitles = document.querySelectorAll('.content-page .section-title');
        sectionTitles.forEach((title, index) => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(30px)';
            title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }, 200);
}

// Touch and swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Detect swipe gestures for modal close
    if (Math.abs(deltaY) > 100 && Math.abs(deltaX) < 100) {
        const modal = document.getElementById('mediaModal');
        if (modal.style.display === 'block') {
            closeModal();
        }
    }
}, false);

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);