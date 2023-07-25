import { useEffect, useState } from "react"

type Author = {
  _id: string
  firstName: string
  lastName: string
}

type Publisher = {
  _id: string
  name: string
}

type Book = {
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

const BooksList = () => {
  const [books, setBooks] = useState<Book[]>([])

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:4000/api/books")
    const data = await response.json()
    return data.books as Book[]
  }

  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data)
    })
  }, [])

  return (
    <div>
      <ul>
        {books.length > 0 &&
          books.map((book) => (
            <li key={book._id}>
              {book.title}
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
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BooksList
