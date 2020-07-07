/**
 * Image gallery for elinathan.com
 * Eli Nathan
 * 
 * The image gallery uses jQuery
 */

// add class to img to signal that it should be wrapped
if ($(".gallery").has("img").length > 0) {
    $('.gallery').children().addClass('gal-img');
    // wrap img tags in tag to make adding images ot gallery easier
    if (document.querySelector('.gallery').getAttribute('id')) {
        if (document.querySelector('.gallery').getAttribute('id').includes('no-click')) {
            $(".gal-img").wrap("<div></div>");
        }
    } else {
        $(".gal-img").wrap("<a class=\"img-link\"></a>");
        // add href to link so SwipeBox can work
        $(".img-link").each(function() {
            let imgSrc = $(this).children().attr("src");
            $(this).attr("href", imgSrc);
        });
    }
}

$(".click-img").wrap("<a class=\"img-link\"></a>");
// add href to link so SwipeBox can work
$(".img-link").each(function () {
    let imgSrc = $(this).children().attr("src");
    $(this).attr("href", imgSrc);
});

$(".gallery").each(function () {
    $(this).justifiedGallery({
        rowHeight: parseInt($(this).attr("rowHeight")),
        margins: 24,
        border: 0,
        cssAnimation: false,
        imagesAnimationDuration: 0,
        lastRow: 'justify',
    })
})

/*************************************************************************************************
Photoswipe code below
*************************************************************************************************/

 /**
  * parse the image gallery for info
  * Info such as number of images, full dimensions, source
  * @returns JSON array with image info
  */
const getInfo = (gallerySelector) => {
    let imgs = []
    let count = 0;
    const gal = gallerySelector
    const child = gal.childNodes
    //non justified gallery
    if (gal.getAttribute('class').includes('gallery1')) {
        if (gal.children[0].children[0].nodeName == "A") {
            gal.childNodes.forEach(node => {
                if (node.nodeName === 'DIV') {
                    imgs[count] = {
                        src: node.children[0].children[0].getAttribute('src'),
                        msrc: node.children[0].getAttribute('href'),
                        w: node.children[0].children[0].naturalWidth,
                        h: node.children[0].children[0].naturalHeight,
                        el: node
                    }
                    count++;
                }
            })
        }
        //justified gallery
    } else if (gal.hasAttribute('rowHeight')) {
        child.forEach(node => {
            if (node.nodeName == "A" && node.children[0].nodeName == "IMG") {
                imgs[count] = {
                    src: node.children[0].getAttribute('src'),
                    msrc: node.getAttribute('href'),
                    w: node.children[0].naturalWidth,
                    h: node.children[0].naturalHeight,
                    el: node
                }
                if (node.children[0].alt) {
                    imgs[count].title = node.children[0].alt
                }
                count++;
            }
        });
    }
    return imgs;
}

var initPhotoSwipeFromDOM = function (gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function (gallery) {
        items = getInfo(gallery);
        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'A');
        });

        if (!clickedListItem) {
            return;
        }
        // find index of clicked item by looping through all child nodes
        if (clickedListItem.parentNode.hasAttribute('rowHeight')) {
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;


            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if (index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
            // find index if gallery is not justified
        } else {
            const clickedGallery = clickedListItem.parentNode.parentNode
            const link = clickedListItem.getAttribute('href')
            let nodeIndex = -1;
            let index;
            clickedGallery.childNodes.forEach(node => {
                if (node.nodeName === 'DIV') {
                    nodeIndex++;
                    if (node.children[0].getAttribute('href') === link) {
                        index = nodeIndex;
                    }
                }
            });
            if (index) {
                openPhotoSwipe(index, clickedGallery);
            }
        }
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function (index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        // initialise as usual
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        // makes sure the two different types of galleries don't get same ID.
        if (gallerySelector === '.gallery1') {
            galleryElements[i].setAttribute('data-pswp-uid', i + 11);
            galleryElements[i].onclick = onThumbnailsClick;
        } else {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

// execute above function
initPhotoSwipeFromDOM('.gallery');
initPhotoSwipeFromDOM('.gallery1');