var t = {};
t.opacityIn = [0, 1];
t.scaleIn = [0.2, 1];
t.scaleOut = 3;
t.durationIn = 800;
t.durationOut = 600;
t.delay = 1500;

anime.timeline({ loop: false })
    .add({
        targets: '.t .letters-1',
        opacity: t.opacityIn,
        scale: t.scaleIn,
        duration: t.durationIn
    }).add({
        targets: '.t .letters-1',
        opacity: 0,
        scale: t.scaleOut,
        duration: t.durationOut,
        easing: "easeInExpo",
        delay: t.delay
    }).add({
        targets: '.t .letters-2',
        opacity: t.opacityIn,
        scale: t.scaleIn,
        duration: t.durationIn,
    }).add({
        targets: '.t .learn',
        opacity: t.opacityIn,
        scale: t.scaleIn,
        duration: t.durationIn, 
        delay: 700
    })
