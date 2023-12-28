import React from "react";
import ReactDOM from "react-dom/client";
import BookList from "./BookList";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BookList />
  </React.StrictMode>,
);
