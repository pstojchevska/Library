const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayLibrary();
}

function displayLibrary() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');

        const bookInfo = document.createElement('p');
        bookInfo.textContent = book.info();

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener("click", () => {
            removeBookFromLibrary(index);
        });

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        toggleReadButton.addEventListener("click", () => {
            book.toggleRead();
            displayLibrary();
        });

        bookCard.appendChild(bookInfo);
        bookCard.appendChild(removeButton);
        bookCard.appendChild(toggleReadButton);
        libraryDiv.appendChild(bookCard);
    });
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

document.getElementById('newBookBtn').addEventListener("click", () => {
    const modal = document.getElementById('bookFormModal');
    modal.style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener("click", () => {
    const modal = document.getElementById('bookFormModal');
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('bookFormModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('bookForm').addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    const modal = document.getElementById('bookFormModal');
    modal.style.display = 'none';
    document.getElementById('bookForm').reset();
});