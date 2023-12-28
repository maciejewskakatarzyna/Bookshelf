import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

interface IBook {
  _id: string;
  title: string;
  author: string;
  exclusiveShelf: string;
}

interface IShelves {
  name: string;
  value: string;
}

const shelves: IShelves[] = [
  { name: "Przeczytana", value: "read" },
  { name: "Obecnie czytana", value: "currently-reading" },
  { name: "Chcę przeczytać", value: "to-read" },
];

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<IBook | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleShelfChange = async (shelf: string) => {
    if (book) {
      try {
        const response = await fetch(
          `http://localhost:3000/books/${book._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ shelf: shelf }),
          },
        );
        if (response.ok) {
          setBook({ ...book, exclusiveShelf: shelf });
        } else {
          console.error(`Failed to update shelf for book ${book._id}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
    setShowDropdown(false);
  };

  return (
    <div className="h-screen bg-gray-200">
      <div className="container mx-auto p-10">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ⬅
        </Link>
        {book ? (
          <div className="mt-6 rounded bg-white px-5 py-4 shadow">
            <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
            <p className="text-gray-700">{book.author}</p>
            <div className="mt-3 flex items-center">
              <span className="relative inline-block">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-500 hover:text-gray-600"
                >
                  🖋️
                </button>
                {showDropdown && (
                  <div className="absolute mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    {shelves.map((shelf) => (
                      <a
                        href="#!"
                        key={shelf.value}
                        onClick={(e) => {
                          e.preventDefault();
                          handleShelfChange(shelf.value);
                        }}
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                          book && book.exclusiveShelf === shelf.value
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {shelf.name}
                      </a>
                    ))}
                  </div>
                )}
              </span>
              <span className="ml-2 text-gray-700">
                {
                  shelves.find((shelf) => shelf.value === book.exclusiveShelf)
                    ?.name
                }
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded bg-white px-5 py-4 shadow">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
