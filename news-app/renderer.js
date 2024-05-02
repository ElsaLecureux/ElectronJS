const moment = require('moment');
const $ = require('jquery');

const API_KEY = process.env.APIKEY;
const dateFormat = 'MM-DD-YYYY'; 
const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const imgDefaultUrl= `https://img.freepik.com/photos-gratuite/illustration-rendu-3d-blocs-lettres-formant-mot-news-fond-blanc_181624-60840.jpg?t=st=1714659372~exp=1714662972~hmac=316e8c3ef6a0381e078456debd0ec4087d0669d04e2d689a09477e3955f8fbf3&w=1380`;

let articles = [];

  

function init(){
    loadData();
    $('.nav-group').css({"position": "sticky", "top": 0});
    $(".nav-group-item").on("click", handleClick);
}

const loadData = async () => {
    try {
      const res = await fetch(URL);
      resJSON = await res.json();
      articles = [...articles, ...resJSON.articles];
      console.log(articles);
    } catch {
      console.error('Failed');
    }
    createArticlesList();
}  

const createArticlesList = () => {
    console.log('inside createArticlesList');
    articles.map((article) => {
        console.log(article);
        article = {
            ...article,
            title: article.title || "no title",
            author: article.author  || "unknown",
            publishedAt: article.publishedAt || "unknown",
            urlToImage : article.urlToImage || imgDefaultUrl,
            description : article.description || "no description",
        }
        if(article.content !== "[Removed]") {
            $('.containerArticles').append(
                `<li class="list-group-item">
                    <img class="media-object pull-left" src=${article.urlToImage}>
                    <a href=${article.url}>${article.title}</a>
                    <p> author: ${article.author}</p>
                    <p>${moment(`${article.publishedAt}`).utc().format(`${dateFormat}`) }</p>
                    <p>${article.description}</p>
                </li>`
            );
        }  
    })    
    $('img').css({'height': '8rem', 'width': '10rem'})
}

const handleClick = (event) => {
    $( ".nav-group-item" ).removeClass( "active" );
    $(event.target).addClass( "active" );
}

init();