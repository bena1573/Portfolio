// Single Cursor Implementation
const cursor = document.querySelector('.cursor');
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('bgAudio');
  const toggleBtn = document.getElementById('audioToggle');
  const icon = toggleBtn.querySelector('i');
  
  // Try to play audio (will fail without user interaction)
  function attemptPlay() {
    audio.volume = 0.3; // Set volume to 30%
    audio.play().then(() => {
      icon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }).catch(error => {
      console.log("Audio playback failed:", error);
    });
  }
  
  // Toggle button functionality
  toggleBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      icon.classList.replace('fa-volume-mute', 'fa-volume-up');
    } else {
      audio.pause();
      icon.classList.replace('fa-volume-up', 'fa-volume-mute');
    }
  });
  
  // Modern browsers require user interaction first
  document.body.addEventListener('click', function firstInteraction() {
    attemptPlay();
    document.body.removeEventListener('click', firstInteraction);
  });
});
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Hover effects for interactive elements
document.querySelectorAll(
  'a, button, .btn, input, textarea, select, ' +
  '.portfolio-item, .skill-tag, .experience-item'
).forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});
// Animated Tech Icons Background
function createTechIcons() {
  const container = document.getElementById('techIconsBg');
  const techIcons = [
    'fa-html5', 'fa-css3-alt', 'fa-js', 'fa-react', 'fa-node-js',
    'fa-figma', 'fa-adobe', 'fa-git-alt', 'fa-github', 'fa-npm',
    'fa-wordpress', 'fa-elementor', 'fa-docker', 'fa-aws', 'fa-google',
    'fa-chrome', 'fa-safari', 'fa-apple', 'fa-windows', 'fa-linux',
    'fa-android', 'fa-swift', 'fa-python', 'fa-java', 'fa-php',
    'fa-laravel', 'fa-symfony', 'fa-vuejs', 'fa-angular', 'fa-bootstrap'
  ];
  
  for (let i = 0; i < 50; i++) {
    const icon = document.createElement('i');
    const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
    icon.className = `fab ${randomIcon} tech-icon`;
    
    const size = Math.random() * 2 + 1;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100 + 100;
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 15;
    
    icon.style.fontSize = `${size}rem`;
    icon.style.left = `${startX}%`;
    icon.style.top = `${startY}%`;
    icon.style.animationDuration = `${duration}s`;
    icon.style.animationDelay = `${delay}s`;
    
    container.appendChild(icon);
  }
}

// Make tech icons follow cursor movement
document.addEventListener('mousemove', (e) => {
  const techIcons = document.querySelectorAll('.tech-icon');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const moveX = (e.clientX - centerX) * 0.05;
  const moveY = (e.clientY - centerY) * 0.05;
  
  techIcons.forEach(icon => {
    const speed = parseFloat(icon.style.animationDuration) * 0.1;
    icon.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
  });
});

// Typing Animation
const typedText = document.getElementById('typed-text');
const texts = [
  "Creating stunning visual designs",
  "Editing compelling video content",
  "Building memorable brand identities",
  "Telling stories through visuals"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 1500; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500; // Pause before typing next
  }
  
  setTimeout(type, typingSpeed);
}

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Update active nav link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
      
      // Scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Highlight active section in navigation
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 100;
  
  document.querySelectorAll('.page').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Initialize everything when page loads
window.addEventListener('load', () => {
  createTechIcons();
  type();
  
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.page, .section-title, .content-box, .portfolio-item, .timeline-item, .experience-item, .skill-category');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementPosition < windowHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  };
  
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});
