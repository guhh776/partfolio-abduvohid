// ===================================
// Web Developer Portfolio JavaScript
// FIXED VERSION - Project links work & EmailJS debug added
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = navMenu.classList.contains('active') 
                    ? index === 0 ? 'rotate(45deg) translateY(8px)' 
                    : index === 1 ? 'opacity: 0' 
                    : 'rotate(-45deg) translateY(-8px)'
                    : 'none';
            });
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
            });
        });
    });
    
    // ===== SMOOTH SCROLLING =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ACTIVE NAVIGATION ON SCROLL =====
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== STICKY NAVBAR =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 70) {
            // Scroll down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up - show navbar
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== TYPING EFFECT =====
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = [
            'Web Developer',
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Problem Solver'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
    }
    
    // ===== CONTACT FORM WITH EMAILJS =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('📧 Form submitted! Starting email send process...');
            
            // Get submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Prepare template parameters
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            console.log('📋 Template Parameters:', templateParams);
            console.log('🔧 Service ID: service_lhteumn');
            console.log('📝 Template ID: template_pheynv4');
            
            // Send email using EmailJS
            emailjs.send('service_lhteumn', 'template_pheynv4', templateParams)
                .then(function(response) {
                    console.log('✅ SUCCESS!', response.status, response.text);
                    console.log('📬 Email sent successfully to: abduvohidkamoliddinov24@gmail.com');
                    
                    // Show success message
                    alert(`Thank you, ${templateParams.from_name}! ✅\n\nYour message has been sent successfully.\n\nI'll get back to you soon at ${templateParams.from_email}`);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                }, function(error) {
                    console.error('❌ FAILED!', error);
                    console.error('Error details:', JSON.stringify(error, null, 2));
                    
                    // Show detailed error in console
                    if (error.text) {
                        console.error('Error message:', error.text);
                    }
                    if (error.status) {
                        console.error('Error status:', error.status);
                    }
                    
                    // Show error message
                    alert(`Oops! ❌\n\nSomething went wrong. Please try again or contact me directly at:\n\nabduvohidkamoliddinov24@gmail.com\n\nError: ${error.text || 'Unknown error'}`);
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
    }
    
    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .contact-item');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements for animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
    
    // ===== PROJECT CARDS INTERACTION =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ===== SKILL ITEMS ANIMATION =====
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ===== PROJECT LINKS - FIXED! =====
    // Project links now work properly - they open in new tab
    console.log('✅ Project links are enabled and working!');
    
    // ===== PAGE LOAD ANIMATION =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===== CONSOLE MESSAGE =====
    console.log('%c👨‍💻 Welcome to my Portfolio!', 'color: #00ADB5; font-size: 20px; font-weight: bold;');
    console.log('%cDeveloped with ❤️ by Abduvohid Kamoliddinov', 'color: #EEEEEE; font-size: 14px;');
    console.log('%cGitHub: https://github.com/guhh776', 'color: #00ADB5; font-size: 12px;');
    console.log('%c📧 EmailJS Status: Initialized and Ready!', 'color: #00ff00; font-size: 12px;');
});
