import cardHbs from "./templates/card.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import {PAGESEARCH,myApiRequest} from "./js/myfetch.js"
// console.log(cardHbs);

const el = some => document.querySelector(some) 

let page = 1;
let searchRequest = '';
let totalCardImg = 0;


// функція малювання сторінки
function renderPage(value) {
    const allImage = cardHbs({ value })
    el(".gallery").insertAdjacentHTML("beforeend", allImage);
}

// вішаємо подію на форму пошуку

el("#search-form").addEventListener("submit", searchWord);

// функція для пошуку по слову
function searchWord(e) {
    e.preventDefault();
    el(".gallery").innerHTML = "";
    page = 1
    searchRequest = e.currentTarget.searchQuery.value;
    myApiRequest(searchRequest, page).then(({ hits, totalHits }) => {
        totalCardImg = totalHits;
         if (hits < 1) {
             Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
            el(".load-more").style.visibility = "hidden";
             return
        }
        Notiflix.Notify.success(`totalHits ${totalHits}`);
        renderPage(hits);
        el(".load-more").style.visibility = "visible";
        new SimpleLightbox('.gallery a');
    }
    );
    
}

// вішаємо подію на кнопку пошуку
el(".load-more").addEventListener("click", addNewDate);

// функція додавання картинок по кліку
function addNewDate(e) {
    e.preventDefault();
    page += 1;
    totalCardImg -= PAGESEARCH;
    myApiRequest(searchRequest,page).then(({ hits, totalHits }) => {
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        if (totalCardImg < 1) {
            Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
            el(".load-more").style.visibility = "hidden";
            return
        }
        if (totalCardImg < PAGESEARCH) {
            renderPage(hits);
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            el(".load-more").style.visibility = "hidden";
            new SimpleLightbox('.gallery a');
            console.log(gallery);
        }
        renderPage(hits);
        new SimpleLightbox('.gallery a');
    }
    );
}
    