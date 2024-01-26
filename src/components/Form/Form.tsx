import { FormEvent, useState } from "react";
import { Layout } from "../Layout/Layout";

export function Form() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    pages: 0,
    exclusiveShelf: "",
    bookId: "",
    isbn: "",
    isbn13: "",
    myRating: 0,
    averageRating: 0,
    publisher: "",
    numberOfPages: 0,
    yearPublished: 0,
    originalPublicationYear: 0,
    dateRead: null,
    dateAdded: new Date(), // assuming the book is added at the current date
    bookshelves: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const addBook = async () => {
      try {
        const res = await fetch("http://localhost:3000/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
        } else {
          console.log("Response failed:", res.status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    addBook();
    console.log(book);
  };

  return (
    <Layout>
      <form className="m-10 flex flex-col items-start" onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł</label>
        <input
          className="border border-black"
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleInputChange}
        />
        <label htmlFor="author">Autor</label>
        <input
          className="border border-black"
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleInputChange}
        />
        <label htmlFor="pages">Liczba stron</label>
        <input
          className="border border-black"
          type="number"
          id="pages"
          name="pages"
          value={book.pages}
          onChange={handleInputChange}
        />
        <label htmlFor="status">Status</label>
        <select
          className="border border-black"
          name="exclusiveShelf"
          id="exclusiveShelf"
          value={book.exclusiveShelf}
          onChange={handleInputChange}
        >
          <option value="read">Przeczytane</option>
          <option value="to-read">Do przeczytania</option>
          <option value="currently-reading">Teraz czytam</option>
        </select>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          type="submit"
        >
          Dodaj
        </button>
      </form>
    </Layout>
  );
}
