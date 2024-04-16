/* function buscarsuperhero (){
   let superhid = document.getElementById("inputHero").value;
   obtenerData(superhid);
};
 */

function buscarsuperhero() {
  let hero = document.getElementById("inputHero").value;
    if (isNaN(hero) || hero < 1 || hero > 732) {
        alert("¡Solo existen 732 SuperHero!\n(Ingresa un valor en ese rango para buscar)");
        resetHero();
    }
    else {
        obtenerData(hero);
    }
};


function resetHero(){
  var element = document.getElementById("#formHero");
  $(".row").css("display", "none");
  element.reset();
};

function cargarGrafico(personaje = []) {
  const chart = new CanvasJS.Chart("graficoHero", {
    theme: "light2",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Estadísticas de poder para " + personaje.name,
      fontWeight: "bolder",
      fontSize: 24,
    },
    data: [
      {
        type: "pie",
        startAngle: 270,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: true,
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}",
        dataPoints: personaje.powerstats,
      },
    ],
  });
  chart.render();
}



function obtenerData(heroId) {
    let url = "https://www.superheroapi.com/api.php/3525635500807579/" + heroId;
    $.ajax(url)
      .done(function (datos) {
        let { powerstats } = datos;
        powerstats = Object.entries(powerstats);
        let dataPoints = powerstats.map(element => ({ label: element[0], y: element[1] }));
        // console.log(dataPoints);
        let personaje = {
          id: datos.id,
          name: datos.name,
          publisher: datos.biography.publisher,
          occupation: datos.work.occupation,
          first: datos.biography["first-appearance"],
          height: datos.appearance.height,
          weight: datos.appearance.weight,
          connections: datos.biography.aliases,
          image: datos.image.url,
          powerstats: dataPoints,
        };
        cargarGrafico(personaje);
        cargarData(personaje);
      })
      .fail(function () {
        alert("No fue posible cargar la información del Hero.");
      })
  
}


function cargarData(personaje) {
  $(".row").css("display", "flex");
  document.getElementById("imgHero").src = personaje.image;
  document.getElementById("titleHero").innerText = personaje.name;
  document.getElementById("nameHero").innerText = personaje.name;
  document.getElementById("pubHero").innerText = personaje.publisher;
  document.getElementById("occuHero").innerText = personaje.occupation;
  document.getElementById("firstHero").innerText = personaje.first;
  document.getElementById("heiHero").innerText = personaje.height;
  document.getElementById("weiHero").innerText = personaje.weight;
  document.getElementById("conHero").innerText = personaje.connections;
  document.getElementById("idHero").innerText = personaje.id;
};


// Muestra la sección
