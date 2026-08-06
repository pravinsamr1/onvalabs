import re

with open('basic-web-development.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_main_content = """
        <!-- page-title -->
        <div class="ttm-page-title-row ttm-bgcolor-darkgrey ttm-bg ttm-bgimage-yes ttm-has-color" style="padding: 100px 0; background-color: #0f172a; text-align: center;">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-12">
                        <div class="ttm-page-title-row-inner">
                            <div class="page-title-heading">
                                <h2 class="title" style="color: #fff; font-size: 42px; font-weight: 700;">Basic Web Development</h2>
                            </div>
                            <div class="breadcrumb-wrapper">
                                <span>
                                    <a title="Homepage" href="index.html" style="color: #cbd5e1;">Home</a>
                                </span>
                                <span class="ttm-bread-sep" style="color: #007bff;">&nbsp;/&nbsp;</span>
                                <span style="color: #cbd5e1;">
                                    <a title="Web Development" href="#" style="color: #cbd5e1;">Web Development</a>
                                </span>
                                <span class="ttm-bread-sep" style="color: #007bff;">&nbsp;/&nbsp;</span>
                                <span style="color: #007bff;">Basic Web Development</span>
                            </div>
                            <p class="lead mt-20" style="color: #e2e8f0; font-size: 18px; max-width: 700px; margin: 20px auto 0;">A clean, credible website that gets your business online quickly — without cutting corners on quality.</p>
                            <div class="mt-30">
                                <a class="ttm-btn ttm-btn-size-md ttm-btn-shape-round ttm-btn-style-fill ttm-btn-color-skincolor" href="contact-us.html">Get a Quote</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- page-title end -->

        <!--site-main start-->
        <div class="site-main">

            <!-- about-section -->
            <section class="ttm-row about-section clearfix" style="padding: 100px 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-12">
                            <div class="pr-30 res-991-pr-0 res-991-mb-40">
                                <div class="section-title">
                                    <div class="title-header">
                                        <h2 class="title">What we <span>deliver</span></h2>
                                    </div>
                                    <div class="title-desc">
                                        <p>Basic web development is for businesses that need a professional online presence, fast. We design and build a responsive, mobile-first website of up to eight pages, optimised for speed and search, with the essentials your customers expect: clear services, contact forms and a map to find you. Every site is hand-coded or built on a lightweight framework, so it loads fast and stays easy to maintain.</p>
                                    </div>
                                </div>
                                <ul class="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor mt-30">
                                    <li><i class="fa fa-check-circle-o"></i><div class="ttm-list-li-content"><b>Up to 8 responsive pages</b></div></li>
                                    <li><i class="fa fa-check-circle-o"></i><div class="ttm-list-li-content"><b>Mobile-first, accessible layout</b></div></li>
                                    <li><i class="fa fa-check-circle-o"></i><div class="ttm-list-li-content"><b>On-page SEO setup</b></div></li>
                                    <li><i class="fa fa-check-circle-o"></i><div class="ttm-list-li-content"><b>Contact form & Google Maps</b></div></li>
                                    <li><i class="fa fa-check-circle-o"></i><div class="ttm-list-li-content"><b>Google Analytics setup</b></div></li>
                                    <li><i class="fa fa-check-circle-o"></i><div class="ttm-list-li-content"><b>Launch in as little as 2 weeks</b></div></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="ttm_single_image-wrapper">
                                <img class="img-fluid" src="images/single-img-01.jpg" alt="Basic Web Development">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- about-section end -->

            <!-- services-section -->
            <section class="ttm-row services-section ttm-bgcolor-grey clearfix" style="padding: 100px 0; background-color: #f7f9fa;">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title title-style-center_text">
                                <div class="title-header">
                                    <h2 class="title">Everything you <span>get</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="featured-icon-box icon-align-top-content style1">
                                <div class="featured-icon">
                                    <div class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                                        <i class="ti ti-desktop"></i>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h5>Responsive design</h5>
                                    </div>
                                    <div class="featured-desc">
                                        <p>Looks sharp on every device — phones, tablets and desktops — tested before launch.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="featured-icon-box icon-align-top-content style1">
                                <div class="featured-icon">
                                    <div class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                                        <i class="ti ti-search"></i>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h5>SEO foundations</h5>
                                    </div>
                                    <div class="featured-desc">
                                        <p>Semantic markup, meta tags and clean URLs so search engines understand your site.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="featured-icon-box icon-align-top-content style1">
                                <div class="featured-icon">
                                    <div class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                                        <i class="ti ti-email"></i>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h5>Contact & forms</h5>
                                    </div>
                                    <div class="featured-desc">
                                        <p>Working forms that route enquiries straight to your inbox, spam-protected.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="featured-icon-box icon-align-top-content style1">
                                <div class="featured-icon">
                                    <div class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                                        <i class="ti ti-timer"></i>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h5>Fast load times</h5>
                                    </div>
                                    <div class="featured-desc">
                                        <p>Optimised images and lean code for sub-two-second loads and better rankings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- services-section end -->

            <!-- process-section -->
            <section class="ttm-row process-section clearfix" style="padding: 100px 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title title-style-center_text">
                                <div class="title-header">
                                    <h2 class="title">Our <span>process</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="featured-icon-box style4">
                                <div class="featured-icon">
                                    <div class="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-md ttm-icon_element-style-rounded">
                                        <i class="ti ti-light-bulb"></i>
                                        <span class="number">01</span>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h5>Discover</h5>
                                    </div>
                                    <div class="featured-desc">
                                        <p>We learn your business, gather content and agree the page structure.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="featured-icon-box style4">
                                <div class="featured-icon">
                                    <div class="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-md ttm-icon_element-style-rounded">
                                        <i class="ti ti-ruler-pencil"></i>
                                        <span class="number">02</span>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h5>Design</h5>
                                    </div>
                                    <div class="featured-desc">
                                        <p>You review a clean visual layout before we build a single page.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="featured-icon-box style4">
                                <div class="featured-icon">
                                    <div class="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-md ttm-icon_element-style-rounded">
                                        <i class="ti ti-panel"></i>
                                        <span class="number">03</span>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h5>Build</h5>
                                    </div>
                                    <div class="featured-desc">
                                        <p>We develop the responsive site and wire up forms and analytics.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="featured-icon-box style4">
                                <div class="featured-icon">
                                    <div class="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-md ttm-icon_element-style-rounded">
                                        <i class="ti ti-rocket"></i>
                                        <span class="number">04</span>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h5>Launch</h5>
                                    </div>
                                    <div class="featured-desc">
                                        <p>We test, deploy and hand over — with 30 days of post-launch support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- process-section end -->

            <!-- faq-section -->
            <section class="ttm-row faq-section ttm-bgcolor-grey clearfix" style="padding: 100px 0; background-color: #f7f9fa;">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2">
                            <div class="section-title title-style-center_text">
                                <div class="title-header">
                                    <h2 class="title">Common <span>questions</span></h2>
                                </div>
                            </div>
                            <div class="accordion">
                                <!-- toggle -->
                                <div class="toggle ttm-style-classic ttm-toggle-title-bgcolor-grey ttm-control-right-true">
                                    <div class="toggle-title"><a href="#">How many pages are included?</a></div>
                                    <div class="toggle-content">
                                        <p>The Basic package covers up to eight pages — typically Home, About, Services, Contact and a few supporting pages. Need more? We'll scope a Dynamic or Custom build.</p>
                                    </div>
                                </div><!-- toggle end -->
                                <!-- toggle -->
                                <div class="toggle ttm-style-classic ttm-toggle-title-bgcolor-grey ttm-control-right-true">
                                    <div class="toggle-title"><a href="#">Can I update the content myself?</a></div>
                                    <div class="toggle-content">
                                        <p>Basic sites are lightweight and best updated by us through a care plan. If you want to edit content yourself, our Dynamic web development adds a CMS.</p>
                                    </div>
                                </div><!-- toggle end -->
                                <!-- toggle -->
                                <div class="toggle ttm-style-classic ttm-toggle-title-bgcolor-grey ttm-control-right-true">
                                    <div class="toggle-title"><a href="#">How fast can it launch?</a></div>
                                    <div class="toggle-content">
                                        <p>With content ready, a basic site can go live in as little as two weeks.</p>
                                    </div>
                                </div><!-- toggle end -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- faq-section end -->

            <!-- call-to-action-section -->
            <section class="ttm-row call-to-action-section ttm-bgcolor-skincolor ttm-bg ttm-bgimage-yes bg-img1 clearfix" style="padding: 100px 0;">
                <div class="ttm-row-wrapper-bg-layer ttm-bg-layer"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <h2 class="title" style="color: #fff; font-size: 36px;">Ready to start?</h2>
                                <p style="color: #fff; font-size: 18px; margin-bottom: 30px;">Tell us about your project and we'll come back within one business day with a clear plan and quote.</p>
                                <a href="contact-us.html" class="ttm-btn ttm-btn-size-md ttm-btn-style-border ttm-btn-color-white">Start a Project</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- call-to-action-section end -->

        </div><!--site-main end-->
"""

# Find the header end and footer start
header_end_idx = content.find('</header><!--header end-->')
if header_end_idx == -1:
    print("Could not find header end")
    exit(1)
header_end_idx += len('</header><!--header end-->')

footer_start_idx = content.find('<!--footer start-->')
if footer_start_idx == -1:
    print("Could not find footer start")
    exit(1)

new_content = content[:header_end_idx] + "\n" + new_main_content + "\n" + content[footer_start_idx:]

with open('basic-web-development.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully replaced content")
