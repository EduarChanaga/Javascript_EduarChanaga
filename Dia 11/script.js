// Función para obtener y mostrar la información del Pokémon
function fetchPokemon(){
    let xhr = new XMLHttpRequest(); // Crear una nueva solicitud XMLHttpRequest
    let Id = document.getElementById('Id').value; // Obtener el valor del ID del input
    console.log(Id); // Imprimir el ID en la consola
    let url = `https://pokeapi.co/api/v2/pokemon/${Id}`; // Construir la URL de la API usando el ID
    xhr.open('GET',url,true); // Abrir una solicitud GET a la URL con modo asíncrono
    xhr.onreadystatechange = function(){ // Definir la función de devolución de llamada para el cambio de estado
        if (this.readyState === 4 && this.status === 200){ // Comprobar si la solicitud se completó y el estado es OK
            let response = JSON.parse(this.responseText); // Convertir la respuesta JSON en un objeto JavaScript
            console.log(response); // Imprimir la respuesta en la consola
            displayPokemon(response); // Llamar a la función para mostrar la información del Pokémon
        }
        else if( this.readyState == 4 ){ // Si la solicitud no se completó correctamente
            console.log('Error:',this.statusText); // Imprimir el mensaje de error en la consola
            displayPokemonError(); // Llamar a la función para mostrar un mensaje de error
        }
    };
    xhr.send(); // Enviar la solicitud
}

// Función para mostrar la información del Pokémon
function displayPokemon(data){
    let PokemonInfo = document.getElementById("PokemonInfo"); // Obtener el elemento donde se mostrará la información del Pokémon
    let pokemonNumber = data.id; // Obtener el número del Pokémon
    // Actualizar el contenido HTML del elemento con la información del Pokémon
    PokemonInfo.innerHTML = `
        <p id="NamePokemon">${pokemonNumber} - ${data.name}</p>
        <img id="pokemon" src="${data.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${data.name}">
    `;
}

// Evento para detectar cuando se presiona la tecla Enter en el input
document.getElementById("Id").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Comprobar si la tecla presionada es Enter
        let userInput = document.getElementById('Id').value.trim(); // Obtener el valor del input y eliminar espacios en blanco al principio y al final
        if (!isNaN(userInput)) { // Si el valor es un número
            currentPokemonId = parseInt(userInput); // Asignarlo a currentPokemonId
        } else { // Si el valor no es un número (es un nombre)
            fetchPokemonByName(userInput); // Llamar a la función para obtener el ID del Pokémon por su nombre
        }
        fetchPokemon(); // Llamar a la función para obtener y mostrar la información del Pokémon
    }
});

// Función para obtener el ID de un Pokémon por su nombre
function fetchPokemonByName(name) {
    let xhr = new XMLHttpRequest(); // Crear una nueva solicitud XMLHttpRequest
    let url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`; // Construir la URL de la API usando el nombre del Pokémon
    xhr.open('GET',url,true); // Abrir una solicitud GET a la URL con modo asíncrono
    xhr.onreadystatechange = function(){ // Definir la función de devolución de llamada para el cambio de estado
        if (this.readyState === 4 && this.status === 200){ // Comprobar si la solicitud se completó y el estado es OK
            let response = JSON.parse(this.responseText); // Convertir la respuesta JSON en un objeto JavaScript
            currentPokemonId = response.id; // Asignar el ID del Pokémon encontrado a currentPokemonId
        }
    };
    xhr.send(); // Enviar la solicitud
}

// Variable para almacenar el ID del Pokémon actual, inicializado en 1
let currentPokemonId = 0;

// Evento para detectar cuando se hace clic en el botón de anterior
document.getElementById("prevBtn").addEventListener("click", function() {
    if (currentPokemonId > 1) { // Si el ID del Pokémon actual es mayor que 1
        currentPokemonId--; // Decrementar el ID del Pokémon actual
        document.getElementById('Id').value = currentPokemonId; // Actualizar el valor del campo de entrada con el nuevo ID
        fetchPokemon(); // Obtener y mostrar la información del Pokémon con el nuevo ID
    }
});

// Evento para detectar cuando se hace clic en el botón de siguiente
document.getElementById("nextBtn").addEventListener("click", function() {
    currentPokemonId++; // Incrementar el ID del Pokémon actual
    document.getElementById('Id').value = currentPokemonId; // Actualizar el valor del campo de entrada con el nuevo ID
    fetchPokemon(); // Obtener y mostrar la información del Pokémon con el nuevo ID
});