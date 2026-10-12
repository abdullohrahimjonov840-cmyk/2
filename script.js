/**
 * VOLTRON MOTORS — OFFICIAL CLIENT ENGINE
 * High-End Cyber-Luxury Interactive Logic & Web Audio Synthesizer
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. FUTURISTIC WEB AUDIO SYNTHESIZER (NO EXTERNAL AUDIO FILES NEEDED)
     =================================================================== */
  class EVSoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.init();
      this.enabled = !this.enabled;
      return this.enabled;
    }

    // Play subtle high-tech futuristic click
    playUiClick() {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }

    // Play hypercar electric acceleration surge sound
    playAccelerationRev() {
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const masterGain = this.ctx.createGain();

        // Dual oscillators for rich electric hyper-motor whine
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';

        // Frequency sweep from idle hum (90Hz) to hyper warp (950Hz)
        osc1.frequency.setValueAtTime(90, now);
        osc1.frequency.exponentialRampToValueAtTime(950, now + 1.8);
        osc1.frequency.exponentialRampToValueAtTime(320, now + 3.2);

        osc2.frequency.setValueAtTime(180, now);
        osc2.frequency.exponentialRampToValueAtTime(1900, now + 1.8);
        osc2.frequency.exponentialRampToValueAtTime(640, now + 3.2);

        // Low-pass resonant filter opening up
        filter.type = 'lowpass';
        filter.Q.setValueAtTime(5, now);
        filter.frequency.setValueAtTime(250, now);
        filter.frequency.exponentialRampToValueAtTime(4500, now + 1.6);
        filter.frequency.exponentialRampToValueAtTime(800, now + 3.2);

        // Gain envelope
        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.linearRampToValueAtTime(0.25, now + 0.3);
        masterGain.gain.linearRampToValueAtTime(0.22, now + 1.8);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 3.4);
        osc2.stop(now + 3.4);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }

    // Success confirmation chime
    playSuccessChime() {
      if (!this.enabled || !this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const startTime = this.ctx.currentTime + (idx * 0.08);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.07, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.4);
        });
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }
  }

  const soundEngine = new EVSoundEngine();

  // Audio Toggle Button
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const isEnabled = soundEngine.toggle();
      if (isEnabled) {
        soundToggleBtn.classList.add('sound-on');
        soundIcon.className = 'fa-solid fa-volume-high';
        soundEngine.playSuccessChime();
        showToast('EV Audio Yoqildi', 'Futuristik dvigatel va interfeys tovushlari faollashtirildi.');
      } else {
        soundToggleBtn.classList.remove('sound-on');
        soundIcon.className = 'fa-solid fa-volume-xmark';
        showToast('EV Audio O\'chirildi', 'Ovozlar o\'chirildi.');
      }
    });
  }

  // Hero Acceleration Audio Demo Button
  const heroRevBtn = document.getElementById('heroRevBtn');
  if (heroRevBtn) {
    heroRevBtn.addEventListener('click', () => {
      soundEngine.playAccelerationRev();
      showToast('⚡ 1,200 HP Akseleratsiya', '0 dan 100 km/s gacha 1.9 soniyada erishilmoqda...');
    });
  }

  // Attach subtle click sounds to buttons
  document.querySelectorAll('.btn, .filter-btn, .view-tab, .model-chip, .color-circle, .wheel-option-btn, .wchip').forEach(btn => {
    btn.addEventListener('click', () => {
      soundEngine.playUiClick();
    });
  });


  /* ===================================================================
     2. HERO CYBER CANVAS PARTICLES & SPEED GRID
     =================================================================== */
  const canvas = document.getElementById('cyberCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254,' : 'rgba(121, 40, 202,';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateCyberGrid() {
      ctx.clearRect(0, 0, width, height);

      // Draw faint cyber grid lines
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and connect particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect nearby particles with laser lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCyberGrid);
    }

    animateCyberGrid();
  }


  /* ===================================================================
     3. STICKY NAVBAR & MOBILE MENU
     =================================================================== */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNav();
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close mobile menu on click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        if (navItem) navItem.classList.add('active');
      }
    });
  }


  /* ===================================================================
     4. TELEMETRY NUMBER COUNTER ANIMATION (OBSERVER)
     =================================================================== */
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 1800; // ms
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
              clearInterval(timer);
            } else {
              counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const telemetryHud = document.querySelector('.hero-telemetry-hud');
  if (telemetryHud) {
    counterObserver.observe(telemetryHud);
  }


  /* ===================================================================
     5. VEHICLE FLEET FILTER TABS
     =================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const carCards = document.querySelectorAll('.car-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');

      carCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ===================================================================
     6. INTERACTIVE 3D/STUDIO CONFIGURATOR
     =================================================================== */
  const studioImage = document.getElementById('studioImage');
  const studioColorGlow = document.getElementById('studioColorGlow');
  const summaryModel = document.getElementById('summaryModel');
  const summaryColor = document.getElementById('summaryColor');
  const summaryWheels = document.getElementById('summaryWheels');
  const summaryPrice = document.getElementById('summaryPrice');

  // Config State
  let configState = {
    model: 'VOLTRON APEX GT',
    basePrice: 89000,
    colorName: 'Neon Cyber Blue',
    colorHex: '#00f2fe',
    glow: 'rgba(0, 242, 254, 0.4)',
    wheels: '21" AeroForged Titanium',
    wheelAdd: 0,
    currentView: 'exterior'
  };

  // Image assets by view and model
  const viewImages = {
    'exterior': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1500&q=85',
    'interior': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1500&q=85',
    'cockpit': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1500&q=85'
  };

  const modelImages = {
    'VOLTRON APEX GT': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1500&q=85',
    'VOLTRON CYBER-X': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1500&q=85',
    'VOLTRON PHANTOM BLADE': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1500&q=85',
    'VOLTRON LUMINA SEDAN': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1500&q=85'
  };

  function updateStudioSummary() {
    if (summaryModel) summaryModel.textContent = configState.model;
    if (summaryColor) summaryColor.textContent = configState.colorName;
    if (summaryWheels) summaryWheels.textContent = configState.wheels;

    const total = configState.basePrice + configState.wheelAdd;
    if (summaryPrice) summaryPrice.textContent = `$${total.toLocaleString('en-US')}`;

    if (studioColorGlow) {
      studioColorGlow.style.background = `radial-gradient(circle at 50% 60%, ${configState.glow}, transparent 75%)`;
    }
  }

  // Model chips
  const modelChips = document.querySelectorAll('.model-chip');
  modelChips.forEach(chip => {
    chip.addEventListener('click', () => {
      modelChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      configState.model = chip.getAttribute('data-name');
      configState.basePrice = parseInt(chip.getAttribute('data-base'), 10);

      if (configState.currentView === 'exterior') {
        fadeSwitchImage(modelImages[configState.model]);
      }
      updateStudioSummary();
    });
  });

  // Color circles
  const colorCircles = document.querySelectorAll('.color-circle');
  colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      colorCircles.forEach(c => c.classList.remove('active'));
      circle.classList.add('active');

      configState.colorName = circle.getAttribute('data-color-name');
      configState.colorHex = circle.getAttribute('data-color');
      configState.glow = circle.getAttribute('data-glow');

      // Subtle pulse transition on studio stage
      if (studioImage) {
        studioImage.style.filter = `drop-shadow(0 0 15px ${configState.colorHex})`;
        setTimeout(() => {
          studioImage.style.filter = 'none';
        }, 600);
      }
      updateStudioSummary();
    });
  });

  // Wheel option buttons
  const wheelBtns = document.querySelectorAll('.wheel-option-btn');
  wheelBtns.forEach(wbtn => {
    wbtn.addEventListener('click', () => {
      wheelBtns.forEach(wb => wb.classList.remove('active'));
      wbtn.classList.add('active');

      configState.wheels = wbtn.getAttribute('data-wheels');
      configState.wheelAdd = parseInt(wbtn.getAttribute('data-add'), 10);
      updateStudioSummary();
    });
  });

  // Studio View Tabs (Exterior / Interior / Cockpit)
  const viewTabs = document.querySelectorAll('.view-tab');
  viewTabs.forEach(vtab => {
    vtab.addEventListener('click', () => {
      viewTabs.forEach(vt => vt.classList.remove('active'));
      vtab.classList.add('active');

      const view = vtab.getAttribute('data-view');
      configState.currentView = view;

      if (view === 'exterior') {
        fadeSwitchImage(modelImages[configState.model]);
      } else {
        fadeSwitchImage(viewImages[view]);
      }
    });
  });

  function fadeSwitchImage(newSrc) {
    if (!studioImage || !newSrc) return;
    studioImage.style.opacity = '0.3';
    studioImage.style.transform = 'scale(0.97)';
    setTimeout(() => {
      studioImage.src = newSrc;
      studioImage.style.opacity = '1';
      studioImage.style.transform = 'scale(1)';
    }, 200);
  }

  // Model selection buttons from Fleet Cards to Studio
  document.querySelectorAll('.open-config-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetModel = btn.getAttribute('data-model');
      const configuratorSection = document.getElementById('configurator');
      if (configuratorSection) {
        configuratorSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Map to model name
      let nameToSelect = 'VOLTRON APEX GT';
      if (targetModel === 'cyber-x') nameToSelect = 'VOLTRON CYBER-X';
      if (targetModel === 'phantom-blade') nameToSelect = 'VOLTRON PHANTOM BLADE';
      if (targetModel === 'lumina') nameToSelect = 'VOLTRON LUMINA SEDAN';

      const chip = Array.from(modelChips).find(c => c.getAttribute('data-name') === nameToSelect);
      if (chip) chip.click();
    });
  });


  /* ===================================================================
     7. LIVE RANGE & CHARGING SIMULATOR ALGORITHM
     =================================================================== */
  const speedSlider = document.getElementById('speedSlider');
  const speedValue = document.getElementById('speedValue');
  const tempSlider = document.getElementById('tempSlider');
  const tempValue = document.getElementById('tempValue');
  const acToggle = document.getElementById('acToggle');
  const beastToggle = document.getElementById('beastToggle');
  const wchips = document.querySelectorAll('.wchip');

  const calcRangeVal = document.getElementById('calcRangeVal');
  const calcConsumption = document.getElementById('calcConsumption');
  const calcChargeTime = document.getElementById('calcChargeTime');
  const gaugeBar = document.getElementById('gaugeBar');

  let simWheelInch = 20;

  wchips.forEach(chip => {
    chip.addEventListener('click', () => {
      wchips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      simWheelInch = parseInt(chip.getAttribute('data-inch'), 10);
      recalculateRange();
    });
  });

  if (speedSlider) {
    speedSlider.addEventListener('input', () => {
      if (speedValue) speedValue.textContent = `${speedSlider.value} km/soat`;
      recalculateRange();
    });
  }

  if (tempSlider) {
    tempSlider.addEventListener('input', () => {
      const val = parseInt(tempSlider.value, 10);
      const sign = val > 0 ? '+' : '';
      if (tempValue) tempValue.textContent = `${sign}${val}°C`;
      recalculateRange();
    });
  }

  if (acToggle) acToggle.addEventListener('change', recalculateRange);
  if (beastToggle) beastToggle.addEventListener('change', recalculateRange);

  function recalculateRange() {
    const speed = parseInt(speedSlider ? speedSlider.value : 90, 10);
    const temp = parseInt(tempSlider ? tempSlider.value : 22, 10);
    const hasAC = acToggle ? acToggle.checked : true;
    const isBeast = beastToggle ? beastToggle.checked : false;

    // Base benchmark: 850 km at 90 km/h, 22°C, 20" rims
    let baseRange = 850;

    // Speed impact: quadratic aerodynamic drag
    // At 50 km/h: +14%, At 130 km/h: -26%, At 150 km/h: -36%
    const speedFactor = 1 - Math.pow((speed - 70) / 100, 1.6) * 0.42;

    // Temperature impact: optimal at 22°C; cold (-20°C) reduces by ~25%, extreme heat reduces by ~8%
    let tempFactor = 1;
    if (temp < 22) {
      tempFactor = 1 - (22 - temp) * 0.0075; // -20°C -> factor approx 0.68
    } else {
      tempFactor = 1 - (temp - 22) * 0.004;  // +45°C -> factor approx 0.90
    }

    // AC impact
    const acFactor = hasAC ? 0.94 : 1.0;

    // Beast mode impact (dual/quad motor active torque mode)
    const beastFactor = isBeast ? 0.82 : 1.0;

    // Wheel diameter impact (larger diameter = more rolling friction)
    let wheelFactor = 1.0;
    if (simWheelInch === 21) wheelFactor = 0.96;
    if (simWheelInch === 22) wheelFactor = 0.92;

    // Final calculated range
    let finalRange = Math.round(baseRange * speedFactor * tempFactor * acFactor * beastFactor * wheelFactor);
    finalRange = Math.max(340, Math.min(940, finalRange)); // realistic clamping

    // Energy consumption formula (kWh/100km): 120 kWh battery pack
    const consumption = (120 / (finalRange / 100)).toFixed(1);

    // Charge time at 350 kW Ultra-Fast Supercharger (10% to 80% = 84 kWh)
    // Cold battery needs slight preconditioning
    let chargeMinutes = 15;
    if (temp < 0) chargeMinutes = 18;
    if (temp < -10) chargeMinutes = 21;

    // Update UI elements
    if (calcRangeVal) calcRangeVal.textContent = finalRange;
    if (calcConsumption) calcConsumption.textContent = `${consumption} kWh/100km`;
    if (calcChargeTime) calcChargeTime.textContent = `${chargeMinutes} daqiqa`;

    // Update SVG Circular Gauge Fill
    // Circumference of r=85 is 2 * PI * 85 ~= 534
    // 950km = full gauge (offset 0), 300km = low gauge (offset ~360)
    if (gaugeBar) {
      const maxRange = 950;
      const minRange = 300;
      const pct = Math.max(0, Math.min(1, (finalRange - minRange) / (maxRange - minRange)));
      const offset = 534 * (1 - (0.2 + pct * 0.8));
      gaugeBar.style.strokeDashoffset = offset;
    }
  }

  // Initial calculation
  recalculateRange();


  /* ===================================================================
     8. GALLERY FILTER
     =================================================================== */
  const galleryBtns = document.querySelectorAll('.g-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryBtns.forEach(gbtn => {
    gbtn.addEventListener('click', () => {
      galleryBtns.forEach(b => b.classList.remove('active'));
      gbtn.classList.add('active');

      const filter = gbtn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const tag = item.getAttribute('data-tag');
        if (filter === 'all' || tag === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });


  /* ===================================================================
     9. FAQ ACCORDION
     =================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close others
      faqItems.forEach(other => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
        soundEngine.playUiClick();
      }
    });
  });


  /* ===================================================================
     10. TEST DRIVE MODAL POPUP & FORM LOGIC
     =================================================================== */
  const modal = document.getElementById('testDriveModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const testDriveForm = document.getElementById('testDriveForm');
  const modalStatusMsg = document.getElementById('modalStatusMsg');
  const tdModelSelect = document.getElementById('tdModel');

  // Open modal handler
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Pre-select current configured model if applicable
        if (tdModelSelect && configState.model) {
          if (configState.model.includes('APEX')) tdModelSelect.value = 'apex-gt';
          if (configState.model.includes('CYBER')) tdModelSelect.value = 'cyber-x';
          if (configState.model.includes('PHANTOM')) tdModelSelect.value = 'phantom-blade';
          if (configState.model.includes('LUMINA')) tdModelSelect.value = 'lumina';
        }

        // Set default minimum date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tdDate = document.getElementById('tdDate');
        if (tdDate) tdDate.min = tomorrow.toISOString().split('T')[0];
        if (tdDate && !tdDate.value) tdDate.value = tomorrow.toISOString().split('T')[0];
      }
    });
  });

  // Close modal
  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (modalStatusMsg) modalStatusMsg.textContent = '';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Submit test drive form
  if (testDriveForm) {
    testDriveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = testDriveForm.querySelector('.modal-submit-btn');
      const originalHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Ro\'yxatga olinmoqda...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;

        const name = document.getElementById('tdName').value;
        soundEngine.playSuccessChime();

        showToast(
          '🎉 Test-Drayv Band Qilindi!',
          `Hurmatli ${name}, sizning buyurtmangiz qabul qilindi. Tez orada menejerimiz bog'lanadi.`
        );

        testDriveForm.reset();
        closeModal();
      }, 1200);
    });
  }


  /* ===================================================================
     11. QUICK CONSULTATION FORM
     =================================================================== */
  const quickConsultForm = document.getElementById('quickConsultForm');
  const quickFormStatus = document.getElementById('quickFormStatus');

  if (quickConsultForm) {
    quickConsultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName').value;
      const phone = document.getElementById('cPhone').value;

      if (quickFormStatus) {
        quickFormStatus.style.color = '#00f2fe';
        quickFormStatus.textContent = 'So\'rovingiz yuborildi! Tez orada qo\'ng\'iroq qilamiz.';
      }

      soundEngine.playSuccessChime();
      showToast('So\'rov Qabul Qilindi', `${name}, raqamingizga (+${phone}) operatorimiz tez orada aloqaga chiqadi.`);
      quickConsultForm.reset();

      setTimeout(() => {
        if (quickFormStatus) quickFormStatus.textContent = '';
      }, 6000);
    });
  }


  /* ===================================================================
     12. TOAST NOTIFICATION UTILITY
     =================================================================== */
  function showToast(title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check"></i>
      <div class="toast-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

});
