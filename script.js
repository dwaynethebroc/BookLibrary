const myLibrary = [];


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

let cardContainer = document.getElementById("container")

function displayLibrary() {
    myLibrary.forEach(function(book) {
        //create a card
        //add each book info to the card
        console.log(book);
        let el = document.createElement("div");
        el.ClassName = "card";
        el.innerText = `${book.title}`
        cardContainer.append(el);
    })
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 1937, true);
theHobbit.bookDescription();    

let prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', 254, 1813, false);
prideAndPrejudice.bookDescription();

theHobbit.addBooktoLibrary();
prideAndPrejudice.addBooktoLibrary();

displayLibrary();