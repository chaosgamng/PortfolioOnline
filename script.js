const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('is-active');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('is-active');
    });
});

const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:camerontay2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    
    window.location.href = mailtoLink;

    showSuccessMessage();

    contactForm.reset();
});

function showSuccessMessage() {
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Message Sent!';
    button.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const targetElement = document.querySelector(href);
        
        if (href !== '#' && targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const revealElements = document.querySelectorAll(
    '.section-title, .about-text, .project-card, .skill-category, .stat, .contact-form, .contact-info'
);

revealElements.forEach((element) => element.classList.add('reveal'));

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
}

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinkById = new Map(
    Array.from(document.querySelectorAll('.nav-link[href^="#"]')).map((a) => [a.getAttribute('href')?.slice(1), a])
);

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 90;
    let activeSectionId = sections[0]?.id;

    for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
            activeSectionId = section.id;
        }
    }

    navLinks.forEach((link) => link.classList.remove('is-active'));
    const activeLink = navLinkById.get(activeSectionId);
    if (activeLink) activeLink.classList.add('is-active');
}

updateActiveNavLink();

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;

    window.requestAnimationFrame(updateActiveNavLink);
});

 
