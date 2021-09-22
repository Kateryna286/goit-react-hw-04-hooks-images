import './ImageGalleryItem.css';

export default function ImageGalleryItem({ onClick, id, src, alt }) {
  const getId = event => {
    const id = +event.currentTarget.id;
    onClick(id);
  };

  return (
    <li id={id} className="ImageGalleryItem" onClick={getId}>
      <img src={src} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
}
