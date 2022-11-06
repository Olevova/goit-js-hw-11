import axios from 'axios';
import cardHbs from "./templates/card.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

// console.log(cardHbs);

const el = some => document.querySelector(some) 

const API_KEY = "31047925-06104412e98efcf2f7c7fbf45";
const SITE = 'https://pixabay.com/api/' 
const PAGESEARCH = 40;

let page = 1;
let searchRequest = '';
let totalCardImg = 0;

// функція пошуку та повернення результатів
async function myApiRequest(v) {
    const resFind = await axios.get(`${SITE}?key=${API_KEY}&q=${v}&photo&horizontal&safesearch=true&per_page=${PAGESEARCH}&page=${page}`)
    return resFind.data
}


// функція малювання сторінки
function renderPage(value) {
    const allImage = cardHbs({ value })
    el(".gallery").insertAdjacentHTML("beforeend", allImage);
}


el("#search-form").addEventListener("submit", searchWord);

function searchWord(e) {
    e.preventDefault();
    el(".gallery").innerHTML = "";
    page = 1
    searchRequest = e.currentTarget.searchQuery.value;
    // console.log(myApiRequest(searchRequest));
    myApiRequest(searchRequest).then(({ hits, totalHits }) => {
        totalCardImg = totalHits;
         if (hits < 1) {
             Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
             return
        }
        Notiflix.Notify.success(`totalHits ${totalHits}`);
        renderPage(hits);
        el(".load-more").style.visibility = "visible";
        let gallery = new SimpleLightbox('.gallery a');
        gallery.on('show.simplelightbox')

    }
    );
    
}

el(".load-more").addEventListener("click", addNewDate);

function addNewDate(e) {
    e.preventDefault();
    page += 1;
    totalCardImg -= PAGESEARCH;
    myApiRequest(searchRequest).then(({ hits, totalHits }) => {
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        if (totalCardImg < 1) {
            Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
            return
        }
        console.log(totalCardImg);
        if (totalCardImg < PAGESEARCH) {
            renderPage(hits);
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            el(".load-more").style.visibility = "hidden";
            let gallery = new SimpleLightbox('.gallery a');
            gallery.on('show.simplelightbox').refresh()
            console.log(gallery);
        }
        // Notiflix.Notify.success(`totalHits ${totalHits}`);
        renderPage(hits);
        let gallery = new SimpleLightbox('.gallery a');
        gallery.on('show.simplelightbox').refresh()

    }
    );
}
    