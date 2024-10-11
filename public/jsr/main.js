/**
 * Template Name: Ninestars - v2.0.0
 * Template URL: https://bootstrapmade.com/ninestars-free-bootstrap-3-theme-for-creative/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function ($) {
    "use strict";

    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on(
        "click",
        ".nav-menu a, .mobile-nav a, .scrollto",
        function (e) {
            if (
                location.pathname.replace(/^\//, "") ==
                    this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                e.preventDefault();
                var target = $(this.hash);
                if (target.length) {
                    var scrollto = target.offset().top;

                    if ($("#header").length) {
                        scrollto -= $("#header").outerHeight();
                    }

                    if ($(this).attr("href") == "#header") {
                        scrollto = 0;
                    }

                    $("html, body").animate(
                        {
                            scrollTop: scrollto,
                        },
                        1500,
                        "easeInOutExpo"
                    );

                    if ($(this).parents(".nav-menu, .mobile-nav").length) {
                        $(".nav-menu .active, .mobile-nav .active").removeClass(
                            "active"
                        );
                        $(this).closest("li").addClass("active");
                    }

                    if ($("body").hasClass("mobile-nav-active")) {
                        $("body").removeClass("mobile-nav-active");
                        $(".mobile-nav-toggle i").toggleClass(
                            "icofont-navigation-menu icofont-close"
                        );
                        $(".mobile-nav-overly").fadeOut();
                    }
                    return false;
                }
            }
        }
    );

    // Mobile Navigation
    if ($(".nav-menu").length) {
        var $mobile_nav = $(".nav-menu").clone().prop({
            class: "mobile-nav d-lg-none",
        });
        $("body").append($mobile_nav);
        $("body").prepend(
            '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
        );
        $("body").append('<div class="mobile-nav-overly"></div>');

        $(document).on("click", ".mobile-nav-toggle", function (e) {
            $("body").toggleClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
                "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").toggle();
        });

        $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
            e.preventDefault();
            $(this).next().slideToggle(300);
            $(this).parent().toggleClass("active");
        });

        $(document).click(function (e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (
                !container.is(e.target) &&
                container.has(e.target).length === 0
            ) {
                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $(".mobile-nav-toggle i").toggleClass(
                        "icofont-navigation-menu icofont-close"
                    );
                    $(".mobile-nav-overly").fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });

    $(".back-to-top").click(function () {
        $("html, body").animate(
            {
                scrollTop: 0,
            },
            1500,
            "easeInOutExpo"
        );
        return false;
    });

    // Porfolio isotope and filter
    $(window).on("load", function () {
        var portfolioIsotope = $(".portfolio-container").isotope({
            itemSelector: ".portfolio-item",
            layoutMode: "fitRows",
        });

        $("#portfolio-flters li").on("click", function () {
            $("#portfolio-flters li").removeClass("filter-active");
            $(this).addClass("filter-active");

            portfolioIsotope.isotope({
                filter: $(this).data("filter"),
            });
        });

        // Initiate venobox (lightbox feature used in portofilo)
        $(document).ready(function () {
            $(".venobox").venobox();
        });
    });

    // Clients carousel (uses the Owl Carousel library)
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 2,
            },
            768: {
                items: 4,
            },
            900: {
                items: 6,
            },
        },
    });

    // Initi AOS
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
    });
})(jQuery);

document.querySelectorAll(".step-header").forEach((header, index) => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const toggle = header.querySelector(".step-toggle");

        // Menutup atau membuka konten
        if (content.style.display === "block") {
            content.style.display = "none";
            toggle.textContent = "+";
        } else {
            content.style.display = "block";
            toggle.textContent = "-";
        }

        // Tutup bagian lain ketika satu bagian dibuka (optional, tambahkan jika ingin close others)
        document
            .querySelectorAll(".step-content")
            .forEach((otherContent, otherIndex) => {
                if (index !== otherIndex) {
                    otherContent.style.display = "none";
                    document.querySelectorAll(".step-toggle")[
                        otherIndex
                    ].textContent = "+";
                }
            });
    });
});

const testimonials = document.querySelectorAll(".testimonial-item");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove("active");
        dots[i].classList.remove("active");
    });
    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
}

document.querySelector(".prev").addEventListener("click", () => {
    currentIndex =
        currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    showTestimonial(currentIndex);
});

document.querySelector(".next").addEventListener("click", () => {
    currentIndex =
        currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    showTestimonial(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        showTestimonial(currentIndex);
    });
});
