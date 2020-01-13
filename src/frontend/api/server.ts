import fetch from 'node-fetch';
import { Api } from './interface';

// TODO Everything on here is publically accessible. Does this interface make that clear enough?
// Possibilities include DDOS, opening up private data.
// This could do with being a clearer opt-in.

const DEFAULT_INCLUDE = 'slices,slices.image,slices.image.imageFile';

const api: Api = {
  getContentOrRedirectByUrl(path, { include } = { include: DEFAULT_INCLUDE }) {
    return fetch(`http://127.0.0.1:8888/router/translate-path?path=${encodeURIComponent(path)}`)
      .then(r => {
        if (r.status === 200) return r.json();
        else return { error: 'something not found' };
      })
      .then(r => fetch(`${r.jsonapi.individual}?include=${encodeURIComponent(include)}`))
      .then(r => r.json());
  },
  listArticles() {
    return fetch('http://127.0.0.1:8888/api/articles').then(r => r.json());
  },
};

export default api;
