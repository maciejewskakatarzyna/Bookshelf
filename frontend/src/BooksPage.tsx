import { useState } from "react"
import { Book } from "./BooksList"
import BooksList from "./BooksList"
import AddBookForm from "./AddBookForm"

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [isGetBooksVisible, setIsGetBooksVisible] = useState<boolean>(true)
  const [isAddBookFormVisible, setIsAddBookFormVisible] =
    useState<boolean>(false)

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:4000/api/books")
    const data = await response.json()
    return data.books as Book[]
  }

  const addBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook])
    setIsAddBookFormVisible(false)
  }

  const deleteBook = async (id: string) => {
    const bookToDelete = books.find((book) => book._id === id)

    const response = await fetch(`http://localhost:4000/api/books/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id))

      console.log(
        `Book titled "${bookToDelete?.title}" was deleted successfully.`,
      )
    }
  }

  const getBooks = async () => {
    const fetchedBooks = await fetchBooks()
    setBooks(fetchedBooks)
    setIsGetBooksVisible(false)
  }

  return (
    <>
      <BooksList
        books={books}
        deleteBook={deleteBook}
        getBooks={getBooks}
        getBooksBtnVisible={isGetBooksVisible}
      />
      {isAddBookFormVisible ? (
        <AddBookForm addBook={addBook} />
      ) : (
        <button onClick={() => setIsAddBookFormVisible(true)}>
          Add new book
        </button>
      )}
    </>
  )
}

export default BooksPage
