import React from "react";
import Heart from "./iconoCorazon";

type Props = {
  book: BookData;
  deleteBook: (book: BookData) => void;
  startDrag: (evt: React.DragEvent<HTMLDivElement>, book: BookData) => void;
};

function FavoriteBook({ book, deleteBook, startDrag }: Props) {
  const handleDeleteBook = () => {
    deleteBook(book);
  };

  return (
    <div
      className="flex items-center relative"
      draggable
      id="favoriteBooks"
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
          onClick={handleDeleteBook}
        >
          <Heart isFavorite={true}></Heart>
        </span>
      </div>
    </div>
  );
}

export default FavoriteBook;
