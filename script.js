let my_libray = [
    { title: "The Catcher in the Rye", author: "J.D. Salinger", num_pages: 432, have_read: false, id: 3 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", num_pages: 281, have_read: true, id: 2 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", num_pages: 180, have_read: false, id: 1 },
    // { title: "Moby Dick", author: "Herman Melville", num_pages: 635, have_read: true },
    // { title: "War and Peace", author: "Leo Tolstoy", num_pages: 1225, have_read: false },
    // { title: "Pride and Prejudice", author: "Jane Austen", num_pages: 279, have_read: true },
    // { title: "Brave New World", author: "Aldous Huxley", num_pages: 268, have_read: false },
    // { title: "Jane Eyre", author: "Charlotte Brontë", num_pages: 500, have_read: true },
    // { title: "The Hobbit", author: "J.R.R. Tolkien", num_pages: 310, have_read: false },
    // { title: "Fahrenheit 451", author: "Ray Bradbury", num_pages: 194, have_read: true },
    // { title: "Crime and Punishment", author: "Fyodor Dostoevsky", num_pages: 671, have_read: false },
    // { title: "The Odyssey", author: "Homer", num_pages: 541, have_read: true },
    // { title: "1984", author: "George Orwell", num_pages: 328, have_read: true },
    // { title: "The Kite Runner", author: "Khaled Hosseini", num_pages: 371, have_read: false },
    // { title: "The Book Thief", author: "Markus Zusak", num_pages: 584, have_read: true },
    // { title: "The Road", author: "Cormac McCarthy", num_pages: 287, have_read: false },
    // { title: "Wuthering Heights", author: "Emily Brontë", num_pages: 416, have_read: true },
    // { title: "Dracula", author: "Bram Stoker", num_pages: 418, have_read: false },
    // { title: "The Shining", author: "Stephen King", num_pages: 447, have_read: true },
    // { title: "Animal Farm", author: "George Orwell", num_pages: 112, have_read: false }
];

my_libray.sort((a,b) => a.id - b.id);
let id = my_libray.at(-1).id + 1;


const main = document.querySelector('main');
const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const titleInput = favDialog.querySelector("#title");
const authorInput = favDialog.querySelector("#author");
const pagesInput = favDialog.querySelector("#pages");
const haveReadBtn = favDialog.querySelector("#have-read");
const confirmBtn = favDialog.querySelector("#confirmBtn");

function Book(title, author, num_pages, id, have_read=false) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.have_read = have_read;
    this.id = id;
    this.info = function(){
        read_msg = have_read ? "Have read" : "Not read yet";
        return `${this.title} by ${this.author}, ${this.num_pages} pages, ${read_msg}`  
    }
};

function addBookToLibrary(title, author, num_pages, have_read=false){
    if (!num_pages){
        num_pages = "unknown";
    }
    const book = new Book(title, author, num_pages, id, have_read);
    my_libray.push(book);
    id += 1;
    return book;
};

function createCardElement(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = book.id;
    const title = document.createElement('h2');
    title.innerText = book.title;
    const author = document.createElement('h3');
    author.innerText = ` Written by ${book.author}`
    const num_pages = document.createElement('p');
    num_pages.innerText = `Has ${book.num_pages} pages`;
    const have_read = document.createElement('p');
    have_read.innerText = book.have_read ? 'You have read this book' : 'you have not read this book '
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    const removeBookBtn = document.createElement("button");
    removeBookBtn.innerText = "Remove book";
    
    main.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(num_pages);
    card.appendChild(have_read);
    btnContainer.appendChild(removeBookBtn);
    card.appendChild(btnContainer);

    removeBookBtn.addEventListener("click", (e) => {
        my_libray = my_libray.filter((obj) => obj.id != card.dataset.id);
        main.removeChild(card);
    });
};


// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
})

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
favDialog.addEventListener("submit", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    const book = addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, haveReadBtn.checked);
    createCardElement(book);
    favDialog.close();
});

my_libray.forEach((e) => {
    createCardElement(e);
});