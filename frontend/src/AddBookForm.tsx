import React, { useRef, useState } from "react"
import { Book } from "./BooksList"

type AddBookFormProps = {
  addBook: (book: Book) => void
}

const AddBookForm = ({ addBook }: AddBookFormProps) => {
  const [isDetailsFormShown, setIsDetailsFormShown] = useState(false)

  const formRef = useRef<any>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newBook: Book = {
      _id: "",
      title: formRef.current.title.value,
      author: {
        firstName: formRef.current.authorFirstName?.value,
        lastName: formRef.current.authorLastName.value,
      },
      readingStatus: formRef.current.readingStatus.value,
    }

    isDetailsFormShown &&
      Object.assign(newBook, {
        description: formRef.current.description?.value,
        publisher: {
          name: formRef.current.publisher?.value,
        },
        year: formRef.current.year?.value,
        pages: formRef.current.pages?.value,
        isbn: formRef.current.isbn?.value,
        category: formRef.current.category?.value,
        cover: formRef.current.cover?.value,
        rating: formRef.current.rating?.value,
      })

    const response = await fetch(
      "https://bookshelf-km-21fc3017c70c.herokuapp.com/api/books",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      },
    )

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
      <label htmlFor="readingStatus">Reading Status</label>
      <select name="readingStatus" id="readingStatus">
        <option value="Want to read">Not started</option>
        <option value="Reading">Reading</option>
        <option value="Finished">Finished</option>
      </select>
      <button
        type="button"
        onClick={() => setIsDetailsFormShown(!isDetailsFormShown)}
      >
        Add more details
      </button>
      {isDetailsFormShown && (
        <>
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
        </>
      )}
      <button type="submit">Add book</button>
    </form>
  )
}

export default AddBookForm
