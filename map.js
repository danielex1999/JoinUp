//Variables

let reservar = "localhost:8080/ReserveService/Add";
let prueba = "http://localhost:8080/Parkinglocal/Showall";
let locales = [];
const welcome = document.querySelector(".welcome");
const reserve = document.querySelector(".reserve-data");
const name_parking = document.querySelector(".title h1");
const desc_parking = document.querySelector(".description h1");
const tipvehicle = document.querySelector(".containtext h2");
const image_vehicle = document.querySelector(".imagvehicle");
const price = document.querySelector(".price_card h2");
const total = document.querySelector(".totalprice h2");
let inicial = document.querySelector(".fechaentrada input");
let seconial = document.querySelector(".fechasalida input");
let preciobase=1;
let preciobasefinal=1;


inicial.valueAsDate = new Date();
seconial.valueAsDate = new Date();
//Resta de dias
inicial.valueAsDate = new Date();
inicial.onchange = function () {};
seconial.onchange = function () {
  var second = new Date(this.value);
  var first = new Date(inicial.value);
  preciobasefinal=(preciobase*(second.getTime()-first.getTime())/(3600*1000*24))
  total.innerHTML= (preciobase*(second.getTime()-first.getTime())/(3600*1000*24))+" €"
};
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
            console.log(locales[index].description);
            welcome.style.display = "none";
            reserve.style.display = "flex";
            name_parking.innerHTML = locales[index].name;
            desc_parking.innerHTML = locales[index].description;
            tipvehicle.innerHTML =
              locales[index].catalogservices[0].type_service;
            document.getElementById("imagvehicle").src =
              "img/" + locales[index].catalogservices[0].type_service + ".png";
            price.innerHTML = locales[index].catalogservices[0].price + " €";
            preciobase = locales[index].catalogservices[0].price;
          });
        })(marker, locales);
      }
    });
}
