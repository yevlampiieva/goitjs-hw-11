import Notiflix from 'notiflix';
import { getImages } from './imgApi';

const searchForm = document.querySelector('.search-form');
const imgGallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

searchForm.addEventListener('submit', searchImages);

function searchImages(evt) {
  evt.preventDefault();
  const { searchQuery } = evt.currentTarget.elements;
  console.log(searchQuery.value);
}

getImages()
  .then(data => console.log(data))
  .catch(error => console.log(error));

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
        <a href="${largeImageURL}" class="img-link"> < img src = "${webformatURL}" alt = "${tags}" loading = "lazy" data-source="${largeImageURL}" /></a>
        <div class="info">
            <p class="info-item">
                <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
                <b>Views ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads ${downloads}</b>
            </p>
        </div>
</div >`
    )
    .join('');
}
