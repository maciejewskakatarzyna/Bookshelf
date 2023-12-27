import { useEffect, useState } from "react";

interface IBook {
  _id: string;
  title: string;
  author: string;
  // more fields based on schema
}

function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book._id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          {/* Display more information about the book here */}
        </div>
      ))}
    </div>
  );
}

export default BookList;
