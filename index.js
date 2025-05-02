// Optimizar carga inicial
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar precarga de imágenes en segundo plano
    const imagesToPreload = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        imagesToPreload.forEach(img => imageObserver.observe(img));
    }
});

// Loader optimizado
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    requestAnimationFrame(() => {
        loader.classList.add('hidden');
    });
});

// Menu toggle
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.nav-list');

// Manejo del menú con soporte de teclado
menu.addEventListener('click', toggleMenu);
menu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

function toggleMenu() {
    const isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('active');
}

// Back to top button
const backToTopButton = document.querySelector('#back-to-top');

// Función para manejar el parallax
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-parallax');
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
}

// Función para manejar las animaciones al hacer scroll
function handleScroll() {
    // Close menu on scroll
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');

    // Show/hide back to top button with smooth opacity
    const scrollRatio = window.scrollY / 300;
    if (scrollRatio > 1) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = scrollRatio.toString();
        if (scrollRatio <= 0) {
            backToTopButton.style.visibility = 'hidden';
        }
    }

    // Parallax effect
    handleParallax();
}

// Optimización de eventos de scroll con requestAnimationFrame
function debounceRAF(func) {
    let ticking = false;
    return function(...args) {
        if (!ticking) {
            requestAnimationFrame(() => {
                func.apply(this, args);
                ticking = false;
            });
            ticking = true;
        }
    };
}

// Cache de selectores DOM frecuentemente usados
const DOM = {
    nav: document.querySelector('nav'),
    sections: document.querySelectorAll('section'),
    links: document.querySelectorAll('a'),
    images: document.querySelectorAll('img'),
    buttons: document.querySelectorAll('button')
};

// Aplicar throttling al evento scroll
// Optimizar manejo de scroll
window.addEventListener('scroll', debounceRAF(handleScroll), { passive: true });

// Manejo del botón 'volver arriba' con soporte de teclado
backToTopButton.addEventListener('click', scrollToTop);
backToTopButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // Devolver el foco al primer elemento interactivo
    document.querySelector('.logo').focus();
}

// Scroll reveal con optimización de rendimiento
const sr = ScrollReveal({
    distance: '40px',
    duration: 1000,
    reset: false, // Evitar reset para mejor rendimiento
    easing: 'ease-out',
    viewFactor: 0.2,
    mobile: true,
    delay: 0,
    useDelay: 'once',
    beforeReveal: (el) => {
        el.style.willChange = 'transform, opacity';
    },
    afterReveal: (el) => {
        el.style.willChange = 'auto';
    }
});

// Secuencia de animaciones
sr.reveal('.home-text', {
    delay: 200,
    origin: 'left',
    distance: '100px',
    duration: 1000
});

sr.reveal('.about-img', {
    delay: 300,
    origin: 'right',
    distance: '100px'
});

sr.reveal('.about-text', {
    delay: 400,
    origin: 'left',
    distance: '100px'
});

sr.reveal('.services .heading', {
    delay: 200,
    origin: 'top'
});

sr.reveal('.skills .heading', {
    delay: 200,
    origin: 'top'
});

sr.reveal('.portfolio .heading', {
    delay: 200,
    origin: 'top'
});

sr.reveal('.contact .heading-contact', {
    delay: 200,
    origin: 'top'
});

sr.reveal('.services-content .col', {
    delay: 200,
    origin: 'bottom',
    interval: 200
});

sr.reveal('.skills-content .box', {
    delay: 200,
    origin: 'bottom',
    interval: 100
});

sr.reveal('.contact-content .box-contact', {
    delay: 200,
    origin: 'bottom',
    interval: 100
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Manejo del cambio de tema con soporte de teclado
themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Anunciar el cambio de tema para lectores de pantalla
    announceThemeChange(newTheme);
}

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
    themeToggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
    );
}

// Función para anunciar cambios a lectores de pantalla
function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Tema cambiado a ${theme === 'dark' ? 'oscuro' : 'claro'}`;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Manejar la navegación por teclado
document.addEventListener('keydown', (e) => {
    // Atajo de teclado Alt + T para cambiar el tema
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Escape cierra el menú móvil
    if (e.key === 'Escape' && navlist.classList.contains('active')) {
        toggleMenu();
    }
});

// Asegurar que los elementos focusables sean accesibles
document.querySelectorAll('a, button').forEach(el => {
    if (!el.getAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
    }
});

// Animaciones de carga y observador de intersección
document.addEventListener('DOMContentLoaded', () => {
    // Optimización de carga de imágenes
    if ('loading' in HTMLImageElement.prototype) {
        // El navegador soporta lazy loading nativo
        DOM.images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const imageObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            },
            { rootMargin: '50px 0px' }
        );

        DOM.images.forEach(img => imageObserver.observe(img));
    }

    // Intersection Observer para animaciones al entrar en viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observar elementos con animaciones
    document.querySelectorAll('.box, .col, .about-img, .about-text').forEach(el => {
        observer.observe(el);
    });

    // Check system preference for theme
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }
});