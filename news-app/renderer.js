const { ipcRenderer } = require('electron');
const $ = require('jquery');

const API_KEY = process.env.APIKEY;
const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
let articles = [];

function init(){
    loadData();
    createArticlesList();
    $(".nav-group-item").on("click", handleClick);
}

const loadData = async () => {
    try {
      const res = await fetch(URL);
      resJSON = await res.json();
      articles = resJSON.articles;
      console.log(articles);
    } catch {
      console.error('Failed');
    }
}  

const createArticlesList = () => {
    articles.map((article) => {
        $('.containerArticles').append(
            `<li class="list-group-item">
                <img class="media-object pull-left" src=${article.urlToImage}>
                <a href=${article.url}>${article.title}</a>
                <p> author:${article.author}</p>
                <p>${article.publishedAt}.toLocaleDateString()</p>
                <p>${article.description}</p>
            </li>`
        );
    })    
    $('img').css({'height': '6rem', 'width': '8rem'})
}

const handleClick = (event) => {
    $( ".nav-group-item" ).removeClass( "active" );
    $(event.target).addClass( "active" );
}

init();