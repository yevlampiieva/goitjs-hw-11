import Notiflix from 'notiflix';
import { ImgApi } from './imgApi';

const searchForm = document.querySelector('.search-form');
const imgGallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

loadMoreButton.style.display = 'none';

const imgApi = new ImgApi();

searchForm.addEventListener('submit', searchImages);
loadMoreButton.addEventListener('click', loadMoreImg);

function searchImages(evt) {
  evt.preventDefault();
  loadMoreButton.style.display = 'none';
  imgGallery.innerHTML = '';
  const { searchQuery } = evt.currentTarget.elements;
  //   console.log(searchQuery.value);
  imgApi.query = searchQuery.value;
  if (imgApi.query.trim() === '') {
    loadMoreButton.style.display = 'none';
    return Notiflix.Notify.info('You need to enter certain data');
  }

  imgApi.resetPage();

  loadMoreButton.style.display = 'none';

  imgApi.getImages().then(hits => {
    imgGallery.innerHTML = '';
    addmarkupImageGallery(hits);
    const totalHits = imgApi.totalHits();
    if (imgApi.totalHits() < imgApi.per_page) {
      loadMoreButton.style.display = 'none';
    } else if (imgApi.totalHits() > 0) {
      loadMoreButton.style.display = 'block';

      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
  });
}

function loadMoreImg() {
  loadMoreButton.style.display = 'none';
  imgApi.getImages().then(hits => {
    addmarkupImageGallery(hits);
    const totalHits = imgApi.totalHits();
    if (imgApi.totalHits() < imgApi.per_page) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  });
}

function addmarkupImageGallery(hits) {
  imgGallery.insertAdjacentHTML('beforeend', markupImageGallery(hits));
  if (hits.length === 0) {
    loadMoreButton.style.display = 'none';
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function markupImageGallery(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <img class="image" src = "${webformatURL}" alt = "${tags}" loading = "lazy" width="250"/>
      <div class="info">
            <p class="info-item">
                <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
                <b>Views: ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads: ${downloads}</b>
            </p>
        </div>
</div >`
    )
    .join('');
}
