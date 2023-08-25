import { useState } from "react"
import { Book } from "./BooksList"

type AddBookFormProps = {
  addBook: (book: Book) => void
}

const AddBookForm = ({ addBook }: AddBookFormProps) => {
  const [book, setBook] = useState<Book>({
    _id: "",
    title: "",
    author: {
      firstName: "",
      lastName: "",
    },
    description: "",
    publisher: {
      name: "",
    },
    year: 0,
    pages: 0,
    isbn: "",
    category: "",
    cover: "",
    rating: 0,
    readingStatus: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "authorFirstName" || name === "authorLastName") {
      setBook((prevState) => ({
        ...prevState,
        author: {
          ...prevState.author,
          [name === "authorFirstName" ? "firstName" : "lastName"]: value,
        },
      }))
    } else if (name === "publisher") {
      setBook((prevState) => ({
        ...prevState,
        publisher: {
          ...prevState.publisher,
          name: value,
        },
      }))
    } else {
      setBook((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch("http://localhost:4000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })

    if (response.ok) {
      const responseBody = await response.json()
      console.log(
        responseBody.message ||
          `Book titled "${book.title}" was added successfully.`,
      )

      addBook(responseBody.book)

      setBook({
        _id: "",
        title: "",
        author: {
          firstName: "",
          lastName: "",
        },
        description: "",
        publisher: {
          name: "",
        },
        year: 0,
        pages: 0,
        isbn: "",
        category: "",
        cover: "",
        rating: 0,
        readingStatus: "",
      })
    } else {
      console.log(`Error with creating: ${response.status}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new book</h2>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={book.title}
        onChange={handleInputChange}
      />
      <label htmlFor="author">Author</label>
      <input
        type="text"
        name="authorFirstName"
        id="authorFirstName"
        value={book.author.firstName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="authorLastName"
        id="authorLastName"
        value={book.author.lastName}
        onChange={handleInputChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={book.description}
        onChange={handleInputChange}
      />
      <label htmlFor="publisher">Publisher</label>
      <input
        type="text"
        name="publisher"
        id="publisher"
        value={book.publisher.name}
        onChange={handleInputChange}
      />
      <label htmlFor="year">Year</label>
      <input
        type="number"
        name="year"
        id="year"
        value={book.year}
        onChange={handleInputChange}
      />
      <label htmlFor="pages">Pages</label>
      <input
        type="number"
        name="pages"
        id="pages"
        value={book.pages}
        onChange={handleInputChange}
      />
      <label htmlFor="isbn">ISBN</label>
      <input
        type="text"
        name="isbn"
        id="isbn"
        value={book.isbn}
        onChange={handleInputChange}
      />
      <label htmlFor="category">Category</label>
      <input
        type="text"
        name="category"
        id="category"
        value={book.category}
        onChange={handleInputChange}
      />
      <label htmlFor="cover">Cover</label>
      <input
        type="text"
        name="cover"
        id="cover"
        value={book.cover}
        onChange={handleInputChange}
      />
      <label htmlFor="rating">Rating</label>
      <input
        type="number"
        name="rating"
        id="rating"
        value={book.rating}
        onChange={handleInputChange}
      />
      <label htmlFor="readingStatus">Reading Status</label>
      <input
        type="text"
        name="readingStatus"
        id="readingStatus"
        value={book.readingStatus}
        onChange={handleInputChange}
      />
      <button type="submit">Add book</button>
    </form>
  )
}

export default AddBookForm
