import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface IBook {
  _id: string;
  title: string;
  author: string;
  exclusiveShelf: string;
  myRating?: number;
  publisher?: string;
  numberOfPages?: number;
  yearPublished?: number;
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

export function Book() {
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
        <button onClick={() => navigate("/")}>⬅</button>
        {book ? (
          <div className="relative mt-6 rounded bg-white px-5 py-4 shadow">
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {book.title}
            </h2>
            <p className="mb-5 text-lg italic text-gray-800">{book.author}</p>
            <div className="mb-3 grid grid-cols-1 gap-2 text-sm">
              {!!book.myRating && (
                <div>
                  <h3 className="font-semibold text-gray-800">Moja ocena</h3>
                  <p className="text-gray-500">{book.myRating}</p>
                </div>
              )}
              {!!book.publisher && (
                <div>
                  <h3 className="font-semibold text-gray-800">Wydawnictwo</h3>
                  <p className="text-gray-500">{book.publisher}</p>
                </div>
              )}
              {!!book.numberOfPages && (
                <div>
                  <h3 className="font-semibold text-gray-800">Liczba stron</h3>
                  <p className="text-gray-500">{book.numberOfPages}</p>
                </div>
              )}
              {!!book.yearPublished && (
                <div>
                  <h3 className="font-semibold text-gray-800">Rok wydania</h3>
                  <p className="text-gray-500">{book.yearPublished}</p>
                </div>
              )}
            </div>
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
                  Usuń książkę
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Czy na pewno chcesz usunąć książkę <b>{book?.title}</b>?
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleDeleteBook}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Tak
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Nie
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
