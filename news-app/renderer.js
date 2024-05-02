const { ipcRenderer } = require('electron');
const $ = require('jquery');

let articles;

const createArticlesList = () => {
    articles.map((article) => {
        $('.containerArticles').append(`<li>${article.title}</li>`);
    })    
}

ipcRenderer.on('articlesData', (event, data) => {
    articles = data;
    console.log(articles);
    createArticlesList();
})

const handleClick = (event) => {
    $( ".nav-group-item" ).removeClass( "active" );
    console.log(event.target);
    $target = $(event.target);
    $(event.target).addClass( "active" );
}

function init(){
    $(".nav-group-item").on("click", handleClick);
}

init();
