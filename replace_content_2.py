import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

header_match = re.search(r'(.*?</header><!--header end-->)', index_content, re.DOTALL)
footer_match = re.search(r'(<!--footer start-->.*)', index_content, re.DOTALL)

if not header_match or not footer_match:
    print("Could not find header or footer in index.html")
    exit(1)

header = header_match.group(1)
footer = footer_match.group(1)

new_main_content = """
        <!-- page-title -->
        <div class="ttm-page-title-row">
            <div class="container">
                <div class="row">
                    <div class="col-md-12"> 
                        <div class="title-box text-center">
                            <div class="page-title-heading">
                                <h1 class="title">Basic Web Development</h1>
                            </div><!-- /.page-title-captions -->
                            <div class="breadcrumb-wrapper">
                                <span>
                                    <a title="Homepage" href="index.html"><i class="ti ti-home"></i>&nbsp;&nbsp;Home</a>
                                </span>
                                <span class="ttm-bread-sep">&nbsp; : : &nbsp;</span>
                                <span>Web Development</span>
                                <span class="ttm-bread-sep">&nbsp; : : &nbsp;</span>
                                <span>Basic Web Development</span>
                            </div>  
                        </div>
                    </div><!-- /.col-md-12 -->  
                </div><!-- /.row -->  
            </div><!-- /.container -->                      
        </div><!-- page-title end-->

        <!--site-main start-->
        <div class="site-main">

            <!-- aboutus-section -->
            <section class="ttm-row about-services-section clearfix">
                <div class="container">
                    <div class="row align-items-center"><!-- row -->
                        <div class="col-lg-6">
                            <div class="position-relative">
                                <!-- ttm_single_image-wrapper -->
                                <div class="ttm_single_image-wrapper text-sm-center">
                                    <img class="img-fluid" src="images/single-img-01.jpg" alt="Basic Web Development">
                                </div><!-- ttm_single_image-wrapper end -->
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="res-991-mt-30">
                                <!-- section title -->
                                <div class="section-title with-desc clearfix">
                                    <div class="title-header">
                                        <h5>Basic Web Development</h5>
                                        <h2 class="title">What we <span>deliver</span></h2>
                                    </div>
                                    <div class="title-desc">
                                        <p>Basic web development is for businesses that need a professional online presence, fast. We design and build a responsive, mobile-first website of up to eight pages, optimised for speed and search, with the essentials your customers expect: clear services, contact forms and a map to find you. Every site is hand-coded or built on a lightweight framework, so it loads fast and stays easy to maintain.</p>
                                    </div>
                                </div><!-- section title end -->
                                <!-- row -->
                                <div class="row mt-25">
                                    <div class="col-md-6">
                                        <!-- featured-icon-box -->
                                        <div class="featured-icon-box iconalign-before-heading mb-25">
                                            <div class="featured-content">
                                                <div class="ttm-icon ttm-icon_element-bgcolor-grey style1">
                                                    <i class="ti ti-layout-media-overlay-alt-2 ttm-num"></i>
                                                </div>
                                                <div class="featured-title">
                                                    <h5>8 Responsive Pages</h5>
                                                </div>
                                            </div>
                                        </div><!-- featured-icon-box -->
                                        <!-- featured-icon-box -->
                                        <div class="featured-icon-box iconalign-before-heading mb-25">
                                            <div class="featured-content">
                                                <div class="ttm-icon ttm-icon_element-bgcolor-grey style1">
                                                    <i class="ti ti-mobile ttm-num"></i>
                                                </div>
                                                <div class="featured-title">
                                                    <h5>Mobile-first Layout</h5>
                                                </div>
                                            </div>
                                        </div><!-- featured-icon-box -->
                                        <!-- featured-icon-box -->
                                        <div class="featured-icon-box iconalign-before-heading">
                                            <div class="featured-content">
                                                <div class="ttm-icon ttm-icon_element-bgcolor-grey style1">
                                                    <i class="ti ti-search ttm-num"></i>
                                                </div>
                                                <div class="featured-title">
                                                    <h5>On-page SEO setup</h5>
                                                </div>
                                            </div>
                                        </div><!-- featured-icon-box -->
                                    </div>
                                    <div class="col-md-6">
                                        <!-- featured-icon-box -->
                                        <div class="featured-icon-box iconalign-before-heading mb-25">
                                            <div class="featured-content">
                                                <div class="ttm-icon ttm-icon_element-bgcolor-grey style1">
                                                    <i class="ti ti-map-alt ttm-num"></i>
                                                </div>
                                                <div class="featured-title">
                                                    <h5>Contact & Maps</h5>
                                                </div>
                                            </div>
                                        </div><!-- featured-icon-box -->
                                        <!-- featured-icon-box -->
                                        <div class="featured-icon-box iconalign-before-heading mb-25">
                                            <div class="featured-content">
                                                <div class="ttm-icon ttm-icon_element-bgcolor-grey style1">
                                                    <i class="ti ti-bar-chart ttm-num"></i>
                                                </div>
                                                <div class="featured-title">
                                                    <h5>Analytics setup</h5>
                                                </div>
                                            </div>
                                        </div><!-- featured-icon-box -->
                                        <!-- featured-icon-box -->
                                        <div class="featured-icon-box iconalign-before-heading">
                                            <div class="featured-content">
                                                <div class="ttm-icon ttm-icon_element-bgcolor-grey style1">
                                                    <i class="ti ti-rocket ttm-num"></i>
                                                </div>
                                                <div class="featured-title">
                                                    <h5>Launch in 2 weeks</h5>
                                                </div>
                                            </div>
                                        </div><!-- featured-icon-box -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- row end -->
                </div>
            </section>
            <!-- aboutus-section end -->

            <!-- portfolio-section -->
            <section class="ttm-row portfolio-section ttm-bgcolor-grey clearfix">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- section title -->
                            <div class="section-title text-center with-desc clearfix">
                                <div class="title-header">
                                    <h5>What is included</h5>
                                    <h2 class="title">Everything you <span>get</span></h2>
                                </div>
                            </div><!-- section title end -->
                        </div>
                    </div>
                    <!-- row -->
                    <div class="row multi-columns-row ttm-boxes-spacing-10px ttm-bgcolor-white">
                        <div class="ttm-box-col-wrapper col-lg-3 col-md-6 col-sm-6">
                            <div class="featured-imagebox featured-imagebox-portfolio style2">
                                <div class="featured-thumbnail">
                                    <img class="img-fluid" src="images/portfolio/07.jpg" alt="image">
                                </div>
                                <div class="featured-content">
                                    <div class="category">
                                        <p>Mobile, Tablet, Desktop</p>
                                    </div>
                                    <div class="featured-title">
                                        <h5><a href="#">Responsive design</a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ttm-box-col-wrapper col-lg-3 col-md-6 col-sm-6">
                            <div class="featured-imagebox featured-imagebox-portfolio style2">
                                <div class="featured-thumbnail">
                                    <img class="img-fluid" src="images/portfolio/08.jpg" alt="image">
                                </div>
                                <div class="featured-content">
                                    <div class="category">
                                        <p>Semantic markup, Meta tags</p>
                                    </div>
                                    <div class="featured-title">
                                        <h5><a href="#">SEO foundations</a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ttm-box-col-wrapper col-lg-3 col-md-6 col-sm-6">
                            <div class="featured-imagebox featured-imagebox-portfolio style2">
                                <div class="featured-thumbnail">
                                    <img class="img-fluid" src="images/portfolio/09.jpg" alt="image">
                                </div>
                                <div class="featured-content">
                                    <div class="category">
                                        <p>Working, Spam-protected</p>
                                    </div>
                                    <div class="featured-title">
                                        <h5><a href="#">Contact & forms</a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ttm-box-col-wrapper col-lg-3 col-md-6 col-sm-6">
                            <div class="featured-imagebox featured-imagebox-portfolio style2">
                                <div class="featured-thumbnail">
                                    <img class="img-fluid" src="images/portfolio/10.jpg" alt="image">
                                </div>
                                <div class="featured-content">
                                    <div class="category">
                                        <p>Optimised images, Lean code</p>
                                    </div>
                                    <div class="featured-title">
                                        <h5><a href="#">Fast load times</a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- row end -->
                </div>
            </section>
            <!-- portfolio-section end -->

            <!-- process-section -->
            <section class="ttm-row process-section clearfix" style="padding-bottom: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- section title -->
                            <div class="section-title text-center with-desc clearfix">
                                <div class="title-header">
                                    <h5>Workflow</h5>
                                    <h2 class="title">Our <span>process</span></h2>
                                </div>
                            </div><!-- section title end -->
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
            <section class="ttm-row faq-section clearfix">
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

            <!-- services-slide-section -->
            <section class="ttm-row services-slide-section ttm-bgcolor-grey ttm-bg ttm-bgimage-yes bg-img14 clearfix">
                <div class="ttm-row-wrapper-bg-layer ttm-bg-layer"></div>
                <div class="container">
                    <div class="row align-items-center"><!-- row -->
                        <div class="col-lg-9 col-xl-9 col-md-9">
                            <!-- section-title -->
                            <div class="section-title style2 clearfix">
                                <div class="title-header">
                                    <h5>Explore More</h5>
                                    <h2 class="title">Explore more under <span>Web Development</span></h2>
                                </div>
                            </div><!-- section-title end -->
                        </div>
                        <div class="col-lg-3 col-xl-3 col-md-3">
                            <div class="text-md-right">
                                <a class="ttm-btn ttm-btn-size-md ttm-btn-style-border ttm-btn-color-darkgrey mb-40" href="#" title=""> Read More </a>
                            </div>
                        </div>
                    </div>
                    <!-- row end -->
                    <!-- row -->
                    <div class="row">
                        <div class="services-slide owl-carousel" data-item="3" data-nav="false" data-dots="false" data-auto="false">
                            <!-- featured-imagebox-services -->
                            <div class="featured-imagebox featured-imagebox-services style1">
                                <div class="featured-thumbnail"><!-- featured-thumbnail -->
                                    <img class="img-fluid" src="images/services/01.jpg" alt="image">
                                </div> 
                                <div class="featured-content box-shadow">
                                    <div class="featured-title"><!-- featured-title -->
                                        <h5><a href="dynamic-web-development.html">Dynamic Web Development</a></h5>
                                    </div>
                                    <div class="featured-desc"><!-- featured-title -->
                                        <p>Engaging, data-driven sites built on a robust CMS like WordPress. </p>
                                    </div>
                                    <a class="ttm-btn ttm-btn-size-sm ttm-btn-color-skincolor btn-inline ttm-icon-btn-right mt-10" href="#">View Service <i class="ti ti-angle-double-right"></i></a>
                                </div>
                            </div>
                            <!-- featured-imagebox-services -->
                            <div class="featured-imagebox featured-imagebox-services style1">
                                <div class="featured-thumbnail"><!-- featured-thumbnail -->
                                    <img class="img-fluid" src="images/services/02.jpg" alt="image">
                                </div> 
                                <div class="featured-content box-shadow">
                                    <div class="featured-title"><!-- featured-title -->
                                        <h5><a href="custom-web-development.html">Custom Web Development</a></h5>
                                    </div>
                                    <div class="featured-desc"><!-- featured-title -->
                                        <p>Bespoke web solutions, portals and web apps tailored to your specific workflows.</p>
                                    </div>
                                    <a class="ttm-btn ttm-btn-size-sm ttm-btn-color-skincolor btn-inline ttm-icon-btn-right mt-10" href="#">View Service <i class="ti ti-angle-double-right"></i></a>
                                </div>
                            </div>
                            <!-- featured-imagebox-services -->
                            <div class="featured-imagebox featured-imagebox-services style1">
                                <div class="featured-thumbnail"><!-- featured-thumbnail -->
                                    <img class="img-fluid" src="images/services/03.jpg" alt="image">
                                </div> 
                                <div class="featured-content box-shadow">
                                    <div class="featured-title"><!-- featured-title -->
                                        <h5><a href="ecommerce-development.html">E-commerce Development</a></h5>
                                    </div>
                                    <div class="featured-desc"><!-- featured-title -->
                                        <p>Secure, scalable online stores on WooCommerce, Shopify, or Magento.</p>
                                    </div>
                                    <a class="ttm-btn ttm-btn-size-sm ttm-btn-color-skincolor btn-inline ttm-icon-btn-right mt-10" href="#">View Service <i class="ti ti-angle-double-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- row end-->
                </div>
            </section>
            <!-- services-slide-section end -->

            <!-- call-to-action-section -->
            <section class="ttm-row call-to-action-section ttm-bgcolor-skincolor ttm-bg ttm-bgimage-yes bg-img1 clearfix">
                <div class="ttm-row-wrapper-bg-layer ttm-bg-layer"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <h2 class="title" style="color: #fff; font-size: 36px; margin-bottom: 20px;">Ready to start?</h2>
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

new_content = header + "\n" + new_main_content + "\n" + footer

with open('basic-web-development.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully replaced content")
