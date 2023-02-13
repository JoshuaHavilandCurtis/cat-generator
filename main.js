const baseUrl = 'https://api.thecatapi.com/v1/images/search';
let btn = document.querySelector('.btn');

async function getData() {
    try {
        const response = await fetch(baseUrl, {
            headers: {
                'X-API-KEY': 'live_lVv7VeANlKUzgSmM9zhH5D4cI84nfokyDU7eeJWdbjewBNM0y7l2G0vhc3Jey9Rn',
            },
        });

        const data = await response.json();
        console.log('data', data);
        return data;

    } catch (error) {
        console.error("There was a problem fetching the data:", error);
    }
}

async function renderData() {
    let el = document.querySelector('.info');
    let imgel = document.querySelector('.photo');
    let data = await getData();

    // Select array number using []
    imgel.src = data[0].url;
}

btn.addEventListener('click', renderData)

renderData();
