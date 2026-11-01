// CTA banner: add drifting tiles, animate in on scroll, parallax with the pointer
(function () {
    var section = document.querySelector('.cta-banner-section');
    if (!section) return;
    var card = section.querySelector('.cta-card');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Each column holds its images twice so the drift loops seamlessly
    function column(images, duration, reverse) {
        var tiles = images.concat(images).map(function (name) {
            return '<img class="cta-tile" src="images/cta-tiles/' + name + '.jpg" width="116" height="116" alt="" decoding="sync">';
        }).join('');
        return '<div class="cta-col' + (reverse ? ' reverse' : '') + '" style="--dur:' + duration + 's">' + tiles + '</div>';
    }
    // Twinkling squares on the floor grid, and rising sparks
    var fx = '<div class="cta-fx" aria-hidden="true">';
    for (var i = 0; i < 14; i++) {
        fx += '<span class="cta-cell" style="left:' + (Math.floor(Math.random() * 24) * 60) + 'px;' +
            'bottom:' + (Math.floor(Math.random() * 3) * 60) + 'px;' +
            '--dur:' + (3 + Math.random() * 4).toFixed(1) + 's;' +
            '--delay:' + (-Math.random() * 7).toFixed(1) + 's"></span>';
    }
    for (var j = 0; j < 16; j++) {
        fx += '<span class="cta-spark" style="left:' + (Math.random() * 100).toFixed(1) + '%;' +
            '--size:' + (2 + Math.random() * 3).toFixed(1) + 'px;' +
            '--dur:' + (5 + Math.random() * 5).toFixed(1) + 's;' +
            '--delay:' + (-Math.random() * 10).toFixed(1) + 's;' +
            '--drift:' + (Math.random() * 60 - 30).toFixed(0) + 'px"></span>';
    }
    card.insertAdjacentHTML('afterbegin', '<div class="cta-bg" aria-hidden="true"></div>' + fx + '</div>');

    card.insertAdjacentHTML('afterbegin',
        '<div class="cta-tiles left" aria-hidden="true">' +
        column(['rel_erp_saas', 'rel_seo_services', 'rel_custom_web'], 34, true) + '</div>' +
        '<div class="cta-tiles right" aria-hidden="true">' +
        column(['rel_android_dev', 'rel_basic_web', 'rel_cloud_hosting'], 30, false) +
        column(['rel_ios_dev', 'rel_performance_marketing', 'rel_basic_software'], 38, true) + '</div>');

    if ('IntersectionObserver' in window && !reduced) {
        section.classList.add('cta-anim');
        var io = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                section.classList.add('cta-in');
                setTimeout(function () { section.classList.add('cta-done'); }, 1500);
                io.disconnect();
            }
        }, { threshold: 0.3 });
        io.observe(section);
    }

    if (!window.matchMedia('(pointer: fine)').matches || reduced) return;

    var frame = null;
    card.addEventListener('mousemove', function (e) {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
            var rect = card.getBoundingClientRect();
            card.style.setProperty('--cta-mx', (((e.clientX - rect.left) / rect.width - 0.5) * 2).toFixed(3));
            card.style.setProperty('--cta-my', (((e.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3));
        });
    });

    card.addEventListener('mouseleave', function () {
        if (frame) cancelAnimationFrame(frame);
        card.style.removeProperty('--cta-mx');
        card.style.removeProperty('--cta-my');
    });
})();
