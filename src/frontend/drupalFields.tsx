import React from 'react';
// functions that take Drupal field data and convert it to pure react components

export function TextField({ value }: { value: { value: string; format: string; processed: string } }) {
  return <div dangerouslySetInnerHTML={{ __html: value.processed }}></div>;
}

export function EntityLink() {}

export function Media() {}
