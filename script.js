// Selectors
const navbarListEl = document.querySelector('.navbar-list');
const hamburgerBtn = document.querySelector('.hamburger-btn');
const flowerPetals = document.querySelectorAll('.forms');
// Popup
const popupContainer = document.querySelector('.popup-container');
const popupText = document.querySelector('.popup-text');
const popupBtn = document.querySelector('.popup-btn');
// DOM Form elements
const myForm = document.getElementById('myForm');
const confirmBtn = document.querySelector('.submit-btn');

// Functions

// Event Listeners
flowerPetals.forEach(((petal) => {
    petal.addEventListener('click', () => {
        petal.style.translate = "-20px";
        petal.style.opacity = "0";
    })
}))

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

myForm.addEventListener('submit', async (e) => {
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

    for(const pair of formData) {
        searchParams.append(pair[0], pair[1]);
    }

    fetch('http://localhost:3000/messages', {
        method: 'POST',
        body: searchParams
    }).then((resp) => resp.json())
    .then((data) => {
        const loadingAnimation = document.querySelector('.circle');
        // Show Popup
        popupText.innerText = data.message;
        popupContainer.style.display = "flex";

        popupBtn.addEventListener('click', () => {
            // Remove Popup
            popupContainer.style.display = "none";
        })

        // Remove Loader and Bring back button
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = "Submit";
        confirmBtn.classList.add('submit-btn');
        loadingAnimation.remove();
        myForm.appendChild(confirmBtn);
    });
})