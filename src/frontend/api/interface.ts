export interface Api {
  getContentOrRedirectByUrl(path: string): Promise<JsonAPIDocument<ContentType>>;
  listArticles(): Promise<JsonAPIDocument<Article[]>>;
}

export interface JsonAPIEntity {
  type: string;
  id: string;
  links: { self: { href: string } };
  attributes: {};
  relationships: {};
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
    slices: JsonApiRelationshipList<Paragrah['type']>;
  };
}

export interface Article extends Content {
  type: 'articles';
  relationships: {
    slices: JsonApiRelationshipList<Paragrah['type']>;
  };
}

export type ContentType = BasicPage | Tutorial | Article;

export interface ImageAndText extends JsonAPIEntity {
  type: 'paragraph--image_text';
  attributes: {
    text: { value: string; format: string; processed: string };
  };
  relationships: {
    image: JsonApiRelationship<'images'>;
  };
}

export interface Text extends JsonAPIEntity {
  type: 'paragraph--text';
}

export interface ImageMedia extends JsonAPIEntity {
  type: 'images';
  attributes: {
    name: string;
  };
  relationships: {
    imageFile: JsonApiRelationship<'files'>;
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

export type Paragrah = ImageAndText | Text;

export type AllEntities = {
  [k: string]: JsonAPIEntity;
  page: BasicPage;
  tutorials: Tutorial;
  articles: Article;
  'paragraph--image_text': ImageAndText;
  'paragraph--text': Text;
  images: ImageMedia;
  files: ImageFile;
};

export interface DrupalLinkField {
  uri: string;
  title: string;
  options: [];
}

export interface JsonAPIDocument<T extends JsonAPIEntity | JsonAPIEntity[], I extends AllEntities = AllEntities> {
  jsonapi: { version: '1.0' };
  data: T;
  included: I[Partial<keyof I>][];
  links: { self: { href: string } };
}

export interface JsonAPIEntityStub<T extends string = string> {
  type: T;
  id: string;
}

export interface JsonApiRelationship<T extends string = string> {
  data: JsonAPIEntityStub<T>;
  links: { self: { href: string } };
}

export interface JsonApiRelationshipList<T extends string = string> {
  data: JsonAPIEntityStub<T>[];
  links: { self: { href: string } };
}
