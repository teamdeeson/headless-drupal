import React, { ReactElement } from 'react';
import { TextField } from '../../drupalFields';
import './TextAndImage.css';

export default { title: 'Text and Image' };

export const TextAndImage = ({ text, image }): ReactElement => {
  return (
    <div className="text-and-image">
      {text}
      <div>{image}</div>
    </div>
  );
};
