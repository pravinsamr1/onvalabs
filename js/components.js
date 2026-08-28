// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", function () {
    const assetPrefix = window.location.pathname.includes('/services/') ? '../' : '';

    /**
     * Fix all relative image paths and hrefs inside fetched HTML
     * so that pages in sub-directories (e.g. /services/) still resolve
     * images and links correctly.
     */
    function fixRelativePaths(html, prefix) {
        if (!prefix) return html;

        // Fix lazy-load data-src image paths
        html = html.replace(/data-src="images\//g, `data-src="${prefix}images/`);
        // Fix regular src image paths
        html = html.replace(/ src="images\//g, ` src="${prefix}images/`);

        // Fix href paths — skip absolute URLs, mailto:, tel:, bare # anchors,
        // already-prefixed paths (../), and javascript: pseudo-links
        html = html.replace(
            /href="(?!https?:\/\/|mailto:|tel:|#|\.\.\/|javascript:)([^"]+)"/g,
            function (match, path) {
                return `href="${prefix}${path}"`;
            }
        );

        return html;
    }

    Promise.all([
        fetch(`${assetPrefix}header.html`).then(res => res.text()),
        fetch(`${assetPrefix}footer.html`).then(res => res.text())
    ]).then(([headerHtml, footerHtml]) => {
        // Apply path fixes for pages inside sub-directories
        headerHtml = fixRelativePaths(headerHtml, assetPrefix);
        footerHtml = fixRelativePaths(footerHtml, assetPrefix);

        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (headerPlaceholder) headerPlaceholder.innerHTML = headerHtml;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;

        // Active menu highlight: mark the current page's nav link as active
        let currentUrl = window.location.pathname.split('/').pop();
        if (currentUrl === '' || currentUrl === '/') currentUrl = 'index.html';

        // Add dropdown classes to parent list items with sub-menus/megamenus
        const dropdownParentItems = document.querySelectorAll('#header-placeholder ul.dropdown > li');
        dropdownParentItems.forEach(li => {
            const hasSubMenu = li.querySelector('ul, .megamenu-content');
            if (hasSubMenu) {
                li.classList.add('has-dropdown-mobile');
                const mainLink = li.querySelector(':scope > a');
                if (mainLink) mainLink.classList.add('has-dropdown-mobile');

                // Inject separate toggle button for down-arrow clicks
                const toggleBtn = document.createElement('div');
                toggleBtn.className = 'mobile-submenu-toggle';
                li.appendChild(toggleBtn);
            }
        });

        const links = document.querySelectorAll('#header-placeholder a');
        links.forEach(link => {
            const href = link.getAttribute('href') || '';
            // Match on the filename portion only
            const hrefFile = href.split('/').pop();
            if (hrefFile === currentUrl && currentUrl !== '') {
                const li = link.closest('li');
                if (li) li.classList.add('active');

                // Also activate parent megamenu li if this is a nested link
                const parentMegaMenu = link.closest('.megamenu-content');
                if (parentMegaMenu) {
                    const parentLi = parentMegaMenu.closest('li.megamenu-fw');
                    if (parentLi) parentLi.classList.add('active');
                }
            }
        });

        // Dispatch event so main.js can initialise plugins that depend on the
        // header/footer being present in the DOM (prettyPhoto, colour switcher, etc.)
        window.dispatchEvent(new Event('componentsLoaded'));
    }).catch(err => console.error("Error loading components:", err));
});

// ---------------------------------------------------------------------------
// Automatic About Us image slideshow (rotates every 10 seconds)
// ---------------------------------------------------------------------------
(function initAboutUsImageSlideshow() {
    const aboutImages = [
        'images/single-img-seven.png'
    ];
    let currentIndex = 0;

    function startSlideshow() {
        const imgElements = document.querySelectorAll('#about-us-img-slideshow');
        if (!imgElements || imgElements.length === 0) return;

        imgElements.forEach(img => {
            img.style.transition = 'opacity 0.6s ease-in-out';
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % aboutImages.length;
            const nextSrc = aboutImages[currentIndex];

            imgElements.forEach(img => {
                img.style.opacity = '0';
                setTimeout(() => {
                    img.src = nextSrc;
                    if (img.hasAttribute('data-src')) {
                        img.setAttribute('data-src', nextSrc);
                    }
                    img.style.opacity = '1';
                }, 600);
            });
        }, 10000); // 10 seconds
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSlideshow);
    } else {
        startSlideshow();
    }
})();
