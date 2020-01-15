import React from 'react';

import { TextField, Media, find } from '../../drupalFields';
import { ImageAndText, JsonAPIDocument, ContentType } from '../../api/interface';

export default function drupalTextAndImage(data: ImageAndText, doc: JsonAPIDocument<ContentType>) {
  return {
    text: <TextField value={data.attributes.text} />,
    image: <Media media={find(data.relationships.image.data, doc.included)} doc={doc} />,
  };
}
