function fetchSuperHero() {
  let xhr = new XMLHttpRequest();
  let heroID = document.getElementById('Id').value;
  console.log(heroID);
  let url = `https://swapi.py4e.com/api/people/${heroID}/`;
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Reiniciar los divs antes de agregar nueva información
      document.getElementById('superHeroInfo').innerHTML = '';
      document.getElementById('mundoInfo').innerHTML = '';
      document.getElementById('SpecieInfo').innerHTML = '';
      document.getElementById('VehicleInfo').innerHTML = '';

      let persona = JSON.parse(this.responseText);
      console.log(persona);
      displayHero(persona);
      fetchVehicles(persona.vehicles);

      // Mostrar los divs después de obtener la información
      document.getElementById('superHeroInfo').style.display = 'block';
      document.getElementById('mundoInfo').style.display = 'block';
      document.getElementById('SpecieInfo').style.display = 'block';
      document.getElementById('VehicleInfo').style.display = 'block';
    } else if (this.readyState == 4) {
      console.log('Error:', this.statusText);
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
        <h1>Información de Persona</h1>

<table>
  <tr>
    <th>Atributo</th>
    <th>Valor</th>
  </tr>
  <tr>
    <td>Nombre</td>
    <td>${persona.name}</td>
  </tr>
  <tr>
    <td>Altura</td>
    <td>${persona.height} CM</td>
  </tr>
  <tr>
    <td>Masa</td>
    <td>${persona.mass} KG</td>
  </tr>
  <tr>
    <td>Color de pelo</td>
    <td>${persona.hair_color}</td>
  </tr>
  <tr>
    <td>Color de piel</td>
    <td>${persona.skin_color}</td>
  </tr>
  <tr>
    <td>Color de ojos</td>
    <td>${persona.eye_color}</td>
  </tr>
  <tr>
    <td>Año de nacimiento</td>
    <td>${persona.birth_year}</td>
  </tr>
  <tr>
    <td>Género</td>
    <td>${persona.gender}</td>
  </tr>
  <tr>
    <td>Películas</td>
    <td>${persona.films}</td>
  </tr>
  <tr>
    <td>Naves estelares</td>
    <td>${persona.starships}</td>
  </tr>
  <tr>
    <td>Creado</td>
    <td>${persona.created}</td>
  </tr>
  <tr>
    <td>Editado</td>
    <td>${persona.edited}</td>
  </tr>
  <tr>
    <td>URL</td>
    <td>${persona.url}</td>
  </tr>
</table>
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
        <h1>Información de Especie</h1>

<table>
  <tr>
    <th>Atributo</th>
    <th>Valor</th>
  </tr>
  <tr>
    <td>Nombre</td>
    <td>${Specie.name}</td>
  </tr>
  <tr>
    <td>Clasificación</td>
    <td>${Specie.classification}</td>
  </tr>
  <tr>
    <td>Designación</td>
    <td>${Specie.designation}</td>
  </tr>
  <tr>
    <td>Altura promedio</td>
    <td>${Specie.average_height}</td>
  </tr>
  <tr>
    <td>Colores de piel</td>
    <td>${Specie.skin_colors}</td>
  </tr>
  <tr>
    <td>Colores de pelo</td>
    <td>${Specie.hair_colors}</td>
  </tr>
  <tr>
    <td>Colores de ojos</td>
    <td>${Specie.eye_colors}</td>
  </tr>
  <tr>
    <td>Esperanza de vida promedio</td>
    <td>${Specie.average_lifespan}</td>
  </tr>
  <tr>
    <td>Lenguaje</td>
    <td>${Specie.language}</td>
  </tr>
  <tr>
    <td>Creado</td>
    <td>${Specie.created}</td>
  </tr>
  <tr>
    <td>Editado</td>
    <td>${Specie.edited}</td>
  </tr>
  <tr>
    <td>URL</td>
    <td>${Specie.url}</td>
  </tr>
</table>
        
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
        <h1>Información de Mundo</h1>

<table>
  <tr>
    <th>Atributo</th>
    <th>Valor</th>
  </tr>
  <tr>
    <td>Nombre</td>
    <td>${mundo.name}</td>
  </tr>
  <tr>
    <td>Periodo de rotación</td>
    <td>${mundo.rotation_period}</td>
  </tr>
  <tr>
    <td>Periodo orbital</td>
    <td>${mundo.orbital_period}</td>
  </tr>
  <tr>
    <td>Diámetro</td>
    <td>${mundo.diameter}</td>
  </tr>
  <tr>
    <td>Clima</td>
    <td>${mundo.climate}</td>
  </tr>
  <tr>
    <td>Gravedad</td>
    <td>${mundo.gravity}</td>
  </tr>
  <tr>
    <td>Territorio</td>
    <td>${mundo.terrain}</td>
  </tr>
  <tr>
    <td>Superficie de agua</td>
    <td>${mundo.surface_water}</td>
  </tr>
  <tr>
    <td>Población</td>
    <td>${mundo.population}</td>
  </tr>
  <tr>
    <td>Películas</td>
    <td>${mundo.films}</td>
  </tr>
  <tr>
    <td>Creado</td>
    <td>${mundo.created}</td>
  </tr>
  <tr>
    <td>Editado</td>
    <td>${mundo.edited}</td>
  </tr>
  <tr>
    <td>URL</td>
    <td>${mundo.url}</td>
  </tr>
</table>

        `;
    }
}


function fetchVehicles(vehicleUrls){
  vehicleUrls.forEach(url => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url.trim(), true); 
      xhr.onreadystatechange = function(){
          if (this.readyState === 4 && this.status === 200){
              let vehicle = JSON.parse(this.responseText);
              displayVehicleInTable(vehicle);
          } else if( this.readyState == 4 ){
              console.log('Error:', this.statusText);
          }
      };
      xhr.send();
  });
}




// Función para obtener información detallada de vehículos
function fetchVehicles(vehicleUrls) {
  // Obtener el contenedor donde se mostrará la información de los vehículos
  let vehicleInfo = document.getElementById("VehicleInfo");

  // Crear un título "Vehículos"
  let vehicleTitle = document.createElement('h1');
  vehicleTitle.textContent = 'Vehículos'; 
  vehicleInfo.appendChild(vehicleTitle);

  // Recorrer cada enlace a un vehículo
  vehicleUrls.forEach(url => {
      // Realizar una solicitud GET para obtener información del vehículo
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url.trim(), true); // Trim para eliminar espacios en blanco alrededor de la URL
      xhr.onreadystatechange = function(){
          if (this.readyState === 4 && this.status === 200){
              // Convertir la respuesta JSON en un objeto
              let vehicle = JSON.parse(this.responseText);
              // Mostrar la información del vehículo en una tabla
              displayVehicleInTable(vehicle);
          } else if( this.readyState == 4 ){
              // Manejar errores de red o solicitud
              console.log('Error:', this.statusText);
          }
      };
      xhr.send(); // Enviar la solicitud
  });
}

// Función para mostrar información de vehículo en una tabla
function displayVehicleInTable(vehicle) {
  // Obtener el contenedor donde se mostrará la información de los vehículos
  let vehicleInfo = document.getElementById("VehicleInfo");
  // Crear una nueva tabla y agregar una clase para identificarla
  let vehicleTable = document.createElement('table');
  vehicleTable.classList.add('vehicle-table');

  // Crear la estructura inicial de la tabla
  vehicleTable.innerHTML = `
      <tr>
          <th>Atributo</th>
          <th>Valor</th>
      </tr>
  `;

  // Agregar información del vehículo como filas en la tabla
  for (let key in vehicle) {
      let value = vehicle[key];
      // Convertir arrays a strings separados por comas
      if (Array.isArray(value)) {
          value = value.join(', ');
      }
      // Agregar una fila a la tabla por cada atributo del vehículo
      vehicleTable.innerHTML += `
          <tr>
              <td>${key.replace(/_/g, ' ')}</td>
              <td>${value}</td>
          </tr>
      `;
  }

  // Agregar la tabla al contenedor de información de vehículos
  vehicleInfo.appendChild(vehicleTable);
}

// Suponiendo que persona.vehicles es un array de enlaces
let vehicleUrls = persona.vehicles;
fetchVehicles(vehicleUrls); // Llamar a la función para obtener y mostrar información de vehículos
