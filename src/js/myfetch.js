import axios from 'axios';

export const PAGESEARCH = 40;

const API_KEY = "31047925-06104412e98efcf2f7c7fbf45";
const SITE = 'https://pixabay.com/api/';

// функція пошуку та повернення результатів
export async function myApiRequest(v,page) {
    const resFind = await axios.get(`${SITE}?key=${API_KEY}&q=${v}&photo&horizontal&safesearch=true&per_page=${PAGESEARCH}&page=${page}`)
    return resFind.data
}