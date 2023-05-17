const entryForm = document.querySelector(".entry-form");
const showFormBtn = document.querySelector(".show-form-btn");
const addBookBtn = document.querySelector(".submit-btn");
const cardContainer = document.querySelector(".card-container");

let myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    pages: 295,
    read: false,
  },
];

function Book(title, author, genre, pages, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

showFormBtn.addEventListener("click", () => {
  entryForm.classList.toggle("hidden");
});

addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary();
  displayLibrary();
  console.log(myLibrary);
});

const addBookToLibrary = () => {
  const title = document.querySelector("#book-title");
  const author = document.querySelector("#author");
  const genre = document.querySelector("#genre-select");
  const pages = document.querySelector("#page-count");
  const read = document.querySelector("#read-checkbox");

  myLibrary.push(
    new Book(title.value, author.value, genre.value, pages.value, read.checked)
  );

  title.value = "";
  author.value = "";
  genre.value = "";
  pages.value = 0;
  read.checked = false;
  entryForm.classList.toggle("hidden");
};

const createElementWithClass = (type, className) => {
  const element = document.createElement(type);
  element.classList.add(className);
  return element;
};

const toggleReadStatus = (event) => {
  const i = event.srcElement.dataset.index;
  myLibrary[i].read = !myLibrary[i].read;
  displayLibrary();
};

const deleteBook = (event) => {
  const i = event.srcElement.dataset.index;
  myLibrary.splice(i, 1);
  displayLibrary();
};

const displayLibrary = () => {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  for (const [index, book] of myLibrary.entries()) {
    const bookCard = createElementWithClass("div", "book-card");
    const title = createElementWithClass("p", "card-text");
    const author = createElementWithClass("p", "card-text");
    const genre = createElementWithClass("p", "card-text");
    const pages = createElementWithClass("p", "card-text");
    const read = createElementWithClass("p", "card-text");
    const readBtn = createElementWithClass("button", "card-btn");
    const deleteBtn = createElementWithClass("button", "card-btn");

    title.textContent = book.title;
    author.textContent = `By: ${book.author}`;
    genre.textContent = book.genre;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read
      ? "You read this book!"
      : "Still on your reading list";
    readBtn.textContent = "Toggle read status";
    readBtn.dataset.index = index;
    readBtn.addEventListener("click", toggleReadStatus);
    deleteBtn.textContent = "Delete Entry";
    deleteBtn.dataset.index = index;
    deleteBtn.addEventListener("click", deleteBook);

    cardContainer.append(bookCard);
    bookCard.append(title, author, genre, pages, read, readBtn, deleteBtn);
  }
};
