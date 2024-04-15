import React, { useState, useEffect } from 'react';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleAddBook = () => {
    if (editIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = { title, author };
      setBooks(updatedBooks);
      setTitle('');
      setAuthor('');
      setEditIndex(null);
    } else {
      const newBook = { title, author };
      setBooks([...books, newBook]);
      setTitle('');
      setAuthor('');
    }
  };

  const handleEditBook = (index) => {
    const bookToEdit = books[index];
    setTitle(bookToEdit.title);
    setAuthor(bookToEdit.author);
    setEditIndex(index);
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  return (
    <div>
      <h1>Book CRUD</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <br/>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={handleAuthorChange}
        />
        <br/>
        <button onClick={handleAddBook} className="add-btn">
          {editIndex !== null ? 'Update Book' : 'Add Book'}
        </button>
      </div>

      <ul>
        {books.map((book, index) => (
          <li key={index} className="book-item">
            <span>{book.title} - </span>
            <span>{book.author}</span>
            <button onClick={() => handleEditBook(index)} className="edit-button">
              Edit
            </button>
            <button onClick={() => handleDeleteBook(index)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
