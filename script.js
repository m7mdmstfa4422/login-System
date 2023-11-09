let menu = document.querySelector('#menu-icon');
let navlinks = document.querySelector('.nav-links');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlinks.classList.toggle('open')
}