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
