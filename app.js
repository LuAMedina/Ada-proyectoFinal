/*---HEADER - MENU---*/

const menuIcon = document.querySelector('#menuIcon'),
    containFilters = document.querySelector('#contFilters');

menuIcon.addEventListener('click', (e) => {
    containFilters.classList.toggle('active');

    const actualRute = e.target.getAttribute('src');

    if (actualRute == 'fa-solid fa-bars') {
        return e.target.getAttribute('src', 'fa-solid fa-bars');
    }
})

/*------*/

function $(element) {
    return document.querySelector(element)
}
const $divCards = $('.contain-cards')
const $nextPage = $('#next-page')
const $prevPage = $('#prev-page')
const $initPage = $('#init-page')
const $lastPage = $('#last-page')
const $filterAll = $('#filter-All')
const $filterMale = $('#filter-Male')
const $filterFemale = $('#filter-Female')
const $filterGenderless = $('#filter-Genderless')
const $filterUnknown = $('#filter-Unknown')
const $actualPage = $('#actual-Page')

let page = 1;
let countAllCharacters //cantidad de personajes
let allCharacters

window.onload = async () => {
    load(1)
}

async function load(page) {
    if (page == 1) {
        $prevPage.classList.add('desactived')
        $initPage.classList.add('desactived')
    } else {
        $prevPage.classList.remove('desactived')
        $initPage.classList.remove('desactived')
    }

    if (page == 42) {
        $nextPage.classList.add('desactived')
        $lastPage.classList.add('desactived')
    } else {
        $nextPage.classList.remove('desactived')
        $lastPage.classList.remove('desactived')
    }

    try {
        let response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        response = await response.json();
        countAllCharacters = response.count;
        paintCards(response.results);
        allCharacters = response.results;
    } catch (error) {
        console.log(error)
    }
}

$nextPage.onclick = nextPage
$prevPage.onclick = prevPage
$initPage.onclick = initPage
$lastPage.onclick = lastPage

function nextPage() {
    if (page < 42) {
        page += 1;
        load(page)
    }
}

function prevPage() {
    if (page > 0) {
        page -= 1;
        load(page)
    }
}

function initPage() {
    if (page !== 0) {
        page = 1;
        load(page)
    }
}

function lastPage() {
    if (page !== 42) {
        page = 42;
        load(page)
    }
}

$filterAll.onclick = filterAll
$filterMale.onclick = filterMale
$filterFemale.onclick = filterFemale
$filterGenderless.onclick = filterGenderless
$filterUnknown.onclick = filterUnknown

async function filterAll() {
    paintCards(allCharacters)
}

async function filterMale() {
    let charactersFilters = [];
    allCharacters.forEach(character => {
        if (character.gender === "Male") {
            charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
}

async function filterFemale() {
    let charactersFilters = [];
    allCharacters.forEach(character => {
        if (character.gender === "Female") {
            charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
}

async function filterGenderless() {
    let charactersFilters = [];
    allCharacters.forEach(character => {
        if (character.gender === "Genderless") {
            charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
}

async function filterUnknown() {
    let charactersFilters = [];
    allCharacters.forEach(character => {
        if (character.gender === "unknown") {
            charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
}

function paintCards(charactersToPaint) {
    $divCards.innerHTML = ""
    charactersToPaint.forEach(async character => {
        $divCards.innerHTML += `<div class="card">
            <img src=${character.image} alt=${character.name}>
            <div class="contain-info">
                <p class="name">${character.name}</p>
                <p class="gender">Gender: ${character.gender}</p>
                <p class="species">Specie: ${character.species}</p>
                <p class="status">Status: ${character.status}</p>
                <p class="origin">Origin: ${character.origin.name}</p>
                <p class="location">Location: ${character.location.name}</p>
            </div>
            <div class="more">
                <a href="*">Ver más...</a>
            </div>
        </div>`
    })
}