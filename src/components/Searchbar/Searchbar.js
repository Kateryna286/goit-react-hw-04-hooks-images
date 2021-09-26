import React, { useState } from 'react';
import './Searchbar.css';

export default function Searchbar({ onSubmit }) {
  const [querry, setQuerry] = useState('');

  const handleChange = event => {
    setQuerry(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (querry.trim() === '') {
      alert('Введите ключевое слово');
      return;
    }

    onSubmit(querry);
    resetForm();
  };

  const resetForm = () => {
    setQuerry('');
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
            value={querry}
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
}
