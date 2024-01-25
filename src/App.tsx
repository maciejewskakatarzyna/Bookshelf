import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { List } from "./components/List/List";
import { Book } from "./components/Book/Book";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/book/:id" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
