import { useState } from "react"
import { Book } from "./BooksList"
import BooksList from "./BooksList"
import AddBookForm from "./AddBookForm"

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([])

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:4000/api/books")
    const data = await response.json()
    return data.books as Book[]
  }

  const addBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook])
  }

  const deleteBook = async (id: string) => {
    const response = await fetch(`http://localhost:4000/api/books/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id))
    }
  }

  const handleGetBooksClick = async () => {
    const fetchedBooks = await fetchBooks()
    setBooks(fetchedBooks)
  }

  return (
    <>
      <button onClick={handleGetBooksClick}>Get books</button>
      <AddBookForm addBook={addBook} />
      <BooksList books={books} deleteBook={deleteBook} />
    </>
  )
}

export default BooksPage
