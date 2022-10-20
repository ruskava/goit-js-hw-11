
import './css/styles.css';
import photoApiService from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    form: document.querySelector("#search-form"),
    searchBtnInput: document.querySelector("input"),
    gallery: document.querySelector(".gallery"),
    loadMore: document.querySelector(".load-more")
}

const PhotoApiService = new PhotoApiService();

refs.form.addEventListener("submit", onSearch);

function onSearch(e) { 
    e.preventDefault();

photoApiService.query = e.currentTarget.elements.searchQuery.value;
photoApiService.resetPage();
refs.gallery.innerHTML = "";
}


