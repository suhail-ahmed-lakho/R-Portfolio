document.addEventListener('DOMContentLoaded', () => {
    // DOM element selections
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const animatedName = document.getElementById('animated-name');
    const contactForm = document.getElementById('contact-form');
    const header = document.querySelector('header');
  
    // Navigation toggle function
    const toggleNav = () => {
      // Toggle navigation menu
      nav.classList.toggle('nav-active');
  
      // Animate navigation links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
  
      // Toggle burger menu animation
      burger.classList.toggle('toggle');
    };
  
    // Event listeners for navigation
    burger.addEventListener('click', toggleNav);
  
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
          toggleNav();
        }
      });
    });
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Form submission handler
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  
    // Intersection Observer for fade-in animation
    const observerOptions = {
      threshold: 0.1
    };
  
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeInUp');
        }
      });
    };
  
    // First observer for fade-in animation
    const fadeObserver = new IntersectionObserver(observerCallback, observerOptions);
  
    sections.forEach(section => {
      fadeObserver.observe(section);
    });
  
    // Animated name functionality
    const fullName = "Suhail Ahmed Lakho";
    const startingIndex = 0;
    let currentIndex = startingIndex;
  
    const typeWriter = () => {
      if (currentIndex < fullName.length) {
        animatedName.textContent = fullName.substring(0, currentIndex + 1);
        currentIndex++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(eraseText, 2000);
      }
    };
  
    const eraseText = () => {
      if (currentIndex > startingIndex) {
        animatedName.textContent = fullName.substring(0, currentIndex);
        currentIndex--;
        setTimeout(eraseText, 50);
      } else {
        setTimeout(typeWriter, 500);
      }
    };
  
    // Initialize animated name
    animatedName.textContent = fullName;
    typeWriter();
  
    // Skill bar animation
    const skillItems = document.querySelectorAll('.skills-list li');
  
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = '#2980b9';
      });
  
      item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = '';
      });
    });
  
    // Handle active navigation states
    const navItems = document.querySelectorAll('.nav-item');
  
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });
  
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
  
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
  
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
  
    // Add border animation for the name
    if (animatedName) {
        animatedName.style.opacity = '0';
        animatedName.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            animatedName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            animatedName.style.opacity = '1';
            animatedName.style.transform = 'translateY(0)';
        }, 300);
    }
  
    // Function to generate a weighted random number between min and max
    function getWeightedRandomProgress(skillName) {
        const skillWeights = {
            'HTML5': { min: 85, max: 95 },
            'CSS3': { min: 80, max: 90 },
            'JavaScript': { min: 75, max: 85 },
            'React': { min: 70, max: 80 },
            'Node.js': { min: 65, max: 75 },
            'MongoDB': { min: 60, max: 70 },
            'Git': { min: 70, max: 85 }
        };

        const weight = skillWeights[skillName] || { min: 60, max: 90 };
        return Math.floor(Math.random() * (weight.max - weight.min + 1)) + weight.min;
    }
  
    // Function to update all progress bars with weighted random values
    function updateProgressBars() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const skillName = card.querySelector('h3').textContent;
            const progressBar = card.querySelector('.progress-bar');
            const progressText = card.querySelector('.progress-percentage');
            
            // Generate weighted random progress
            const progress = getWeightedRandomProgress(skillName);
            
            // Update width and text with animation
            progressBar.style.transition = 'width 1s ease-in-out';
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
            
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                progressBar.style.opacity = '0.9';
                progressBar.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                progressBar.style.opacity = '1';
                progressBar.style.transform = 'scale(1)';
            });
        });
    }
  
    // Initialize progress bars when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        updateProgressBars();
        
        // Optional: Update progress bars every 30 seconds
        // setInterval(updateProgressBars, 30000);
    });
  
    // Function to animate progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            let width = 0;
            
            const duration = Math.random() * 1000 + 1000;
            const increment = (value / duration) * 10;
            
            const animation = setInterval(() => {
                if (width >= value) {
                    clearInterval(animation);
                } else {
                    width += increment;
                    bar.style.width = Math.min(width, value) + '%';
                }
            }, 10);
        });
    }
  
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
  
    // Initialize animation when skills section comes into view
    let animationTriggered = false;
    function handleScrollAnimation() {
        const skillsSection = document.getElementById('skills');
        
        if (!animationTriggered && isElementInViewport(skillsSection)) {
            animateProgressBars();
            animationTriggered = true;
            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', handleScrollAnimation);
        }
    }
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);

    // Check initial state
    document.addEventListener('DOMContentLoaded', () => {
        handleScrollAnimation();
    });

    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress-width', `${progress}%`);
    });

    // Second observer for skills section (at the bottom)
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Start observing the skills section
    const skillsSection = document.querySelector('#skills');
    skillsObserver.observe(skillsSection);

    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    document.querySelectorAll('#home .fade-in').forEach((el) => observer.observe(el));

    // Update active state on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    var TxtRotate = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    };

    window.onload = function() {
      var elements = document.getElementsByClassName('txt-rotate');
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
    };

    // Split text into letters
    const text = document.querySelector('.letters');
    const string = text.textContent;
    const letters = string.split('');
    text.textContent = '';
    
    letters.forEach((letter, i) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.animationDelay = `${i * 0.1}s`;
      text.appendChild(span);
    });

    // Counter Animation
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

    // Initialize counters when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach(counter => animateCounter(counter));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe about section
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  });