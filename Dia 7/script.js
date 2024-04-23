function fetchSuperHero(){
    let xhr = new XMLHttpRequest();
    let heroID = document.getElementById('heroId').value;
    console.log(heroID);
    let apiKey = "444a243ad548335c0f397a17d4a47278"
    let url = `https://www.superheroapi.com/api.php/${apiKey}/${heroID}`;
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);
            console.log(response);
            displayHero(response);
        }
        else if( this.readyState == 4 ){
            console.log('Error:',this.statusText);
        }
    };
    xhr.send();
}

function displayHero(data){
    let heroInfo = document.getElementById("superHeroInfo");
    let heroPower = document.getElementById("superHeroPower");
    let heroJob = document.getElementById("superHeroJob");
    let heroConex = document.getElementById("superHeroConex");
    let heroApariencia = document.getElementById("superHeroApariencia");
    let heroBiograpy = document.getElementById("superHeroBiograpy");
    
    if (data.response === "error") {
        heroInfo.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        heroInfo.innerHTML = `
        <p id="nombre">${data.name}</p>
        <br><img src="${data.image.url}"</br>
        `

        heroPower.innerHTML = `
        <h3>Estadísticas de Poder</h3>
        <p>Combate: ${data.powerstats.combat}</p>
        <p>Durabilidad: ${data.powerstats.durability}</p>
        <p>Inteligencia: ${data.powerstats.intelligence}</p>
        <p>Poder: ${data.powerstats.power}</p>
        <p>Velocidad: ${data.powerstats.speed}</p>
        <p>Fuerza: ${data.powerstats.strength}</p>
        `

        heroJob.innerHTML = `
        <h3>Trabajo</h3>
        <p>Ocupación: ${data.work.occupation}</p>
        <p>Base: ${data.work.base}</p>
        `

        heroConex.innerHTML = `
        <h3>Conexiones</h3>
        <p>Grupo/Afiliación: ${data.connections["group-affiliation"]}</p>
        <p>Parientes: ${data.connections.relatives}</p>
        `

        heroApariencia.innerHTML = `
        <h3>Apariencia</h3>
        <p>Color de ojos: ${data.appearance["eye-color"]}</p>
        <p>Género: ${data.appearance.gender}</p>
        <p>Color de cabello: ${data.appearance["hair-color"]}</p>
        <p>Raza: ${data.appearance.race}</p>
        <p>Altura: ${data.appearance.height[0]}, ${data.appearance.height[1]}</p>
        <p>Peso: ${data.appearance.weight[0]}, ${data.appearance.weight[1]}</p>
        `

        heroBiograpy.innerHTML = `
        <h3>Biografía</h3>
        <p>Nombre completo: ${data.biography["full-name"]}</p>
        <p>Alias: ${data.biography.aliases}</p>
        <p>Editorial: ${data.biography.publisher}</p>
        <p>Primera aparición: ${data.biography["first-appearance"]}</p>
        <p>Lugar de nacimiento: ${data.biography["place-of-birth"]}</p>
        <p>Alineación: ${data.biography.alignment}</p>
        <p>Alter ego: ${data.biography["alter-ego"]}</p>
        
        `;
    }
}