// API Doc https://developers.thecatapi.com/
const userInput = document.querySelector("#userInput").value;

const baseUrl = 'https://api.thecatapi.com/v1/images/search';
const limit = '?limit=';
const breed = `?breed_ids=${userInput}`;

const url = `${baseUrl}`;

let btn = document.querySelector('.randombtn');
const loader = document.querySelector('#loading');

async function getData(number) {
    try {
        // Loader for async await
        displayLoading();

        const response = await fetch(url + limit + number + "&order=ASC", {
            headers: {
                'X-API-KEY': 'live_lVv7VeANlKUzgSmM9zhH5D4cI84nfokyDU7eeJWdbjewBNM0y7l2G0vhc3Jey9Rn',
            },
        });

        const data = await response.json();

        // Hide loader for async await
        hideLoading();

        console.log('data', data);
        return data;

    } catch (error) {
        console.error("There was a problem fetching the data:", error);
    }
}

let amountOfCatsOnScreen = 0;


async function putMoreCatsOnThePage() {
    
    
    amountOfCatsOnScreen = amountOfCatsOnScreen + 5;
    
    // await data
    let data = await getData(amountOfCatsOnScreen);
    
    // Loop and store in imagehtml variable
    const newCatCards = [];

    for(const value of data) {

        const col = document.createElement("div");
        col.classList.add("col-6");

        const imgItem = document.createElement("div");
        imgItem.classList.add("render-img");
        imgItem.style.backgroundImage = `url('${value.url}')`;

        col.appendChild(imgItem);

        newCatCards.push(col);
    }

    console.log(newCatCards);

    const container = document.querySelector('#images .row');

    //while the cat card container has a 'last child', go in and remove the first child of the container.
    //this will run until all of the children have been removed!
    while (container.lastChild !== null) container.removeChild(container.firstChild);

    for (const newCatCard of newCatCards) {
        container.appendChild(newCatCard);
    }

    //.innerHTML = imageHtml;
}


let loadmore = document.querySelector('.loadmore');
loadmore.addEventListener('click', () => putMoreCatsOnThePage());
putMoreCatsOnThePage();




// Loading 

function displayLoading() {
    loader.classList.add("active");
}

function hideLoading() {
    loader.classList.remove("active")
}

// btn.addEventListener('click', renderData)

// renderData();








let delay = 500;
let timeout = undefined;

// clear existing timeout, then create a new timeout with the given time delay, which when finished, executes the provided function
const debouceConsoleMessage = () => {
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log("YES!")
    }, delay);
}

const searchBox = document.getElementById("search-box");
searchBox.addEventListener("input", () => debouceConsoleMessage());