let body = document.querySelector('body');
/**
 * HTML for the navbar. Note that the paths do not change dynamically.
 * (I have not written any server-side script to check for this. I probably won't)
 * This means each page with a working navbar must be one directory below
 * index.html 
 */

let nav = document.createElement('nav');
nav.innerHTML = 
    `<div class="links">
        <div class="logo">
            <span><a href="../index.html">Eli Nathan</a></span>
        </div>
        <ul class="nav-links">
            <li><a href="">Design</a></li>
            <li><a href="">Photography</a></li>
            <li><a href="../about/about.html">About</a></li>
        </ul>
        <div class="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </div>
    <hr id="hr-nav">`

body.insertBefore(nav, body.firstChild)