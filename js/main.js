/**
 * Raihan Ali - Portfolio Interactions & Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar shrink & background change on scroll
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => scrollObserver.observe(el));

  // 3. Smooth active link update & Mobile collapse closing
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });

  // 4. Contact Form Submission (Client-side feedback with mailto fallback)
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim() || 'Portfolio Contact Inquiry';
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Show temporary confirmation
      if (formSuccessAlert) {
        formSuccessAlert.classList.remove('d-none');
      }

      // Trigger mailto client
      const mailtoUrl = `mailto:ali.raihan11@yahoo.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `From: ${name} (${email})\n\n${message}`
      )}`;
      
      window.location.href = mailtoUrl;

      setTimeout(() => {
        contactForm.reset();
      }, 1000);
    });
  }

  // 5. Dynamic Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
