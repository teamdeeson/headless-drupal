import React, { ReactElement } from 'react';
import './TextAndImage.css';

// TODO make a type defining components that can be used as paragraphs.
const TextAndImage = ({ text, image }: { text: ReactElement; image?: ReactElement }): ReactElement => {
  return (
    <div className="text-and-image">
      <div className="text-and-image__text">{text}</div>
      <div className="text-and-image__image">{image}</div>
    </div>
  );
};
export default TextAndImage;
