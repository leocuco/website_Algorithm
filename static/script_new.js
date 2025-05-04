// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;

    if (window.scrollY > 10) {
        navbar.classList.add('sticky-shadow');
    } else {
        navbar.classList.remove('sticky-shadow');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Modal Functionality
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-modal');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate
document.querySelectorAll('.section-title, .about-content, .vision-card, .product-card, .service-slide').forEach(element => {
    observer.observe(element);
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const nome = contactForm.querySelector('input[name="nome"]');
    const email = contactForm.querySelector('input[name="email"]');
    const mensagem = contactForm.querySelector('textarea[name="mensagem"]');
    const successMsg = contactForm.querySelector('.form-success');
    const formGroups = contactForm.querySelectorAll('.form-group');

    function validateField(field, type) {
        let valid = false;
        if (type === 'email') {
            valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        } else {
            valid = field.value.trim().length > 0;
        }
        field.classList.toggle('valid', valid);
        field.parentElement.classList.toggle('error', !valid);
        return valid;
    }

    nome.addEventListener('input', () => validateField(nome, 'text'));
    email.addEventListener('input', () => validateField(email, 'email'));
    mensagem.addEventListener('input', () => validateField(mensagem, 'text'));

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let validNome = validateField(nome, 'text');
        let validEmail = validateField(email, 'email');
        let validMsg = validateField(mensagem, 'text');
        if (validNome && validEmail && validMsg) {
            successMsg.style.display = 'flex';
            contactForm.reset();
            nome.classList.remove('valid');
            email.classList.remove('valid');
            mensagem.classList.remove('valid');
            formGroups.forEach(g => g.classList.remove('error'));
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3500);
        } else {
            successMsg.style.display = 'none';
        }
    });
}

// Remove error class when user starts typing
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});

// Service Slider
const serviceSlider = document.querySelector('.services-slider');
if (serviceSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    serviceSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        serviceSlider.classList.add('active');
        startX = e.pageX - serviceSlider.offsetLeft;
        scrollLeft = serviceSlider.scrollLeft;
    });

    serviceSlider.addEventListener('mouseleave', () => {
        isDown = false;
        serviceSlider.classList.remove('active');
    });

    serviceSlider.addEventListener('mouseup', () => {
        isDown = false;
        serviceSlider.classList.remove('active');
    });

    serviceSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - serviceSlider.offsetLeft;
        const walk = (x - startX) * 2;
        serviceSlider.scrollLeft = scrollLeft - walk;
    });
}

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    document.body.style.transition = 'background 0.5s, color 0.5s';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 600);
});

// Add dark mode styles
const style = document.createElement('style');
style.textContent = `
    .dark-mode {
        --background: #1a1a1a;
        --text-color: #ffffff;
        --light-text: #a0a0a0;
        --section-bg: #2d2d2d;
    }
    
    .dark-mode .navbar {
        background: rgba(26, 26, 26, 0.95);
    }
    
    .dark-mode .product-card,
    .dark-mode .vision-card,
    .dark-mode .stat-item {
        background: #2d2d2d;
    }
    
    .dark-mode .form-group input,
    .dark-mode .form-group textarea {
        background: #2d2d2d;
        color: white;
        border-color: #404040;
    }
    
    .dark-mode-toggle {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: var(--transition);
    }
    
    .dark-mode-toggle:hover {
        transform: scale(1.1);
    }
    
    .dark-mode-toggle i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Estatísticas animadas na seção Quem Somos (sempre que a seção entrar na tela)
function animateCounter(element, end, duration = 1800) {
    let start = 0;
    const increment = end / (duration / 16);
    function update() {
        start += increment;
        if (start < end) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(update);
        } else {
            element.textContent = end + '+';
        }
    }
    update();
}

const aboutStats = document.querySelector('.about-stats');
const statNumbers = aboutStats ? aboutStats.querySelectorAll('.stat-number') : [];

if (aboutStats && statNumbers.length) {
    let lastValues = Array.from(statNumbers).map(stat => parseInt(stat.textContent));
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach((stat, i) => {
                    stat.textContent = '0+';
                    animateCounter(stat, lastValues[i]);
                });
            }
        });
    }, { threshold: 0.5 });
    observer.observe(aboutStats);
}

// Carrossel de depoimentos
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let testimonialIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}
if (testimonials.length) {
    showTestimonial(testimonialIndex);
    prevBtn.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(testimonialIndex);
    });
    nextBtn.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    });
    // Troca automática a cada 7s
    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    }, 7000);
}

// Forçar dark mode sempre
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark-mode');
    // Esconde o botão de alternância de modo, se existir
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) darkModeToggle.style.display = 'none';
}); 