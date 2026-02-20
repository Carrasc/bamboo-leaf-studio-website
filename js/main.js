/* ==========================================
   BAMBOO LEAF STUDIOS — MAIN JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- AOS INIT ----------
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });

  // ---------- NAVBAR SCROLL ----------
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- MOBILE NAV TOGGLE ----------
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---------- SMOOTH SCROLL ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- PARALLAX HERO ----------
  const heroBg = document.querySelector('.hero-bg');

  const handleParallax = () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  };

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ---------- PORTFOLIO CAROUSEL ----------
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const slides = track.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  const getVisibleCount = () => window.innerWidth <= 768 ? 1 : 3;

  const getMaxIndex = () => Math.max(0, slides.length - getVisibleCount());

  // Build dots
  const buildDots = () => {
    dotsContainer.innerHTML = '';
    const count = getMaxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
      dotsContainer.appendChild(dot);
    }
  };

  const updateButtons = () => {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= getMaxIndex();

    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  };

  const goTo = (index) => {
    currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
    const slide = slides[0];
    const gap = 24;
    const slideWidth = slide.offsetWidth + gap;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateButtons();
  };

  prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); resetAutoplay(); });
  nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); resetAutoplay(); });

  // Drag / swipe support
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;

  const getClientX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = getClientX(e);
    track.classList.add('dragging');
  });

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = getClientX(e);
  }, { passive: true });

  const onMove = (e) => {
    if (!isDragging) return;
    const x = getClientX(e);
    currentTranslate = x - startX;
  };

  track.addEventListener('mousemove', onMove);
  track.addEventListener('touchmove', onMove, { passive: true });

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');

    if (currentTranslate < -60) {
      goTo(currentIndex + 1);
    } else if (currentTranslate > 60) {
      goTo(currentIndex - 1);
    }
    currentTranslate = 0;
  };

  track.addEventListener('mouseup', onEnd);
  track.addEventListener('mouseleave', onEnd);
  track.addEventListener('touchend', onEnd);

  // Prevent link clicks after drag
  track.addEventListener('click', (e) => {
    if (Math.abs(currentTranslate) > 5) {
      e.preventDefault();
    }
  });

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentIndex = Math.min(currentIndex, getMaxIndex());
      buildDots();
      goTo(currentIndex);
    }, 150);
  });

  // ---------- CAROUSEL AUTOPLAY ----------
  const AUTOPLAY_DELAY = 4000;
  let autoplayTimer;

  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      if (currentIndex >= getMaxIndex()) {
        goTo(0);
      } else {
        goTo(currentIndex + 1);
      }
    }, AUTOPLAY_DELAY);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  // Pause on hover, resume on leave
  const wrapper = track.closest('.carousel-wrapper');
  wrapper.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  wrapper.addEventListener('mouseleave', () => startAutoplay());
  track.addEventListener('touchstart', () => clearInterval(autoplayTimer), { passive: true });
  track.addEventListener('touchend', () => startAutoplay());

  buildDots();
  updateButtons();
  startAutoplay();
});
