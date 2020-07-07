//add PhotoSwipe (.pswp) element to DOM
document.getElementById('photoswipe').innerHTML = `
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    
        <!-- Background of PhotoSwipe. 
                 It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>
    
        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">
    
            <!-- Container that holds slides. 
                    PhotoSwipe keeps only 3 of them in the DOM to save memory.
                    Don't modify these 3 pswp__item elements, data is added later on. -->
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
    
            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">
    
                <div class="pswp__top-bar">
    
                    <!--  Controls are self-explanatory. Order can be changed. -->
    
                    <div class="pswp__counter"></div>
    
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
    
                    <button class="pswp__button pswp__button--share" title="Share"></button>
    
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
    
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
    
                    <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>
    
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                </button>
    
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                </button>
    
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
    
            </div>
    
        </div>
    
    </div>`


/**
 * Colors the navbar on scroll
 * 
 * will use this code if I want to implement a scroll responsive navbar
 */
const wholeNav = document.querySelector('nav');
// window.onscroll = function () {
//     if (document.body.scrollTop >= 80 || document.documentElement.scrollTop >= 80) {
//         wholeNav.classList.add("scrolled");
//         wholeNav.classList.remove("unscrolled");
//     }
//     else {
//         wholeNav.classList.add("unscrolled");
//         wholeNav.classList.remove("scrolled");
//     }
// };

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')

    // Enter Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active')
        //Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
                // setTimeout(() => {
                //     wholeNav.style.mixBlendMode = 'difference'
                // }, 250)
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 8 + 0.1}s`
                //wholeNav.style.mixBlendMode = 'normal';
            }
        });
        // Burger Animation
        burger.classList.toggle('toggle')
    });

}

navSlide();