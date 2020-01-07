import { Api } from './interface';

function callFunction(name: string, ...args: unknown[]) {
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
  loadArticle(id) {
    return callFunction('loadArticle', id);
  },
};
export default api;
