import { useEffect, useState } from "react";

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
      <button
        className="mb-2 mr-2 bg-slate-200 px-4 py-2"
        onClick={getRandomBook}
      >
        Losuj książkę do przeczytania
      </button>
      {randomBook && (
        <>
          <div className="mb-4" key={randomBook._id}>
            <h2 className="text-lg font-bold">{randomBook.title}</h2>
            <p>{randomBook.author}</p>
          </div>
          <button
            className="mb-2 mr-2 bg-slate-200 px-4 py-2"
            onClick={startReading}
          >
            Zacznij czytać!
          </button>
          <button
            className="mb-2 mr-2 bg-slate-200 px-4 py-2"
            onClick={getRandomBook}
          >
            Losuj następną
          </button>
        </>
      )}
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
