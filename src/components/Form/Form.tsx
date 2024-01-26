//write function which will return form to add new book based on book model
// write function which will handle form submit with controlled component

import { useState } from "react";

export function Form() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    pages: 0,
    status: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(book);
  };

  return (
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
        name="status"
        id="status"
        value={book.status}
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
  );
}
