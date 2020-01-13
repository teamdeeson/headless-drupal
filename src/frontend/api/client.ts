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
  getContentOrRedirectByUrl(path) {
    return callFunction('getContentOrRedirectByUrl', path);
  },
  listArticles() {
    return callFunction('listArticles');
  },
};
export default api;
