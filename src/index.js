import axios from 'axios';
import cardHbs from "./templates/card.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

// console.log(cardHbs);

const el = some => document.querySelector(some) 

const API_KEY = "31047925-06104412e98efcf2f7c7fbf45";
const SITE = 'https://pixabay.com/api/' 

let page = 1;
let searchRequest = '';

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
    const allImage = cardHbs({ value })
    console.log(allImage);
    el(".gallery").insertAdjacentHTML("beforeend", allImage);
    el(".load-more").style.visibility = "visible";
}


el("#search-form").addEventListener("submit", searchWord);

function searchWord(e) {
    e.preventDefault();
    el(".gallery").innerHTML = "";
    page = 1
    searchRequest = e.currentTarget.searchQuery.value;
    // console.log(searchRequest);
    console.log(myApiRequest(searchRequest));
    myApiRequest(searchRequest).then(({ hits,totalHits }) => {
         if (hits < 1) {
             Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
             return
        }
        Notiflix.Notify.success(`totalHits ${totalHits}`);
        renderPage(hits);
        let gallery = new SimpleLightbox('.gallery a');
        gallery.on('show.simplelightbox')

    }
    );
    
}

el(".load-more").addEventListener("click", addNewDate);

function addNewDate(e) {
    e.preventDefault();
    page += 1;

    // const searchRequest = e.currentTarget.searchQuery.value;
    // console.log(searchRequest);
    console.log(myApiRequest(searchRequest));
    myApiRequest(searchRequest).then(({ hits, totalHits }) => {
        if (hits < 1) {
            Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
            return
        }
        const lessImage = totalHits - 40;
        if (lessImage < 40) {
            renderPage(hits);
            el(".load-more").style.visibility = "invisible";
            let gallery = new SimpleLightbox('.gallery a');
            gallery.on('show.simplelightbox').refresh()

        }
        // Notiflix.Notify.success(`totalHits ${totalHits}`);
        renderPage(hits);
        let gallery = new SimpleLightbox('.gallery a');
        gallery.on('show.simplelightbox').refresh()

    }
    );
}
    