import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import './App.css';

const fetchImages = async ({
  querry = '',
  page = 1,
  key = '22564694-3177f5daba1f2572eee652a36',
} = {}) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${querry}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data;
};

export default function App() {
  const [querry, setQuerry] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [bigImgSrc, setBigImgSrc] = useState('');

  useEffect(() => {
    if (querry === '') {
      return;
    }

    setLoading(true);

    fetchImages({ querry, page })
      .then(response => {
        if (response.total === 0) {
          setStatus('rejected');
          setError(`Картинок по поиску '${querry}' не обнаружено`);
          setLoading(false);
        } else {
          setImages(prevImages => [...prevImages, ...response.hits]);
          setLoading(false);
          setStatus('resolved');

          if (response.total - 12 * page > 0) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        }
      })
      .then(page > 1 && smoothScroll);
  }, [querry, page]);

  const smoothScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const hundleButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const formSubmitHandler = data => {
    setQuerry(data);
    setPage(1);
    setImages([]);
  };

  function onClickGallery(event) {
    setBigImgSrc(event.target.dataset.src);
    toggleModal();
  }

  return (
    <div className="App">
      <Searchbar onSubmit={formSubmitHandler} />
      {status === 'idle' && <div>Начните поиск</div>}
      {status === 'rejected' && <div>{error}</div>}
      <ImageGallery querry={querry} onClick={onClickGallery} images={images} />
      {loading && <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
      {showButton && <Button onClick={hundleButtonClick} />}
      {showModal && <Modal onClose={toggleModal} src={bigImgSrc} />}
    </div>
  );
}

//my key 22564694-3177f5daba1f2572eee652a36;
