import axios from 'axios';
import Notiflix from 'notiflix';

const loadMoreButton = document.querySelector('.load-more');

class ImgApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHitsResult = 0;
    this.totalPagesResult = 0;
    this.per_page = 40;
  }

  async getImages() {
    try {
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = '36979931-b9ebd2c49fac6caefdf5e0dc3';
      const image_type = 'photo';
      const orientation = 'horizontal';
      const safesearch = true;

      const resp = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${this.page}&per_page=${this.per_page}`
      );
      const result = resp.data;
      this.totalHitsResult = result.totalHits;
      this.totalPagesResult = Math.ceil(result.totalHits / this.per_page);
      this.page += 1;
      if (this.page > this.totalPagesResult) {
        // loadMoreButton.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results"
        );
      }
      return result.hits;
    } catch (err) {
      console.error(err);
    }
  }

  totalHits() {
    return this.totalHitsResult;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { ImgApi };
