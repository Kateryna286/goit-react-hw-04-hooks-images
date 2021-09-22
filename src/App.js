import React, { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import './App.css';

export default function App() {
  const [keyWord, setKeyWord] = useState('');

  const formSubmitHandler = data => {
    setKeyWord(data);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery keyWord={keyWord} />
    </div>
  );
}

//my key 22564694-3177f5daba1f2572eee652a36;
