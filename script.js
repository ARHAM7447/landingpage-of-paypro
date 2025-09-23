// Particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: ['#4169E1', '#50C878', '#FFD700', '#8A2BE2'] },
    shape: { type: 'circle' },
    opacity: { value: 0.6, random: true },
    size: { value: 4, random: true },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 3,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out'
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'bubble' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// AOS initialization
AOS.init({ duration: 1000, once: false });

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = darkModeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Counters
const counters = document.querySelectorAll('.counter .num');
counters.forEach(counter => {
  const target = parseInt(counter.getAttribute('data-end') || 0);
  let count = 0;
  const update = () => {
    if (count < target) {
      count += Math.ceil(target / 100);
      counter.textContent = count.toLocaleString();
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toLocaleString();
    }
  };
  update();
});

// Charts
const ctxUsers = document.getElementById('usersChart')?.getContext('2d');
if (ctxUsers) {
  new Chart(ctxUsers, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{ label: 'Users', data: [1000, 3000, 5000], backgroundColor: '#50C878' }]
    },
    options: { animation: { duration: 2000 } }
  });
}

const ctxRevenue = document.getElementById('revenueChart')?.getContext('2d');
if (ctxRevenue) {
  new Chart(ctxRevenue, {
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3'],
      datasets: [{ label: 'Revenue', data: [50, 100, 150], borderColor: '#FFD700' }]
    },
    options: { animation: { duration: 2000 } }
  });
}

const ctxTps = document.getElementById('tpsChart')?.getContext('2d');
if (ctxTps) {
  new Chart(ctxTps, {
    type: 'pie',
    data: { labels: ['TPS'], datasets: [{ data: [100], backgroundColor: '#8A2BE2' }] },
    options: { animation: { duration: 2000 } }
  });
}

// Demo toggle
const demoToggle = document.getElementById('demo-toggle');
if (demoToggle) {
  demoToggle.addEventListener('click', () => {
    alert('Demo Mode Toggled: Real-time data simulation active!');
  });
}

// Testimonial carousel
const carousel = document.querySelector('.testimonial-carousel');
if (carousel) {
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % carousel.children.length;
    carousel.style.transform = `translateX(-${idx * 320}px)`;
  }, 5000);
}

// Confetti on CTA
const ctaFinal = document.getElementById('cta-final');
if (ctaFinal) {
  ctaFinal.addEventListener('click', (e) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  });
}

// Voice recognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.onresult = (event) => {
    if (event.results[0][0].transcript.toLowerCase().includes('try paypro')) {
      ctaFinal?.click();
    }
  };
  recognition.start();
}

// Chatbot toggle
const chatbot = document.getElementById('chatbot');
if (chatbot) {
  chatbot.addEventListener('click', () => {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
    chatbot.classList.toggle('open');
  });
}

// Intersection observer for animations
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        el.classList.remove('is-hidden');
        if (el.dataset.once !== undefined) observer.unobserve(el);
      } else if (el.dataset.once === undefined) {
        el.classList.remove('is-visible');
        el.classList.add('is-hidden');
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.is-hidden, .stagger, .slide-in-left, [data-parallax]')
    .forEach(el => {
      el.classList.add('is-hidden');
      observer.observe(el);
    });

  // Parallax
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = el.dataset.parallaxSpeed
        ? parseFloat(el.dataset.parallaxSpeed)
        : (el.dataset.parallax === 'fast' ? 0.15 :
           el.dataset.parallax === 'slow' ? 0.03 : 0.06);
      el.style.transform = `translateY(${Math.round(scrollY * speed)}px)`;
    });
  }, { passive: true });
})();

// Counter animation
function animateCounter(el, end, duration = 1600) {
  if (!el) return;
  const start = 0;
  const range = end - start;
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.floor(start + (range * eased)).toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.classList.add('done');
      const counter = el.closest('.counter');
      if (counter) {
        counter.classList.add('pulse');
        setTimeout(() => counter.classList.remove('pulse'), 900);
      }
    }
  };
  requestAnimationFrame(step);
}

// Trigger counters on scroll
(function () {
  const counters = document.querySelectorAll('.counter .num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        animateCounter(
          entry.target,
          parseInt(entry.target.dataset.end || 0),
          parseInt(entry.target.dataset.duration || 1600)
        );
        entry.target.dataset.animated = '1';
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(counter => observer.observe(counter));
})();

// Bar graph animation
function setBarHeights(containerSelector, values) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const bars = container.querySelectorAll('.bar');
  bars.forEach((bar, i) => {
    const value = values[i] || 0;
    bar.style.setProperty('--target-height', `${value}%`);
    bar.style.height = '4px';
    requestAnimationFrame(() => {
      bar.style.transition = 'height 850ms cubic-bezier(0.16, 0.84, 0.44, 1)';
      bar.style.height = `${value}%`;
    });
  });
}

// Reveal bar graph on scroll
(function () {
  const barGraph = document.querySelector('.bar-graph');
  if (!barGraph) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setBarHeights('.bar-graph', [78, 62, 92, 55, 70, 84]);
        observer.unobserve(barGraph);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(barGraph);
})();

// Wave background animation
(function () {
  const wrap = document.querySelector('.hero-bg');
  if (!wrap) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  wrap.appendChild(canvas);
  let w, h, t = 0;

  function resize() {
    w = wrap.clientWidth;
    h = wrap.clientHeight;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function draw() {
    t += 0.016;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      const amp = 18 + i * 8;
      const freq = 0.007 + i * 0.005;
      ctx.moveTo(0, h / 2);
      for (let x = 0; x <= w; x += 10) {
        const y = h / 2 + Math.sin((x * freq) + (t * (1 + i * 0.6))) * amp * (1 - i * 0.18);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = `rgba(65, 105, 225, ${0.05 + i * 0.03})`;
      ctx.fill();
    }
    for (let p = 0; p < 30; p++) {
      const x = (Math.sin(t * 0.7 + p) * 0.5 + 0.5) * w;
      const y = (Math.cos(t * 0.5 + p * 0.3) * 0.5 + 0.5) * h;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.arc(x, y, 1.6 + (p % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();