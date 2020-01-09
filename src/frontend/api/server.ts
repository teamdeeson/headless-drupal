import fetch from 'node-fetch';
import { Api } from './interface';

// TODO Everything on here is publically accessible. Does this interface make that clear enough?
// Possibilities include DDOS, opening up private data.
// This could do with being a clearer opt-in.

const api: Api = {
  getContentOrRedirectByUrl(path) {
    return fetch(`http://127.0.0.1:8888/router/translate-path?path=${encodeURIComponent(path)}`)
      .then(r => {
        if (r.status === 200) return r.json();
        else return { error: 'something not found' };
      })
      .then(r => fetch(r.jsonapi.individual))
      .then(r => r.json());
  },

  listContent() {
    return fetch('http://127.0.0.1:8888/api/pages').then(r => r.json());
  },
  // TODO Rename content to slices
  loadContent(id, opts = { include: 'slices,slices.image,slices.image.imageFile' }) {
    const { include } = opts;
    return fetch(
      `http://127.0.0.1:8888/api/pages/${encodeURIComponent(id)}?include=${encodeURIComponent(include)}`
    ).then(r => r.json());
  },
};

export default api;
