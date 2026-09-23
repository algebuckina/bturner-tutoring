// Mobile Menu Toggle
const navLinks = document.querySelector('.nav-links');
const navLogo = document.querySelector('.nav-logo');

function createMobileMenuButton() {
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-toggle');
    menuButton.innerHTML = '☰';
    menuButton.addEventListener('click', toggleMobileMenu);
    document.querySelector('nav').insertBefore(menuButton, navLinks);
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .benefit-item, .testimonial-card').forEach(element => {
    observer.observe(element);
});

// Initialize Mobile Menu Button
createMobileMenuButton();

// Check for mobile on page load
function checkMobile() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
    }
}

window.addEventListener('resize', checkMobile);
checkMobile();
