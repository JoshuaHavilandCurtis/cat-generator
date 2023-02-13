const baseUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';
let btn = document.querySelector('.btn');
const loader = document.querySelector('#loading');

async function getData() {
    try {
        // Loader for async await
        displayLoading();

        const response = await fetch(baseUrl, {
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

async function renderData() {
    let el = document.querySelector('.info');
    let imgel = document.querySelector('.photo');
    let imageHtml = '';

    // await data
    let data = await getData();

    // Loop and store in imagehtml variable
    for(const value of data) {
        imageHtml += `
        <div class="col-6">
            <div class="render-img" style="background-image: url('${value.url}')" /></div>
        </div>
        `;

    }

    document.querySelector('#images .row').innerHTML = imageHtml;
}



// Loading 

function displayLoading() {
    loader.classList.add("active");
}

function hideLoading() {
    loader.classList.remove("active")
}

btn.addEventListener('click', renderData)

renderData();
