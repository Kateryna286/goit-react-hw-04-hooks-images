import React from 'react';
import './Button.css';

function Button({ onClick }) {
  return (
    <button onClick={onClick} type="button" className="Button">
      Load more...
    </button>
  );
}

export default Button;
