// Theme toggle elements and initial theme selection
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Determine initial theme: saved preference -> system preference -> default (light)
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

// Ensure icon matches current theme
if (currentTheme === 'light') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle theme and persist selection
function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    updateNavigationColors();
}

// Attach click handler to theme button
themeToggle.addEventListener('click', handleThemeToggle);

// DOM refs used throughout the page
const projectsContainer = document.getElementById('projects-container');
const contactForm = document.getElementById('contact-form');
const header = document.querySelector('header');
const logo = document.querySelector('.logo');
const navLinks = document.querySelectorAll('nav a');

// Fetch projects.json with a local fallback when network fails
async function fetchProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback projects for offline/dev environments
        return [
            {
                title: "Local Grocery E-Commerce Platform",
                description: "Full-featured e-commerce solution for local grocery stores with inventory management, featuring secure payment processing and user data protection.",
                technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask"],
                github: "https://github.com/anubhab7105/PRODIGY_FS_03",
                live: "https://freshmart-gamma.vercel.app/",
                image: "images/project1.png",
                security: ["Input validation", "Secure payment processing", "Data encryption"]
            },
            {
                title: "Secure User Authentication System",
                description: "Robust authentication system implementing security best practices with password hashing, JWT tokens, and protection against common vulnerabilities.",
                technologies: ["HTML", "CSS", "JavaScript", "Security", "JWT"],
                github: "https://github.com/anubhab7105/PRODIGY_FS_01",
                live: "https://anubhab7105.github.io/PRODIGY_FS_01/",
                image: "images/project2.png",
                security: ["Password hashing (bcrypt)", "JWT authentication", "XSS prevention", "CSRF protection"]
            },
            {
                title: "Cyber Threat Analysis",
                description: "Responsive website for analyzing cyber threats from URLs with real-time scanning and threat detection capabilities.",
                technologies: ["HTML", "CSS", "JavaScript", "AI Integration"],
                github: "https://github.com/anubhab7105/AI-Powered-Cyber-Threat-Analyze",
                live: "https://cyber-threat-analyze.vercel.app/",
                image: "images/project3.png",
                security: ["Secure API communication", "Input sanitization", "Data validation"]
            },
            {
                title: "ChatBot(Incomplete)",
                description: "An interactive chatbot built using Python and NLP techniques. Designed to handle casual conversations, FAQs, and integrate with APIs for contextual responses.",
                technologies: ["Python", "NLP", "Flask", "HTML", "CSS", "JavaScript"],
                github: "https://github.com/anubhab7105/ChatBot",
                live: "https://anubhab7105.github.io/ChatBot/",
                image: "images/project4.png",
                security: ["Sanitized user input to prevent code injection", "API key obfuscation", "Rate limiting to prevent abuse", "Error handling for invalid responses"]
            },
            {
                title: "Health Metrics Dashboard",
                description: "A responsive web dashboard for visualizing health and fitness metrics. Includes charts and analytics for better insight into user progress and habits.",
                technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "Bootstrap"],
                github: "https://github.com/anubhab7105/HealthMetricsDashboard",
                live: "https://anubhab7105.github.io/HealthMetricsDashboard/",
                image: "images/project5.png",
                security: ["Data anonymization for demo", "Secure handling of input metrics", "Client-side validation", "CORS protection configuration"]
            }
        ];
    }
}

// Render projects into a carousel; DOM structure created dynamically
async function renderProjects() {
    const projects = await fetchProjects();
    projectsContainer.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';
    wrapper.setAttribute('aria-roledescription', 'carousel');
    wrapper.dataset.visible = '3';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'prev';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.textContent = '<';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'next';
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.textContent = '>';

    const viewport = document.createElement('div');
    viewport.className = 'carousel-viewport';
    const track = document.createElement('div');
    track.className = 'carousel-track';

    // Build project cards
    projects.forEach(project => {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="btn">GitHub</a>
                    <a href="${project.live}" target="_blank" class="btn live-btn">Live Demo</a>
                </div>
            </div>
        `;
        track.appendChild(article);
    });

    viewport.appendChild(track);
    wrapper.appendChild(prevBtn);
    wrapper.appendChild(viewport);
    wrapper.appendChild(nextBtn);
    projectsContainer.appendChild(wrapper);

    // Prepare reveal animation for cards
    track.querySelectorAll('.project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Initialize the carousel implementation
    if (typeof window.initCarousels === 'function') {
        window.initCarousels();
        // Trigger a resize after a short delay so carousel measures correctly
        setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 60);
    }
}

// Simple element for showing messages under the contact form
const formMessage = document.createElement('div');
formMessage.className = 'form-message';
contactForm.appendChild(formMessage);

// Form submission: show spinner, POST to Formspree, handle response/errors
const formSpinner = document.getElementById('form-spinner');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSpinner.style.display = 'flex';
    submitBtn.disabled = true;
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
            formMessage.style.color = 'green';
            contactForm.reset();
        } else {
            formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            formMessage.style.color = 'red';
        }
    }).catch(error => {
        formMessage.textContent = 'Error: ' + error.message;
        formMessage.style.color = 'red';
    }).finally(() => {
        formSpinner.style.display = 'none';
        submitBtn.disabled = false;
    });
});

// Update navigation and logo styles based on theme and scroll state
function updateNavigationColors() {
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    const textColor = isLightTheme ? '#334155' : '#e2e8f0';
    logo.style.color = isLightTheme ? '#6d28d9' : 'white';
    logo.style.background = isLightTheme ? 'rgba(109, 40, 217, 0.1)' : '#8b5cf6';
    navLinks.forEach(link => {
        link.style.color = textColor;
    });
    if (window.scrollY > 100) {
        header.style.background = isLightTheme 
            ? 'rgba(248, 250, 252, 0.95)' 
            : 'rgba(15, 23, 42, 0.95)';
    } else {
        header.style.background = isLightTheme 
            ? 'rgba(248, 250, 252, 0.9)' 
            : 'rgba(15, 23, 42, 0.9)';
    }
}

// Lightweight debounce utility
function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Populate projects and wire up smooth nav scrolling
    renderProjects();
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Scroll handler (debounced) updates header appearance and triggers reveal animations
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                header.style.background = 'rgba(248, 250, 252, 0.95)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        } else {
            header.style.boxShadow = 'none';
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                header.style.background = 'rgba(248, 250, 252, 0.9)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.9)';
            }
        }
        animateOnScroll();
    }, 20));

    // Reveal elements when they enter the viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .about-content > div, .experience-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize hidden state for animated elements
    document.querySelectorAll('.skill-category, .project-card, .about-content > div, .experience-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Reveal visible elements on load
    window.addEventListener('load', animateOnScroll);

    // Ensure theme icon is correct after DOM loads
    if (currentTheme === 'light') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    updateNavigationColors();

    // Back-to-top button visibility and action
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Resume download: log event and show fallback alert if download fails to start
document.getElementById('resume-download').addEventListener('click', function(e) {
  console.log('Resume download initiated');
  setTimeout(function() { 
    alert('If download didn\'t start, please email me directly'); 
  }, 3000);
});