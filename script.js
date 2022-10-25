// Selectors
const navbarListEl = document.querySelector('.navbar-list');
const hamburgerBtn = document.querySelector('.hamburger-btn');

// Event Listeners
window.addEventListener('resize', () => {
    if(window.innerWidth <= 700) {
        navbarListEl.classList.add('hamburger-menu');
    } else {
        navbarListEl.classList.remove('hamburger-menu');
    }
})

hamburgerBtn.addEventListener('click', () => {
    const icone = hamburgerBtn.querySelector('i');

    if(icone.classList.contains('fa-bars')) {
        // Change Icon
        icone.classList.remove('fa-bars');
        icone.classList.add('fa-xmark');

        // Slide out the menu
        navbarListEl.style.transform = "translateX(0)";

    } else if(icone.classList.contains('fa-xmark')) {
        // Change Icon
        icone.classList.remove('fa-xmark');
        icone.classList.add('fa-bars');

        // Slide in the menu
        navbarListEl.style.transform = "translateX(100vw)";
    }
})

// Functions