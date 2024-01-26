import { Link } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-start bg-gray-200">
      <header className="flex h-16 w-full items-center justify-between bg-white px-4">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link to="/">Bookshelf</Link>
        </h1>
        <nav>
          <ul className="flex items-center justify-center space-x-4">
            <li>
              <Link to="/" className="text-gray-800 hover:text-gray-600">
                Wszystkie książki
              </Link>
            </li>
            <li>
              <Link
                to="/add-book"
                className="text-gray-800 hover:text-gray-600"
              >
                Dodaj książkę
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex w-full flex-col items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
