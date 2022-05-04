// Sets class for :root, specifically for switching between light and dark mode
const setTheme = theme => document.documentElement.className = theme;






// Change star rating based on user input
const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

// printRatingResult(ratingResult);     ///////

function executeRating(stars, result) {
   const starClassActive = "rating__star fas fa-star";
   const starClassUnactive = "rating__star far fa-star";
   const starsLength = stars.length;
   let i;
   stars.map((star) => {
      star.onclick = () => {
         i = stars.indexOf(star);

         if (star.className.indexOf(starClassUnactive) !== -1) {
             //printRatingResult(result, i + 1);        ////////
            for (i; i >= 0; --i) stars[i].className = starClassActive;
         } 
         else {
             //printRatingResult(result, i);        //////
            for (i; i < starsLength; ++i) stars[i+1].className = starClassUnactive;
         }
      };
   });
}

function printRatingResult(result, num = 0) {
   result.textContent = `${num}/5`;
}

executeRating(ratingStars, ratingResult);
// Uncaught TypeError: stars[(i + 1)] is undefined
// onclick http://127.0.0.1:5500/app.js:26
// executeRating http://127.0.0.1:5500/app.js:17
// executeRating http://127.0.0.1:5500/app.js:16
// <anonymous> http://127.0.0.1:5500/app.js:36









//  Adds/Removes css classes that open/close menu
const menuButton = document.querySelector(".menu-button");
const mobileSidebar = document.querySelector(".sidebar-menu-container");

menuButton.addEventListener("click", () => {
    (menuButton.classList.contains("open-menu")) ? openMenu() : closeMenu();
    // (mobileSidebar.classList.contains("show-menu")) ? closeMenu() : openMenu();
    console.log(menuButton.classList);
});

function openMenu() {
    menuButton.classList.add("close-menu");
    menuButton.classList.remove("open-menu");
    mobileSidebar.classList.add("show-menu");
    mobileSidebar.classList.remove("hide-menu");
}

function closeMenu() {
    menuButton.classList.add("open-menu");
    menuButton.classList.remove("close-menu");
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