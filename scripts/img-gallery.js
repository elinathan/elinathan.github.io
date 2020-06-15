/**
 * Image gallery
 * Eli Nathan
 */


// add class to img to signal that it should be wrapped
if ($('.gallery:has(img)')) {
    $('.gallery').children().addClass('gal-img');
}

// wrap img tags in tag to make adding images ot gallery easier
if ($('.gallery:has(#noClick)')) {
    $(".gal-img").wrap("<div></div>");
    if ('.gal-img:has(#caption)') {
        let cap = $('#caption').attr('alt');
    }
} else {
    $(".gal-img").wrap("<a></a>");
}

$(".gallery").justifiedGallery({
    rowHeight: 300,
    margins: 24,
    cssAnimation: false,
    imagesAnimationDuration: 0,
    lastRow: 'justify',
});

