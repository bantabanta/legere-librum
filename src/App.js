import "./App.css";
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './BooksAPI';

function App() {
  const [books, setBooks] = useState([]);

  // Load books from API on first DOM render
  // books dependency to follow books state
  useEffect(() => {
    const fetchBooks = async () => {
      setBooks(await BooksAPI.getAll());
    };
    fetchBooks();
  }, [books]);

  // Fn to update shelf of given book via API
  const updateShelf = (book, shelf) => {
    const setShelf = async () => {
      await BooksAPI.update(book, shelf);
    };
    setShelf();
  };

  return (
    <Routes>
      <Route
        exact path="/"
        element={<ListBooks
          onUpdateShelf={updateShelf}
          books={books} />}
      />
      <Route
        path="/search"
        element={<SearchBooks
          onUpdateShelf={updateShelf}
          books={books} />}
      />
    </Routes>
  )
};

export default App;
