let breakingImg = document.querySelector('#breakingImg');
let breakingNews_title = document.querySelector('#breakingNews .title');
let breakingNews_desc = document.querySelector('#breakingNews .description');
let topNews = document.querySelector('.topNews');
let sportsNews = document.querySelector('#sportsNews .newsBox');
let businessNews = document.querySelector('#businessNews .newsBox');
let techNews = document.querySelector('#techNews .newsBox');

let header = document.querySelector('.header');
let toggleMenu = document.querySelector('.bar');
let menu = document.querySelector('nav ul');

const toggle = (e) => {
    toggleMenu.classList.toggle('active');
    menu.classList.toggle('activeMenu');
};

toggleMenu.addEventListener('click', toggle);

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Fetching news data from a website providing API
const apiKey = "29f8e42efe874ee2be23f0d1edb6844b";

const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
    try {
        const data = await fetch(url);
        if (!data.ok) {
            throw new Error('Failed to fetch data');
        }
        const response = await data.json();
        console.log(response); // Log the response to check the structure
        return response.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};

// Adding breaking news
const add_breakingNews = (data) => {
    if (data.length > 0) {
        breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`;
        breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`;
        breakingNews_desc.innerHTML = `${data[0].description}`;
    }
};
fetchData('general', 5).then(add_breakingNews);

// Adding top news
const add_topNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        html += `<div class="news">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`;
    });
    topNews.innerHTML = html;
};
fetchData('general', 20).then(add_topNews);

// Adding sports news
const add_sportsNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`;
    });
    sportsNews.innerHTML = html;
};
fetchData('sports', 5).then(add_sportsNews);

// Adding business news
const add_businessNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`;
    });
    businessNews.innerHTML = html;
};
fetchData('business', 5).then(add_businessNews);

// Adding tech news
const add_techNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`;
    });
    techNews.innerHTML = html;
};
fetchData('technology', 5).then(add_techNews);
