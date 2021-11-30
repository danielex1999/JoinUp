//Variables

let prueba = "http://localhost:8080/Parkinglocal/Showall";
let locales = [];
const welcome= document.querySelector('.welcome')
const reserve= document.querySelector('.reserve-data')

//functions

function initMap() {
  var options = {
    zoom: 16,
    center: { lat: 40.4664398, lng: -3.5797648 },
    disableDefaultUI: true,
  };
  var map = new google.maps.Map(document.getElementById("map"), options);

  function addMarker(cordenadas) {
    var marker = new google.maps.Marker({
      position: cordenadas,
      map: map,
      icon: "https://user-images.githubusercontent.com/69739890/143819553-a9abdb40-ecc8-4828-b955-5c08e2c8e6e5.png",
    });
  }

  fetch(prueba)
    .then((response) => response.json())
    .then((data) => {
      locales = data;
      for (let index = 0; index < locales.length; index++) {
        var marker = new google.maps.Marker({
          position: {
            lat: locales[index].length,
            lng: locales[index].latitude,
          },
          map: map,
          icon: "https://user-images.githubusercontent.com/69739890/143819553-a9abdb40-ecc8-4828-b955-5c08e2c8e6e5.png",
        });
        (function (marker, locales) {
          google.maps.event.addListener(marker, "click", function (e) {
            console.log(locales[index].description)
            welcome.style.display='none'
            reserve.style.display='block'
          });
        })(marker, locales);
      }
    });
}
