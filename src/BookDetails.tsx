import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleDeleteBook = async () => {
    if (book) {
      try {
        const response = await fetch(
          `http://localhost:3000/books/${book._id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          navigate("/");
        } else {
          console.error(`Failed to delete book ${book._id}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="h-screen bg-gray-200">
      <div className="container mx-auto p-10">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ⬅
        </Link>
        {book ? (
          <div className="relative mt-6 rounded bg-white px-5 py-4 shadow">
            <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
            <p className="text-gray-700">{book.author}</p>
            <div className="mt-3 flex items-center">
              <span className="relative inline-block">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-500 hover:text-gray-600"
                >
                  📚
                </button>
                {showDropdown && (
                  <div className="absolute mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    {shelves.map((shelf) => (
                      <span
                        key={shelf.value}
                        onClick={() => {
                          handleShelfChange(shelf.value);
                        }}
                        className={`block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                          book && book.exclusiveShelf === shelf.value
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {shelf.name}
                      </span>
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
            <button
              className="absolute bottom-4 right-4 mt-3 rounded"
              onClick={openModal}
            >
              🗑️
            </button>
          </div>
        ) : (
          <div className="rounded bg-white px-5 py-4 shadow">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="message-title"
              onClick={stopPropagation}
              className="inline-block transform rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:w-full sm:max-w-lg sm:align-middle"
            >
              <div className="text-left">
                <h3
                  className="text-lg font-medium text-gray-900"
                  id="message-title"
                >
                  Delete Book
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this book?
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleDeleteBook}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
