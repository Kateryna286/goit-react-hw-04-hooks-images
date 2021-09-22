import React, { useState } from 'react';
import './Searchbar.css';

export default function Searchbar({ onSubmit }) {
  const [keyWord, setKeyWord] = useState('');

  const handleChange = event => {
    setKeyWord(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (keyWord.trim() === '') {
      alert('Введите ключевое слово');
      return;
    }

    onSubmit(keyWord);
    resetForm();
  };

  const resetForm = () => {
    setKeyWord('');
  };

  return (
    <>
      <header className="Searchbar">
        <form onSubmit={handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="keyWord"
            value={keyWord}
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
}
