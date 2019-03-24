(function () {
    'use strict';
    
    var btn = document.querySelector('.header-nav__hamburgger');
    var html = document.querySelector('html');
    var menu = document.querySelector('#mainMenu');
    var menuOpenned = false;
    
    html.addEventListener('click', function (e) {
        if (e.target === html && menuOpenned) {
            closeMenu();
        }
    });
    
    btn.addEventListener('click', toggleMenu);
    
    function toggleMenu(e) {
        if (menuOpenned) {
            closeMenu();
        } else {
            openMenu();
        }
    }
        
    function closeMenu() {
        menuOpenned = false;
        html.classList.remove('menu-openned');
        btn.blur(); 
        menu.setAttribute('aria-expanded', false);
        btn.setAttribute('aria-expanded', false);
    }
    
    function openMenu() {
        menuOpenned = true;
        html.classList.add('menu-openned');
        menu.setAttribute('aria-expanded', true);
        btn.setAttribute('aria-expanded', true);
    }
    
    
    
    
    
    
    
}());