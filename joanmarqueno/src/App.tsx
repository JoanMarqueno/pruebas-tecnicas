
import React, { useState } from 'react';
import './App.css'
import Book from './components/book';
import books from '../src/data/books.json'
// import BookData from './model/bookData';
import FavoriteBook from './components/favoriteBook';

function App() {

  const dataBook: BookData [] = books.library.map((books) => books.book);

  const [favoriteBook, setFavoriteBook] = useState<BookData[]>([])


  function addBook(book: BookData) {
   
      setFavoriteBook([...favoriteBook, book]); // Agregar el nuevo libro al estado actual usando el operador spread (...)
    
  }

  function deleteBook(book: BookData) {
    
      const updateBooks = favoriteBook.filter((favbook) => favbook.ISBN !== book.ISBN) // Si favoriteBook es null, inicializamos el estado con el primer libro.
      setFavoriteBook(updateBooks)
    
  }

  const booksNotInFavorites = dataBook.filter((item) => !favoriteBook.some((favBook) => favBook.ISBN === item.ISBN));

  
  
  return (
    <>
    <div className='flex'>
        <div className='w-1/2 p-5'>
          <h1 className='font-mono p-5'>Libros</h1>
          <div  className='grid gap-x-8 gap-y-4 grid-cols-4' >
                  {booksNotInFavorites.map((item, i) => (
                      <Book addBook= {addBook} key={i} book= {item}></Book>
                  ))}
              
              </div>
        </div>
        <aside className='w-1/2 p-5'>
          <h1 className='font-mono p-5'>Favoritos</h1>
            <div  className='grid gap-x-8 gap-y-4 grid-cols-4' >
                  {favoriteBook.map((item, i) => (
                      <FavoriteBook deleteBook= {deleteBook} key={i} book= {item}></FavoriteBook>
                  ))}
              
              </div>
        </aside>
      </div>
    </>
  )
}

export default App
