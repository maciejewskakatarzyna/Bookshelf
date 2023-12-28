import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IBook {
  _id: string;
  title: string;
  author: string;
}

function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentShelf, setCurrentShelf] = useState("");
  const [randomBook, setRandomBook] = useState<IBook | null>(null);

  const fetchBooks = async (shelf: string = ""): Promise<void> => {
    try {
      const res = await fetch(
        `http://localhost:3000/books${shelf ? `/${shelf}` : ""}`,
      );
      const data = await res.json();
      setBooks(data);
      setCurrentShelf(shelf);
      setRandomBook(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentShelf) {
      fetchBooks(currentShelf);
    }
  }, [currentShelf]);

  const getRandomBook = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:3000/books/random");
      const randomBook: IBook = await res.json();
      setRandomBook(randomBook);
      setBooks([]);
    } catch (err) {
      console.error(err);
    }
  };

  const startReading = async () => {
    if (randomBook) {
      try {
        await fetch(`http://localhost:3000/books/${randomBook._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shelf: "currently-reading" }),
        });
        setRandomBook(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="h-full min-h-screen bg-gray-200">
      <div className="container mx-auto p-10">
        <button
          className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => fetchBooks()}
        >
          Wszystkie książki
        </button>
        <button
          className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => fetchBooks("read")}
        >
          Przeczytane
        </button>
        <button
          className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => fetchBooks("to-read")}
        >
          Do przeczytania
        </button>
        <button
          className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={getRandomBook}
        >
          Losuj książkę do przeczytania
        </button>
        {randomBook && (
          <>
            <div
              className="mb-4 rounded bg-white px-5 py-4 shadow"
              key={randomBook._id}
            >
              <Link
                to={`/book/${randomBook._id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                <h2 className="text-lg font-bold text-gray-800">
                  {randomBook.title}
                </h2>
              </Link>
              <p className="text-gray-700">{randomBook.author}</p>
            </div>
            <button
              className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              onClick={startReading}
            >
              Zacznij czytać!
            </button>
            <button
              className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              onClick={getRandomBook}
            >
              Losuj następną
            </button>
          </>
        )}
        {books.map((book) => (
          <div
            className="mb-4 rounded bg-white px-5 py-4 shadow"
            key={book._id}
          >
            <Link
              to={`/book/${book._id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
            </Link>
            <p className="text-gray-700">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
