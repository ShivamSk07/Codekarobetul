// 3D Animation Background
function init3DBackground() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create particles with more variety
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const particleCount = 1500;
    const colorPalette = [
        new THREE.Color(0x4a90e2),
        new THREE.Color(0xe74c3c),
        new THREE.Color(0x2ecc71)
    ];

    for (let i = 0; i < particleCount; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 1000;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
        
        // Smooth camera movement based on mouse position
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    animate();
}

// Form validation
function initFormValidation() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Registration submitted successfully!');
        });
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your contact form submission logic here
            alert('Message sent successfully!');
        });
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    let isMenuOpen = false;

    function toggleMenu(e) {
        if (e) e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Toggle menu on button click
    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Prevent menu close when clicking inside nav
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close menu on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        }, 250);
    });

    // Handle touch events
    navLinks.addEventListener('touchstart', (e) => {
        e.stopPropagation();
    });

    // Update active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinksItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Parallax Effect for Features
function initParallax() {
    const features = document.querySelector('.features');
    if (features) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            features.style.backgroundPositionY = `${rate}px`;
        });
    }
}

// Random Alerts
function initRandomAlerts() {
    const alerts = [
        " Limited slots available! Register now!",
        " Join the coding revolution in Betul!",
        " Win exciting prizes worth ₹1500!",
        " Registration closing soon!",
        " Show your coding skills!",
        " Don't miss this opportunity!",
        " Slots filling up fast!",
        " Be part of Betul's biggest hackathon!"
    ];

    const codingElements = [
        "function codeKaro() { }",
        "while(coding) { learn(); }",
        "if(passion) { success++ }",
        "class BetulHackathon { }",
        "// Code with passion",
        "<code>Betul.code()</code>",
        "import success from 'hardwork'",
        "git commit -m 'future'"
    ];

    // Show random alerts
    function showRandomAlert() {
        const alert = alerts[Math.floor(Math.random() * alerts.length)];
        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.textContent = alert;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Show random coding elements
    function showCodingElement() {
        const element = codingElements[Math.floor(Math.random() * codingElements.length)];
        const codingDiv = document.createElement('div');
        codingDiv.className = 'coding-element';
        codingDiv.textContent = element;
        
        // Random position
        codingDiv.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        codingDiv.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        
        document.body.appendChild(codingDiv);

        setTimeout(() => {
            codingDiv.remove();
        }, 2000);
    }

    // Show initial alert after 3 seconds
    setTimeout(showRandomAlert, 3000);

    // Show random alerts every 15-30 seconds
    setInterval(() => {
        if(Math.random() > 0.5) {
            showRandomAlert();
        }
    }, Math.random() * 15000 + 15000);

    // Show coding elements every 5-10 seconds
    setInterval(() => {
        showCodingElement();
    }, Math.random() * 5000 + 5000);
}

// Chatbot functionality
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('#chat-input');
    const sendButton = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');

    // Chatbot knowledge base
    const knowledge = {
        'registration': {
            keywords: ['register', 'sign up', 'join', 'how to register', 'registration'],
            response: 'You can register for CodeKaro Betul by clicking the "Register Now" button. The registration fee is only ₹50 for Betul city participants. Registration is open from December 15, 2024, to January 5, 2025.'
        },
        'prizes': {
            keywords: ['prize', 'win', 'reward', 'winning', 'prizes'],
            response: 'CodeKaro Betul offers exciting prizes: 1st Prize: ₹800, 2nd Prize: ₹500, 3rd Prize: ₹200. All participants receive a participation certificate!'
        },
        'phases': {
            keywords: ['phase', 'round', 'stages', 'steps', 'process'],
            response: 'The event has 3 phases: 1) Minor Project Phase - Create an initial project, 2) Major Project Phase - Shortlisted participants work on advanced projects, 3) Finale - Final presentation and winner selection.'
        },
        'contact': {
            keywords: ['contact', 'organizer', 'help', 'reach', 'organizers'],
            response: 'You can contact our Senior Organizers: Shivam Kothekar (7987304066) or Aditya Mawase (7879658815) for any queries.'
        },
        'dates': {
            keywords: ['when', 'date', 'time', 'schedule', 'deadline'],
            response: 'Registration opens on December 15, 2024, and closes on January 5, 2025. Make sure to register early as slots are limited!'
        }
    };

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        let messageHTML = '';
        if (!isUser) {
            messageHTML += '<span class="bot-avatar">🤖</span>';
        }
        messageHTML += `<div class="message-content">${message}</div>`;
        messageDiv.innerHTML = messageHTML;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userInput) {
        userInput = userInput.toLowerCase();
        
        // Check each knowledge category
        for (const category in knowledge) {
            const keywordMatch = knowledge[category].keywords.some(keyword => 
                userInput.includes(keyword)
            );
            if (keywordMatch) {
                return knowledge[category].response;
            }
        }

        // Default responses for unmatched queries
        const defaultResponses = [
            "I'm not sure about that. Feel free to ask about registration, prizes, event phases, or contact information!",
            "Could you please rephrase your question? You can ask me about the event schedule, prizes, or how to register.",
            "I'm here to help with questions about CodeKaro Betul. Ask me about registration, prizes, or contact details!"
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    function handleUserInput() {
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        // Add user message
        addMessage(userInput, true);
        chatInput.value = '';

        // Simulate bot typing
        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            addMessage(botResponse);
        }, 500);
    }

    // Event listeners
    chatbotToggle.addEventListener('click', () => {
        chatbotBox.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatbotBox.classList.remove('active');
    });

    sendButton.addEventListener('click', handleUserInput);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    init3DBackground();
    initParallax();
    initFormValidation();
    initRandomAlerts();
    initChatbot();

    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom'
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
