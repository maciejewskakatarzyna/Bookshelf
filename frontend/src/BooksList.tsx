import { useState } from "react"

export type Author = {
  firstName: string
  lastName: string
}

export type Publisher = {
  name: string
}

export type Book = {
  _id: string
  title: string
  author: Author
  description: string
  publisher: Publisher
  year: number
  pages: number
  isbn: string
  category: string
  cover: string
  rating?: number
  readingStatus?: string
}

type BooksListProps = {
  books: Book[]
  deleteBook: (id: string) => void
  getBooks: () => void
  getBooksBtnVisible: boolean
}

const BooksList = ({
  books,
  deleteBook,
  getBooks,
  getBooksBtnVisible,
}: BooksListProps) => {
  const [visibleBookId, setVisibleBookId] = useState<string | null>(null)

  return (
    <div>
      <button
        style={{ display: getBooksBtnVisible ? "block" : "none" }}
        onClick={getBooks}
      >
        Get books
      </button>

      <ul>
        {books.length > 0 &&
          books.map((book) => (
            <li key={book._id}>
              <div>
                <p
                  onClick={() =>
                    setVisibleBookId(
                      visibleBookId === book._id ? null : book._id,
                    )
                  }
                  className="title"
                >
                  {book.title}
                </p>
                {visibleBookId === book._id && (
                  <>
                    <p>
                      {book.author?.firstName} {book.author?.lastName}
                    </p>
                    <p>{book.description}</p>
                    <p>{book.publisher?.name}</p>
                    <p>{book.year}</p>
                    <p>{book.pages}</p>
                    <p>{book.isbn}</p>
                    <p>{book.category}</p>
                    <p>{book.cover}</p>
                    <p>{book.rating}</p>
                    <p>{book.readingStatus}</p>
                  </>
                )}
              </div>
              <button onClick={() => deleteBook(book._id)}>X</button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BooksList
