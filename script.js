let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
const center = { lat: 29.234877, lng: 47.830494 };
const API = 'c3926d7198msh7f865f753f0716bp1348e9jsn75c8521a48ba'

const zoom = 7;

  map = new Map(document.getElementById("mapContainer"), {
    center,
    zoom
    },
    );


}
window.initMap =initMap;



const apiKey = '6ae32f7d1emsh37273dd965cc992p1cd853jsn2c91b4ae318f';
const fetchHotels = async (value)=>{
    const url = `https://hotels4.p.rapidapi.com/locations/v3/search?q=${value}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result.sr[9].coordinates);

    new google.maps.Marker({
        position:{lat: 29.404968, lng: -96.236908},
        label:'1',
        map
    })

} catch (error) {
	console.error(error);
}
}


const fetchCountries = async ()=>{
    const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10&offset=40';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return result.data;
} catch (error) {
	console.error(error);
}
}


(async function loadCountries(){
    const countries = await fetchCountries();
    const countriesList = document.querySelector('#languages_list');
    const countriesInput = document.querySelector('#languages_input');

    console.log(countries);
    for(let i =0; i< countries.length; i++){
        console.log(countries[i].name);
        countriesList.innerHTML += `<li data-country=${countries[i].name}>${countries[i].name}</li>`
    }
    countriesList.style.display = "none"
    countriesInput.addEventListener('click' ,function(){
        countriesList.style.display = "block"

    })

    const allCountries = Array.from(countriesList.children);
    allCountries.map(
        country => {
            country.addEventListener('click' , async function(e){
                console.log(e.target.dataset.country);
                countriesList.style.display = "none"
                countriesInput.value = e.target.dataset.country;

              const selectedCountry = e.target.dataset.country;
                await fetchHotels(selectedCountry);

            })
        }
    )
})()


