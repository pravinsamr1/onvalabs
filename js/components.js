// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", function() {
    Promise.all([
        fetch('header.html').then(res => res.text()),
        fetch('footer.html').then(res => res.text())
    ]).then(([headerHtml, footerHtml]) => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if(headerPlaceholder) headerPlaceholder.innerHTML = headerHtml;
        if(footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;
        
        // Active menu logic
        let currentUrl = window.location.pathname.split('/').pop();
        if (currentUrl === '' || currentUrl === '/') currentUrl = 'index.html';
        
        const links = document.querySelectorAll('#header-placeholder a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentUrl) {
                const li = link.closest('li');
                if (li) li.classList.add('active');
                
                // Add active to parent dropdown if nested
                const parentUl = link.closest('ul.dropdown');
                if (parentUl) {
                    const parentLi = parentUl.closest('li');
                    if (parentLi) parentLi.classList.add('active');
                }
            }
        });
        
        // Dispatch event for main.js to initialize
        window.dispatchEvent(new Event('componentsLoaded'));
    }).catch(err => console.error("Error loading components:", err));
});

// Automatic About Us image slideshow (changes every 10 seconds)
(function initAboutUsImageSlideshow() {
    const aboutImages = [
        'images/single-img-one.png',
        'images/single-img-seven.png',
        'images/single-img-two.png',
        'images/single-img-four.png'
    ];
    let currentIndex = 0;

    function startSlideshow() {
        const imgElements = document.querySelectorAll('#about-us-img-slideshow');
        if (!imgElements || imgElements.length === 0) return;

        // Set transition style on target images
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
