import React, { useRef } from "react"
import { Book } from "./BooksList"

type AddBookFormProps = {
  addBook: (book: Book) => void
}

const AddBookForm = ({ addBook }: AddBookFormProps) => {
  const formRef = useRef<any>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newBook: Book = {
      _id: "",
      title: formRef.current.title.value,
      author: {
        firstName: formRef.current.authorFirstName.value,
        lastName: formRef.current.authorLastName.value,
      },
      description: formRef.current.description.value,
      publisher: {
        name: formRef.current.publisher.value,
      },
      year: formRef.current.year.value,
      pages: formRef.current.pages.value,
      isbn: formRef.current.isbn.value,
      category: formRef.current.category.value,
      cover: formRef.current.cover.value,
      rating: formRef.current.rating.value,
      readingStatus: formRef.current.readingStatus.value,
    }

    const response = await fetch("http://localhost:4000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })

    if (response.ok) {
      const responseBody = await response.json()
      console.log(
        responseBody.message ||
          `Book titled "${newBook.title}" was added successfully.`,
      )

      addBook(responseBody.book)

      if (formRef.current !== null) {
        formRef.current.reset()
      }
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="author">Author</label>
      <label htmlFor="authorFirstName">First name</label>
      <input type="text" name="authorFirstName" id="authorFirstName" />
      <label htmlFor="authorLastName">Last name</label>
      <input type="text" name="authorLastName" id="authorLastName" />
      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />
      <label htmlFor="publisher">Publisher</label>
      <input type="text" name="publisher" id="publisher" />
      <label htmlFor="year">Year</label>
      <input type="number" name="year" id="year" />
      <label htmlFor="pages">Pages</label>
      <input type="number" name="pages" id="pages" />
      <label htmlFor="isbn">ISBN</label>
      <input type="text" name="isbn" id="isbn" />
      <label htmlFor="category">Category</label>
      <input type="text" name="category" id="category" />
      <label htmlFor="cover">Cover</label>
      <input type="text" name="cover" id="cover" />
      <label htmlFor="rating">Rating</label>
      <input type="number" name="rating" id="rating" />
      <label htmlFor="readingStatus">Reading Status</label>
      <input type="text" name="readingStatus" id="readingStatus" />
      <button type="submit">Add book</button>
    </form>
  )
}

export default AddBookForm
