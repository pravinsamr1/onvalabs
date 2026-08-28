/** ==========================================================================================

  Project :   Altech - Responsive Multi-purpose HTML5 Template
  Version :   Bootstrap 5.3.3
  Author :    Themetechmount

========================================================================================== */

/** ===============

1. Preloader
2. TopSearch
3. Fixed-header
4. Menu
5. Number rotator
6. Enables menu toggle
7. Skillbar
8. Tab
9. Accordion
10. Isotope
11. Prettyphoto
12. owlCarousel

    .. Services slide
    .. Team slide
    .. Testimonial slide2
    .. Blog slide
    .. Clients-slide
    .. Portfolio-slide
    .. Testimonial slide
    .. Portfolio-img-slide
    .. Clients-slide2

13. Back to top 

 =============== */



(function ($) {

    'use strict'


    /*------------------------------------------------------------------------------*/
    /* Preloader
    /*------------------------------------------------------------------------------*/
    // makes sure the whole site is loaded
    $(window).on("load", function () {
        // will first fade out the loading animation
        $("#preloader").fadeOut();
        // will fade out the whole DIV that covers the website.
        $("#status").fadeOut(9000);
    })


    /*------------------------------------------------------------------------------*/
    /* TopSearch
    /*------------------------------------------------------------------------------*/


    jQuery(".ttm-header-search-link a").addClass('sclose');

    jQuery(".ttm-header-search-link a").on('click', function (event) {

        jQuery(".field.searchform-s").focus();

        if (jQuery('.ttm-header-search-link a').hasClass('sclose')) {
            jQuery(".ttm-header-search-link a i").removeClass('ti-search').addClass('ti-close');
            jQuery(this).removeClass('sclose').addClass('open');
            jQuery(".ttm-search-overlay").addClass('st-show');
        } else {
            jQuery(this).removeClass('open').addClass('sclose');
            jQuery(".ttm-header-search-link a i").removeClass('ti-close').addClass('ti-search');
            jQuery(".ttm-search-overlay").removeClass('st-show');
        }
        event.preventDefault();
    });


    /*------------------------------------------------------------------------------*/
    /* Fixed-header
    /*------------------------------------------------------------------------------*/


    $(window).scroll(function () {
        if (matchMedia('only screen and (min-width: 1200px)').matches) {
            if ($(window).scrollTop() >= 50) {
                $('.ttm-stickable-header').addClass('fixed-header');
                $('.ttm-stickable-header').addClass('visible-title');
            }
            else {

                $('.ttm-stickable-header').removeClass('fixed-header');
                $('ttm-stickable-header').removeClass('visible-title');
            }
        }
    });


    /*------------------------------------------------------------------------------*/
    /* Menu
    /*------------------------------------------------------------------------------*/

    $('ul li:has(ul)').addClass('has-submenu');
    $('ul li ul').addClass('sub-menu');


    $("ul.dropdown li").on({

        mouseover: function () {
            $(this).addClass("hover");
        },
        mouseout: function () {
            $(this).removeClass("hover");
        },

    });

    // Slide-out Mobile Sidebar Drawer toggle logic
    $(document).on('click', '#menu-toggle-btn', function (e) {
        e.stopPropagation();
        $('#menu').addClass('active');
        $('#mobile-menu-overlay').addClass('active');
        $('body').addClass('menu-open');
    });

    $(document).on('click', '#menu-close-btn, #mobile-menu-overlay, #menu a:not(.has-dropdown-mobile)', function (e) {
        // Prevent click closes for menu items that just trigger nested sub-menus
        if ($(this).hasClass('has-dropdown-mobile')) return;
        $('#menu').removeClass('active');
        $('#mobile-menu-overlay').removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Mobile accordion-style dropdown logic
    $(document).on('click', '.mobile-submenu-toggle', function (e) {
        if ($(window).width() < 1200) {
            e.preventDefault();
            e.stopPropagation();
            var $parentLi = $(this).parent('li');
            $parentLi.toggleClass('open-submenu');
            $parentLi.find('> ul, > .megamenu-content').slideToggle(300);
        }
    });

    $('ul li:has(ul)');


    /*------------------------------------------------------------------------------*/
    /* Animation on scroll: Number rotator
    /*------------------------------------------------------------------------------*/

    $("[data-appear-animation]").each(function () {
        var self = $(this);
        var animation = self.data("appear-animation");
        var delay = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);

        if ($(window).width() > 959) {
            self.html('0');
            self.waypoint(function (direction) {
                if (!self.hasClass('completed')) {
                    var from = self.data('from');
                    var to = self.data('to');
                    var interval = self.data('interval');
                    self.numinate({
                        format: '%counter%',
                        from: from,
                        to: to,
                        runningInterval: 2000,
                        stepUnit: interval,
                        onComplete: function (elem) {
                            self.addClass('completed');
                        }
                    });
                }
            }, { offset: '85%' });
        } else {
            if (animation == 'animateWidth') {
                self.css('width', self.data("width"));
            }
        }
    });


    /*------------------------------------------------------------------------------*/
    /* Skillbar
    /*------------------------------------------------------------------------------*/

    $('.ttm-progress-bar').each(function () {
        $(this).find('.progress-bar').width(0);
    });

    $('.ttm-progress-bar').each(function () {
        var self = $(this);

        self.waypoint(function () {
            if (!self.hasClass('animated')) {
                self.addClass('animated');

                // Animate the bar width
                self.find('.progress-bar').animate({
                    width: self.attr('data-percent')
                }, 2000);

                // Animate the percentage number
                var percentEl = self.find('.progress-bar-percent');
                var percentageRaw = percentEl.attr('data-percentage') || percentEl.attr('data-percent');

                if (percentageRaw) {
                    var percentage = Math.ceil(parseInt(percentageRaw));
                    $({ countNum: 0 }).animate({ countNum: percentage }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function () {
                            percentEl.text(Math.floor(this.countNum) + '%');
                        },
                        complete: function () {
                            percentEl.text(percentage + '%');
                        }
                    });
                }
            }
        }, { offset: '90%' });
    });


    /*------------------------------------------------------------------------------*/
    /* Tab
    /*------------------------------------------------------------------------------*/

    $('.ttm-tabs').each(function () {
        $(this).children('.content-tab').children().hide();
        $(this).children('.content-tab').children().first().show();
        $(this).find('.tabs').children('li').on('click', function (e) {
            var liActive = $(this).index(),
                contentActive = $(this).siblings().removeClass('active').parents('.ttm-tabs').children('.content-tab').children().eq(liActive);
            contentActive.addClass('active').fadeIn('slow');
            contentActive.siblings().removeClass('active');
            $(this).addClass('active').parents('.ttm-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
            e.preventDefault();
        });
    });


    /*------------------------------------------------------------------------------*/
    /* Accordion
    /*------------------------------------------------------------------------------*/

    /*https://www.antimath.info/jquery/quick-and-simple-jquery-accordion/*/
    $(".accordion").each(function () {

        var allPanels = $('.toggle').children(".toggle-content").hide();
        $('.toggle').children(".toggle-content").eq(1).slideDown("easeOutExpo");
        $('.toggle').children(".toggle-title").children("a").eq(1).addClass("active");

        $('.toggle').children(".toggle-title").children("a").on('click', function () {
            var current = $(this).parent().next(".toggle-content");
            $(".toggle-title > a").removeClass("active");
            $(this).addClass("active");
            allPanels.not(current).slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");
            return false;
        });

    });


    /*------------------------------------------------------------------------------*/
    /* Isotope
    /*------------------------------------------------------------------------------*/

    $(window).on('load', function () {

        var $container = $('#isotopeContainer');

        // filter items when filter link is clicked
        $('#filters a').on('click', function () {
            var selector = $(this).attr('data-filter');
            $container.isotope({ filter: selector });
            return false;
        });

        var $optionSets = $('#filters li'),
            $optionLinks = $optionSets.find('a');

        $optionLinks.on('click', function () {
            var $this = $(this);
            // don't proceed if already selected
            if ($this.hasClass('selected')) {
                return false;
            }
            var $optionSet = $this.parents('#filters');
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                // changes in layout modes need extra logic
                changeLayoutMode($this, options)
            } else {
                // otherwise, apply new options
                $container.isotope(options);
            }

            return false;
        });
    });


    /*------------------------------------------------------------------------------*/
    /* Prettyphoto
    /*------------------------------------------------------------------------------*/
    jQuery(window).on('componentsLoaded', function () {

        // Normal link
        jQuery('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').each(function () {
            if (jQuery(this).attr('target') != '_blank' && !jQuery(this).hasClass('prettyphoto') && !jQuery(this).hasClass('modula-lightbox')) {
                var attr = $(this).attr('data-gal');
                if (typeof attr !== typeof undefined && attr !== false && attr != 'prettyPhoto') {
                    jQuery(this).attr('data-rel', 'prettyPhoto');
                }
            }
        });


        jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
        jQuery('a.ttm_prettyphoto').prettyPhoto();
        jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
        jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({ hook: 'data-gal' })

    });
    $(document).ready(function () {
        var currentZoomLevel = 1.0;

        function applyBrowserZoom(zoomLevel) {
            currentZoomLevel = Math.round(zoomLevel * 100) / 100;

            // Ensure html and body zoom are reset to 100% so layout, containers, and media don't scale
            $('html, body').css('zoom', '100%');

            $('#text-only-zoom-style').remove();

            if (currentZoomLevel !== 1.0) {
                var zoomPercent = (currentZoomLevel * 100) + '%';
                var style = '<style id="text-only-zoom-style">';
                // Apply zoom exclusively to text typography elements
                style += 'p, h1, h2, h3, h4, h5, h6, a, span, li, label, input, textarea, button, figcaption, blockquote { ';
                style += '  zoom: ' + zoomPercent + ' !important; ';
                style += '}';
                // Guarantee images, SVGs, canvas, logos and slider media stay at 100% normal size
                style += 'img, svg, picture, canvas, .rev_slider, .tp-bgimg, .ttm-logo-img, video { ';
                style += '  zoom: 100% !important; ';
                style += '}';
                style += '</style>';
                $('head').append(style);
            }
        }

        $(document).on('click', '#btn-font-increase', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentZoomLevel < 1.5) {
                applyBrowserZoom(currentZoomLevel + 0.1);
            }
        });

        $(document).on('click', '#btn-font-decrease', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentZoomLevel > 0.7) {
                applyBrowserZoom(currentZoomLevel - 0.1);
            }
        });

        $(document).on('click', '#btn-font-reset', function (e) {
            e.preventDefault();
            e.stopPropagation();
            applyBrowserZoom(1.0);
        });

        // Ctrl + / Ctrl - / Ctrl 0 keyboard shortcuts linked to the zoom buttons
        $(document).on('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+' || e.code === 'NumpadAdd')) {
                e.preventDefault();
                if (currentZoomLevel < 1.5) {
                    applyBrowserZoom(currentZoomLevel + 0.1);
                }
            } else if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.code === 'NumpadSubtract')) {
                e.preventDefault();
                if (currentZoomLevel > 0.7) {
                    applyBrowserZoom(currentZoomLevel - 0.1);
                }
            } else if ((e.ctrlKey || e.metaKey) && (e.key === '0' || e.code === 'Numpad0')) {
                e.preventDefault();
                applyBrowserZoom(1.0);
            }
        });

        $(document).on('click', '#font-size-toggler', function (e) {
            $('.font-size-controls-popover').toggleClass('show');
            if ($(e.target).closest('.font-size-controls-popover').length === 0) {
                var nextZoom = (currentZoomLevel >= 1.4) ? 1.0 : currentZoomLevel + 0.1;
                applyBrowserZoom(nextZoom);
            }
        });
    });


    /*------------------------------------------------------------------------------*/
    /* owlCarousel
    /*------------------------------------------------------------------------------*/

    // =====1: history slide ==== 

    $(".history-slide").owlCarousel({
        loop: true,
        margin: 0,
        nav: $('.history-slide').data('nav'),
        dots: $('.history-slide').data('dots'),
        autoplay: $('.history-slide').data('auto'),
        smartSpeed: 3000,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3
            },
            992: {
                items: $('.history-slide').data('item')
            }
        }
    });


    // =====2- Team slide ==== 

    $(".team-slide").owlCarousel({
        loop: true,
        margin: 0,
        nav: $('.team-slide').data('nav'),
        dots: $('.team-slide').data('dots'),
        autoplay: $('.team-slide').data('auto'),
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3
            },
            1200: {
                items: $('.team-slide').data('item')
            }
        }
    });


    // =====3- Testimonial slide ==== 

    $(".testimonial-slide").owlCarousel({
        loop: true,
        margin: 0,
        smartSpeed: 1000,
        nav: $('.testimonial-slide').data('nav'),
        dots: $('.testimonial-slide').data('dots'),
        autoplay: $('.testimonial-slide').data('auto'),
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: $('.testimonial-slide').data('item')
            }
        }
    });

    // ===== 4-Portfolio-slide ==== 

    $(".portfolio-slide").owlCarousel({
        margin: 0,
        loop: true,
        nav: $('.portfolio-slide').data('nav'),
        dots: $('.portfolio-slide').data('dots'),
        autoplay: $('.portfolio-slide').data('auto'),
        smartSpeed: 3000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1024: {
                items: $('.portfolio-slide').data('item')
            }
        }
    });


    // ===== 5- Blog slide ==== 

    $(".blog-slide").owlCarousel({
        loop: true,
        margin: 0,
        nav: $('.blog-slide').data('nav'),
        dots: $('.blog-slide').data('dots'),
        autoplay: $('.blog-slide').data('auto'),
        smartSpeed: 3000,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            992: {
                items: $('.blog-slide').data('item')
            }
        }
    });


    // ===== 6- Clients-logo ==== 

    $(".clients-slide").owlCarousel({
        margin: 0,
        loop: true,
        nav: $('.clients-slide').data('nav'),
        dots: $('.clients-slide').data('dots'),
        autoplay: $('.clients-slide').data('auto'),
        smartSpeed: 3000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: $('.clients-slide').data('item')
            }
        }
    });

    // ===== 6- services-slide ==== 

    $(".services-slide").owlCarousel({
        margin: 0,
        loop: true,
        nav: $('.services-slide').data('nav'),
        dots: $('.services-slide').data('dots'),
        autoplay: $('.services-slide').data('auto'),
        smartSpeed: 3000,
        responsive: {
            0: {
                items: 1
            },

            680: {
                items: 2
            },
            992: {
                items: $('.services-slide').data('item')
            }
        }
    });



    // =====7- Testimonial slide ==== 

    $(".testimonial-slide2").owlCarousel({
        loop: true,
        margin: 0,
        smartSpeed: 1000,
        nav: $('.testimonial-slide2').data('nav'),
        dots: $('.testimonial-slide2').data('dots'),
        autoplay: $('.testimonial-slide2').data('auto'),
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            1000: {
                items: $('.testimonial-slide2').data('item')
            }
        }
    });

    // ===== 8- portfolio-img-slide ====   

    $(".portfolio-img-slide").owlCarousel({
        margin: 0,
        loop: true,
        nav: $('.portfolio-img-slide').data('nav'),
        dots: $('.portfolio-img-slide').data('dots'),
        autoplay: $('.portfolio-img-slide').data('auto'),
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            991: {
                items: 1
            },
            1000: {
                items: $('.portfolio-img-slide').data('item')
            }
        }
    });

    // ===== 9- project-slide ====   

    $(".project-slide").owlCarousel({
        margin: 0,
        loop: true,
        nav: $('.project-slide').data('nav'),
        dots: $('.project-slide').data('dots'),
        autoplay: $('.project-slide').data('auto'),
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            991: {
                items: 1
            },
            1000: {
                items: $('.project-slide').data('item')
            }
        }
    });

    // ===== 4-Portfolio-slide ==== 

    $(".portfolio-slide2").owlCarousel({
        margin: 0,
        loop: true,
        nav: $('.portfolio-slide2').data('nav'),
        dots: $('.portfolio-slide2').data('dots'),
        autoplay: $('.portfolio-slide2').data('auto'),
        smartSpeed: 3000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: $('.portfolio-slide2').data('item')
            }
        }
    });


    jQuery(window).on('componentsLoaded', function ($) {
        if (jQuery('body').hasClass('ttm-one-page-site')) {
            var sections = jQuery('.ttm-row'),
                nav = jQuery('.ttm-header-wrap, .menu'),
                nav_height = jQuery('#site-navigation').data('sticky-height') - 1;

            jQuery(window).on('scroll', function () {
                if (jQuery('body').scrollTop() < 5) {
                    nav.find('a').parent().removeClass('active');
                }
                var cur_pos = jQuery(this).scrollTop();
                sections.each(function () {
                    var top = jQuery(this).offset().top - (nav_height + 1),
                        bottom = top + jQuery(this).outerHeight();
                    if (cur_pos >= top && cur_pos <= bottom) {
                        if (typeof jQuery(this) != 'undefined' && typeof jQuery(this).attr('id') != 'undefined' && jQuery(this).attr('id') != '') {
                            var mainThis = jQuery(this);
                            nav.find('a').removeClass('active');
                            jQuery(this).addClass('active');
                            var arr = mainThis.attr('id');

                            // Applying active class
                            nav.find('a').parent().removeClass('active');
                            nav.find('a').each(function () {
                                var menuAttr = jQuery(this).attr('href').split('#')[1];
                                if (menuAttr == arr) {
                                    jQuery(this).parent().addClass('active');
                                }
                            })
                        }
                    }
                });
                //}
            });

            nav.find('a').on('click', function () {
                var $el = jQuery(this),
                    id = $el.attr('href');
                var arr = id.split('#')[1];
                jQuery('html, body').animate({
                    scrollTop: jQuery('#' + arr).offset().top - nav_height
                }, 500);
                return false;
            });

        }

    }); // END of  document.ready


    /*------------------------------------------------------------------------------*/
    /* Back to top
    /*------------------------------------------------------------------------------*/

    // ===== Scroll to Top ==== 
    jQuery('#totop').hide();
    jQuery(window).scroll(function () {
        "use strict";
        if (jQuery(this).scrollTop() >= 100) {        // If page is scrolled more than 50px
            jQuery('#totop').fadeIn(200);    // Fade in the arrow
            jQuery('#totop').addClass('top-visible');
        } else {
            jQuery('#totop').fadeOut(200);   // Else fade out the arrow
            jQuery('#totop').removeClass('top-visible');
        }
    });
    jQuery('#totop').on('click', function () {      // When arrow is clicked
        jQuery('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
        return false;
    });


    $(function () {

        /*------------------------------------------------------------------------------*/
        /* Color Switcher
        /*------------------------------------------------------------------------------*/
        $('.color-switcher-toggle').on('click', function () {
            $('#theme-color-switcher').toggleClass('active');
            $(this).find('i').toggleClass('fa-spin');
        });

        $('.color-list .color-item').on('click', function () {
            var color = $(this).data('color');
            var rgb = $(this).data('rgb');
            document.documentElement.style.setProperty('--theme-primary-color', color);
            document.documentElement.style.setProperty('--theme-primary-color-rgb', rgb);
        });
    });

    /*------------------------------------------------------------------------------*/
    /* Global Bouncy UI Animations
    /*------------------------------------------------------------------------------*/
    $(document).ready(function () {
        document.body.classList.add('js-animations-active');

        var elementsToAnimate = document.querySelectorAll('.img-fluid, .featured-icon-box, .ttm-box-col-wrapper, .section-title, .team-member');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var delay = Math.random() * 250;
                        setTimeout(function () {
                            entry.target.classList.add('is-visible');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

            elementsToAnimate.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers
            elementsToAnimate.forEach(function (el) {
                el.classList.add('is-visible');
            });
        }
    });

})(jQuery);

















// Floating Talk Button Modal Logic
$(document).ready(function () {
    var modalHtml = `
        <div class="modal fade custom-enquiry-modal" id="talkToUsModal" tabindex="-1" aria-labelledby="talkToUsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 900px;">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <button type="button" class="modal-close-btn" data-bs-dismiss="modal" aria-label="Close">
                            <i class="ti ti-close"></i>
                        </button>
                        <div class="row g-0">
                            <!-- Left Info Panel -->
                            <div class="col-md-5 modal-info-panel p-5 d-flex flex-column justify-content-between">
                                <div>
                                    <h3 class="text-white mb-4">Let's Build Something Amazing.</h3>
                                    <p class="text-white-50" style="font-size: 15px;">Partner with Onvalabs for innovative web development, apps, and custom digital solutions tailored to your business.</p>
                                </div>
                                <div class="mt-5">
                                    <div class="contact-info-item">
                                        <i class="ti ti-email"></i>
                                        <span>info@onva.com.au</span>
                                    </div>
                                    <div class="contact-info-item">
                                        <i class="fa fa-map-marker"></i>
                                        <span>Sydney, NSW Australia</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Right Form Panel -->
                            <div class="col-md-7 modal-form-panel p-5">
                                <h4 class="mb-4" style="font-weight: 700; color: #182333;">Send an Enquiry</h4>
                                <form id="talkToUsForm">
                                    <div class="row">
                                        <div class="col-md-6 mb-4">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="enqName" placeholder="Name" required>
                                                <label for="enqName">Your Name</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <div class="form-floating">
                                                <input type="email" class="form-control" id="enqEmail" placeholder="Email" required>
                                                <label for="enqEmail">Email Address</label>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-4">
                                            <div class="form-floating">
                                                <select class="form-select" id="enqService" aria-label="Service of interest">
                                                    <option selected>Select a Service</option>
                                                    <option value="web">Web Development</option>
                                                    <option value="app">Mobile App Development</option>
                                                    <option value="seo">Digital Marketing</option>
                                                    <option value="domain">Domain & Hosting</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                <label for="enqService">Interested In</label>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-4">
                                            <div class="form-floating">
                                                <textarea class="form-control" placeholder="Message" id="enqMessage" required></textarea>
                                                <label for="enqMessage">Project Details</label>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <button type="submit" class="btn modal-submit-btn">
                                                Submit Request
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

    // Append modal to body
    $('body').append(modalHtml);

    // Bind click event to floating button
    $(document).on('click', '.floating-talk-btn', function (e) {
        e.preventDefault();
        $('#talkToUsModal').modal('show');
    });
});
