let myLibrary = new Array();
let cardContainer = document.getElementById("container");
let newBookButton = document.getElementById("newBookButton").addEventListener("click", newBook);
let index = 0;

function Book(title, author, pageCount, yearWritten, read) {
    //constructor function

    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.yearWritten = yearWritten;
    this.read = read; 

 
    this.bookDescription = function() {
        if(this.read === true){
            read = 'read'
        }
        else if(this.read === false){
            read = 'not read yet';
        }
    
        console.log(`${this.title} by ${this.author}, ${this.pageCount}, ${read}`)
    }

    this.addBooktoLibrary = function() {
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
        changeReadStatus.textContent = `Change Read Status`;
        changeReadStatus.addEventListener('click', changeRead)

        if(book.read === true) {
            book.read = 'Yes';
        }
        else if (book.read === false) {
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

        event.preventDefault();
    })
}

function newBook() {
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

    let temporaryBook = new Book(this.title, this.author, this.pages, this.yearWritten, this.read);
    temporaryBook.bookDescription();
    temporaryBook.addBooktoLibrary();
    displayLibrary();
}

function removeBook() {
    //go through array and if selected book that triggered event is selected, remove from array
    
    console.log(this);

    for(i=0; i<=myLibrary.length; i++){
        if(myLibrary[i] === this.id){
            myLibrary.splice(i, 1)
        }
    }

    displayLibrary();
}

function changeRead() {

}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 1937, true);
theHobbit.bookDescription();    

let prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', 254, 1813, false);
prideAndPrejudice.bookDescription();

theHobbit.addBooktoLibrary();
prideAndPrejudice.addBooktoLibrary();

displayLibrary();