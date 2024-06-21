let currentPokemonId = null;
function buscarPokemon() {
  let inputId = `PokemonInput`;
  console.log(document.getElementById(inputId).value.trim().toLowerCase());
  let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
  let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

  fetch(urlApi)
    .then((Response) => Response.json())
    .then((datosPokemon) => {
      mostrarPokemon(datosPokemon);
      currentPokemonId = datosPokemon.id;
    })
    .catch(() => mostrarError());

}

function subirPokemon(){
  if (currentPokemonId !== null) {
    let nextPokemonId = currentPokemonId + 1;
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${nextPokemonId}`;

    fetch(urlApi)
      .then((Response) => Response.json())
      .then((datosPokemon) => {
        mostrarPokemon(datosPokemon);
        currentPokemonId = datosPokemon.id;
      })
      .catch(() => mostrarError());
  }

}


function bajarPokemon() {
  if (currentPokemonId !== null && currentPokemonId > 1) { // El ID de los Pokémon empieza en 1
    let prevPokemonId = currentPokemonId - 1;
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${prevPokemonId}`;

    fetch(urlApi)
      .then((Response) => Response.json())
      .then((datosPokemon) => {
        mostrarPokemon(datosPokemon);
        currentPokemonId = datosPokemon.id;
      })
      .catch(() => mostrarError());
  }
}

// Mostrar información del Pokémon
function mostrarPokemon(datosPokemon) {
  let infoDivId = `PokemonInfo`;
  let infoDiv = document.getElementById(infoDivId);
 console.log(datosPokemon);
 let typesHtml = datosPokemon.types.map(typeInfo => {
  return `<h2 class="pk-type">${typeInfo.type.name}</h2>`;
}).join('');

  infoDiv.innerHTML = `
        <h2 class="pk-name">${datosPokemon.name}</h2>
        <img class="pk-imgBig" src = "${datosPokemon.sprites.other["official-artwork"].front_default}">
        <h2 class="pk-type1"${datosPokemon.types_1}</h2>
        <img class="pk-imgSmall" src = "${datosPokemon.sprites.front_default}">
        <h3 class="pk-n">ID: ${datosPokemon.id}</h3>
         <h3 class="pk-peso">Peso: ${datosPokemon.height}</h3>
          ${typesHtml}

       
    `;
}

// Mostrar error
function mostrarError() {
  let infoDivId = `PokemonInfo`;
  let infoDiv = document.getElementById(infoDivId);

  infoDiv.innerHTML = `
        <h2>Error: Pokémon no encontrado</h2>
        <img src = "https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af/scale-to-width/755">
    `;
}
