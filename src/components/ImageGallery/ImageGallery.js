import React, { Component } from 'react';
import axios from 'axios';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from 'react-loader-spinner';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    id: null,
    showModal: false,
    error: null,
    showButton: false,
    loading: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyWord } = this.props;
    const { page } = this.state;

    if (prevProps.keyWord !== keyWord) {
      this.setState({
        images: null,
        page: 1,
        loading: true,
        status: 'pending',
      });
      axios
        .get(
          `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=22564694-3177f5daba1f2572eee652a36&image_type=photo&orientation=horizontal&per_page=12`,
        )
        .then(response => {
          if (response.data.total === 0) {
            this.setState({
              status: 'rejected',
              error: `Картинок по поиску '${keyWord}' не обнаружено`,
              loading: false,
              showButton: false,
            });
          } else {
            if (response.data.total > 12) {
              this.setState({
                images: [...response.data.hits],

                showButton: true,
                loading: false,
              });
            } else {
              this.setState({
                images: [...response.data.hits],

                showButton: false,
                loading: false,
              });
            }
          }
        });
    }

    if (
      prevState.page !== page &&
      page !== 1 &&
      prevProps.keyWord === keyWord
    ) {
      this.setState({
        loading: true,
      });
      axios
        .get(
          `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=22564694-3177f5daba1f2572eee652a36&image_type=photo&orientation=horizontal&per_page=12`,
        )
        .then(response =>
          this.setState({
            images: [...prevState.images, ...response.data.hits],

            loading: false,
          }),
        )
        .then(this.smoothScroll);
    }
  }

  smoothScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  hundleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  formSubmitHandler = id => {
    this.setState({ id });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getInfoById = () => {
    const { images, id } = this.state;

    if (images !== null) {
      const imgById = images.find(image => image.id === id);
      return imgById;
    }
  };

  render() {
    const imgById = this.getInfoById();
    const { images, showModal, status, showButton, error } = this.state;

    return (
      <div>
        {status === 'idle' && <div>Начните поиск</div>}
        {status === 'rejected' && <div>{error}</div>}
        {images && (
          <ul className="ImageGallery">
            {images.map(image => (
              <ImageGalleryItem
                src={image.webformatURL}
                alt={image.user}
                key={image.id}
                id={image.id}
                onClick={this.formSubmitHandler}
              />
            ))}
          </ul>
        )}
        {this.state.loading && (
          <Loader type="Oval" color="#00BFFF" height={80} width={80} />
        )}
        {showButton && <Button onClick={this.hundleButtonClick} />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            src={imgById.largeImageURL}
            alt={imgById.id}
          />
        )}
      </div>
    );
  }
}
