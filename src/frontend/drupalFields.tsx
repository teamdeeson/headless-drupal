import React from 'react';
import { JsonAPIDocument, ContentType, ImageMedia, AllEntities, JsonAPIEntityStub } from './api/interface';

export function find<T extends AllEntities, K extends keyof T & string>(
  stub: JsonAPIEntityStub<K>,
  included: T[keyof T][]
): T[K] {
  return included.find(i => i.id === stub.id && i.type === stub.type) as T[K];
}

export function TextField({ value }: { value: { value: string; format: string; processed: string } }) {
  return <div dangerouslySetInnerHTML={{ __html: value.processed }}></div>;
}

export function EntityLink() {}

export function Media({ media, doc }: { media: ImageMedia; doc: JsonAPIDocument<ContentType> }) {
  const image = find(media.relationships.imageFile.data, doc.included);
  const imageUrl = 'http://localhost:8888/' + image.attributes.uri.url;

  return <img src={imageUrl} />;
}
