import React from 'react';
import TextAndImage from './index';

export default {
  component: TextAndImage,
  title: 'Text and Image',
};

export const Default = () => {
  return <TextAndImage text={<p>Hello world</p>} />;
};

export const WithImage = () => {
  return (
    <TextAndImage
      text={<p>Hello world</p>}
      image={<img src="https://source.unsplash.com/random" alt="A random sample image" />}
    />
  );
};
