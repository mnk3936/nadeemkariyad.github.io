document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Sticky navigation on scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width + '%';
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on page load

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateStats() {
        statNumbers.forEach(number => {
            if (isElementInViewport(number)) {
                const target = parseInt(number.getAttribute('data-count'));
                const duration = 2000; // Animation duration in ms
                const step = target / (duration / 16); // 16ms per frame
                let current = 0;

                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        clearInterval(counter);
                        current = target;
                    }
                    number.textContent = Math.floor(current);
                }, 16);

                // Remove the data-count attribute to prevent re-animation
                number.removeAttribute('data-count');
            }
        });
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once on page load

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show a success message
            console.log({ name, email, subject, message });

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-links').style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-links').style.opacity = '0';
        });
    });
});
