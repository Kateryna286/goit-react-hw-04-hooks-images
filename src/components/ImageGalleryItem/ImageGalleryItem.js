import './ImageGalleryItem.css';

export default function ImageGalleryItem({ bigImgSrc, src, alt }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={src}
        alt={alt}
        data-src={bigImgSrc}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
