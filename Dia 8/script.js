function fetchSuperHero(){
    let xhr = new XMLHttpRequest();
    let heroID = document.getElementById('Id').value;
    console.log(heroID);
    let url = `https://swapi.py4e.com/api/people/${heroID}/`;
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let persona = JSON.parse(this.responseText);
            console.log(persona);
            displayHero(persona);
        }
        else if( this.readyState == 4 ){
            console.log('Error:',this.statusText);
        }
    };
    xhr.send();
}

function displayHero(persona){
    let heroInfo = document.getElementById("superHeroInfo");
    if (persona.detail) {
        heroInfo.innerHTML = `<p>Error: ${persona.detail}</p>`;
    } else {
        heroInfo.innerHTML = `
        <h1>Persona</h1>
        <p>Nombre: ${persona.name}</p>
        <p>Height: ${persona.height}</p>
        <p>Mass: ${persona.mass}</p>
        <p>hair_color: ${persona.hair_color}</p>
        <p>skin_color: ${persona.skin_color}</p>
        <p>eye_color: ${persona.eye_color}</p>
        <p>birth_year: ${persona.birth_year}</p>
        <p>gender: ${persona.gender}</p>
        <p>homeworld: ${persona.homeworld}</p>
        <p>films: ${persona.films}</p>
        <p>species: ${persona.species}</p>
        <p>vehicles: ${persona.vehicles}</p>
        <p>starships: ${persona.starships}</p>
        <p>created: ${persona.created}</p>
        <p>edited: ${persona.edited}</p>
        <p>url: ${persona.url}</p>
        `;
        fetchSpecies(persona.species); 
        fetchWord(persona.homeworld); 
    }
}


function fetchSpecies(Specie){
    let xhr = new XMLHttpRequest();
    console.log(Specie);
    xhr.open('GET',Specie,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let Species = JSON.parse(this.responseText);
            console.log(Species);
            displayEspecie(Species);
        }
        else if( this.readyState == 4 ){
            console.log('Error:',this.statusText);
        }
    };
    xhr.send();
}

function displayEspecie(Specie){
    let SpecieInfo = document.getElementById("SpecieInfo");
    if (Specie.detail) {
        SpecieInfo.innerHTML = `<p>Error: ${Specie.detail}</p>`;
    } else {
        SpecieInfo.innerHTML = `
        <h1>Especie persona</h1>
        <p>Nombre: ${Specie.name}</p>
        <p>classification: ${Specie.classification}</p>
        <p>designation: ${Specie.designation}</p>
        <p>average_height: ${Specie.average_height}</p>
        <p>skin_colors: ${Specie.skin_colors}</p>
        <p>hair_colors: ${Specie.hair_colors}</p>
        <p>eye_colors: ${Specie.eye_colors}</p>
        <p>average_lifespan: ${Specie.average_lifespan}</p>
        <p>language: ${Specie.language}</p>
        <p>created: ${Specie.created}</p>
        <p>edited: ${Specie.edited}</p>
        <p>url: ${Specie.url}</p>

        
        `;
    }
}


























function fetchWord(mundo){
    let xhr = new XMLHttpRequest();
    console.log(mundo);
    xhr.open('GET',mundo,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let word = JSON.parse(this.responseText);
            console.log(word);
            displayMundo(word);
        }
        else if( this.readyState == 4 ){
            console.log('Error:',this.statusText);
        }
    };
    xhr.send();
}

function displayMundo(mundo){
    let mundoInfo = document.getElementById("mundoInfo");
    if (mundo.detail) {
        mundoInfo.innerHTML = `<p>Error: ${mundo.detail}</p>`;
    } else {
        mundoInfo.innerHTML = `
        <h1>Mundo persona</h1>
        <p>Nombre: ${mundo.name}</p>
        <p>Rotation Period: ${mundo.rotation_period}</p>
        <p>Orbital Period: ${mundo.orbital_period}</p>
        <p>Diameter: ${mundo.diameter}</p>
        <p>Climate: ${mundo.climate}</p>
        <p>Gravity: ${mundo.gravity}</p>
        <p>Terrain: ${mundo.terrain}</p>
        <p>Surface Water: ${mundo.surface_water}</p>
        <p>Population: ${mundo.population}</p>
        <p>Films: ${mundo.films}</p>
        <p>Created: ${mundo.created}</p>
        <p>Edited: ${mundo.edited}</p>
        <p>URL: ${mundo.url}</p>
        `;
    }
}
