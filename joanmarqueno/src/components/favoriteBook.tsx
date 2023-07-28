
// import BookData from '../model/bookData'


type Props = {
    book: BookData
    deleteBook: (book: BookData) => void;
   
}



function FavoriteBook ({ book, deleteBook}: Props) {


  return (
   
    <section>
        <img onClick= {() => deleteBook(book)} className="object-scale-down h-40 w-110" src={book.cover} alt={book.title} />
    </section>
    
  )
}

export default FavoriteBook
