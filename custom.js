// Custom cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
    });
    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 19}px,${ry - 19}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => revealObs.observe(el));

    // Skill bar animation
    const fills = document.querySelectorAll('.skill-fill');
    const skillObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('animated'); skillObs.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    fills.forEach(el => skillObs.observe(el));

    // 3D Tilt Effect for Profile
    const profileTilt = document.getElementById('profileTilt');
    if (profileTilt) {
      document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate rotation based on mouse position
        const xRot = ((clientY / innerHeight) - 0.5) * 20; // max 10deg
        const yRot = ((clientX / innerWidth) - 0.5) * -20; // max -10deg

        profileTilt.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
      });

      profileTilt.addEventListener('mouseleave', () => {
        profileTilt.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    }

    // Hero Parallax Blobs
    const blobs = document.querySelectorAll('.hero-blob');
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.02;
        const x = (innerWidth / 2 - clientX) * speed;
        const y = (innerHeight / 2 - clientY) * speed;
        blob.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    // Count-up animation for results
    const results = document.querySelectorAll('.result-num');
    const resultsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const val = parseFloat(target.innerText);
          const suffix = target.innerText.replace(/[0-9.]/g, '');
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            const currentVal = (ease * val).toFixed(val % 1 === 0 ? 0 : 1);
            target.innerText = currentVal + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          resultsObs.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    results.forEach(r => resultsObs.observe(r));

    // Sticky nav background
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(6,6,6,0.98)';
        nav.style.backdropFilter = 'blur(14px)';
        nav.style.padding = '16px 60px';
      } else {
        nav.style.background = 'linear-gradient(to bottom,rgba(6,6,6,0.97),transparent)';
        nav.style.backdropFilter = 'blur(2px)';
        nav.style.padding = '24px 60px';
      }
    });