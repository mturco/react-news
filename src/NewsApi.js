const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = '78a90a669fa14bf2b023bd87f7623e0c';

function fetchEndpoint(endpoint, params = {}) {
  const qs = Object.keys(params)
    .map(key => {
      if (params[key] instanceof Array) {
        return `${key}=${params[key].join(',')}`;
      }
      return `${key}=${params[key]}`;
    })
    .join('&');
  return fetch(`${BASE_URL}/${endpoint}?apiKey=${API_KEY}&${qs}`);
}

export function getSources(params = {}) {
  return fetchEndpoint('sources', params);
}

export function getArticles(params = {}) {
  return fetchEndpoint('everything', params);
}

export function getTopArticles(params = {}) {
  return fetchEndpoint('top-headlines', params);
}
