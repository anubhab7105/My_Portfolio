(function () {
  // Initialize all carousels on the page. Call after DOM or dynamic content has been rendered.
  window.initCarousels = function initCarousels() {
    const wrappers = Array.from(document.querySelectorAll('.carousel-wrapper'));
    if (!wrappers.length) return;
    wrappers.forEach(initCarousel);
  };

  function initCarousel(wrapper) {
    // Avoid initializing the same wrapper more than once
    if (wrapper.dataset.initialized === 'true') return;
    wrapper.dataset.initialized = 'true';

    // Number of visible items; can be overridden with data-visible
    const visible = Math.max(1, parseInt(wrapper.dataset.visible, 10) || 3);

    // Core elements: track (cards container) and navigation buttons
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.prev');
    const nextBtn = wrapper.querySelector('.next');

    if (!track) return;

    // Original items before cloning for infinite-loop illusion
    let items = Array.from(track.children);

    if (!items.length) return;

    // Clone head/tail segments to simulate an infinite loop
    const cloneHead = items.slice(0, visible).map(node => node.cloneNode(true));
    const cloneTail = items.slice(-visible).map(node => node.cloneNode(true));

    // Prepend tail clones and append head clones
    cloneTail.forEach(n => track.insertBefore(n, track.firstChild));
    cloneHead.forEach(n => track.appendChild(n));

    // All track children including clones
    let trackItems = Array.from(track.children);
    const total = trackItems.length;

    // Start index positioned after prepended clones
    let currentIndex = visible;
    let isTransitioning = false;

    // Width of one item, including gap from CSS
    function itemWidth() {
      const card = trackItems[0];
      return card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
    }

    // Move track to show a given index. animate=false disables CSS transition for instant jumps.
    function setTranslate(index, animate = true) {
      const w = itemWidth();
      if (!animate) track.style.transition = 'none';
      else track.style.transition = '';
      const offset = -index * w;
      track.style.transform = `translateX(${offset}px)`;
      if (!animate) requestAnimationFrame(()=>{requestAnimationFrame(()=>{track.style.transition='';});});
    }

    // Recalculate items and set initial position (used after DOM changes or resize)
    function setup() {
      trackItems = Array.from(track.children);
      setTranslate(currentIndex, false);
    }

    // Start a move if not currently transitioning
    function moveTo(index) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = index;
      setTranslate(currentIndex, true);
    }
    function next() { moveTo(currentIndex + 1); }
    function prev() { moveTo(currentIndex - 1); }

    // When transition completes, detect if we're in cloned area and jump to the corresponding real item
    track.addEventListener('transitionend', () => {
      isTransitioning = false;
      const realCount = items.length;
      if (currentIndex >= realCount + visible) {
        // jumped into head clones -> snap back to first real item
        currentIndex = visible;
        setTranslate(currentIndex, false);
      }
      if (currentIndex < visible) {
        // jumped into tail clones -> snap to equivalent real item near the end
        currentIndex = visible + (realCount - (visible - currentIndex));
        currentIndex = visible + (currentIndex % realCount);
        setTranslate(currentIndex, false);
      }
    });

    // Navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Keyboard navigation while wrapper is focused
    wrapper.tabIndex = wrapper.tabIndex || 0;
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    // Pointer/drag state
    let startX = 0, dragging = false;

    // Begin drag: disable transition so track follows pointer
    const pointerDown = (x) => { dragging = true; startX = x; track.style.transition='none'; };

    // Follow pointer while dragging
    const pointerMove = (x) => {
      if (!dragging) return;
      const dx = x - startX;
      const w = itemWidth();
      const base = -currentIndex * w;
      track.style.transform = `translateX(${base + dx}px)`;
    };

    // End drag: decide whether to advance slide or snap back
    const pointerUp = (x) => {
      if (!dragging) return;
      dragging = false;
      const dx = x - startX;
      const w = itemWidth();
      if (dx < -Math.min(w / 3, 80)) next();
      else if (dx > Math.min(w / 3, 80)) prev();
      else setTranslate(currentIndex, true);
    };

    // Mouse drag events (desktop)
    track.addEventListener('mousedown', e => {
      e.preventDefault();
      pointerDown(e.clientX);
      const onMove = ev => pointerMove(ev.clientX);
      const onUp = ev => { pointerUp(ev.clientX); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // Touch events (mobile)
    track.addEventListener('touchstart', e => pointerDown(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove', e => pointerMove(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchend', e => pointerUp(e.changedTouches[0].clientX));

    // Recalculate layout on resize (light debounce)
    window.addEventListener('resize', () => setTimeout(setup, 120));

    // Recalculate after images load inside the carousel
    track.querySelectorAll('img').forEach(img => {
      if (img.complete) return;
      img.addEventListener('load', () => {
        setTimeout(setup, 30);
      });
    });

    // Initial layout
    setup();
  }
})();