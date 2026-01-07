// ========================================
// WebNExZ Foundation - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initAnimations();
    initApplicationForm();
});

// ----------------------------------------
// Navbar Scroll Effect
// ----------------------------------------
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    function handleScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
}

// ----------------------------------------
// Mobile Menu Toggle
// ----------------------------------------
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.toggle('open');

        if (menuIcon && closeIcon) {
            menuIcon.style.display = isOpen ? 'none' : 'block';
            closeIcon.style.display = isOpen ? 'block' : 'none';
        }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            if (menuIcon && closeIcon) {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    });
}

// ----------------------------------------
// Scroll Animations
// ----------------------------------------
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });
}

// ----------------------------------------
// Application Form
// ----------------------------------------
function initApplicationForm() {
    const form = document.getElementById('application-form');
    const formContainer = document.getElementById('form-container');
    const successContainer = document.getElementById('success-container');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const college = document.getElementById('college').value.trim();
        const whyJoin = document.getElementById('whyJoin').value.trim();
        const commitment = document.getElementById('commitment').checked;

        // Validation
        if (!name || !email || !college || !whyJoin) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (!commitment) {
            showToast('Please confirm your commitment to the fellowship.', 'error');
            return;
        }

        // WhatsApp message format
        const message = `
*New Fellowship Application*

Name: ${name}
Email: ${email}
College / Status: ${college}

Why Join:
${whyJoin}

✅ Commitment: Confirmed
    `.trim();

        const whatsappNumber = "8886200010";
        const whatsappURL = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // UI success
            if (formContainer && successContainer) {
                formContainer.classList.add('hidden');
                successContainer.classList.remove('hidden');
            }

            showToast('Redirecting to WhatsApp...', 'success');

            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 800);
    });
}


// ----------------------------------------
// Utility Functions
// ----------------------------------------
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showToast(message, type) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(function (toast) {
        toast.remove();
    });

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;

    // Add styles
    toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#22c55e' : '#ef4444'};
    color: white;
    border-radius: 0.75rem;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 10px 40px -10px ${type === 'success' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'};
  `;

    // Add animation keyframes if not exists
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }
    `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(function () {
        toast.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(function () {
            toast.remove();
        }, 300);
    }, 3000);
}

// ----------------------------------------
// Smooth Scroll for Anchor Links
// ----------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ----------------------------------------
// Active Nav Link Highlighting (FIXED)
// ----------------------------------------
// function setActiveNavLink() {
//     const currentPath = window.location.pathname.replace(/\/$/, '');
//     const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

//     navLinks.forEach(link => {
//         const href = link.getAttribute('href');

//         // Normalize href
//         let linkPath = href
//             .replace('./', '')
//             .replace('index.html', '')
//             .replace('.html', '')
//             .replace(/\/$/, '');

//         // Normalize current path
//         let pagePath = currentPath
//             .replace('/index.html', '')
//             .replace('.html', '');

//         if (pagePath === '') pagePath = '/';

//         if (pagePath === '/' && (linkPath === '' || linkPath === '/')) {
//             link.classList.add('active');
//         } 
//         else if (pagePath === `/${linkPath}`) {
//             link.classList.add('active');
//         } 
//         else {
//             link.classList.remove('active');
//         }
//     });
// }

// // Call on page load
// document.addEventListener('DOMContentLoaded', setActiveNavLink);



const APPLICATION_OPEN_DATE = "2026-01-19T18:00:00+05:30";


function initCountdown() {
    const openTime = new Date(APPLICATION_OPEN_DATE).getTime();

    const countdownSection = document.getElementById("countdown-section");
    const formContainer = document.getElementById("form-container");
    const appStatus = document.getElementById("app-status");
    const openDateText = document.getElementById("open-date-text");

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const openDateObj = new Date(openTime);

    // 🔹 Auto-update date text
    openDateText.innerHTML = `
    <strong>${openDateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })}</strong>
    at
    <strong>${openDateObj.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    })} IST</strong>
  `;

    // 🔹 Helper functions
    function hideFormShowTimer() {
        formContainer?.classList.add("hidden");
        countdownSection?.classList.remove("hidden");

        appStatus.textContent = "Applications Not Open Yet";
        appStatus.classList.add("badge-closed");
    }

    function showFormHideTimer() {
        formContainer?.classList.remove("hidden");
        countdownSection?.classList.add("hidden");

        appStatus.textContent = "Applications Open";
        appStatus.classList.remove("badge-closed");
    }

    // 🔹 INITIAL STATE CHECK (IMPORTANT)
    const now = Date.now();

    if (now < openTime) {
        hideFormShowTimer();
    } else {
        showFormHideTimer();
        return; // ⛔ stop countdown completely
    }

    // 🔹 COUNTDOWN LOOP
    const timer = setInterval(() => {
        const currentTime = Date.now();
        const distance = openTime - currentTime;

        if (distance <= 0) {
            clearInterval(timer);
            showFormHideTimer();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }, 1000);
}


// Call it
document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initApplicationForm();
});




document.getElementById("wnxNotifyBtn").addEventListener("click", function () {
    const whatsappNumber = "918886200010";

    const message = `
Hi WebNexZ Foundation Team,
Please notify me when fellowship applications open.
    `;

    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");
});

