//Loading the API data
async function getData(latitude, longitude) {
    const locData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then((res) => res.json());

    console.log(locData.locality);
    console.log(locData);
    return locData.locality;
}

//Creating the Map
function createMap() {
    var map = L.map('map').setView([38.7946, -106.5348], 4); 

    // Add OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);


//Making the markers using the provided coordinates
    const markerData = [
        {
            lat: getRandomInRange(30, 35, 3),
            lon: getRandomInRange(-90, -100, 3),
            id: 'markerOne'
        },
        {
            lat: getRandomInRange(30, 35, 3),
            lon: getRandomInRange(-90, -100, 3),
            id: 'markerTwo'
        },
        {
            lat: getRandomInRange(30, 35, 3),
            lon: getRandomInRange(-90, -100, 3),
            id: 'markerThree'
        }
    ];

    //Adding a marker for each one
    markerData.forEach(async (marker) => {
        const locality = await getData(marker.lat, marker.lon);
        var markerInstance = L.marker([marker.lat, marker.lon]).addTo(map);
        
        // Adding the text
        document.getElementById(marker.id).textContent = 'Latitude: ' + marker.lat + ' Longitude: ' + marker.lon;
        document.getElementById(marker.id + 'Locality').textContent = 'Locality: ' + locality;
    });
}

// Getting random locations
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

window.onload = createMap;


