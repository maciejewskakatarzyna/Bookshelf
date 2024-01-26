import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { List } from "./components/List/List";
import { Book } from "./components/Book/Book";
import { Form } from "./components/Form/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/add-book" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
