import React from "react";
import Heart from "./iconoCorazon";

type Props = {
  book: BookData;
  addBook: (book: BookData) => void;
  startDrag: (evt: React.DragEvent<HTMLDivElement>, book: BookData) => void;
};

function Book({ book, addBook, startDrag }: Props) {
  const handleAddBook = () => {
    addBook(book);
  };

  return (
    <div
      className="relative"
      id="booksToShow"
      draggable
      onDragStart={(evt) => startDrag(evt, book)}
    >
      <div className="rounded overflow-hidden shadow-lg">
        <img
          className="w-full h-48 object-cover"
          src={book.cover}
          alt={book.title}
        />
        <span
          className="cursor-pointer m-1 px-2 inline-block tracking-wide absolute top-0 right-0"
          onClick={handleAddBook}
        >
          <Heart isFavorite={false}></Heart>
        </span>
      </div>
    </div>
  );
}

export default Book;
