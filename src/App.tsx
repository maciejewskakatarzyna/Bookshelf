import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./BookList";
import BookDetails from "./BookDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
