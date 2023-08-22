let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
const center = { lat: 29.234877, lng: 47.830494 };
const API = 'c3926d7198msh7f865f753f0716bp1348e9jsn75c8521a48ba'

const zoom = 14;

  map = new Map(document.getElementById("mapContainer"), {
    center,
    zoom
    
  });
}

const apiKey = '6ae32f7d1emsh37273dd965cc992p1cd853jsn2c91b4ae318f';
const fetchHotels = async ()=>{
    const url = 'https://hotels4.p.rapidapi.com/locations/v3/search?q=Egypt';
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
	console.log(result);
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
    console.log(countries);
    for(let i =0; i< countries.length; i++){
        console.log(countries[i].name);
    }
})()


initMap();