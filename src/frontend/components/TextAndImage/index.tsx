import React, { ReactElement } from 'react';
import { TextField, find, Media } from '../../drupalFields';
import './TextAndImage.css';

// TODO make a type defining components that can be used as paragraphs.
const TextAndImage = ({ text, image }): ReactElement => {
  return (
    <div className="text-and-image">
      <div className="text-and-image__text">
        {text}
      </div>
      <div className="text-and-image__image">
        <img src={image} />
      </div>
    </div>
  );
};
export default TextAndImage;

TextAndImage.fromDrupal = ({ data, included }) => {
  return <TextAndImage
      text={<TextField value={data.attributes.text} />}
      image={Media(data, included)}
  />;
};
