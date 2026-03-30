// ==========================================
// AB Studio - Main JavaScript File (Enhanced)
// ==========================================

// Global Variables
let currentSelectedService = "";
let currentSelectedPrice = 0;
let currentLanguage = 'si';

// Service Data with Online Images
const serviceData = {
    "Logo & Branding": {
        count: 10,
        images: [
            "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=500",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
            "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500",
            "https://images.unsplash.com/photo-1557683316-973673baf926?w=500",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500"
        ]
    },
    "Social Media Posts": {
        count: 20,
        images: [
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500",
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500",
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500",
            "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500",
            "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500",
            "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500",
            "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500",
            "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500",
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500",
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500",
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500",
            "https://images.unsplash.com/photo-1522542550221-31fd8575f5cb?w=500",
            "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500",
            "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500",
            "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=500"
        ]
    },
    "Flyers & Brochures": { 
        count: 15, 
        images: [
            "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=500",
            "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500",
            "https://images.unsplash.com/photo-1557683316-973673baf926?w=500",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500",
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500",
            "https://images.unsplash.com/photo-1522542550221-31fd8575f5cb?w=500"
        ]
    },
    "Cover Pages": { 
        count: 12, 
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500",
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500",
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500",
            "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500",
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"
        ]
    },
    "Web Design": { 
        count: 10, 
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500",
            "https://images.unsplash.com/photo-1547658719-489a8c9c2e0?w=500",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500",
            "https://images.unsplash.com/photo-1522542550221-31fd8575f5cb?w=500",
            "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500",
            "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500",
            "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=500",
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500"
        ]
    },
    "Business Cards": {
        count: 8,
        images: [
            "https://images.unsplash.com/photo-1557683316-973673baf926?w=500",
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500"
        ]
    },
    "Motion Graphics": {
        count: 8,
        images: [
            "https://images.unsplash.com/photo-1557683316-973673baf926?w=500",
            "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
            "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500"
        ]
    },
    "UI/UX Design": {
        count: 8,
        images: [
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
            "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500",
            "https://images.unsplash.com/photo-1557683316-973673baf926?w=500",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"
        ]
    }
};

// ==========================================
// SCROLL REVEAL ANIMATIONS WITH INTERSECTION OBSERVER
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing for better performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!mobileMenuToggle || !mobileNav) return;
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!mobileMenuToggle || !mobileNav) return;
    
    mobileMenuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ==========================================
// MODAL CONTROLS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const closeProfileModal = document.getElementById('closeProfileModal');

    if (loginBtn && modalOverlay) {
        loginBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            // Clear form errors
            document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
            document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
        });
    }

    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => {
            document.getElementById('profileModal').classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
            document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
        }
        if (e.target.id === 'profileModal') {
            document.getElementById('profileModal').classList.remove('active');
        }
    });

    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');

    if (showSignup) {
        showSignup.addEventListener('click', () => {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('signupSection').style.display = 'block';
            // Clear errors
            document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
            document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', () => {
            document.getElementById('signupSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'block';
            // Clear errors
            document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
            document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
        });
    }

    // Initialize all components
    initScrollReveal();
    initHeaderScroll();
    initMobileMenu();
    initReviewSlider();
    initContactFormValidation();
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLang') || 'si';
    changeLanguage(savedLang);
});

// ==========================================
// PAGE NAVIGATION LOGIC
// ==========================================
function hideAllSections() {
    const sections = [
        '#homeHero', '#homeServices', '#fullServicesPage', 
        '#portfolioDetail', '#orderFormSection', '#aboutSection', 
        '#portfolioSection', '#contactSection', '#trackingSection', 
        '#reviewsSection', '#pricingSection'
    ];
    sections.forEach(id => {
        const el = document.querySelector(id);
        if (el) el.style.display = 'none';
    });
}

function showHomePage() {
    hideAllSections();
    const homeHero = document.getElementById('homeHero');
    const homeServices = document.getElementById('homeServices');
    const pricingSection = document.getElementById('pricingSection');
    const mobileContact = document.querySelector('.mobile-contact-section');
    
    if (homeHero) homeHero.style.display = 'flex';
    if (homeServices) homeServices.style.display = 'block';
    if (pricingSection) pricingSection.style.display = 'block';
    if (mobileContact) mobileContact.style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Re-trigger scroll reveal for visible elements
    setTimeout(initScrollReveal, 100);
}

function showServicesPage() {
    hideAllSections();
    const fullServices = document.getElementById('fullServicesPage');
    if (fullServices) fullServices.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(initScrollReveal, 100);
}

function showPortfolioPage() {
    hideAllSections();
    const portfolioSection = document.getElementById('portfolioSection');
    if (portfolioSection) portfolioSection.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(initScrollReveal, 100);
}

function showAboutPage() {
    hideAllSections();
    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection) aboutSection.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(initScrollReveal, 100);
}

function showContactPage() {
    hideAllSections();
    const contactSection = document.getElementById('contactSection');
    if (contactSection) contactSection.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(initScrollReveal, 100);
}

function showTracking() {
    hideAllSections();
    const trackingSection = document.getElementById('trackingSection');
    if (trackingSection) trackingSection.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(initScrollReveal, 100);
}

function showReviews() {
    hideAllSections();
    const reviewsSection = document.getElementById('reviewsSection');
    if (reviewsSection) reviewsSection.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(initScrollReveal, 100);
}

// ==========================================
// PORTFOLIO & ORDER LOGIC
// ==========================================
function showPortfolio(serviceName) {
    const data = serviceData[serviceName];
    if (!data) return;

    hideAllSections();
    
    const detailSection = document.getElementById('portfolioDetail');
    const grid = document.getElementById('portfolioGrid');
    const titleHeader = document.getElementById('detailTitle');
    
    if (detailSection) detailSection.style.display = 'block';
    if (titleHeader) titleHeader.innerText = serviceName;
    if (grid) grid.innerHTML = "";

    data.images.forEach((imgSrc, index) => {
        const item = document.createElement('div');
        item.className = 'card';
        item.style.cssText = "margin-bottom: 20px; animation: cardPopup 0.5s ease " + (index * 0.05) + "s both;";
        item.innerHTML = `
            <img src="${imgSrc}" alt="Design ${index + 1}" style="width:100%; height:250px; object-fit: cover; border-radius: 10px;" onerror="this.src='https://via.placeholder.com/300?text=Image+Not+Found'">
            <div style="padding: 15px; text-align: center;">
                <p style="font-weight: bold; margin-bottom: 10px; color: var(--dark-color);">Design #${index + 1}</p>
                <button onclick="placeOrder('${serviceName}', ${index + 1})" class="submit-btn" style="padding: 10px 20px; font-size: 0.9rem; cursor: pointer;">
                    <i class="fas fa-shopping-cart"></i> Place Order
                </button>
            </div>
        `;
        if (grid) grid.appendChild(item);
    });
    window.scrollTo(0, 0);
}

function backToHome() {
    showHomePage();
}

function placeOrder(service, id) {
    const phone = "94704025586"; 
    const message = `Hello Ab Studio! I want to place an order for ${service} (Design ID: ${id})`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function showOrderForm() {
    hideAllSections();
    const formSection = document.getElementById('orderFormSection');
    if (formSection) {
        formSection.style.display = 'block';
        // Pre-fill user data if logged in
        if (typeof currentUserData !== 'undefined' && currentUserData) {
            const fullNameInput = document.getElementById('fullName');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');
            if (fullNameInput) fullNameInput.value = currentUserData.name || '';
            if (phoneInput) phoneInput.value = currentUserData.phone || '';
            if (emailInput) emailInput.value = currentUserData.email || '';
        }
    }
    window.scrollTo(0, 0);
}

function backToPortfolio() {
    hideAllSections();
    const portfolioDetail = document.getElementById('portfolioDetail');
    if (portfolioDetail) portfolioDetail.style.display = 'block';
}

// Form Validation for Order Form
function validateOrderForm() {
    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    
    let isValid = true;
    
    // Validate name
    if (!fullName.value.trim() || fullName.value.trim().length < 2) {
        showFieldError('fullName', 'fullNameError', true);
        isValid = false;
    } else {
        showFieldError('fullName', 'fullNameError', false);
    }
    
    // Validate phone
    const phoneRegex = /^(07|\+947)[0-9]{8}$/;
    if (!phone.value.trim() || !phoneRegex.test(phone.value.replace(/\s/g, ''))) {
        showFieldError('phone', 'phoneError', true);
        isValid = false;
    } else {
        showFieldError('phone', 'phoneError', false);
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        showFieldError('email', 'emailError', true);
        isValid = false;
    } else {
        showFieldError('email', 'emailError', false);
    }
    
    return isValid;
}

function showFieldError(fieldId, errorId, show) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field && error) {
        if (show) {
            field.classList.add('error');
            error.classList.add('show');
        } else {
            field.classList.remove('error');
            error.classList.remove('show');
        }
    }
}

function processOrder(event) {
    event.preventDefault();
    
    // Validate form
    if (!validateOrderForm()) {
        showNotification(currentLanguage === 'si' ? 'කරුණාකර වලංගු තොරතුරු ඇතුළත් කරන්න.' : 'Please enter valid information.', 'error');
        return;
    }
    
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const sizeInput = document.getElementById('designSize').value.toUpperCase();
    const formatInput = document.getElementById('fileFormat').value;
    const coverDetails = document.getElementById('coverDetails').value;
    const deliveryMethod = document.getElementById('deliveryMethod').value;
    
    let finalPrice = currentSelectedPrice || 0; 
    
    if (sizeInput.includes('A3')) {
        finalPrice = 1000;
    } else if (sizeInput.includes('A4')) {
        finalPrice = 750;
    }

    if (formatInput.includes('PSD')) {
        finalPrice += 250;
    }

    const details = `Size: ${sizeInput || 'Standard'}, Format: ${formatInput}, Delivery: ${deliveryMethod}${coverDetails ? ', Details: ' + coverDetails : ''}`;
    
    const url = `payment.html?service=${encodeURIComponent(currentSelectedService)}&price=${finalPrice}&name=${encodeURIComponent(fullName)}&details=${encodeURIComponent(details)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`;
    window.location.href = url;
}

function openOrderForm(serviceName, price) {
    currentSelectedService = serviceName;
    currentSelectedPrice = price;
    hideAllSections();
    const formSection = document.getElementById('orderFormSection');
    if (formSection) {
        formSection.style.display = 'block';
        // Pre-fill user data if logged in
        if (typeof currentUserData !== 'undefined' && currentUserData) {
            const fullNameInput = document.getElementById('fullName');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');
            if (fullNameInput) fullNameInput.value = currentUserData.name || '';
            if (phoneInput) phoneInput.value = currentUserData.phone || '';
            if (emailInput) emailInput.value = currentUserData.email || '';
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// SEARCH & FILTERING
// ==========================================
function searchServices() {
    let input = document.getElementById('serviceSearch');
    if (!input) return;
    
    let filter = input.value.toLowerCase();
    let cards = document.getElementsByClassName('service-item');
    
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3');
        let desc = cards[i].querySelector('p');
        
        if (title && desc) {
            let titleText = title.innerText.toLowerCase();
            let descText = desc.innerText.toLowerCase();
            
            if (titleText.includes(filter) || descText.includes(filter)) {
                cards[i].style.display = "block";
                cards[i].classList.add('show');
            } else {
                cards[i].style.display = "none";
                cards[i].classList.remove('show');
            }
        }
    }
}

function filterPortfolio(category) {
    const items = document.querySelectorAll('#mainPortfolioGrid .portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
        } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
        }
    });
}

// ==========================================
// REVIEW SLIDER
// ==========================================
let currentIdx = 0;
let reviewTimer;

function initReviewSlider() {
    const slider = document.getElementById('reviewSlider');
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (slider && reviewCards.length > 0) {
        reviewTimer = setInterval(nextReview, 5000);
        slider.parentElement.addEventListener('mouseenter', () => clearInterval(reviewTimer));
        slider.parentElement.addEventListener('mouseleave', () => {
            reviewTimer = setInterval(nextReview, 5000);
        });
    }
}

function updateSlider() {
    const slider = document.getElementById('reviewSlider');
    const reviewCards = document.querySelectorAll('.review-card');
    if (slider && reviewCards.length > 0) {
        slider.style.transform = `translateX(-${currentIdx * 100}%)`;
    }
}

function nextReview() {
    const reviewCards = document.querySelectorAll('.review-card');
    if (reviewCards.length > 0) {
        currentIdx = (currentIdx + 1) % reviewCards.length;
        updateSlider();
    }
}

function prevReview() {
    const reviewCards = document.querySelectorAll('.review-card');
    if (reviewCards.length > 0) {
        currentIdx = (currentIdx - 1 + reviewCards.length) % reviewCards.length;
        updateSlider();
    }
}

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================
function initContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName')?.value.trim();
            const whatsapp = document.getElementById('contactWhatsApp')?.value.trim();
            const message = document.getElementById('contactMessage')?.value.trim();
            
            let isValid = true;
            
            // Validate name
            if (!name || name.length < 2) {
                showFieldError('contactName', 'contactNameError', true);
                isValid = false;
            } else {
                showFieldError('contactName', 'contactNameError', false);
            }
            
            // Validate WhatsApp
            const phoneRegex = /^(07|\+947)[0-9]{8}$/;
            if (!whatsapp || !phoneRegex.test(whatsapp.replace(/\s/g, ''))) {
                showFieldError('contactWhatsApp', 'contactWhatsAppError', true);
                isValid = false;
            } else {
                showFieldError('contactWhatsApp', 'contactWhatsAppError', false);
            }
            
            // Validate message
            if (!message || message.length < 5) {
                showFieldError('contactMessage', 'contactMessageError', true);
                isValid = false;
            } else {
                showFieldError('contactMessage', 'contactMessageError', false);
            }
            
            if (!isValid) {
                showNotification(currentLanguage === 'si' ? 'කරුණාකර වලංගු තොරතුරු ඇතුළත් කරන්න.' : 'Please enter valid information.', 'error');
                return;
            }
            
            // Send to WhatsApp
            const phone = "94704025586";
            const whatsappMsg = `Hello AB Studio!%0A%0A*New Message*%0AName: ${name}%0AWhatsApp: ${whatsapp}%0AMessage: ${message}`;
            window.open(`https://wa.me/${phone}?text=${whatsappMsg}`, '_blank');
            
            showNotification(currentLanguage === 'si' ? 'ස්තූතියි! ඔබේ පණිවිඩය අප වෙත ලැබුණා.' : 'Thank you! Your message has been received.', 'success');
            this.reset();
        });
    }
}

// ==========================================
// LANGUAGE SWITCHER - FIXED & ENHANCED
// ==========================================
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update button states
    const btnSi = document.getElementById('btn-si');
    const btnEn = document.getElementById('btn-en');
    
    if (btnSi) {
        btnSi.classList.toggle('active', lang === 'si');
    }
    if (btnEn) {
        btnEn.classList.toggle('active', lang === 'en');
    }
    
    // Save preference
    localStorage.setItem('preferredLang', lang);
    
    // Update all elements with data-si and data-en attributes
    const elements = document.querySelectorAll('[data-si][data-en]');
    elements.forEach(el => {
        const newText = lang === 'si' ? el.getAttribute('data-si') : el.getAttribute('data-en');
        if (newText) {
            // Preserve any child elements (like icons)
            if (el.children.length > 0) {
                // Find text nodes and update them
                const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                if (textNodes.length > 0) {
                    textNodes[0].textContent = newText;
                } else {
                    // If no text node, check if first child is text-like
                    el.innerHTML = el.innerHTML.replace(el.textContent.trim(), newText);
                }
            } else {
                el.textContent = newText;
            }
        }
    });
    
    // Update placeholders for inputs
    const inputs = document.querySelectorAll('input[data-si-placeholder][data-en-placeholder], textarea[data-si-placeholder][data-en-placeholder]');
    inputs.forEach(input => {
        const newPlaceholder = lang === 'si' ? input.getAttribute('data-si-placeholder') : input.getAttribute('data-en-placeholder');
        if (newPlaceholder) {
            input.placeholder = newPlaceholder;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInNotification 0.4s ease reverse';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInNotification {
        from { transform: translateX(120%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes cardPopup {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=500',
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500',
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
window.addEventListener('load', preloadImages);

// ==========================================
// PRICING CARD ENTRANCE ANIMATIONS
// ==========================================
function initPricingAnimations() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                pricingObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        pricingObserver.observe(card);
    });
}

// Initialize pricing animations on load
document.addEventListener('DOMContentLoaded', initPricingAnimations);
