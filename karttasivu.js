'use strict';
//Alustukset muuttujille HTML:stä
const tapahtumanNimi = document.querySelector('#tapahtumanNimi');
const tapahtumanOsoite = document.querySelector('#tapahtumanOsoite');
const tapahtumanKaupunki = document.querySelector('#tapahtumanKaupunki');
const tapahtumanAloituspv = document.querySelector('#tapahtumanAloituspv');
const tapahtumanLopetuspv = document.querySelector('#tapahtumanLopetuspv');
const tapahtumanKuvaus = document.querySelector('#tapahtumanKuvaus');
const tapahtumanLinkki = document.querySelector('#tapahtumanLinkki');
const navigoi = document.querySelector('#navigointi');
const pudotusvalikkoMatkustus = document.querySelector(
    '#pudotusvalikko-matkustus');
const searchButton = document.querySelector('#hakunappi');
const searchField = document.querySelector('#hakuteksti');
const activities = document.querySelector('#events');
const formElement = document.querySelector('#hakutekstiForm');
const kartanAlleTiedot = document.querySelector('#kartanAlleTiedot');
const cityButton = document.querySelector('#kaupunkihakunappi');
const selectElement = document.querySelector('#kaupunki');

//CORS-errorin kierto
const cors = 'https://vast-bayou-87653.herokuapp.com/';

/*KAUPUNKIHAKU*/
cityButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  //URL-osoite kaupunkihaulle
  const kaupunki = selectElement.value;
  const url = `${cors}https://open-api.myhelsinki.fi/v1/events/?q=${kaupunki}`; //osoite kaupunkihaulle
  //Tyhjennys ennen uutta hakua
  activities.innerHTML = '';
  //fetchataan api url
  fetch(
      url).
      then(response => response.json()).
      then(results => {
        console.log(results);
        let match = false;
        //Filteröidään tuloksia, yhdistetään tags'in keywordit hakusanaan, jotta hakusanalla saadaa oikeat tulokset
        let filteredResults = results.data.filter(item => {
              let tags = item.tags.filter(tag => {
                if (tag.name.includes(kaupunki)) {
                  match = true;
                  return item;
                }
              });

              if (tags.length > 0) {
                return item;
              }
            },
        );

        //Luodaan luuppi, joka käy APIn datan läpi
        filteredResults.forEach(event => {
          //nimi
          let descriptionText = document.createElement('p');
          activities.appendChild(descriptionText);
          const nodeName = document.createTextNode(
              event.name.fi);
          descriptionText.appendChild(nodeName);
          descriptionText.innerHTML += ' ';
          //aloituspäivämäärä
          let startDate = document.createElement('p');
          activities.appendChild(startDate);
          const nodeDate = document.createTextNode(
              new Date(event.event_dates.starting_day).toLocaleString
              ([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }));
          descriptionText.appendChild(nodeDate);
          descriptionText.innerHTML += '-';
          //lopetusaika
          const nodeDate2 = document.createTextNode(
              new Date(event.event_dates.ending_day).toLocaleString
              ([], {hour: '2-digit', minute: '2-digit'}));
          descriptionText.appendChild(nodeDate2);
          //osoite
          let addressText = document.createElement('p');
          activities.appendChild(addressText);
          const nodeAdress = document.createTextNode(
              event.location.address.street_address);
          addressText.appendChild(nodeAdress);
          addressText.innerHTML += ' ';
          //kaupunki
          let cityText = document.createElement('p');
          activities.appendChild(cityText);
          const node = document.createTextNode(
              event.location.address.locality);
          cityText.appendChild(node);
          cityText.innerHTML += ' ';
          //kuvat
          if (event.description.images != null) {
            let images = document.createElement('img');
            images.src = event.description.images[0].url;
            activities.appendChild(images);
            console.log(images);
          }
        });
      }).
      catch(function(err) {
        console.error(err.message);
      });
});

/*HAKUNAPPI*/
searchButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  //Nettisivun osoitteen luominen ja toiminto joka tyhjentää edellisen haun
  const keyWord = searchField.value;
  const url = formElement.action + '?q=' + keyWord; //luodaan nettisivun osoite
  activities.innerHTML = '';
  //fetchataan api url
  fetch(
      url).
      then(response => response.json()).
      then(results => {
        console.log(results);
        let match = false;
        //Filteröidään tuloksia, yhdistetään tags'in keywordit hakusanaan, jotta hakusanalla saadaa oikeat tulokset
        let filteredResults = results.data.filter(item => {
              let tags = item.tags.filter(tag => {
                if (tag.name.includes(keyWord)) {
                  match = true;
                  return item;
                }
              });

              if (tags.length > 0) {
                return item;
              }
            },
        );
        //Luodaan error-teksti jos hakusanalla ei löydy tuloksia
        if (!match) {
          let errorText = document.createElement('p');
          activities.appendChild(errorText);
          const nodeError = document.createTextNode(
              'Hakutuloksia ei löytynyt!');
          errorText.appendChild(nodeError);
        }
        //Luodaan luuppi, joka käy APIn datan läpi
        filteredResults.forEach(event => {
          //nimi
          let descriptionText = document.createElement('p');
          activities.appendChild(descriptionText);
          const nodeName = document.createTextNode(
              event.name.fi);
          descriptionText.appendChild(nodeName);
          descriptionText.innerHTML += ' ';
          //aloituspäivämäärä
          let startDate = document.createElement('p');
          activities.appendChild(startDate);
          const nodeDate = document.createTextNode(
              new Date(event.event_dates.starting_day).toLocaleString
              ([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }));
          descriptionText.appendChild(nodeDate);
          descriptionText.innerHTML += '-';
          //lopetusaika
          const nodeDate2 = document.createTextNode(
              new Date(event.event_dates.ending_day).toLocaleString
              ([], {hour: '2-digit', minute: '2-digit'}));
          descriptionText.appendChild(nodeDate2);
          //osoite
          let addressText = document.createElement('p');
          activities.appendChild(addressText);
          const nodeAdress = document.createTextNode(
              event.location.address.street_address);
          addressText.appendChild(nodeAdress);
          addressText.innerHTML += ' ';
          //kaupunki
          let cityText = document.createElement('p');
          activities.appendChild(cityText);
          const node = document.createTextNode(
              event.location.address.locality);
          cityText.appendChild(node);
          cityText.innerHTML += ' ';
          //kuvat
          if (event.description.images != null) {
            let images = document.createElement('img');
            images.src = event.description.images[0].url;
            activities.appendChild(images);
            console.log(images);

          }
        });
      }).
      catch(function(err) {
        console.error(err.message);
      });
});

/*KARTTA*/
//Luodaan omat merkit karttaa varten
const omaSijaintiIkoni = L.divIcon({
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  className: 'omasijainti-ikoni',
});
const tapahtumaIkoni = L.divIcon({
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  className: 'tapahtuma-ikoni',
});

//Taulukkoo kerätään kaikki merkit
const merkit = [];

// Kartta ja sijainti näkyviin leaflet-kirjastosta
const map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//Funktio markkereille kartalla
function teeMerkki(crd, icon) {
  const merkki = L.marker([crd.latitude, crd.longitude], {icon: icon}).
      addTo(map);
  return merkki;
}

//Funktio ajetaan, kun annettu lupa sijainnin käyttöön
function sijaintiSallittu(yes) {
  const crd = yes.coords;
  //Näytetään sijainti kartalla halutussa paikassa
  map.setView([crd.latitude, crd.longitude], 13);
  //Oman sijainnin merkki
  const omaSijainti = teeMerkki(crd, omaSijaintiIkoni);
  omaSijainti.bindPopup('Olen tässä.').openPopup();
  merkit.push(omaSijainti);
  //Haetaan kaikkia tapahtumia
  haeKaikkiTapahtumat(crd);
}

//Jos tapahtuu virhe sijainnin haussa, funktio käynnistyy
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//Funktio, jolla haetaan kaikki tapahtumat 5km säteellä sijainnista
function haeKaikkiTapahtumat(crd) {
  fetch(
      `${cors}https://open-api.myhelsinki.fi/v1/events/?distance_filter=${crd.latitude},${crd.longitude},5&limit=4000`).
      then(function(vastaus) {
        return vastaus.json();
      }).
      then(function(tapahtumat) {
        console.log(tapahtumat);
        for (let i = 0; i < tapahtumat.data.length; i++) {
          //Alustus tapahtuman kordinaateille
          const koordinaatit = {
            latitude: tapahtumat.data[i].location.lat,
            longitude: tapahtumat.data[i].location.lon,
          };
          //Jokaiselle tapahtumalle oma merkki kartalla
          const tapahtuma = teeMerkki(koordinaatit, tapahtumaIkoni);
          merkit.push(tapahtuma);
          tapahtuma.bindPopup(tapahtumat.data[i].name.fi);
          tapahtuma.on('popupopen', function() {
            //Tulostukset sivulle
            kartanAlleTiedot.style.display = 'flex';
            tapahtumanNimi.innerHTML = tapahtumat.data[i].name.fi;
            tapahtumanOsoite.innerHTML = tapahtumat.data[i].location.address.street_address;
            tapahtumanKaupunki.innerHTML = tapahtumat.data[i].location.address.locality;
            tapahtumanAloituspv.innerHTML = tapahtumanAloituspv.innerHTML = new Date(
                tapahtumat.data[i].event_dates.starting_day).toLocaleString([],
                {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
            ;
            tapahtumanLopetuspv.innerHTML = new Date(
                tapahtumat.data[i].event_dates.ending_day).toLocaleString([],
                {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
            tapahtumanKuvaus.innerHTML = tapahtumat.data[i].description.body;
            tapahtumanLinkki.innerHTML = tapahtumat.data[i].info_url;

            //Navigoi nappia painamalla haetaan Maps Javascript API:sta tietoja
            navigoi.addEventListener('click', function() {
              fetch(
                  `${cors}https://maps.googleapis.com/maps/api/directions/json?origin=${crd.latitude},${crd.longitude}&destination=${koordinaatit.longitude},${koordinaatit.latitude}&key=AIzaSyATSHMZl4R6TuduGRhc4A54yMPGZQDgoPw`).
                  then(function(vastaus) {
                    return vastaus.json();
                  }).then(function(navigaatio) {
                console.log(navigaatio);
              });

              //Pudotusvalikko näkyviin
              pudotusvalikkoMatkustus.classList.remove('hidden');

              //Funkio Google Maps Javascript API:sta reitytystä varten
              function initMap() {
                const directionsRenderer = new google.maps.DirectionsRenderer();
                const directionsService = new google.maps.DirectionsService();
                const map = new google.maps.Map(document.querySelector('#map'),
                    {
                      zoom: 14,
                      disableDefaultUI: true,
                    });
                //Google kartta ja ohjeet näkyviin
                directionsRenderer.setMap(map);
                directionsRenderer.setPanel(
                    document.querySelector('#reititysohjeet'));
                //Asetetaan pudotusvalikko kartan sisään
                const valikko = document.querySelector(
                    '#pudotusvalikko-matkustus');
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(
                    valikko);

                calculateAndDisplayRoute(directionsService, directionsRenderer);
                //Matkustusmuodon valitseminen
                document.querySelector('#mode').
                    addEventListener('change', () => {
                      calculateAndDisplayRoute(directionsService,
                          directionsRenderer);
                    });
              }

              //Funktio reititykselle
              function calculateAndDisplayRoute(
                  directionsService, directionsRenderer) {
                const selectedMode = document.querySelector('#mode').value;
                directionsService.route({
                  //Reitti omasta sijainnista valittuun tapahtumaan
                  origin: {lat: crd.latitude, lng: crd.longitude},
                  destination: {
                    lat: koordinaatit.latitude,
                    lng: koordinaatit.longitude,
                  },
                  travelMode: google.maps.TravelMode[selectedMode], //matkustusmuoto
                }).
                    then((response) => {
                      directionsRenderer.setDirections(response);
                    }).
                    catch((e) => window.alert(
                        'Reittiä ei ole mahdollista määrittää.' + e));
              }

              //Ajetaan funktio
              initMap();
            });
          });
        }
        //Heittää karttanäkymän, niin että näkyy kaikki merkit
        const ryhma = new L.featureGroup(merkit);
        map.fitBounds(ryhma.getBounds());
      }).catch(function(error) {
    console.log(error);
  });
}

// Käynnistetään paikkatietojen haku
navigator.geolocation.getCurrentPosition(sijaintiSallittu, error);

