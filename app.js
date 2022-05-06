// Sets class for :root, specifically for switching between light and dark mode
const setTheme = theme => document.documentElement.className = theme;






// Change star rating based on user input

// const ratingStars = [...document.getElementsByClassName("rating__star")];
// const ratingResult = document.querySelector(".rating__result");

// printRatingResult(ratingResult);     ///////

// function executeRating(stars, result) {
//    const starClassActive = "rating__star fas fa-star";
//    const starClassUnactive = "rating__star far fa-star";
//    const starsLength = stars.length;
//    let i;
//    stars.map((star) => {
//       star.onclick = () => {
//          i = stars.indexOf(star);

//          if (star.className.indexOf(starClassUnactive) !== -1) {
//              //printRatingResult(result, i + 1);        ////////
//             for (i; i >= 0; --i) stars[i].className = starClassActive;
//          } 
//          else {
//              //printRatingResult(result, i);        //////
//             for (i; i < starsLength; ++i) stars[i+1].className = starClassUnactive;
//          }
//       };
//    });
// }
// function printRatingResult(result, num = 0) {
//    result.textContent = `${num}/5`;
// }
//executeRating(ratingStars, ratingResult);

// Uncaught TypeError: stars[(i + 1)] is undefined
// onclick http://127.0.0.1:5500/app.js:26
// executeRating http://127.0.0.1:5500/app.js:17
// executeRating http://127.0.0.1:5500/app.js:16
// <anonymous> http://127.0.0.1:5500/app.js:36


//  Change rating on book being added or edited
const starsArray = [...document.getElementsByClassName("add-book-star-button")]; 
const starButtons = document.querySelector(".add-book-star-button");
const starIconFilled = document.querySelector(".add-star-active");
const starIconOutline = document.querySelector(".add-star-inactive");

let newBookRating;

function setStarRating(arr) {
        arr.forEach((starButton) => {       /////// use 'forEach'  or  '.map' ?????
            starButton.onclick = () => {
                for (let i = 0; i <= arr.indexOf(starButton); i++) {
                    // console.log(starButton);
                    let currentStarButton = arr[i];
                    let activeStar = currentStarButton.children[1];
                    let inactiveStar = currentStarButton.children[0];
                    // console.log(currentStar);
                    addStarVisibleClass(activeStar);
                    addStarHiddenClass(inactiveStar);
                    newBookRating = i + 1;
                }
                for (let i = arr.length - 1; i > arr.indexOf(starButton); i--) {
                    let currentStarButton = arr[i];
                    let activeStar = currentStarButton.children[0];
                    let inactiveStar = currentStarButton.children[1];
                    // console.log(currentStar);
                    addStarVisibleClass(activeStar);
                    addStarHiddenClass(inactiveStar);
                }
                console.log(`${newBookRating} out of 5 stars.`);
            }
        });
}
// setStarRating(starsArray, currentStatusText);

function addStarVisibleClass(star) {
    star.classList.remove("star-hidden");
    star.classList.add("star-visible");
}
function addStarHiddenClass(star) {
    star.classList.remove("star-visible");
    star.classList.add("star-hidden");
}

starButtons.addEventListener("click", setStarRating(starsArray));







//  Adds/Removes css classes that open/close menu
const menuButton = document.querySelector(".menu-button");
const menuIcon = document.querySelector(".menu-icon");
const mobileSidebar = document.querySelector(".sidebar-menu-container");

menuButton.addEventListener("click", () => {
    (menuIcon.classList.contains("open-menu")) ? openMenu() : closeMenu();
    // (mobileSidebar.classList.contains("show-menu")) ? closeMenu() : openMenu();
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
const sortNormalReverseButton = document.querySelector(".sort-normal-reverse-button");
const sortNormalReverseIcon = document.querySelector(".sort-normal-reverse-icon");

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