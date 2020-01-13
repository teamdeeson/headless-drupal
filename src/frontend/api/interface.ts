export interface Api {
  getContentOrRedirectByUrl(path: string): Promise<JsonAPIDocument<ContentType>>;
  listArticles(): Promise<JsonAPIDocument<Article[]>>;
}

interface Content extends JsonAPIEntity {
  type: string;
  attributes: {
    isPublished: boolean;
    title: string;
    createdAt: string;
    updatedAt: string;
    path: string;
  };
}

export interface BasicPage extends Content {
  type: 'page';
}

export interface Tutorial extends Content {
  type: 'tutorials';
  attributes: Content['attributes'] & {
    link: DrupalLinkField;
    summary: string;
    topic: string;
  };
  relationships: {
    slices: {
      data: { type: string; id: string }[];
    };
  };
}

export interface Article extends Content {
  type: 'articles';
  relationships: {
    slices: {
      data: { type: string; id: string }[];
    };
  };
}

export type ContentType = BasicPage | Tutorial | Article;

export interface ImageAndText extends JsonAPIEntity {
  type: 'paragraph--image_text';
  attributes: {
    text: { value: string; format: string; processed: string };
  };
  relationships: {
    image: {
      data: { type: string; id: string };
      links: { self: { href: string } };
    };
  };
}

export type Paragrah = ImageAndText;

export interface DrupalLinkField {
  uri: string;
  title: string;
  options: [];
}

export interface ImageMedia extends JsonAPIEntity {
  type: 'images';
  attributes: {
    name: string;
  };
  relationships: {
    imageFile: {
      data: { type: string; id: string };
      links: { self: { href: string } };
    };
  };
}

export interface ImageFile extends JsonAPIEntity {
  type: 'files';
  attributes: {
    filename: string;
    uri: { value: string; url: string };
    mimetype: string;
    size: number;
  };
}

export interface JsonAPIEntity {
  type: string;
  id: string;
  links: { self: { href: string } };
  attributes: {};
  relationships: {};
}

export interface JsonAPIDocument<T = JsonAPIEntity> {
  jsonapi: { version: '1.0' };
  data: T;
  included?: JsonAPIEntity[];
  links: { self: { href: string } };
}

interface JsonApiRelationship {
  data: {
    type: string;
    id: string;
  };
  links: { self: { href: string } };
}

// thanks! https://github.com/mike-north/json-typescript/blob/master/index.ts
// type JsonApiPrimitive = string | number | boolean | null;
// type JsonApiValue = JsonApiPrimitive | JsonApiPrimitive[] | { [k: string]: JsonApiPrimitive };
