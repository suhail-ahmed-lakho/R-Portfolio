document.addEventListener('DOMContentLoaded', () => {
    // Counter Animation function
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Create single observer for all animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle counter animations
                if (entry.target.classList.contains('counter-section')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => animateCounter(counter));
                    observer.unobserve(entry.target);
                }
                // Handle fade animations
                else if (entry.target.classList.contains('animate__animated')) {
                    entry.target.classList.add('fadeInUp');
                }
                // Handle skill bar animations
                else if (entry.target.classList.contains('progress-bar')) {
                    entry.target.style.width = entry.target.getAttribute('data-width') + '%';
                }
            }
        });
    }, observerOptions);

    // Initialize observers
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Observe animated elements
    document.querySelectorAll('.animate__animated').forEach(element => {
        observer.observe(element);
    });

    // Observe progress bars
    document.querySelectorAll('.progress-bar').forEach(element => {
        observer.observe(element);
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            document.querySelector(`.tab-content[data-tab="${targetTab}"]`).classList.add('active');
        });
    });

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

    // Mobile navigation toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navigation = document.querySelector('.navigation');

    if (mobileMenuButton && navigation) {
        mobileMenuButton.addEventListener('click', () => {
            navigation.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }

    // Download CV button loading state
    const downloadButton = document.querySelector('.download-cv');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        });
    }

    // Social media hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        link.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // Experience badge animation
    const experienceBadge = document.querySelector('.experience-badge');
    if (experienceBadge) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 100) {
                experienceBadge.classList.add('animate');
            }
        });
    }

    // Project Filtering
    document.addEventListener('DOMContentLoaded', function() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.col-md-4');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    });
}); 