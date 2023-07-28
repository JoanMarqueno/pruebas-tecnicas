
// import BookData from '../model/bookData'


type Props = {
    book: BookData
    addBook: (book: BookData) => void;     
}



function Book ({ book, addBook }: Props) {


  return (
   
    <section className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-lg md:shadow-lg">
        <img onClick= {() => addBook(book)} className="object-scale-down " src={book.cover} alt={book.title} />
    </section>
    
  )
}

export default Book
