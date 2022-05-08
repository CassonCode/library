const qs = document.querySelector.bind(document); 
const qsa = document.querySelectorAll.bind(document);
// ex:  qs('#myButton');




// Sets class for :root, specifically for switching between light and dark mode
const setTheme = theme => document.documentElement.className = theme;




//  Change rating on book being added or edited
const starsArray = [...document.getElementsByClassName("add-book-star-button")]; 
const starButtons = qs(".add-book-star-button");
const starIconFilled = qs(".add-star-active");
const starIconOutline = qs(".add-star-inactive");

let newBookRating;
 
function setStarRating(arr) {
        arr.forEach((starButton) => {       /////// use 'forEach'  or  '.map' ?????
            starButton.onclick = () => {
                for (let i = 0; i <= arr.indexOf(starButton); i++) {
                    let currentStarButton = arr[i];
                    let activeStar = currentStarButton.children[1];
                    let inactiveStar = currentStarButton.children[0];
                    addStarVisibleClass(activeStar);
                    addStarHiddenClass(inactiveStar);
                    newBookRating = i + 1;
                }
                for (let i = arr.length - 1; i > arr.indexOf(starButton); i--) {
                    let currentStarButton = arr[i];
                    let activeStar = currentStarButton.children[0];
                    let inactiveStar = currentStarButton.children[1];
                    addStarVisibleClass(activeStar);
                    addStarHiddenClass(inactiveStar);
                }
                console.log(`${newBookRating} out of 5 stars.`);
            }
        });
}

function addStarVisibleClass(star) {
    star.classList.remove("star-hidden");
    star.classList.add("star-visible");
}
function addStarHiddenClass(star) {
    star.classList.remove("star-visible");
    star.classList.add("star-hidden");
}

starButtons.addEventListener("click", setStarRating(starsArray));


const statusDropdown = document.getElementById("status-dropdown");

statusDropdown.addEventListener("change", disableStarButtons);

function disableStarButtons(event) {
    let currentOption = statusDropdown.value;
    let newOption = event.target.value;
    
    if (newOption === "currently-reading" || newOption === "not-started" || currentOption === "currently-reading" || currentOption === "not-started") {
        starsArray.forEach((button) => {
            button.disabled = true;
            setStarRatingToZero(starsArray);
        });
    }
    else {
        currentOption = statusDropdown.value;
        starsArray.forEach((button) => {
            button.disabled = false;
        });
    }
}

function setStarRatingToZero(arr) {
    arr.forEach((star) => {
        if (star.children[1].classList.contains("star-visible")) {
            addStarHiddenClass(star.children[1]);
            addStarVisibleClass(star.children[0]);
        }
    });
    newBookRating = 0;
}

window.onload = () => statusDropdown.value.selected = "finished";




//  Adds/Removes css classes that open/close menu
const menuButton = qs(".menu-button");
const menuIcon = qs(".menu-icon");
const mobileSidebar = qs(".sidebar-menu-container");

menuButton.addEventListener("click", () => {
    (menuIcon.classList.contains("open-menu")) ? openMenu() : closeMenu();
    console.log(menuIcon.classList);
});

function openMenu() {
    menuIcon.classList.add("close-menu");
    menuIcon.classList.remove("open-menu");
    mobileSidebar.classList.add("show-menu");
    mobileSidebar.classList.remove("hide-menu");
}

function closeMenu() {
    menuIcon.classList.add("open-menu");
    menuIcon.classList.remove("close-menu");
    mobileSidebar.classList.add("hide-menu");
    mobileSidebar.classList.remove("show-menu");
}




//  Rotating sort normal/reverse icon on click
const sortNormalReverseButton = qs(".sort-normal-reverse-button");
const sortNormalReverseIcon = qs(".sort-normal-reverse-icon");

sortNormalReverseButton.addEventListener("click", () => {
    (sortNormalReverseIcon.classList.contains("sort-normal")) ? setSortingIconToReverseOrder() : setSortingIconToNormalOrder();
});

function setSortingIconToNormalOrder() {
    if (sortNormalReverseIcon.classList.contains("sort-reverse")) {
        sortNormalReverseIcon.classList.remove("sort-reverse");
    }
    sortNormalReverseIcon.classList.add("sort-normal");
}

function setSortingIconToReverseOrder() {
    if (sortNormalReverseIcon.classList.contains("sort-normal")) {
        sortNormalReverseIcon.classList.remove("sort-normal");
    }
    sortNormalReverseIcon.classList.add("sort-reverse");
}