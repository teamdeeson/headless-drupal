import React from 'react';
import {JsonAPIEntity} from "./api/interface";
// functions that take Drupal field data and convert it to pure react components

export function TextField({ value }: { value: { value: string; format: string; processed: string } }) {
  return <div dangerouslySetInnerHTML={{ __html: value.processed }}></div>;
}

export function EntityLink() {}

export function find(id: string, included: JsonAPIEntity[]) {
  return included.find(i => i.id === id);
}

export function Media(data, included) {
  const media = find(data.relationships.image.data.id, included);
  const image = find(media.relationships.imageFile.data.id, included);
  const imageUrl = "http://localhost:8888/" + image.attributes.uri.url;

  return imageUrl;
}