export interface Api extends CallableApi {
  loadArrangement(eventId: string): Promise<Arrangement>;
  listArticles(): Promise<Tutorial[]>;
  loadArticle(id: string, options?: { include: string }): Promise<JsonAPIDocument<Tutorial>>;
}

// TODO I'm not really okay with this. I wanted a way to say that everything in the API had to be a function which returns a promise.
// In reality I've added too much flexbility to the API objects
interface CallableApi {
  [key: string]: ApiCallback;
}

export type ApiCallback = (...args: any[]) => Promise<any>;

export interface Arrangement {
  id: string;
}

export interface Tutorial extends JsonAPIEntity {
  attributes: {
    isPublished: boolean;
    title: string;
    createdAt: string;
    updatedAt: string;
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

export interface DrupalLinkField {
  uri: string;
  title: string;
  options: [];
}

export interface JsonAPIEntity {
  type: string;
  id: string;
  links: { self: { href: string } };
  attributes: {};
  relationships: {
    [k: string]: JsonApiRelationship;
  };
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
