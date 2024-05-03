const moment = require('moment');
const $ = require('jquery');

const API_KEY = process.env.APIKEY;
const dateFormat = 'MM-DD-YYYY'; 
let category = 'business';
const imgDefaultUrl= `https://img.freepik.com/photos-gratuite/illustration-rendu-3d-blocs-lettres-formant-mot-news-fond-blanc_181624-60840.jpg?t=st=1714659372~exp=1714662972~hmac=316e8c3ef6a0381e078456debd0ec4087d0669d04e2d689a09477e3955f8fbf3&w=1380`;

let articles = [];

function init(){
    loadData();
    $('#search').bind('input', searchArticle);
    $('.nav-group').css({"position": "sticky", "top": 0});
}

const loadData = async () => {
    try {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
      resJSON = await res.json();
      articles = [...resJSON.articles];
      console.log(articles);
    } catch {
      console.error('Failed');
    }
    createArticlesList(articles);
}

//open link in a new window
const openLink = (event) => {
    event.preventDefault();
    const url = event.target.href;
    window.open(`${url}`);
}

const createArticlesList = (articlesToCreate) => {
    articlesToCreate.map((article) => {
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
                    <a id="link" href=${article.url}>${article.title} target=_blank</a>
                    <p> author: ${article.author}</p>
                    <p>${moment(`${article.publishedAt}`).utc().format(`${dateFormat}`) }</p>
                    <p>${article.description}</p>
                </li>`
            );
        }  
    })    
    $('img').css({'height': '8rem', 'width': '10rem'});
    $('#link').on('click', () => openLink(event));
}

const selectCategory = (event) => {
    category = event.target.id;
    $( ".nav-group-item" ).removeClass( "active" );
    $(event.target).addClass( "active" );
    $( ".list-group-item" ).remove();
    loadData();
}

// filtrer par titre 
const searchArticle = () => {
    searchTyped = $('#search').val();
    if(searchTyped !== undefined && searchTyped.length > 2) {
        $( ".list-group-item" ).remove();
        searchArticles = articles.filter((article) => article.title.includes(searchTyped))
        createArticlesList(searchArticles);
    } else if (searchTyped === '') {
        createArticlesList(articles); 
    }
}

init();