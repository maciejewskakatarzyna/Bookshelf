import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { Layout } from "../Layout/Layout";

interface IBook {
  _id: string;
  title: string;
  author: string;
}

export function List() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentShelf, setCurrentShelf] = useState("");
  const [randomBook, setRandomBook] = useState<IBook | null>(null);

  const fetchBooks = async (shelf: string = ""): Promise<void> => {
    try {
      let url = `http://localhost:3000/books`;
      if (shelf) {
        url += `?exclusiveShelf=${shelf}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
      setCurrentShelf(shelf);
      setRandomBook(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks(currentShelf);
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
    <Layout>
      <div className="container mx-auto p-10">
        <Button onClick={() => fetchBooks()}>Wszystkie książki</Button>
        <Button onClick={() => fetchBooks("read")}>Przeczytane</Button>
        <Button onClick={() => fetchBooks("to-read")}>Do przeczytania</Button>
        <Button onClick={() => fetchBooks("currently-reading")}>
          Teraz czytam
        </Button>
        <Button onClick={getRandomBook}>Losuj książkę do przeczytania</Button>
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
            <Button onClick={startReading}>Zacznij czytać!</Button>
            <Button onClick={getRandomBook}>Losuj następną</Button>
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
    </Layout>
  );
}
