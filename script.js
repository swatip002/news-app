
const API_KEY = "171c65726baf42a3843876494f37c807";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    //console.log(data);
    bindData(data.articles);
}  

function reload(){
    window.location.reload();
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardsClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardsClone,article);
        cardsContainer.appendChild(cardsClone);
    });
}

function fillDataInCard(cardsClone,article){
    const newsImg = cardsClone.querySelector('#news-img');
    const newsTitle = cardsClone.querySelector('#news-title');
    const newsSource = cardsClone.querySelector('#source');
    const newsDesc = cardsClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} ${date}`;
    cardsClone.firstElementChild.addEventListener("click",() =>{
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('news-input');

searchButton.addEventListener("click",() => {
    const query = searchText.value;
    if(!query) return ;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})
