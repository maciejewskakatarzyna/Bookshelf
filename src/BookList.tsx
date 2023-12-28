import { useEffect, useState } from "react";

interface IBook {
  _id: string;
  title: string;
  author: string;
}

function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentShelf, setCurrentShelf] = useState("");

  const fetchBooks = async (shelf: string = ""): Promise<void> => {
    try {
      const res = await fetch(
        `http://localhost:3000/books${shelf ? `/${shelf}` : ""}`,
      );
      const data = await res.json();
      setBooks(data);
      setCurrentShelf(shelf);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentShelf) {
      fetchBooks(currentShelf);
    }
  }, [currentShelf]);

  return (
    <div className="container p-10">
      <button
        className="mb-2 mr-2 bg-slate-200 px-4 py-2"
        onClick={() => fetchBooks()}
      >
        Wszystkie książki
      </button>
      <button
        className="mb-2 mr-2 bg-slate-200 px-4 py-2"
        onClick={() => fetchBooks("read")}
      >
        Przeczytane
      </button>
      <button
        className="mb-2 mr-2 bg-slate-200 px-4 py-2"
        onClick={() => fetchBooks("to-read")}
      >
        Do przeczytania
      </button>
      <button
        className="mb-2 mr-2 bg-slate-200 px-4 py-2"
        onClick={() => fetchBooks("currently-reading")}
      >
        Obecnie czytane
      </button>
      {books.map((book) => (
        <div className="mb-4" key={book._id}>
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}

export default BookList;
