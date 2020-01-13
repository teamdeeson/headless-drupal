import React from 'react';
import { JsonAPIEntity, JsonAPIDocument, ContentType, ImageMedia, ImageFile } from './api/interface';
// functions that take Drupal field data and convert it to pure react components

export function TextField({ value }: { value: { value: string; format: string; processed: string } }) {
  return <div dangerouslySetInnerHTML={{ __html: value.processed }}></div>;
}

export function EntityLink() {}

// TODO, I if we accepted and id and a type then we could use the type to assert that
// whatever comes back will have the same type. (i.e. if you give me type: "image", then I'll return something with {type: "image"})
// If the "includes" list is strongly typed then we can further assert the exact type from this. Magic.
export function find<T extends JsonAPIEntity>(id: string, included: JsonAPIEntity[]): T {
  return included.find(i => i.id === id) as T;
}

export function Media({ media, doc }: { media: ImageMedia; doc: JsonAPIDocument<ContentType> }) {
  const image = find<ImageFile>(media.relationships.imageFile.data.id, doc.included!);
  const imageUrl = 'http://localhost:8888/' + image.attributes.uri.url;

  return <img src={imageUrl} />;
}
