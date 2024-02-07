let root = document.getElementById('root');
let genreContainer = document.querySelector('.container__filter__genre');
let langContainer = document.querySelector('.container__filter__language')
let filterContainer = document.querySelector('.container__filter');
let cartBtn = document.getElementById('cartBtn');
let hiddenMenu = document.getElementById('hiddenMenu');
let container = document.querySelector('.container');
let pagention = document.getElementById('pagenation');

let genresInput;
let langsInput;

let pagesContainer;

let genres = [];
let langs = [];

let langFilterd = [];

function render(list, page = 1) {


    let currPage = (page - 1) * 4;

    let currPageBooks = list.slice(currPage, currPage + 4);

    let tamplate = currPageBooks.map((card, index) => {
        return `
            <div class="card">
                
            <img class="card__img" src="./assets/images/${card.imgSrc}" alt="">

                <div class="card__info">

                        <i onclick="renderSingleCard(${index})" id="cardDesc" class="fa-solid fa-circle-info"></i>
                        <h3>${card.title}</h3>
                        <p>نویسنده: ${card.author}</p>
                        <p>تاریخ انتشار: ${card.published_date}</p>
                        <p>زبان: ${card.language}</p>
                        <p>ژانر: ${card.genre}</p>
                        <i onclick="addTocart(${index})" id="addTocart" class="fa-solid fa-cart-plus" style="color:${card.isSelected ? "gold" : "#86C232"}; "></i>
                </div>
            </div>
    `
    }).join('')


    root.innerHTML = tamplate;



    renderPagination(list)
}


function renderPagination(list) {
    pagention.innerHTML = `
    <div class="paginationContainer"> </div>
    `

    pagesContainer = document.querySelector(".paginationContainer");

    let pages = list.length / 4;

    if (list.length % 4) pages++;

    let paginationTemp = ""

    for (let i = 1; i <= pages; i++) {
        paginationTemp += `<div onclick="render(langFilterd,${i})" class="paginationNumber">${i}</div>`
    }


    pagesContainer.innerHTML = paginationTemp;
    
}



function renderGenreFilter() {

    BOOKS.forEach(card => {

        if (!genres.includes(card.genre)) genres.push(card.genre)
    });

    genreContainer.innerHTML = genres.map(item => {

        return `
                <li>
                    <label for="${item}">${item}</label>
                    <input class="container__genre__filter__input" type="checkbox" value="${item}" id="${item}">
                </li>
        
        
        `

    }).join('')

    genresInput = document.querySelectorAll('.container__genre__filter__input');
    for (const genre of genresInput) {
        genre.addEventListener('change', filter)
    }
}



function renderLangFilter() {
    BOOKS.forEach(card => {

        if (!langs.includes(card.language)) langs.push(card.language)
    });

    langContainer.innerHTML = langs.map(item => {

        return `
                <li>
                    <label for="${item}">${item}</label>
                    <input class="container__lang__filter__input" type="checkbox" value="${item}" id="${item}">
                </li>
        
        
        `

    }).join('')

    langsInput = document.querySelectorAll('.container__lang__filter__input');

    for (const lang of langsInput) {
        lang.addEventListener('change', filter)
    }
}



function filter() {
    langFilterd = [];
    let selcetedGenre = [];
    let selcetedLang = [];

    let genreFilterd = [];

    for (const genre of genresInput) {
        if (genre.checked) selcetedGenre.push(genre.value)
    }
    if (!selcetedGenre.length) selcetedGenre = genres


    BOOKS.forEach(card => {

        if (selcetedGenre.includes(card.genre)) genreFilterd.push(card)

    });




    for (const lang of langsInput) {
        if (lang.checked) selcetedLang.push(lang.value)
    }
    if (!selcetedLang.length) selcetedLang = langs


    genreFilterd.forEach(card => {

        if (selcetedLang.includes(card.language)) langFilterd.push(card)

    });
    render(langFilterd)
}


function addTocart(index) {


    BOOKS[index].isSelected = !(BOOKS[index].isSelected)


    filter()
    render(langFilterd)
    console.log(BOOKS[index])
}

function renderSingleCard(index) {
    pagention.classList.add('hide');
    filterContainer.classList.add('hide');
    root.innerHTML = `
    <div class="single-card">

            <img src="./assets/images/${BOOKS[index].imgSrc}" alt="">
            <div class="single-card__content">
                <h3>عنوان: ${BOOKS[index].title}</h3>
                <p>نویسنده: ${BOOKS[index].author}</p>
                <p>تاریخ انتشار: ${BOOKS[index].published_date}</p>
                <p>زبان: ${BOOKS[index].language}</p>
                <p>ژانر: ${BOOKS[index].genre}</p>
            </div>
        </div>
    
    
    `
}

function closeCard() {
    pagention.classList.remove('hide');
    filterContainer.classList.remove('hide');
    render(langFilterd)
}

function renderCart() {
    pagention.classList.add('hide');
    filterContainer.classList.add('hide');
    let selcetedCards = [];
    BOOKS.forEach(card => {
        if (card.isSelected) selcetedCards.push(card)
    })

    root.innerHTML = selcetedCards.map(card => {
        return `
        <div class="single-card">

            <img src="./assets/images/${card.imgSrc}" alt="">

            

            <div class="single-card__content">
            <h3>${card.title}</h3>
            <p>نویسنده: ${card.author}</p>
            <p>تاریخ انتشار: ${card.published_date}</p>
            <p>زبان: ${card.language}</p>
            <p>ژانر: ${card.genre}</p>
            </div>
        </div>
        
        
        `

    }).join('')
}




renderGenreFilter()
renderLangFilter()
filter()


cartBtn.addEventListener('click', renderCart);
