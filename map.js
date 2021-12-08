//Variables
let reservar = "http://localhost:8080/ReserveService/Add";
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
const button = document.querySelector(".reservebutton button");
let preciobase = 1;
let preciobasefinal = 1;
/*marca, modelo, placa*/
const marca = document.querySelector(".marca input");
const modelo = document.querySelector(".modelo input");
const placa = document.querySelector(".placa input");
//Resta de dias
inicial.valueAsDate = new Date();
seconial.valueAsDate = new Date();
seconial.onchange = function () {
  var second = new Date(this.value);
  var first = new Date(inicial.value);
  preciobasefinal =
    (preciobase * (second.getTime() - first.getTime())) / (3600 * 1000 * 24);
  console.log(first.getTime());
  total.innerHTML =
    (preciobase * (second.getTime() - first.getTime())) / (3600 * 1000 * 24) +
    " €";
};
//POST
button.addEventListener("click", () => {
  const generarPost = {
    /*fecha de inicio,fecha de salida, marca, modelo,placa, precio*/
    reserva_id: 5,
    start_day: inicial.value,
    final_day: seconial.value,
    brand: marca.value,
    model: modelo.value,
    placa: placa.value,
    money: preciobasefinal,
    user_id: {
      id: "1",
      lastname: "Cavero Tovar",
      mail: "1632116@utp.edu.pe",
      name: "Juan Daniel",
      number: "989296287",
    },
  };
  console.log(generarPost);
  fetch(reservar, {
    method: "POST",
    body: JSON.stringify(generarPost),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datos) => console.log(datos));

  alert("Reserva exitosa");
});

//functions
function initMap() {
  var options = {
    zoom: 16,
    center: { lat: 40.4664398, lng: -3.5797648 },
    disableDefaultUI: true,
  };
  var map = new google.maps.Map(document.getElementById("map"), options);
  //Añadicion de coordenadas
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
