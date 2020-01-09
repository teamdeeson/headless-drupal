import React, { ReactElement } from 'react';
import { TextField } from '../../drupalFields';
import './TextAndImage.css';

// TODO make a type defining components that can be used as paragraphs.
const TextAndImage = ({ text, image }: any): ReactElement => {
  return (
    <div className="text-and-image">
      {text}
      <div>{image}</div>
    </div>
  );
};
export default TextAndImage;

TextAndImage.fromDrupal = ({ data, included }: any) => {
  return <TextAndImage text={<TextField value={data.attributes.text} />} />;
};
