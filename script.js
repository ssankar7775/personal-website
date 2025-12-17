// // Array of image URLs
// const images = [
//     'src/images/image1.jpg',
//     'src/images/image2.JPG',
//     'src/images/image3.jpg',
//     'src/images/image4.jpg',
//     'src/images/image5.jpg',
//     'src/images/image6.jpeg'
// ];
//
// // Select the collage container
// const collage = document.querySelector('.collage');
// let currentImageIndex = 0;
//
// // Function to change the image
// function changeImage() {
//     // Clear existing images
//     collage.innerHTML = '';
//
//     // Create a new img element
//     const img = document.createElement('img');
//     img.src = images[currentImageIndex];
//     
//     // Add flip class to the image
//     img.classList.add('flip');
//     
//     // Append the image to the collage
//     collage.appendChild(img);
//
//     // Move to the next image
//     currentImageIndex = (currentImageIndex + 1) % images.length;
// }
//
// // Set interval to change the image every 3 seconds
// setInterval(changeImage, 3000); // Adjust timing as needed
//
// // Initialize the collage with the first image
// changeImage();
//
// <script>
//     document.addEventListener("DOMContentLoaded", () => {
//         const toggleButton = document.querySelector(".dropdown-toggle");
//         const dropdownContent = document.querySelector(".dropdown-content");
//
//         toggleButton.addEventListener("click", () => {
//             // Toggle the visibility of the dropdown content
//             if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
//                 dropdownContent.style.display = "block";
//             } else {
//                 dropdownContent.style.display = "none";
//             }
//         });
//     });
// </script>
//
// toggleButton.addEventListener("click", () => {
//     dropdownContent.classList.toggle("expanded");
// });
//
// Array of image URLs
// const images = [
//     'src/images/image1.jpg',
//     'src/images/image2.JPG',
//     'src/images/image3.jpg',
//     'src/images/image4.jpg',
//     'src/images/image5.jpg',
//     'src/images/image6.jpeg'
// ];
//
// // // Select the collage container
// // const collage = document.querySelector('.collage');
// // let currentImageIndex = 0;
//
// // Function to change the image
// function changeImage() {
//     // Clear existing images
//     //collage.innerHTML = '';
//
//     // Create a new img element
//     const img = document.createElement('img');
//     img.src = images[currentImageIndex];
//     
//     // Add flip class to the image
//     img.classList.add('flip');
//     
//     // Append the image to the collage
//     //collage.appendChild(img);
//
//     // Move to the next image
//     currentImageIndex = (currentImageIndex + 1) % images.length;
// }
//
// // Set interval to change the image every 3 seconds
// setInterval(changeImage, 3000); // Adjust timing as needed
//
// // Initialize the collage with the first image
// changeImage();
//
//
//
//
// // Add event listener for the dropdown toggle
// document.addEventListener("DOMContentLoaded", () => {
//     const toggleButton = document.querySelector(".dropdown-toggle");
//     const dropdownContent = document.querySelector(".dropdown-content");
//
//     toggleButton.addEventListener("click", () => {
//         // Toggle the visibility of the dropdown content
//         if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
//             dropdownContent.style.display = "block";
//         } else {
//             dropdownContent.style.display = "none";
//         }
//     });
//
//     // Optional: For smooth transitions, toggle a class instead
//     toggleButton.addEventListener("click", () => {
//         dropdownContent.classList.toggle("expanded");
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    // Select all the toggle buttons and dropdown contents
    const toggleButtons = document.querySelectorAll(".dropdown-toggle");
    const dropdownContents = document.querySelectorAll(".dropdown-content");

    // Add event listener to each toggle button (per-project reveal)
    toggleButtons.forEach((toggleButton) => {
        toggleButton.addEventListener('click', (e) => {
            const project = toggleButton.closest('.project');
            if (!project) return;
            const dropdown = project.querySelector('.dropdown-content');
            if (!dropdown) return;

            const isOpen = dropdown.classList.toggle('expanded');
            // accessibility
            toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            dropdown.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

            // Smoothly adjust max-height for animation and auto-scroll when opened
            if (isOpen) {
                // set explicit maxHeight to animate from 0 -> measured height
                dropdown.style.maxHeight = dropdown.scrollHeight + 'px';

                // after transition, allow natural height to accommodate responsive content
                const onTransitionEnd = (ev) => {
                    if (ev.target !== dropdown) return;
                    dropdown.style.maxHeight = 'none';
                    dropdown.removeEventListener('transitionend', onTransitionEnd);
                };
                dropdown.addEventListener('transitionend', onTransitionEnd);

                // small timeout before scrolling so layout settles
                const nav = document.querySelector('.topnav');
                const navH = nav ? nav.offsetHeight : 72;
                const targetY = dropdown.getBoundingClientRect().top + window.pageYOffset - navH - 16;
                window.setTimeout(() => window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' }), 80);
                // focus first heading for keyboard users
                const first = dropdown.querySelector('h3, p, a'); if (first) first.tabIndex = -1, first.focus();
            } else {
                // collapsing: set current height then animate to 0
                dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                requestAnimationFrame(() => { dropdown.style.maxHeight = '0px'; });
            }
        });
    });
});

// Wrap section contents in a white card for readable text over image backgrounds
(function wrapSections(){
    document.querySelectorAll('section').forEach(section => {
        // skip if already wrapped
        if (section.querySelector(':scope > .card')) return;

        const card = document.createElement('div');
        card.className = 'card';

        // move all child nodes into card
        while (section.firstChild) {
            card.appendChild(section.firstChild);
        }

        section.appendChild(card);
    });
})();

// -- Section reveal using IntersectionObserver
(() => {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('in-view'));
        return;
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {threshold: 0.15});

    reveals.forEach(el => obs.observe(el));
})();

// -- Parallax for elements with [data-parallax] and nested [data-parallax-layer]
(() => {
    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!parallaxEls.length) return;

    let ticking = false;

    const update = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        parallaxEls.forEach(el => {
            const offset = scrollY - (el.offsetTop || 0);
            // background move
            const y = Math.round(offset * 0.2);
            el.style.backgroundPosition = `center ${y}px`;

            // layered elements (data-parallax-layer="0.2") translate
            const layers = el.querySelectorAll('[data-parallax-layer]');
            layers.forEach(node => {
                const speed = parseFloat(node.getAttribute('data-parallax-layer')) || 0.15;
                const translate = Math.round(offset * speed);
                node.style.transform = `translateY(${translate}px)`;
            });
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(update);
        }
    }, {passive: true});

    // update once on load
    update();
})();

// -- Navbar shrink, nav highlighting, lazy images, and hero staggers
(() => {
    const topnav = document.querySelector('.topnav');
    const navLinks = Array.from(document.querySelectorAll('.topnav a'));
    const sections = Array.from(document.querySelectorAll('section[id]'));

    // Slow fade effect when clicking nav links: add `.nav-clicked` to root during navigation
    navLinks.forEach(a => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('#')) {
            a.addEventListener('click', () => {
                document.documentElement.classList.add('nav-clicked');
                // remove after ~1.4s so transitions complete (0.5s slower than base)
                window.setTimeout(() => document.documentElement.classList.remove('nav-clicked'), 1400);
            });
        }
    });

    // lazy-load images where supported
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
    });

    // shrink navbar on scroll
    const onScrollShrink = () => {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        if (!topnav) return;
        if (y > 48) topnav.classList.add('shrink'); else topnav.classList.remove('shrink');
    };
    window.addEventListener('scroll', onScrollShrink, {passive:true});
    onScrollShrink();

    // observe sections to set active nav link
    if (sections.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') && a.getAttribute('href').includes(`#${id}`)));
                }
            });
        }, {root: null, rootMargin: '-35% 0px -45% 0px', threshold: 0});

        sections.forEach(s => observer.observe(s));
    }

    // when header/hero becomes visible, add stagger delays and CTA pulse
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const heroParent = hero.closest('.reveal') || document.querySelector('header');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // stagger children with data-stagger or default order
                    const items = hero.querySelectorAll('h1, .hero-subtitle, .hero-ctas, [data-stagger]');
                    items.forEach((it, i) => { it.style.transitionDelay = (i * 120) + 'ms'; });

                    // pulse primary button once
                    const primary = hero.querySelector('.btn-primary');
                    if (primary) primary.classList.add('pulse');

                    // mark hero parent as in-view (if not already)
                    if (heroParent) heroParent.classList.add('in-view');
                    revealObserver.disconnect();
                }
            });
        }, {threshold: 0.25});
        revealObserver.observe(heroParent || hero);
    }

})();

// -- Scroll progress bar, back-to-top, lightbox, tilt, skill animations
(() => {
    const progress = document.querySelector('.scroll-progress-bar');
    const back = document.getElementById('back-to-top');

    const updateProgress = () => {
        const doc = document.documentElement;
        const scrollTop = window.pageYOffset || doc.scrollTop;
        const height = doc.scrollHeight - doc.clientHeight;
        const pct = height > 0 ? Math.min(100, Math.round((scrollTop / height) * 100)) : 0;
        if (progress) progress.style.width = pct + '%';
        if (back) {
            if (scrollTop > 400) back.classList.add('show'); else back.classList.remove('show');
        }
    };

    window.addEventListener('scroll', updateProgress, {passive:true});
    window.addEventListener('resize', updateProgress);
    updateProgress();

    if (back) back.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

    // keyboard shortcut: press 'c' to focus contact message (if present)
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'c') {
            const msg = document.querySelector('#message');
            if (msg) { msg.focus(); }
        }
    });

    // Lightbox: create if not present
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        if (!document.body) return; // guard
        lightbox.innerHTML = `<div class="lightbox-inner"><button class="lightbox-close" aria-label="Close">×</button><img alt="expanded image"></div>`;
        document.body.appendChild(lightbox);
    }

    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox-close');

    const openLightbox = (src, alt='') => {
        lbImg.src = src; lbImg.alt = alt || '';
        lightbox.classList.add('show');
    };
    const closeLightbox = () => lightbox.classList.remove('show');

    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    lbClose.addEventListener('click', closeLightbox);

    // Attach click handlers to project images and thumbnails
    const clickables = document.querySelectorAll('.project img, .thumbnail img');
    clickables.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    // Thumbnail tilt effect
    const tiltTargets = document.querySelectorAll('.thumbnail, .project-image-right img, .project-image-left img');
    tiltTargets.forEach(el => {
        el.addEventListener('mousemove', (ev) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width/2;
            const cy = rect.top + rect.height/2;
            const dx = (ev.clientX - cx) / rect.width;
            const dy = (ev.clientY - cy) / rect.height;
            const tiltX = (dy * 8).toFixed(2);
            const tiltY = (dx * -12).toFixed(2);
            el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    // Skill bar animation when in view
    const skillEls = document.querySelectorAll('[data-skill-level]');
    if (skillEls.length && 'IntersectionObserver' in window) {
        const sObs = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    const level = en.target.getAttribute('data-skill-level');
                    const bar = en.target.querySelector('.level');
                    if (bar) bar.style.width = Math.min(100, Number(level)) + '%';
                    sObs.unobserve(en.target);
                }
            });
        }, {threshold:0.25});
        skillEls.forEach(s => sObs.observe(s));
    } else {
        skillEls.forEach(s => { const bar = s.querySelector('.level'); if (bar) bar.style.width = s.getAttribute('data-skill-level') + '%'; });
    }

})();

