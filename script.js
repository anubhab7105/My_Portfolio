// DOM Elements
const projectsContainer = document.getElementById('projects-container');
const contactForm = document.getElementById('contact-form');

// Projects Data
const projects = [
    {
        title: "Local Grocery E-Commerce Platform",
        description: "E-commerce platform for local grocery stores with inventory management",
        technologies: ["HTML", "CSS", "JavaScript", "Python"],
        github: "https://github.com/anubhab7105/PRODIGY_FS_03",
        image: "images/project1.png"
    },
    {
        title: "Secure User Authentication System",
        description: "Secure authentication system with encryption and security best practices",
        technologies: ["HTML", "CSS", "JavaScript", "Security"],
        github: "https://github.com/anubhab7105/PRODIGY_FS_01",
        image: "images/project2.png"
    },
    {
        title: "AI-Powered Cyber Threat Analysis",
        description: "Responsive website for analyzing cyber threats using AI technologies (Under Development)",
        technologies: ["HTML", "CSS", "JavaScript", "AI Integration"],
        github: "https://github.com/anubhab7105/AI-Powered-Cyber-Threat-Analyze",
        underDevelopment: true,
        image: "images/project3.png"
    }
];

// Render Projects
function renderProjects() {
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title} ${project.underDevelopment ? '<span style="color: #f97316; font-size: 0.8em;">(Under Development)</span>' : ''}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank">View on GitHub</a>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button');
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Form data
    const formData = new FormData(contactForm);
    
    // Send form data to Formspree
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Oops! Something went wrong. Please try again later.');
        }
    }).catch(error => {
        alert('Error: ' + error.message);
    }).finally(() => {
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    
    // Smooth scrolling for navigation links
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
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(15, 23, 42, 0.9)';
        }
    });
    
    // Initialize animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .about-content > div');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.skill-category, .project-card, .about-content > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});