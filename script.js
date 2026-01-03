/**
 * AMAZON CLONE - JAVASCRIPT
 * Interactive functionality for the Amazon homepage clone
 */

(function() {
    'use strict';

    // ============================================
    // CAROUSEL FUNCTIONALITY
    // ============================================

    class Carousel {
        constructor(container) {
            this.container = container;
            this.slides = container.querySelectorAll('.carousel-slide');
            this.dots = container.querySelectorAll('.carousel-dot');
            this.prevBtn = container.querySelector('.carousel-btn-prev');
            this.nextBtn = container.querySelector('.carousel-btn-next');
            this.currentSlide = 0;
            this.autoplayInterval = null;
            this.autoplayDelay = 5000; // 5 seconds

            this.init();
        }

        init() {
            // Set up event listeners
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }

            // Dot navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });

            // Auto-play functionality
            this.startAutoplay();

            // Pause autoplay on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());

            // Touch/swipe support for mobile
            this.initTouchEvents();
        }

        showSlide(index) {
            // Remove active class from all slides and dots
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            if (this.slides[index]) {
                this.slides[index].classList.add('active');
            }
            if (this.dots[index]) {
                this.dots[index].classList.add('active');
            }

            this.currentSlide = index;
        }

        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
            this.resetAutoplay();
        }

        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prev);
            this.resetAutoplay();
        }

        goToSlide(index) {
            if (index >= 0 && index < this.slides.length) {
                this.showSlide(index);
                this.resetAutoplay();
            }
        }

        startAutoplay() {
            this.stopAutoplay();
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        }

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }

        resetAutoplay() {
            this.stopAutoplay();
            this.startAutoplay();
        }

        initTouchEvents() {
            let touchStartX = 0;
            let touchEndX = 0;

            this.container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });

            const handleSwipe = () => {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            };

            this.handleSwipe = handleSwipe;
        }
    }

    // ============================================
    // CART FUNCTIONALITY
    // ============================================

    class Cart {
        constructor() {
            this.cartCount = 0;
            this.cartCountElement = document.getElementById('cartCount');
            this.init();
        }

        init() {
            // Load cart count from localStorage
            const savedCount = localStorage.getItem('amazonCartCount');
            if (savedCount !== null) {
                this.cartCount = parseInt(savedCount, 10);
                this.updateCartDisplay();
            }

            // Add event listeners to all "Add to Cart" buttons
            const addToCartButtons = document.querySelectorAll('.product-add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.addToCart();
                });
            });
        }

        addToCart() {
            this.cartCount++;
            this.updateCartDisplay();
            this.saveCartCount();
            this.animateCartCount();
        }

        updateCartDisplay() {
            if (this.cartCountElement) {
                this.cartCountElement.textContent = this.cartCount;
                
                // Show/hide cart count
                if (this.cartCount > 0) {
                    this.cartCountElement.style.display = 'inline';
                } else {
                    this.cartCountElement.style.display = 'none';
                }
            }
        }

        animateCartCount() {
            if (this.cartCountElement) {
                this.cartCountElement.classList.remove('updated');
                // Trigger reflow
                void this.cartCountElement.offsetWidth;
                this.cartCountElement.classList.add('updated');
            }
        }

        saveCartCount() {
            localStorage.setItem('amazonCartCount', this.cartCount.toString());
        }
    }

    // ============================================
    // SMOOTH SCROLL FOR BACK TO TOP
    // ============================================

    function initBackToTop() {
        const backToTopLink = document.querySelector('.back-to-top-link');
        if (backToTopLink) {
            backToTopLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ============================================
    // SEARCH FUNCTIONALITY (UI Enhancement)
    // ============================================

    function initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');

        if (searchInput && searchButton) {
            // Handle search button click
            searchButton.addEventListener('click', () => {
                performSearch();
            });

            // Handle Enter key in search input
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                }
            });
        }
    }

    function performSearch() {
        const searchInput = document.querySelector('.search-input');
        const query = searchInput ? searchInput.value.trim() : '';
        
        if (query) {
            // In a real application, this would navigate to a search results page
            console.log('Search query:', query);
            // For demo purposes, you could show an alert or handle it differently
            // alert('Search functionality would search for: ' + query);
        }
    }

    // ============================================
    // HEADER SCROLL EFFECT (Optional Enhancement)
    // ============================================

    function initHeaderScroll() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Optional: Hide/show header on scroll (uncomment if desired)
            // if (scrollTop > lastScrollTop && scrollTop > 100) {
            //     header.style.transform = 'translateY(-100%)';
            // } else {
            //     header.style.transform = 'translateY(0)';
            // }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    // ============================================
    // PRODUCT CARD HOVER ENHANCEMENT
    // ============================================

    function initProductHover() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const addToCartBtn = card.querySelector('.product-add-to-cart');
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.2s ease';
            });
        });
    }

    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================

    function initAccessibility() {
        // Add keyboard navigation for navbar items
        const navbarItems = document.querySelectorAll('.navbar-item');
        navbarItems.forEach(item => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });

        // Improve focus management for carousel
        const carouselButtons = document.querySelectorAll('.carousel-btn, .carousel-dot');
        carouselButtons.forEach(button => {
            button.addEventListener('focus', () => {
                button.style.outline = '2px solid var(--amazon-orange)';
                button.style.outlineOffset = '2px';
            });
        });
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize carousel
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            new Carousel(carouselContainer);
        }

        // Initialize cart
        new Cart();

        // Initialize other features
        initBackToTop();
        initSearch();
        initHeaderScroll();
        initProductHover();
        initAccessibility();

        // Add loaded class to body for any animations
        document.body.classList.add('loaded');
    });

    // Handle page visibility change (pause carousel when tab is hidden)
    document.addEventListener('visibilitychange', () => {
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer && carouselContainer.carouselInstance) {
            if (document.hidden) {
                carouselContainer.carouselInstance.stopAutoplay();
            } else {
                carouselContainer.carouselInstance.startAutoplay();
            }
        }
    });

})();

