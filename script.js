// Set Current Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.mobile-menu-btn i');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('ph-list');
        menuIcon.classList.add('ph-x');
    } else {
        menuIcon.classList.remove('ph-x');
        menuIcon.classList.add('ph-list');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('ph-x');
        menuIcon.classList.add('ph-list');
    });
});

// Scroll Reveal Animation (Intersection Observer)
const fadeElements = document.querySelectorAll('.fade-up');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Navbar Shadow on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(62, 39, 35, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(62, 39, 35, 0.05)';
    }
});

// Google Sheets Form Submission
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
const form = document.forms['contactForm'];
const statusDiv = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();

    // Check if URL is placeholder
    if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        statusDiv.style.display = 'block';
        statusDiv.className = 'form-message error-msg';
        statusDiv.innerText = 'LINK Google Apps Script';
        return;
    }

    submitBtn.innerHTML = 'Sending... <i class="ph ph-spinner-gap ph-spin"></i>';
    submitBtn.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            statusDiv.style.display = 'block';
            statusDiv.className = 'form-message success-msg';
            statusDiv.innerText = 'Thank you! Your message has been sent successfully.';
            form.reset();
            submitBtn.innerHTML = 'Send Message <i class="ph ph-paper-plane-tilt"></i>';
            submitBtn.disabled = false;

            setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
        })
        .catch(error => {
            statusDiv.style.display = 'block';
            statusDiv.className = 'form-message error-msg';
            statusDiv.innerText = 'Sorry, something went wrong. Please try again.';
            submitBtn.innerHTML = 'Send Message <i class="ph ph-paper-plane-tilt"></i>';
            submitBtn.disabled = false;
        });
});