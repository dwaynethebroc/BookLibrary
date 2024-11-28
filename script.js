let myLibrary = new Array();
let cardContainer = document.getElementById("container");
let newBookButton = document.getElementById("newBookButton").addEventListener("click", newBook);
let formButton = document.getElementById("addBook").addEventListener("click", showForm);
let divHider = document.getElementById("formHider");
divHider.style.display = "none";

let index = 0;

class Book {

    constructor(title, author, pageCount, yearWritten, read) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.yearWritten = yearWritten;
        this.read = read; 
    }


    bookDescription() {
        if(this.read === true){
            this.read = 'Yes'
        }
        else if(this.read === false){
            this.read = 'No';
        }
        console.log(`${this.title} by ${this.author}, ${this.pageCount}, ${this.read}`)
    }

    addBooktoLibrary() {
        myLibrary.push(this);
        console.log(this); 
        console.log(myLibrary);        
    }
}

function displayLibrary() {
    while(cardContainer.firstChild){
        cardContainer.removeChild(cardContainer.firstChild);
        index--;
    }

    myLibrary.forEach(function(book) {
        //create a card
        //add each book info to the card

        console.log(book);
        let el = document.createElement("div");
        el.classList.add("card");
        el.innerText = `${book.title}`

        let author = document.createElement("div");
        author.classList.add("subtext");
        author.innerText = `Author: ${book.author}`;

        let pages = document.createElement("div");
        pages.classList.add("subtext");
        pages.innerText = `Page Count: ${book.pageCount}`;

        let year = document.createElement("div");
        year.classList.add("subtext");
        year.innerText = `Year Written: ${book.yearWritten}`;

        let read = document.createElement("div");
        read.classList.add("subtext");

        let deleteBook = document.createElement("button");
        deleteBook.classList.add(`"deleteBook"`);
        deleteBook.id = `${index}`;
        deleteBook.textContent = `Delete`;
        deleteBook.addEventListener('click', removeBook)

        let changeReadStatus = document.createElement("button");
        changeReadStatus.classList.add(`"changeReadStatus"`);
        changeReadStatus.id = `${index}`;
        changeReadStatus.textContent = `Change Read Status`;
        changeReadStatus.addEventListener('click', changeRead)

        if(book.read === true || book.read === 'yes') {
            book.read = 'Yes';
        }
        else if (book.read === false || book.read === 'no') {
            book.read = 'No';
        }
        read.innerText = `Read: ${book.read}`;

        el.append(author);
        el.append(pages);
        el.append(year);
        el.append(read);
        el.append(deleteBook);
        el.append(changeReadStatus);

        cardContainer.append(el);
        index++;
    })
}

function newBook() {
    event.preventDefault();
    
    this.title = document.getElementById('title').value;
    this.author = document.getElementById('author').value;
    this.pages = Number(document.getElementById('pages').value);
    this.yearWritten = Number(document.getElementById('yearWritten').value);
    this.read = document.getElementById('read').value;

    if (this.read === 'Yes') {
        this.read = true;
    }
    else if(this.read === 'No') {
        this.read = false;
    }

    let hasValues = validateForm(this.title, this.author, this.pages, this.yearWritten);
    let validInputs = false;

    if (hasValues === true){
        validInputs = showError();
    } 

    if(validInputs === true && hasValues === true){
        let temporaryBook = new Book(this.title, this.author, this.pages, this.yearWritten, this.read);
        temporaryBook.bookDescription();
        temporaryBook.addBooktoLibrary();
        
        displayLibrary();
    } else {
        showError();
        return false;
    }
}

function removeBook() {
    //go through array and if selected book that triggered event is selected, remove from array
    
    let buttonID = parseInt(this.id);

    for(let i=0; i<=myLibrary.length; i++){
        if( i === buttonID){
            myLibrary.splice(i, 1);
        }
    }

    displayLibrary();
}

function changeRead() {
    let readButton = parseInt(this.id);

    for(let i = 0; i<=myLibrary.length; i++) {
        if(i === readButton) {

            if(myLibrary[i].read === 'Yes'){
                myLibrary[i].read = 'No';
            }

            else if(myLibrary[i].read === 'No') {
                myLibrary[i].read = 'Yes';
            }
        }
    }

    displayLibrary();
}

function showForm() {
    
    if(divHider.style.display === "block") {
        divHider.style.display = "none";
    }
    else if(divHider.style.display === "none") {
        divHider.style.display = "block";
    }

    
}

function validateForm(title, author, pages, yearWritten, read) {
    console.log("validate form function ")
    let isValid = true;

    if(title === ""){
        console.log("invalid title");
        isValid = false;
    } 
    
    if (author === "") {
        console.log("invalid author");
        isValid = false;
    } 
    
    if (pages === 0) {
        console.log("invalid pages");
        isValid = false;
    } 
    
    if (yearWritten === 0) {
        console.log("invalid yearWritten");
        isValid = false;
    } 

    return isValid;
}

function showError(){
    console.log("showError function");

    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const yearWritten = document.getElementById('yearWritten');

    const titleErrorMessage = document.querySelector('#title + span.error');
    const authorErrorMessage = document.querySelector('#author + span.error');
    const pagesErrorMessage = document.querySelector('#pages + span.error');
    const yearWrittenErrorMessage = document.querySelector('#yearWritten + span.error');

    let pagesOnlyNumbers = isNaN(pages.value);
    let yearWrittenOnlyNumbers = isNaN(yearWritten.value); 

    if(title.value === ""){
        title.className = "invalid";
        titleErrorMessage.textContent = "Please enter the title";
    } else {
        title.className = "valid";
        titleErrorMessage.textContent = "";
    }

    if(author.value === ""){
        author.className = "invalid";
        authorErrorMessage.textContent = "Please enter the author";
    } else {
        author.className = "valid";
        authorErrorMessage.textContent = "";
    }

    if(pages.value === ""){
        pages.className = "invalid";
        pagesErrorMessage.textContent = "Please enter the Page count";
    } else if (pagesOnlyNumbers === true) {
        pages.className = "invalid";
        pagesErrorMessage.textContent = "Please enter Page count as a number value";
    } else {
        pages.className = "valid";
        pagesErrorMessage.textContent = "";
    }

    if(yearWritten.value === ""){
        yearWritten.className = "invalid";
        yearWrittenErrorMessage.textContent = "Please enter the year written";
    } else if (yearWrittenOnlyNumbers === true){
        yearWritten.className = "invalid";
        yearWrittenErrorMessage.textContent = "Please enter Years Written as a number";
    } else {
        yearWritten.className = "valid";
        yearWrittenErrorMessage.textContent = "";
    }

    if(title.className === "valid" && author.className === "valid" && pages.className === "valid" && yearWritten.className === "valid"){
        return true;
    } else {
        return false;
    }
}


let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 1937, true);
let prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', 254, 1813, false);

theHobbit.addBooktoLibrary();
prideAndPrejudice.addBooktoLibrary();

displayLibrary();