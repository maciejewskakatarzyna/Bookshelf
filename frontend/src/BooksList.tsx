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
}

const BooksList = ({ books, deleteBook }: BooksListProps) => {
  const [visibleBookId, setVisibleBookId] = useState<string | null>(null)

  return (
    <div>
      <ul>
        {books.length > 0 &&
          books.map((book) => (
            <li key={book._id}>
              <p>{book.title}</p>
              <button
                onClick={() =>
                  setVisibleBookId(visibleBookId === book._id ? null : book._id)
                }
              >
                {visibleBookId === book._id ? "Hide details" : "Show details"}
              </button>{" "}
              <button onClick={() => deleteBook(book._id)}>Delete</button>
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
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BooksList
