import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface IBook {
  _id: string;
  title: string;
  author: string;
}

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/${id}`);
        const book: IBook = await res.json();
        setBook(book);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div className="container p-10">
      {book ? (
        <>
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p>{book.author}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetails;
