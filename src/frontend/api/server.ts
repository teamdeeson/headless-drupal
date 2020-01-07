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
    return fetch('http://127.0.0.1:8888/api/tutorials')
      .then(r => r.json())
      .then(r => r.data);
  },
  loadArticle(id) {
    return fetch(`http://127.0.0.1:8888/api/tutorials/${encodeURIComponent(id)}`)
      .then(r => r.json())
      .then(r => r.data);
  },
};

export default api;
