document.addEventListener("DOMContentLoaded", function () {

    var headerSlot = document.getElementById("header-placeholder");
    var footerSlot = document.getElementById("footer-placeholder");

    /* =========================
       LOAD HEADER
    ========================= */

    if (headerSlot) {

        fetch("header.html")
            .then(function (res) {
                if (!res.ok) {
                    throw new Error("Header could not be loaded");
                }

                return res.text();
            })
            .then(function (html) {

                headerSlot.outerHTML = html;

                setupMobileNav();

            })
            .catch(function (err) {

                console.error(
                    "Could not load header.html:",
                    err
                );

            });

    }


    /* =========================
       LOAD FOOTER
    ========================= */

    if (footerSlot) {

        fetch("footer.html")
            .then(function (res) {
                if (!res.ok) {
                    throw new Error("Footer could not be loaded");
                }

                return res.text();
            })
            .then(function (html) {

                footerSlot.outerHTML = html;

            })
            .catch(function (err) {

                console.error(
                    "Could not load footer.html:",
                    err
                );

            });

    }

});


/* =========================
   MOBILE NAVIGATION
========================= */

function setupMobileNav() {

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");

    if (!toggle || !nav) {
        return;
    }


    /* HAMBURGER */

    toggle.addEventListener("click", function () {

        nav.classList.toggle("nav-open");
        toggle.classList.toggle("active");

    });


    /* DROPDOWNS */

    var items = nav.querySelectorAll(".nav-item");

    items.forEach(function (item) {

        var panel = item.querySelector(".dropdown-panel");

        if (!panel) {
            return;
        }

        item.classList.add("has-dropdown");

        var link = item.querySelector(":scope > a");

        if (!link) {
            return;
        }

        var caret = document.createElement("button");

        caret.type = "button";
        caret.className = "nav-caret";
        caret.setAttribute("aria-label", "Show submenu");

        caret.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
            '<path d="M6 9l6 6 6-6"/>' +
            '</svg>';

        link.insertAdjacentElement(
            "afterend",
            caret
        );

        caret.addEventListener("click", function (e) {

            e.preventDefault();
            e.stopPropagation();

            item.classList.toggle("mobile-expanded");

        });

    });

}
