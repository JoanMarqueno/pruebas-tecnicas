import React from "react";

type Props = {
  allgenre: string[];
  selectedGenre: string;
  onGenreChange: (newGenre: string) => void;
};

export default function SelectorGender({
  allgenre,
  selectedGenre,
  onGenreChange,
}: Props) {
  return (
    <div className="flex mr-5">
      <label className="mr-4">Selecciona el género:</label>
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option>All</option>
        {allgenre.map((genre) => (
          <option value={genre} key={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
