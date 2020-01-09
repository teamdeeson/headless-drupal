import React, { ReactElement } from 'react';
import './TextAndImage.css';

export default { title: 'Text and Image' };

export const TextAndImage = ({ text, image }): ReactElement => {
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
