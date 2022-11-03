import PhotoApiService from './js/fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

const photoApiService = new PhotoApiService();

refs.form.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onImageClick);
refs.loadBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  photoApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  photoApiService.resetPage();
  refs.gallery.innerHTML = '';
  // console.log(photoApiService.query);

  photoApiService
    .fetchPhotos()
    .then(data => {
      if (data.hits.length === 0) {
        refs.loadBtn.classList.add('is-hidden');
        Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      }
      if (photoApiService.query === '') {
        refs.loadBtn.classList.add('is-hidden');
        return Notify.warning(
          'Please, fill in the search field and try again.'
        );
      } else {
        data.hits.forEach(createGalleryMarkup);
        refs.loadBtn.classList.remove('is-hidden');
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        PageScrolling();
      }
    })
    .catch(error => console.log(error));
}

function onLoadMore(e) {
  e.preventDefault();
  photoApiService
    .fetchPhotos()
    .then(data => {
      if (data.hits.length === 0) {
        refs.loadBtn.classList.add('is-hidden');

        Notify.failure(
          `We're sorry, but you've reached the end of search results.`
        );
        return;
      }
      if (photoApiService.query === '') {
        return Notify.warning(
          'Please, fill in the search field and try again.'
        );
      } else {
        data.hits.forEach(element => {});
        createGalleryMarkup;
        onImageClick();
      }
    })
    .catch(error => console.log(error));
}

function createGalleryMarkup({
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const card = document.createElement('div');
  card.classList.add('photo-card');
  card.innerHTML = `<div class="img-container"><a class="gallery__item" href="${largeImageURL}"><img class="img" src="${largeImageURL}" alt="${tags}"  loading="lazy" /></a></div>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      ${downloads}
    </p>
  </div>`;
  refs.gallery.append(card);
}

function onImageClick(e) {
  e.preventDefault();

  let galleryCard = new SimpleLightbox('.img-container a', {
    captionDelay: 250,
  });
  galleryCard.refresh();
  refs.gallery.addEventListener('click', galleryCard);
}

function onImageClick(e) {
  e.preventDefault();
  let galleryCard = new SimpleLightbox('.img-container a', {
    captionDelay: 250,
    captions: true,
    captionsData: 'alt',
  });
  galleryCard.refresh();
  refs.gallery.addEventListener('click', galleryCard);
}
function PageScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
