(function () {
  // Expose a global initializer that can be called after DOM/project rendering
  window.initCarousels = function initCarousels() {
    const wrappers = Array.from(document.querySelectorAll('.carousel-wrapper'));
    if (!wrappers.length) return;
    wrappers.forEach(initCarousel);
  };

  function initCarousel(wrapper) {
    // Prevent double initialization
    if (wrapper.dataset.initialized === 'true') return;
    wrapper.dataset.initialized = 'true';

    // Number of items visible at once (can be overridden via data-visible attribute)
    const visible = Math.max(1, parseInt(wrapper.dataset.visible, 10) || 3);

    // Main elements: track (container of cards), and nav buttons
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.prev');
    const nextBtn = wrapper.querySelector('.next');

    if (!track) return; // nothing to do

    // Original items inside the track (before cloning)
    let items = Array.from(track.children);

    // If not enough items, still allow basic layout (no infinite loop cloning)
    if (!items.length) return;

    // Clone head/tail to create infinite-loop illusion (only if enough items)
    const cloneHead = items.slice(0, visible).map(node => node.cloneNode(true));
    const cloneTail = items.slice(-visible).map(node => node.cloneNode(true));

    // Insert clones: tail clones at the start, head clones at the end
    cloneTail.forEach(n => track.insertBefore(n, track.firstChild));
    cloneHead.forEach(n => track.appendChild(n));

    // All track children including clones
    let trackItems = Array.from(track.children);
    const total = trackItems.length;

    // Start index positioned after the prepended clones
    let currentIndex = visible;
    let isTransitioning = false;

    // Compute width of one item (card) including CSS gap if present
    function itemWidth() {
      const card = trackItems[0];
      return card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
    }

    // Translate the track to show a given index.
    // animate = false disables CSS transition to perform jump (used for looping).
    function setTranslate(index, animate = true) {
      const w = itemWidth();
      if (!animate) track.style.transition = 'none';
      else track.style.transition = '';
      const offset = -index * w;
      track.style.transform = `translateX(${offset}px)`;
      // If we disabled transition, re-enable it on next frame
      if (!animate) requestAnimationFrame(()=>{requestAnimationFrame(()=>{track.style.transition='';});});
    }

    // Initial setup / recalc when items change or on resize
    function setup() {
      trackItems = Array.from(track.children);
      setTranslate(currentIndex, false);
    }

    // Move to a given index if not already transitioning
    function moveTo(index) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = index;
      setTranslate(currentIndex, true);
    }
    function next() { moveTo(currentIndex + 1); }
    function prev() { moveTo(currentIndex - 1); }

    // After CSS transition ends, check if we've moved into cloned area and jump to real item
    track.addEventListener('transitionend', () => {
      isTransitioning = false;
      const realCount = items.length;
      if (currentIndex >= realCount + visible) {
        // Moved past the real items into the head clones -> jump back to first real item
        currentIndex = visible;
        setTranslate(currentIndex, false);
      }
      if (currentIndex < visible) {
        // Moved before the real items into the tail clones -> jump to equivalent real item near end
        currentIndex = visible + (realCount - (visible - currentIndex));
        currentIndex = visible + (currentIndex % realCount);
        setTranslate(currentIndex, false);
      }
    });

    // Button navigation
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Keyboard navigation (left/right arrows) for wrapper when focused
    wrapper.tabIndex = wrapper.tabIndex || 0;
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    // Pointer / drag handling variables
    let startX = 0, dragging = false;

    // Pointer down: start dragging and disable transition for smooth follow
    const pointerDown = (x) => { dragging = true; startX = x; track.style.transition='none'; };

    // Pointer move: update transform while dragging
    const pointerMove = (x) => {
      if (!dragging) return;
      const dx = x - startX;
      const w = itemWidth();
      const base = -currentIndex * w;
      track.style.transform = `translateX(${base + dx}px)`;
    };

    // Pointer up: determine if swipe threshold passed to change slide or snap back
    const pointerUp = (x) => {
      if (!dragging) return;
      dragging = false;
      const dx = x - startX;
      const w = itemWidth();
      if (dx < -Math.min(w / 3, 80)) next(); // swipe left -> next
      else if (dx > Math.min(w / 3, 80)) prev(); // swipe right -> prev
      else setTranslate(currentIndex, true); // snap back
    };

    // Mouse drag support (desktop)
    track.addEventListener('mousedown', e => {
      e.preventDefault();
      pointerDown(e.clientX);
      const onMove = ev => pointerMove(ev.clientX);
      const onUp = ev => { pointerUp(ev.clientX); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // Touch support (mobile)
    track.addEventListener('touchstart', e => pointerDown(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove', e => pointerMove(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchend', e => pointerUp(e.changedTouches[0].clientX));

    // Recompute sizes/positions on resize (debounced slightly)
    window.addEventListener('resize', () => setTimeout(setup, 120));

    // Re-run setup after images inside the carousel load (ensures itemWidth is correct)
    track.querySelectorAll('img').forEach(img => {
      if (img.complete) return;
      img.addEventListener('load', () => {
        // small timeout to allow layout to settle then recalc
        setTimeout(setup, 30);
      });
    });

    // initial setup
    setup();
  }
})();