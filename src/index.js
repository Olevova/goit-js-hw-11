import axios from 'axios';
import cardHbs from "./templates/card.hbs";

console.log(cardHbs);

const el = some => document.querySelector(some) 

const API_KEY = "31047925-06104412e98efcf2f7c7fbf45";
const SITE = 'https://pixabay.com/api/' 

function myApiRequest() {
    return fetch(`${SITE}?key=${API_KEY}&q=cat&photo&horizontal&safesearch=true`).then(r => r.json())
}
myApiRequest().then(({hits}) => tolik(hits));

function tolik(v) {
    console.log(v);
    // const p = JSON.parse(v);
    console.log(v);
    const t = cardHbs({v})
    el(".gallery").innerHTML = t;
}

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
