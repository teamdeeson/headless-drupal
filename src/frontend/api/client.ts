import { Api } from './interface';

function callFunction<T>(name: string, ...args: unknown[]): Promise<T> {
  return fetch(`/api/function/${encodeURIComponent(name)}`, {
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(r => r.json());
}

const api: Api = {
  loadArrangement(eventId) {
    return callFunction('loadArrangement', eventId);
  },
  listArticles() {
    return callFunction('listArticles');
  },
  loadArticle(id, options) {
    return callFunction('loadArticle', id, options);
  },
};
export default api;
