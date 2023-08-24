import React from "react";

type Props = {
  noFavoriteBooks: BookData[];
};

export default function InfoCard({ noFavoriteBooks }: Props) {
  const numberSelectorBooks = noFavoriteBooks.length;

  return (
    <div>
      <p>{numberSelectorBooks} libros disponibles</p>
    </div>
  );
}
