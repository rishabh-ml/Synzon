/* ============================================================
   SYNZON INDIA — Premium Interactions & Animations
   Vanilla JS · Zero Dependencies · Hostinger-Ready
   ============================================================ */

(function () {
  'use strict';

  // ======================== PRELOADER ==========================
  const preloader = document.querySelector('.preloader');
  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations after preloader
    setTimeout(initHeroAnimation, 200);
  }
  if (preloader) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', function () {
      setTimeout(hidePreloader, 1800);
    });
    // Fallback: hide after 4 seconds even if load event slow
    setTimeout(hidePreloader, 4000);
  }

  // ======================== NAVIGATION ========================
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  let lastScroll = 0;

  function handleNavScroll() {
    const y = window.scrollY;
    if (!nav) return;

    if (y > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ======================== HERO ANIMATION ====================
  function initHeroAnimation() {
    // Animate hero text characters
    var heroTexts = document.querySelectorAll('.hero-text-reveal');
    heroTexts.forEach(function (el) {
      el.classList.add('animate');
    });

    // Fade up hero sub elements
    var heroFadeEls = document.querySelectorAll('.hero-fade');
    heroFadeEls.forEach(function (el, i) {
      setTimeout(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 150);
    });
  }

  // ==================== TEXT SPLIT FOR HERO ====================
  function splitTextToChars() {
    var targets = document.querySelectorAll('.hero-text-reveal');
    targets.forEach(function (target) {
      var text = target.innerHTML;
      // Split by words, wrap each word/char
      var words = text.split(/\s+/);
      var html = '';
      words.forEach(function (word, i) {
        // Preserve HTML tags like <span>
        if (word.indexOf('<') !== -1) {
          html += word + ' ';
          return;
        }
        html += '<span class="word">';
        for (var c = 0; c < word.length; c++) {
          var delay = (i * word.length + c) * 30;
          html += '<span class="char" style="transition-delay:' + delay + 'ms">' + word[c] + '</span>';
        }
        html += '</span> ';
      });
      target.innerHTML = html;
    });
  }

  // =================== SCROLL REVEAL =========================
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale, .stagger-children');

    if (!revealElements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve — let it stay visible
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ================== COUNTER ANIMATION ======================
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easedProgress = easeOutQuart(progress);
      var current = Math.floor(easedProgress * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // ================ PROCESS LINE ANIMATION ===================
  function initProcessLine() {
    var lineFill = document.querySelector('.process__line-fill');
    if (!lineFill) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          lineFill.classList.add('animate');
        }
      });
    }, { threshold: 0.3 });

    observer.observe(lineFill.parentElement);
  }

  // ================= MAGNETIC BUTTON EFFECT ==================
  function initMagneticButtons() {
    var buttons = document.querySelectorAll('.btn--primary, .btn--secondary, .nav__cta');

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + x * 0.15 + 'px, ' + (y * 0.15 - 2) + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  // ================= CURSOR GLOW EFFECT ======================
  function initCursorGlow() {
    // Only on desktop
    if (window.innerWidth < 1024) return;

    var glow = document.querySelector('.cursor-glow');
    if (!glow) return;

    var mouseX = 0, mouseY = 0;
    var glowX = 0, glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.classList.add('visible');
    });

    document.addEventListener('mouseleave', function () {
      glow.classList.remove('visible');
    });

    function updateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(updateGlow);
    }
    requestAnimationFrame(updateGlow);
  }

  // ================ BACK TO TOP ==============================
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ================ PRODUCT FILTER ===========================
  function initProductFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var products = document.querySelectorAll('.product-card');

    if (!filterBtns.length || !products.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active state
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.dataset.filter;

        products.forEach(function (card, index) {
          var category = card.dataset.category;
          var shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function () {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 40);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function () {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ============== SMOOTH ANCHOR SCROLL =======================
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          var offset = nav ? nav.offsetHeight + 20 : 80;
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  // ============= PARALLAX ON HERO ORBS =======================
  function initParallax() {
    var orbs = document.querySelectorAll('.hero__orb');
    if (!orbs.length) return;

    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > window.innerHeight) return; // Stop when hero is out of view

      orbs.forEach(function (orb, i) {
        var speed = (i + 1) * 0.08;
        orb.style.transform = 'translateY(' + (y * speed) + 'px)';
      });
    }, { passive: true });
  }

  // ============= ACTIVE NAV LINK =============================
  function setActiveNavLink() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav__link');

    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ============= CONTACT FORM HANDLING =======================
  function initContactForm() {
    var form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      var inputs = form.querySelectorAll('[required]');
      var valid = true;
      inputs.forEach(function (input) {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#E74C3C';
          input.addEventListener('input', function () {
            input.style.borderColor = '';
          }, { once: true });
        }
      });

      if (valid) {
        var btn = form.querySelector('.btn');
        var originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = '#00A878';
        form.reset();
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  // ============= TILT EFFECT ON CARDS ========================
  function initCardTilt() {
    if (window.innerWidth < 1024) return;

    var cards = document.querySelectorAll('.category-card, .value-card, .cert-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var rotateX = (0.5 - y) * 6;
        var rotateY = (x - 0.5) * 6;
        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // ============= INIT ========================================
  function init() {
    // splitTextToChars(); // Optional: enable for char-by-char hero animation
    setActiveNavLink();
    initScrollReveal();
    initCounters();
    initProcessLine();
    initMagneticButtons();
    initCursorGlow();
    initBackToTop();
    initProductFilter();
    initSmoothAnchors();
    initParallax();
    initContactForm();
    initCardTilt();

    // If no preloader, trigger hero animation immediately
    if (!preloader) {
      initHeroAnimation();
    }
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
