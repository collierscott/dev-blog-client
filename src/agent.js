import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'http://localhost:8000/api';
// This will get just the body of the response
const responseBody = response => response.body;
let token = null;

const tokenPlugin = secured => {
    return (request) => {
      if(token && secured) {
        request.set('Authorization', `Bearer ${token}`);
      }
    };
};

export const requests = {
  get: (url, secured = false) => {
    console.log('get: ' + token);
    return superagent.get(`${API_ROOT}${url}`)
      .use(tokenPlugin(secured))
      .then(responseBody);
  },
  post: (url, body = null, secured = true) => {
    console.log('post: ' + token);
    return superagent.post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin(secured))
      .then(responseBody);
  },
  setToken: (newJwtToken) => token = newJwtToken
};