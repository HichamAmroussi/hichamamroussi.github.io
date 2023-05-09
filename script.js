//------------- Selectors
//Navbar
const navbarListEl = document.querySelector('.navbar-list');
const hamburgerBtn = document.querySelector('.hamburger-btn');
// Section 1
const flowerPetals = document.querySelectorAll('.forms');
// Section 4
const testimonialsContainer = document.querySelector('.testimonials-container');
// Section 5
const myForm = document.getElementById('myForm');
//popup
const popupContainer = document.querySelector('.popup-container');
const popupText = document.querySelector('.popup-text');
const popupBtn = document.querySelector('.popup-btn');

//------------- Function Calls
showTestimonials();

//------------- Event Listeners

//document.addEventListener('DOMContentLoaded', incrementPageView);
// Forms
myForm.addEventListener('submit', sendForm);
// DOM Interactions
popupBtn.addEventListener('click', () => { popupContainer.style.display = "none" });
hamburgerBtn.addEventListener('click', showNavigationBar);
flowerPetals.forEach((petal) => petal.addEventListener('click', () => pickPetal(petal)));


//------------- Functions
//API
async function incrementPageView() {
    await fetch("https://ha-portfolio-api.cyclic.app/portfolio/data/pageview", { method: 'PUT' });
}

async function getTestimonials() {
    const api = await fetch("https://ha-portfolio-api.cyclic.app/testimonial");
    const data = await api.json();

    return data.testimonials;
}

//Other
function pickPetal(petal) {
    petal.style.translate = "-20px";
    petal.style.opacity = "0";
}

function showNavigationBar() {
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

async function showTestimonials() {
    const testimonialsData = await getTestimonials();

    // Remove Loading Animation
    testimonialsContainer.querySelector('.circle').remove();

    testimonialsData.forEach((testimonial) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.classList.add('testimonial-card');

        testimonialCard.innerHTML = `
            <div class="random-profile"><i class="fa-solid fa-user"></i></div>
            <p>“${testimonial.body}”</p>
            <div>
                <h4>${testimonial.name}</h4>
                <p>${testimonial.business}</p>
            </div>
        `

        testimonialsContainer.appendChild(testimonialCard);
    })
}