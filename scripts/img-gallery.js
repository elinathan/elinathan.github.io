// add class to img to signal that it should be wrapped
$('.gallery').children().addClass('gal-img');

// wrap img tags in tag to make adding images ot gallery easier
if ($('.gallery:has(#noClick)')) {
    $(".gal-img").wrap("<div></div>");
} else {
    $(".gal-img").wrap("<a></a>");
}


$(".gallery").justifiedGallery({
    rowHeight: 300,
    margins: 24,
    captions: false,
    cssAnimation: false,
    imagesAnimationDuration: 0,
    lastRow: 'justify'
});