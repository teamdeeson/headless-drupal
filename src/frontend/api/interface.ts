export interface Api extends CallableApi {
  loadArrangement(eventId: string): Promise<Arrangement>;
  listArticles(): Promise<Article[]>;
  loadArticle(id: string): Promise<Article>;
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

export interface Article {
  id: string;
  attributes: {
    title: string;
    summary: string;
  };
}
