import React, { ReactElement } from 'react';
import { TextField } from '../../drupalFields';
import './TextAndImage.css';

// TODO make a type defining components that can be used as paragraphs.
const TextAndImage = ({ text, image }): ReactElement => {
  return (
    <div className="text-and-image">
      {text}
      <div>
        <img src={image} />
      </div>
    </div>
  );
};
export default TextAndImage;

TextAndImage.fromDrupal = ({ data, included }) => {
  // console.log("data", data);
  // console.log("included", included);
  // console.log(included[2].attributes.uri.url);
  const imageUrl = `http://localhost:8888${included[2].attributes.uri.url}`;
  return <TextAndImage
      text={<TextField value={data.attributes.text} />}
      image={imageUrl}
  />;
};
