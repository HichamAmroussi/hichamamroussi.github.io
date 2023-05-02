//------------- Selectors
//Navbar
const navbarListEl = document.querySelector('.navbar-list');
const hamburgerBtn = document.querySelector('.hamburger-btn');
//Form
const myForm = document.getElementById('myForm');
//Page
const flowerPetals = document.querySelectorAll('.forms');
//popup
const popupContainer = document.querySelector('.popup-container');
const popupText = document.querySelector('.popup-text');
const popupBtn = document.querySelector('.popup-btn');

//------------- Event Listeners

myForm.addEventListener('submit', sendForm);
hamburgerBtn.addEventListener('click', navigationDrawer);
popupBtn.addEventListener('click', () => { popupContainer.style.display = "none" });
flowerPetals.forEach((petal) => petal.addEventListener('click', () => pickPetal(petal)));


//------------- Functions

function pickPetal(petal) {
    petal.style.translate = "-20px";
    petal.style.opacity = "0";
}

function navigationDrawer() {
    const icone = hamburgerBtn.querySelector('i');

    if (icone.classList.contains('fa-bars')) {
        // Change Icon
        icone.classList.remove('fa-bars');
        icone.classList.add('fa-xmark');

        // Slide out the menu
        navbarListEl.style.transform = "translateX(0)";

    } else if (icone.classList.contains('fa-xmark')) {
        // Change Icon
        icone.classList.remove('fa-xmark');
        icone.classList.add('fa-bars');

        // Slide in the menu
        navbarListEl.style.transform = "translateX(100vw)";
    }
}

function sendForm(e) {
    e.preventDefault();

    const confirmBtn = document.querySelector('.submit-btn');

    // Display Loader inside Form
    const loader = document.createElement('div');
    loader.classList.add('circle');
    confirmBtn.remove();
    myForm.appendChild(loader);

    // Form Data
    const formData = new FormData(myForm);
    const searchParams = new URLSearchParams();

    for (const pair of formData) {
        searchParams.append(pair[0], pair[1]);
    }

    fetch('https://ha-portfolio-api.cyclic.app/inbox', {
        method: 'POST',
        body: searchParams
    }).then((resp) => resp.json())
        .then((data) => {
            const loadingAnimation = document.querySelector('.circle');

            // Show Popup
            showPopup(data.message);

            // Remove Loader and Bring back button
            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = "Submit";
            confirmBtn.classList.add('submit-btn');
            loadingAnimation.remove();
            myForm.appendChild(confirmBtn);
        });
}

function showPopup(message) {
    popupText.innerText = message;
    popupContainer.style.display = "flex";
}
