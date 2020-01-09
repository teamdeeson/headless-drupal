import fetch from 'node-fetch';
import { Api } from './interface';

// TODO Everything on here is publically accessible. Does this interface make that clear enough?
// Possibilities include DDOS, opening up private data.
// This could do with being a clearer opt-in.

const api: Api = {
  loadArrangement: eventId => {
    return Promise.resolve({ id: `server ${eventId}` });
  },
  listArticles() {
    return fetch('http://127.0.0.1:8888/api/tutorials').then(r => r.json());
  },
  loadArticle(id, opts = { include: 'slices,slices.image,slices.image.imageFile,slices.content' }) {
    const { include } = opts;
    return fetch(
      `http://127.0.0.1:8888/api/tutorials/${encodeURIComponent(id)}?include=${encodeURIComponent(include)}`
    ).then(r => r.json());
  },
};

export default api;
