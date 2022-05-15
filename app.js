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

let newBookRating = 0;
let inputisEmpty = true;

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
                    inactiveStar.classList.remove("star-is-required");
                }
                for (let i = arr.length - 1; i > arr.indexOf(starButton); i--) {
                    let currentStarButton = arr[i];
                    let activeStar = currentStarButton.children[0];
                    let inactiveStar = currentStarButton.children[1];
                    addStarVisibleClass(activeStar);
                    addStarHiddenClass(inactiveStar);
                    activeStar.classList.remove("star-is-required");
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


starsArray.forEach((button) => {
    button.disabled = true;
});

const statusDropdown = document.getElementById("status-dropdown");

statusDropdown.addEventListener("change", disableStarButtons);

function disableStarButtons(event) {
    let currentOption = statusDropdown.value;
    let newOption = event.target.value;
    
    if (newOption === "currently-reading" || newOption === "want-to-read" || currentOption === "currently-reading" || currentOption === "want-to-read") {
        starsArray.forEach((button) => {
            button.disabled = true;
            setStarRatingToZero(starsArray);
            button.firstElementChild.classList.remove("star-is-required");
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

//also include display books function
window.onload = () => statusDropdown.value.selected = "want-to-read";




//
const titleInput = document.getElementById("title-input");
const authorFirstNameInput = document.getElementById("author-first-name-input");
const authorLastNameInput = document.getElementById("author-last-name-input");
const pageCountInput = document.getElementById("page-count");
let inputArray = [...document.getElementsByClassName("input-required")];

//
function addInputIsRequiredClass(inputElement) {
    inputElement.classList.add("input-required-alert");
}
function removeInputIsRequiredClass(inputElement) {
    inputElement.classList.remove("input-required-alert");
}

//check if input is empty
function checkIfInputIsEmpty(input) {
    if (input.value === "") {
        inputisEmpty = true;
        addInputIsRequiredClass(input);
    }
    else {
        inputisEmpty = false;
        removeInputIsRequiredClass(input);
    }
}

//check if any input is empty
function checkIfAnyInputIsEmpty(array) {

    array.forEach((input) => {
        checkIfInputIsEmpty(input);
    });
}

//check if first star is filled or not
    //if it isn't then they all get red fill upon clicking 'add book' button
function checkifRequiredStarIsFilled(arr) {
    if ((statusDropdown.value === "read" || statusDropdown.value === "abandoned") && newBookRating == 0) {
        arr.forEach((star) => {
            // star.firstElementChild.style.fill = "rgba(255, 0, 0, 0.5)";
            star.firstElementChild.classList.add("star-is-required");
        });
        inputisEmpty = true;
    }
}

    

//submit button event listener
// const addBookButton = qs(".add-book-button");
// addBookButton.addEventListener("click", () => {
//     checkIfAnyInputIsEmpty(inputArray);
//     checkifRequiredStarIsFilled(starsArray);
//     if (!inputisEmpty) {
//         //and submit book THEN clear
//         clearFormInfo();
//     }

// });


//clear inputs
function clearInputs() {
    inputArray.forEach((input) => input.value = "");
}


//
function clearFormInfo() {
    clearInputs();
    setStarRatingToZero(starsArray);
    inputisEmpty = true;
    // statusDropdown.value = "want-to-read";
}

inputArray.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.value !== "") {
            removeInputIsRequiredClass(input);
            inputisEmpty = false;
        }
    });
});




//create array of ALL book objects
const allBookObjectsArray = [];
const readBooksArray = [];
const currentlyReadingBooksArray = [];
const abandonedBooksArray = [];
const wantToReadBooksArray = [];
const filterArrays = [allBookObjectsArray, readBooksArray, currentlyReadingBooksArray, abandonedBooksArray, wantToReadBooksArray];
const filterOptionsArray = [...document.getElementsByClassName("filter-option")];


const sortByTitleButton = qs(".sort-title");
const sortByAuthorButton = qs(".sort-author");
const sortByRatingButton = qs(".sort-rating");
const sortByPageCountButton = qs(".sort-page-count");
const sortByDateAddedButton = qs(".sort-date-added");

//sort arrays
function sortArrayByTitle(array) {
    // array.sort((a,b) => a.title - b.title);
    array.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
}
function sortArrayByAuthor(array) {
    // array.sort((a,b) => a.lastName - b.lastName);
    array.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0));
}
function sortArrayByRating(array) {

}
function sortArrayByPageCount(array) {

}
function sortArrayByDateAdded(array) {

}

//function to combine sort functions using if statements based on which sort button is active
//      goes inside addBookToBookArrays()

//sort button event listeners
//  include  1.give clicked sort button a 'selected' class  2.add sort function  3.add displayFilteredBooks()
sortByTitleButton.addEventListener("click", () => {
    reassignSortSelectedClass(sortByTitleButton);
    filterArrays.forEach((array) => sortArrayByTitle(array));
    displayFilteredBooks();
    console.log(allBookObjectsArray);
});
sortByAuthorButton.addEventListener("click", () => {
    reassignSortSelectedClass(sortByAuthorButton);
    filterArrays.forEach((array) => sortArrayByAuthor(array));
    displayFilteredBooks();
    console.log(allBookObjectsArray);
});


function reassignSortSelectedClass(sortButton) {
    let selectedSortOption = qs(".sort-selected");
    if (selectedSortOption !== sortButton) {
        selectedSortOption.classList.remove("sort-selected");
        sortButton.classList.add("sort-selected");
    }
}



//create book object constructor
function Book(title, firstName, lastName, status, rating, pageCount) {
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = status;
    this.rating = rating;
    this.pageCount = pageCount;
}



//create new book using input elements' content as object arguments
//      add newly created book object to BOTH 'allBookObjectsArray' and array for its status
//              create actual book row using respective book object info (and assign it a unique data-set value???????) 
//              books section display: flex column
//                      check if row should be displayed based on which filter option is selected
//                              if it should be displayed then first sort the filter array it is in and then display the array


const booksSection = qs(".books-section");
//create book object and add to all books array
function addBookToBookArrays() {
    const newBookObject = new Book(titleInput.value, 
                                    authorFirstNameInput.value, 
                                    authorLastNameInput.value, 
                                    statusDropdown.value, 
                                    newBookRating, 
                                    pageCountInput.value);
                                    
    allBookObjectsArray.unshift(newBookObject);
    //sort array
    switch (newBookObject.status) {
        case "read":
            readBooksArray.unshift(newBookObject);
            //sort array
            break;
        case "want-to-read":
            wantToReadBooksArray.unshift(newBookObject);
            //sort array
            break;
        case "currently-reading":
            currentlyReadingBooksArray.unshift(newBookObject);
            //sort array
            break;
        default:
            abandonedBooksArray.unshift(newBookObject);
            //sort array
            break;
    }
    displayFilteredBooks();
}
//display filtered books function that uses createBookElement
//  put inside addToBookArrays and filter options eventListener
function displayFilteredBooks() {
    //remove all bookssection child elements
    while (booksSection.firstChild) {
        booksSection.removeChild(booksSection.firstChild);
    }
    let selectedFilterOption = qs(".filter-option-selected");
    switch (selectedFilterOption.innerText) {
        case "Read":
            readBooksArray.forEach((book) => {
                createBookElement(book);
            });
            break;
        case "Currently Reading":
            currentlyReadingBooksArray.forEach((book) => {
                createBookElement(book);
            });
            break;
        case "Abandoned":
            abandonedBooksArray.forEach((book) => {
                createBookElement(book);
            });
            break;
        case "Want to Read":
            wantToReadBooksArray.forEach((book) => {
                createBookElement(book);
            });
            break;
        default:
            allBookObjectsArray.forEach((book) => {
                createBookElement(book);
            });
            break;
    }
}




//loop through filteroptions array, find which one has 'selected' class, 
// loop through corresponding filter array and create html elements of each object, then sort based on sort selected
// let selectedFilterOption = qs(".filter-option-selected");

function removeFilterOptionsSelectedClass() {
    filterOptionsArray.forEach((option) => {
        option.classList.remove("filter-option-selected");
    });
}

function addFilterOptionsSelectedClass(filterOption) {
    filterOption.classList.add("filter-option-selected");
}

let totalBooksDisplayNumber = qs(".total-books-number");
// function updateDisplayedBooksCount(filterOptionSelected) {
//     switch (filterOptionSelected.innerText) {
//         case "All":
//             totalBooksDisplayNumber.innerText = allBookObjectsArray.length;
//             break;
//         case "Read":
//             totalBooksDisplayNumber.innerText = readBooksArray.length;
//             break;
//         case "Currently Reading":
//             totalBooksDisplayNumber.innerText = currentlyReadingBooksArray.length;
//             break;
//         case "Want to Read":
//             totalBooksDisplayNumber.innerText = wantToReadBooksArray.length;
//             break;
//         default:
//             totalBooksDisplayNumber.innerText = abandonedBooksArray.length;
//             break;
//     }
// }
function updateDisplayedBooksCount() {
    let selectedFilterOption = qs(".filter-option-selected");
    switch (selectedFilterOption.innerText) {
        case "All":
            totalBooksDisplayNumber.innerText = allBookObjectsArray.length;
            break;
        case "Read":
            totalBooksDisplayNumber.innerText = readBooksArray.length;
            break;
        case "Currently Reading":
            totalBooksDisplayNumber.innerText = currentlyReadingBooksArray.length;
            break;
        case "Want to Read":
            totalBooksDisplayNumber.innerText = wantToReadBooksArray.length;
            break;
        default:
            totalBooksDisplayNumber.innerText = abandonedBooksArray.length;
            break;
    }
}


filterOptionsArray.forEach((filterOption) => {
    filterOption.addEventListener("click", () => {
        removeFilterOptionsSelectedClass();
        addFilterOptionsSelectedClass(filterOption);
        //function to update large number under 'Books'
        updateDisplayedBooksCount();



        // console.log(totalBooksDisplayNumber.textContent);

        //call premade function to remove/delete all displayed books
        //  then create and add new html elements 
        displayFilteredBooks();
    })
});




function createBookElement(bookObject) {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");
    booksSection.appendChild(bookContainer);

    let bookTitleContainer = document.createElement("button");
    bookTitleContainer.classList.add("book-overflow-text");
    bookTitleContainer.innerText = bookObject.title;
    bookContainer.appendChild(bookTitleContainer);

    let bookAuthorNameContainer = document.createElement("button");
    bookAuthorNameContainer.classList.add("book-overflow-text");
    bookAuthorNameContainer.innerText = combineAuthorName(bookObject.firstName, bookObject.lastName);
    bookContainer.appendChild(bookAuthorNameContainer);

    let bookStatus = document.createElement("button");
    bookStatus.innerText = bookObject.status;
    bookContainer.appendChild(bookStatus);

    createStarRatingContainer(bookObject.rating, bookContainer);

    let bookPageCount = document.createElement("button");
    bookPageCount.innerHTML = bookObject.pageCount;
    bookContainer.appendChild(bookPageCount);

    let bookCreationDate = document.createElement("button");
    bookCreationDate.classList.add("book-creation-date-text");
    // bookCreationDate.innerHTML = getBookObjectCreationDate();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    if (!bookObject.date) {
        bookObject.date = today;
    }
    bookCreationDate.innerHTML = bookObject.date;
    bookContainer.appendChild(bookCreationDate);
    
    //create delete button
    let bookDeleteButton = document.createElement("button");
    bookDeleteButton.innerHTML = "Delete";
    bookDeleteButton.classList.add("delete-book-button");
    bookContainer.appendChild(bookDeleteButton);
    deleteBook(bookDeleteButton, bookObject, bookContainer, booksSection);
}


//function to create star div container that holds stars for individual books
function createStarRatingContainer(numberRating, bookContainer) {
    let bookRatingStarsContainer = document.createElement("div");
    bookRatingStarsContainer.classList.add("book-rating-stars-container");
    bookContainer.appendChild(bookRatingStarsContainer);
    if (numberRating > 0) {
        for (let i = 0; i < numberRating; i++) {
            let star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            star.classList.add("individual-book-star");
            star.innerHTML = '<path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />';
            bookRatingStarsContainer.appendChild(star);
        }
    }
}



//create function that accepts to arguments (first and last name), turns it into 'Last, First'
function combineAuthorName(firstName, lastName) {
    return `${lastName}, ${firstName}`;
}


//delete button removes bookContainer element from booksSection element
//  also removes it from 'all' array and relevant filter array (slice/splice out its array position?) 
function deleteBook(deleteButton, bookObject, bookContainer, booksSection) {
    deleteButton.addEventListener("click", () => {
        booksSection.removeChild(bookContainer);
        allBookObjectsArray.splice(allBookObjectsArray.indexOf(bookObject), 1);
        switch (bookObject.status) {
            case "read":
                readBooksArray.splice(readBooksArray.indexOf(bookObject), 1);
                break;
            case "currently-reading":
                currentlyReadingBooksArray.splice(currentlyReadingBooksArray.indexOf(bookObject), 1);
                break;
            case "want-to-read":
                wantToReadBooksArray.splice(wantToReadBooksArray.indexOf(bookObject), 1);
                break;
            default:
                abandonedBooksArray.splice(abandonedBooksArray.indexOf(bookObject), 1);
        }
        updateDisplayedBooksCount();
    });
}





const addBookButton = qs(".add-book-button");

addBookButton.addEventListener("click", () => {
    checkIfAnyInputIsEmpty(inputArray);
    checkifRequiredStarIsFilled(starsArray);
    if (!inputisEmpty) {
        //submit book THEN clear
        addBookToBookArrays();
        updateDisplayedBooksCount();
            console.log(readBooksArray);
            console.log(currentlyReadingBooksArray);
            console.log(abandonedBooksArray);
            console.log(wantToReadBooksArray);

        clearFormInfo();
    }

});

addBookButton.addEventListener("pointerdown", () => {
    if (!inputisEmpty) {
        addBookButton.classList.add("submit-button-pushed-down");
    }
});
addBookButton.addEventListener("pointerup", () => {
    addBookButton.classList.remove("submit-button-pushed-down");
});








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