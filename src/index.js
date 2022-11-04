import axios from 'axios';
import cardHbs from "./templates/card.hbs";
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';

// console.log(cardHbs);

const el = some => document.querySelector(some) 

const API_KEY = "31047925-06104412e98efcf2f7c7fbf45";
const SITE = 'https://pixabay.com/api/' 

let page = 1;

// функція пошуку та повернення результатів
async function myApiRequest(v) {
    const resFind = await axios.get(`${SITE}?key=${API_KEY}&q=${v}&photo&horizontal&safesearch=true&per_page=40&page=${page}`)
    return resFind.data
}


//     const resFetch = await fetch(`${SITE}?key=${API_KEY}&q=${v}&photo&horizontal&safesearch=true`);
//     const resFind = await resFetch.json();
//     console.log(resFind);
//     return resFind
// }



// функція малювання сторінки
function renderPage(value) {
    const allImage = cardHbs({value})
    el(".gallery").innerHTML = allImage;
}


el("#search-form").addEventListener("submit", searchWord);

function searchWord(e) {
    e.preventDefault();
    const searchRequest = e.currentTarget.searchQuery.value;
    // console.log(searchRequest);
    console.log(myApiRequest(searchRequest));
    myApiRequest(searchRequest).then(({ hits }) => {
         if (hits < 1) {
             Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
             return
    }
        return renderPage(hits)
    });
    
    // myApiRequest().then(({value}) => renderPage(value));
}

el(".gallery").addEventListener("click", onClickImgMakeGallery)

function onClickImgMakeGallery(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") {
        return
    }
    
    let gallery = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });
    gallery.on('show.simplelightbox')
}

