import axios from 'axios';
import cardHbs from "./templates/card.hbs";

// console.log(cardHbs);

const el = some => document.querySelector(some) 

const API_KEY = "31047925-06104412e98efcf2f7c7fbf45";
const SITE = 'https://pixabay.com/api/' 

// функція пошуку та повернення повернення результатів
async function myApiRequest(v) {
    // console.log(`${SITE}?key=${API_KEY}&q=${v}&photo&horizontal&safesearch=true`);
    const resFetch = await fetch(`${SITE}?key=${API_KEY}&q=${v}&photo&horizontal&safesearch=true`);
    const resFind = await resFetch.json();
    console.log(resFind);
    return resFind
}



// функція малювання сторінки
function renderPage(value) {
    // console.log(value);
    // const p = JSON.parse(v);
    // console.log(v);
    const t = cardHbs({value})
    el(".gallery").innerHTML = t;
}


el("#search-form").addEventListener("submit", searchWord);

function searchWord(e) {
    e.preventDefault();
    const searchRequest = e.currentTarget.searchQuery.value;
    console.log(searchRequest);
    myApiRequest(searchRequest).then(({ hits }) => { console.log(hits); renderPage(hits) });

    // myApiRequest().then(({value}) => renderPage(value));
}

// myApiRequest().then(({hits}) => renderPage(hits));
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
