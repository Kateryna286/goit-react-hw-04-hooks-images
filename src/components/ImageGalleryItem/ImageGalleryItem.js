import React, { Component } from 'react';
import './ImageGalleryItem.css';

class ImageGalleryItem extends Component {
  getId = event => {
    const id = +event.currentTarget.id;
    this.props.onClick(id);
  };

  render() {
    const { id, src, alt } = this.props;
    return (
      <li id={id} className="ImageGalleryItem" onClick={this.getId}>
        <img src={src} alt={alt} className="ImageGalleryItem-image" />
      </li>
    );
  }
}

export default ImageGalleryItem;
