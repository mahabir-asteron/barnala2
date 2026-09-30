// Loads the shared header.html and footer.html into every page, then
// wires up the mobile menu (hamburger toggle, slide-in panel, overlay,
// tap-to-expand dropdowns). Requires the site to be served over
// http/https (e.g. GitHub Pages) — it will NOT work if you open a
// page by double-clicking the file directly in your file system.

document.addEventListener('DOMContentLoaded', function () {
  var headerSlot = document.getElementById('header-placeholder');
  var footerSlot = document.getElementById('footer-placeholder');

  if (headerSlot) {
    fetch('header.html')
      .then(function (res) { return res.text(); })
      .then(function (html) {
        headerSlot.outerHTML = html;
        setupMobileNav();
      })
      .catch(function (err) { console.error('Could not load header.html', err); });
  }

  if (footerSlot) {
    fetch('footer.html')
      .then(function (res) { return res.text(); })
      .then(function (html) { footerSlot.outerHTML = html; })
      .catch(function (err) { console.error('Could not load footer.html', err); });
  }
});

function setupMobileNav() {
  var menuToggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mainMenu');
  var closeBtn = document.getElementById('menuClose');
  var overlay = document.getElementById('menuOverlay');
  if (!menuToggle || !menu || !closeBtn || !overlay) return;

  function closeMenu() {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
    document.querySelectorAll('.has-dropdown').forEach(function (item) {
      item.classList.remove('open');
    });
  }

  menuToggle.addEventListener('click', function () {
    document.querySelectorAll('.has-dropdown').forEach(function (item) {
      item.classList.remove('open');
    });
    menu.classList.add('active');
    overlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  document.querySelectorAll('#mainMenu > a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 1200) closeMenu();
    });
  });

  document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth <= 1200) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1200) {
      closeMenu();
    }
  });
}

/* Fixed hero background with upward scroll movement */
(function () {
  function setupHeroBackgrounds() {
    document.querySelectorAll(".photo-hero-banner").forEach(function (hero) {
      const img = hero.querySelector(":scope > img");

      if (!img || hero.dataset.fixedBgReady) return;

      hero.dataset.fixedBgReady = "true";

      const bg = document.createElement("div");
      bg.className = "hero-fixed-background";
      bg.style.backgroundImage = 'url("' + img.src + '")';

      hero.insertBefore(bg, img);
      img.style.visibility = "hidden";
    });
  }

  function updateHeroBackgrounds() {
    document.querySelectorAll(".photo-hero-banner").forEach(function (hero) {
      const bg = hero.querySelector(".hero-fixed-background");
      if (!bg) return;

      const rect = hero.getBoundingClientRect();
      const movement = Math.max(0, Math.min(40, -rect.top * 0.12));

      bg.style.transform = "translate3d(0, -" + movement + "px, 0)";
    });
  }

  function refresh() {
    setupHeroBackgrounds();
    updateHeroBackgrounds();
  }

  window.addEventListener("scroll", function () {
    requestAnimationFrame(updateHeroBackgrounds);
  }, { passive: true });

  window.addEventListener("resize", refresh);
  window.addEventListener("load", refresh);
  document.addEventListener("DOMContentLoaded", refresh);
  refresh();
})();
