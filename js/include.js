// Loads the shared header.html and footer.html into every page, then
// wires up the mobile menu (hamburger toggle + tap-to-expand dropdowns).
// Requires the site to be served over http/https (e.g. GitHub Pages
// or a local dev server) — it will NOT work if you open a page by
// double-clicking the file directly in your file system.

document.addEventListener('DOMContentLoaded', function () {
  var headerSlot = document.getElementById('header-placeholder');
  var footerSlot = document.getElementById('footer-placeholder');

  if (headerSlot) {
    fetch('/header.html')
      .then(function (res) { return res.text(); })
      .then(function (html) {
        headerSlot.outerHTML = html;
        setupMobileNav();
      })
      .catch(function (err) { console.error('Could not load header.html', err); });
  }

  if (footerSlot) {
    fetch('/footer.html')
      .then(function (res) { return res.text(); })
      .then(function (html) { footerSlot.outerHTML = html; })
      .catch(function (err) { console.error('Could not load footer.html', err); });
  }
});

function setupMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  // Hamburger opens/closes the whole mobile menu panel.
  toggle.addEventListener('click', function () {
    nav.classList.toggle('nav-open');
  });

  // Every nav item that has a dropdown gets a tap-to-expand caret,
  // since hover doesn't work on touch screens.
  var items = nav.querySelectorAll('.nav-item');
  items.forEach(function (item) {
    var panel = item.querySelector('.dropdown-panel');
    if (!panel) return;

    item.classList.add('has-dropdown');

    var caret = document.createElement('button');
    caret.type = 'button';
    caret.className = 'nav-caret';
    caret.setAttribute('aria-label', 'Show submenu');
    caret.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>';

    var link = item.querySelector('a');
    link.insertAdjacentElement('afterend', caret);

    caret.addEventListener('click', function (e) {
      e.preventDefault();
      item.classList.toggle('mobile-expanded');
    });
  });
}
