const { ipcRenderer } = require('electron');
const $ = require('jquery');

let articles;

const createArticlesList = () => {
    //son image, son titre pointant vers l'URL de l'article, sa date de publication, son auteur et sa description
    articles.map((article) => {
        $('.containerArticles').append(`<li class="list-group-item">
            <img src=${article.urlToImage}>
            <a href=${article.url}>${article.title}</a>
            <p> author:${article.author}</p>
            <p>${article.publishedAt}</p>
            <p>${article.description}</p>
        </li>`);
    })    
}

ipcRenderer.on('articlesData', (event, data) => {
    articles = data;
    console.log(articles);
    createArticlesList();
})

const handleClick = (event) => {
    $( ".nav-group-item" ).removeClass( "active" );
    $(event.target).addClass( "active" );
}

function init(){
    $(".nav-group-item").on("click", handleClick);
}

init();
