function fetchPokemon(){
    let xhr = new XMLHttpRequest();
    let Id = document.getElementById('Id').value;
    console.log(Id);
    let url = `https://pokeapi.co/api/v2/pokemon/${Id}`;
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);
            console.log(response);
            displayPokemon(response);
        }
        else if( this.readyState == 4 ){
            console.log('Error:',this.statusText);
            displayPokemonError();
        }
    };
    xhr.send();
}

function displayPokemon(data){
    let PokemonInfo = document.getElementById("PokemonInfo");
    let pokemonNumber = data.id;
    PokemonInfo.innerHTML = `
        <p id="NamePokemon">${pokemonNumber} - ${data.name}</p>
        <img id="pokemon" src="${data.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${data.name}">
    `;
}

function displayPokemonError(){
    let PokemonInfo = document.getElementById("PokemonInfo");
    PokemonInfo.innerHTML = `<p>Error: Pokémon not found.</p>`;
}

document.getElementById("Id").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let userInput = document.getElementById('Id').value.trim(); // Obtener el valor del input y eliminar espacios en blanco al principio y al final
        if (!isNaN(userInput)) {
            // Si el valor es un número, asignarlo a currentPokemonId
            currentPokemonId = parseInt(userInput);
        } else {
            // Si el valor es un nombre, buscar el número del Pokémon usando la PokeAPI
            fetchPokemonByName(userInput);
        }
        fetchPokemon();
    }
});

function fetchPokemonByName(name) {
    let xhr = new XMLHttpRequest();
    let url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);
            currentPokemonId = response.id; // Asignar el número del Pokémon encontrado a currentPokemonId
        }
    };
    xhr.send();
}

let currentPokemonId = 1;

document.getElementById("prevBtn").addEventListener("click", function() {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        document.getElementById('Id').value = currentPokemonId; // Actualiza el valor del campo de entrada
        fetchPokemon();
    }
});

document.getElementById("nextBtn").addEventListener("click", function() {
    currentPokemonId++;
    document.getElementById('Id').value = currentPokemonId; // Actualiza el valor del campo de entrada
    fetchPokemon();
});

function fetchPokemon(){
    let xhr = new XMLHttpRequest();
    let Id = currentPokemonId;
    console.log(Id);
    let url = `https://pokeapi.co/api/v2/pokemon/${Id}`;
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);
            console.log(response);
            displayPokemon(response);
        }
        else if( this.readyState == 4 ){
            console.log('Error:',this.statusText);
            displayPokemonError();
        }
    };
    xhr.send();
}

function displayPokemon(data){
    let PokemonInfo = document.getElementById("PokemonInfo");
    let pokemonNumber = data.id;
    PokemonInfo.innerHTML = `
        <p id="NamePokemon">${pokemonNumber} - ${data.name}</p>
        <img id="pokemon" src="${data.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${data.name}">
    `;
}

function displayPokemonError(){
    let PokemonInfo = document.getElementById("PokemonInfo");
    PokemonInfo.innerHTML = `<p>Error: Pokémon not found.</p>`;
}

