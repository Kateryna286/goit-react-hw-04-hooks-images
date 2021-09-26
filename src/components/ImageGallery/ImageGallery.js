import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onClick }) {
  return (
    <>
      {images && (
        <ul className="ImageGallery" onClick={onClick}>
          {images.map(({ webformatURL, user, id, largeImageURL }) => (
            <ImageGalleryItem
              src={webformatURL}
              alt={user}
              key={id}
              bigImgSrc={largeImageURL}
            />
          ))}
        </ul>
      )}
    </>
  );
}
