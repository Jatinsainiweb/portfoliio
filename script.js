// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Typed.js initialization
const typed = new Typed('.typed-text', {
    strings: [
        'Web Developer',
        'Digital Marketing Expert',
        'SEO Specialist',
        'UI/UX Designer',
        'WordPress Expert'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    cursorChar: '|'
});

// Portfolio items data
const portfolioItemsData = [
    {
        title: 'Web Development Project',
        description: 'Modern responsive website',
        image: 'placeholder.jpg',
        category: 'web-development'
    },
    // Add more portfolio items here
];

// Populate portfolio grid
const portfolioGrid = document.querySelector('.portfolio-grid');
portfolioItemsData.forEach(item => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.setAttribute('data-aos', 'fade-up');
    portfolioItem.setAttribute('data-category', item.category);
    portfolioItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="portfolio-item-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    portfolioGrid.appendChild(portfolioItem);
});

// Portfolio item click handler for larger view
portfolioItemsData.forEach(item => {
    const portfolioItem = document.querySelector(`.portfolio-item[data-category="${item.category}"]`);
    portfolioItem.addEventListener('click', () => {
        const imgSrc = portfolioItem.querySelector('img').src;
        const title = portfolioItem.querySelector('h3').textContent;
        const description = portfolioItem.querySelector('p').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${imgSrc}" alt="${title}">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        };
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            }
        };

        // Handle escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

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
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.hero-stats');

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    });
};

// Trigger stats animation when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Smooth scroll for navigation links
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

// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Function to show items based on category
    function filterItems(category) {
        portfolioItems.forEach(item => {
            const imgSrc = item.querySelector('img')?.src || '';
            const itemCategory = item.dataset.category;
            
            if (category === 'home' && isHomeItem(imgSrc)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else if (category === itemCategory) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Function to determine if item should show on home page
    function isHomeItem(imgSrc) {
        const filename = imgSrc.split('/').pop().toLowerCase();
        return filename.includes('logo') || 
               filename.includes('id card') || 
               filename.startsWith('design');
    }

    // Show home items initially
    filterItems('home');
    document.querySelector('[data-filter="home"]').classList.add('active');

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            filterItems(filterValue);
        });
    });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = contactForm.querySelector('input[name="name"]');
    const email = contactForm.querySelector('input[name="email"]');
    const message = contactForm.querySelector('textarea[name="message"]');
    
    if (!name.value || !email.value || !message.value) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email.value)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Add loading animation for resume download
const resumeButton = document.querySelector('a[href$="resume.pdf"]');
resumeButton.addEventListener('click', (e) => {
    const icon = resumeButton.querySelector('i');
    icon.classList.remove('fa-download');
    icon.classList.add('fa-spinner', 'fa-spin');
    setTimeout(() => {
        icon.classList.remove('fa-spinner', 'fa-spin');
        icon.classList.add('fa-check');
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-download');
        }, 1500);
    }, 1000);
});

// Resume download handler
document.querySelector('.btn.secondary').addEventListener('click', (e) => {
    e.preventDefault();
    window.open('images/my resume.pdf', '_blank');
});

// Progress bar animation on scroll
const progressBars = document.querySelectorAll('.progress');
const animateProgress = () => {
    progressBars.forEach(progress => {
        const value = progress.style.width;
        progress.style.width = '0';
        setTimeout(() => {
            progress.style.width = value;
        }, 100);
    });
};

// Trigger progress bar animation when the about section is in view
const aboutSection = document.querySelector('.about');
const observerProgress = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgress();
            observerProgress.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observerProgress.observe(aboutSection);

// Add keyframe animation for portfolio items
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .portfolio-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-content {
        max-width: 90%;
        max-height: 90%;
        background: white;
        padding: 2rem;
        border-radius: 10px;
        position: relative;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 2rem;
        cursor: pointer;
        color: #333;
    }
`;
document.head.appendChild(style);

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const portfolioImages = document.querySelectorAll('.portfolio-item img');

    // Open lightbox
    portfolioImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling to portfolio-item
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox when clicking the close button or outside the image
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Testimonials data
const testimonials = [
    {
        name: 'Client Name',
        role: 'CEO, Company',
        text: 'Excellent work and professional service!'
    },
    // Add more testimonials here
];
