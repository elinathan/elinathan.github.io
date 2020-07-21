const pw = document.getElementsByName('password')
const submit = document.getElementsByTagName('button')

function key() {
    const rip = {
        destroy: s => parseInt(s, 2).toString(10),
        shred: s => parseInt(s, 16).toString(2),
    };

    function gronk() {
        const four = (((3 + 9) * 3) / 12).toString();
        const three = (169 - (12 * 3 * 4 + 32 * 2) + 39).toString()
        const twoOne = (3 * 13).toString()
        return (four + three + twoOne)
    }
    const stageThree = rip.shred(gronk())

    return rip.destroy(stageThree)
}

const danger = key()

submit[0].addEventListener('click', function() {
    let userid = document.getElementsByName('userid')
    const url = userid[0].value
    if (pw[0].value == danger) {
        window.open(`https://elinathan.github.io/projects/${url}`, "_self")
    } else {
        alert('Incorrect password. If you think this is wrong, please email me. enathan@sas.upenn.edu')
    }
    return true;
})