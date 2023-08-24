import React, { useState } from "react";
import "./App.css";
import Book from "./components/book";
import books from "../src/data/books.json";
import SelectorGender from "./components/selectorGender";
import InfoCard from "./components/infoCard";
import FavoriteBook from "./components/favoriteBook";

function App() {
  // Extracting book data from the imported JSON
  const dataBook: BookData[] = books.library.map((book) => book.book);

  // Creating an array of unique genres from the book data
  const uniqueGenres = Array.from(
    new Set(books.library.map((book) => book.book.genre))
  );

  // State to manage favorite books
  const [favoriteBook, setFavoriteBook] = useState<BookData[]>(() => {
    const savedFavoriteBooks = localStorage.getItem("favoriteBooks");
    return savedFavoriteBooks ? JSON.parse(savedFavoriteBooks) : [];
  });

  // State to manage selected genre filter
  const [genre, setGenre] = useState("All");

  // State to manage dragged book during drag-and-drop
  const [draggedBook, setDraggedBook] = useState<{
    book: BookData | null;
    dragEvent: React.DragEvent<HTMLDivElement> | null;
    idDiv: string | undefined;
  }>({ book: null, dragEvent: null, idDiv: "" });

  // Function to add a book to favorites
  function addFavoriteBook(book: BookData) {
    const updatedFavoriteBooks = [...favoriteBook, book];
    setFavoriteBook(updatedFavoriteBooks);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavoriteBooks));
  }

  // Function to delete a book from favorites
  function deleteBook(book: BookData) {
    const updatedBooks = favoriteBook.filter(
      (favbook) => favbook.ISBN !== book.ISBN
    );
    setFavoriteBook(updatedBooks);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedBooks));
  }

  // Filter out books that are not in favorites
  const booksNotInFavorites = dataBook.filter(
    (item) => !favoriteBook.some((favBook) => favBook.ISBN === item.ISBN)
  );

  // Apply genre filter to books to show
  const booksToShow =
    genre === "All"
      ? booksNotInFavorites
      : booksNotInFavorites.filter((book) => book.genre === genre);

  // Handler for drag start event
  const handleDragStart = (
    evt: React.DragEvent<HTMLDivElement>,
    book: BookData
  ) => {
    const id = evt.currentTarget?.id;
    setDraggedBook({ book: book, dragEvent: evt, idDiv: id });
  };

  // Handler for drop event during drag-and-drop
  const handleDrop = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    if (draggedBook.book) {
      if (draggedBook.idDiv !== evt.currentTarget.id) {
        if (draggedBook.idDiv === "booksToShow") {
          addFavoriteBook(draggedBook.book);
        } else if (draggedBook.idDiv === "favoriteBooks") {
          deleteBook(draggedBook.book);
        }
      }
      setDraggedBook({ book: null, dragEvent: null, idDiv: "" });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="p-8">
        <div className="flex">
          <div className="mb-4">
            {/* Component to select genres */}
            <SelectorGender
              allgenre={uniqueGenres}
              selectedGenre={genre}
              onGenreChange={setGenre}
            ></SelectorGender>
          </div>
          <div>
            {/* Component to display info card */}
            <InfoCard noFavoriteBooks={booksNotInFavorites}></InfoCard>
          </div>
        </div>
        {/* Container for books to show */}
        <div
          onDrop={(evt) => handleDrop(evt)}
          onDragOver={(evt) => evt.preventDefault()}
          className="p-4 shadow-2xl"
          id="booksToShow"
        >
          <div className="grid grid-cols-4 gap-8" draggable>
            {booksToShow.length > 0 ? (
              booksToShow.map((book) => (
                <Book
                  key={book.ISBN}
                  book={book}
                  startDrag={handleDragStart}
                  addBook={addFavoriteBook}
                />
              ))
            ) : (
              <div>No hay libros en esta categoría.</div>
            )}
          </div>
        </div>
      </div>
      {/* Container for favorite books */}
      <div
        className="p-4 shadow-2xl"
        onDrop={(evt) => handleDrop(evt)}
        onDragOver={(evt) => evt.preventDefault()}
        draggable
        id="favoriteBooks"
      >
        <h1 className="font-mono p-5 text-lg mb-4">Favoritos</h1>
        <div className="grid grid-cols-2 gap-4">
          {favoriteBook.map((book) => (
            <FavoriteBook
              key={book.ISBN}
              book={book}
              startDrag={handleDragStart}
              deleteBook={deleteBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
