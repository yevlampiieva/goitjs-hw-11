const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36979931-b9ebd2c49fac6caefdf5e0dc3';

const options = {
  q: 'cat',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

function getImages() {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q='cat'&image_type='photo'&orientation='horizontal'&safesearch=true&page=1&per_page=40`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { getImages };
