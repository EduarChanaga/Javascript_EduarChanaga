let personas = [];

function agregarPersona() {
    let nombres = document.getElementById("nombres").value;
    let edad = document.getElementById("edad").value;
    let pais = document.getElementById("pais").value;

    if (nombres.trim() === "" || isNaN(parseInt(edad)) || pais.trim() === "") {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    let persona = {
        "nombres": nombres,
        "edad": parseInt(edad),
        "pais": pais,
    };

    personas.push(persona);
    localStorage.setItem("personas", JSON.stringify(personas));
    mostrarDatosJson();
    document.getElementById("personasform").reset();
}

function eliminarPersona() {
    let nombreEliminar = document.getElementById("nombreEliminar").value.trim();

    if (nombreEliminar === "") {
        alert("Por favor, ingrese un nombre para eliminar.");
        return;
    }

    let index = personas.findIndex(persona => persona.nombres === nombreEliminar);
    if (index !== -1) {
        personas.splice(index, 1);
        localStorage.setItem("personas", JSON.stringify(personas));
        mostrarDatosJson();
        document.getElementById("nombreEliminar").value = "";
    } else {
        alert("No se encontró ninguna persona con el nombre especificado.");
    }
}

function recargarPagina() {
    location.reload();
}

function mostrarDatosJson() {
    console.log("Mostrando datos JSON...");
    console.log("Personas:", personas);
    let personasElement = document.getElementById("personas");
    if (personas.length > 0) {
        personasElement.textContent = JSON.stringify(personas, null, 2);
    } else {
        personasElement.textContent = "No hay personas inscritas.";
    }
}


window.onload = function() {
    let storedPersonas = localStorage.getItem("personas");
    if (storedPersonas) {
        personas = JSON.parse(storedPersonas);
        mostrarDatosJson();
    } else {
        mostrarDatosJson(); // Mostrar el mensaje de "No hay personas inscritas."
    }
};
























let figuras = []; // Array para almacenar las figuras

class Rectangulo {
    constructor(base, altura) {
        this.base = base;
        this.altura = altura;
    }

    calcularArea() {
        return (this.base * this.altura) / 2;
    }

    calcularPerimetro() {
        return this.base * 3;
    }
}

function agregarRectangulo() {
    // Obtener los datos del formulario
    let base = parseFloat(document.getElementById("base").value);
    let altura = parseFloat(document.getElementById("altura").value);

    // Crear el objeto del triángulo
    let Rectangulo = {
        "base": base,
        "altura": altura,
        "Area": base*altura,
        "Perimetro": (base*2)+(altura*2)
    }

    // Agregar el triángulo al array
    figuras.push(Rectangulo);

    // Guardar en localStorage
    localStorage.setItem("figuras", JSON.stringify(figuras));

    // Mostrar las figuras agregadas en el JSON
    mostrarDatosJson();

    // Limpiar el formulario después de agregar un triángulo
    document.getElementById("RectanguloForm").reset();
}

function mostrarDatosJson() {
    let figurasElement = document.getElementById("figuras");
    figurasElement.innerHTML = JSON.stringify(figuras, null, 2);
}


function eliminarFigura() {
    // Obtener los valores de base y altura desde el formulario
    let base = parseFloat(document.getElementById("baseEliminar").value);
    let altura = parseFloat(document.getElementById("alturaEliminar").value);

    // Llamar a la función para eliminar la figura
    eliminarFiguraFromJson(base, altura);
}

function eliminarFiguraFromJson(base, altura) {
    // Recorrer el array de figuras
    for (let i = 0; i < figuras.length; i++) {
        // Verificar si la base y la altura coinciden
        if (figuras[i].base === base && figuras[i].altura === altura) {
            // Eliminar la figura del array
            figuras.splice(i, 1);
            // Guardar en localStorage
            localStorage.setItem("figuras", JSON.stringify(figuras));
            // Mostrar las figuras actualizadas en el JSON
            mostrarDatosJson();
            return; // Salir del bucle una vez que se elimine la figura
        }
    }
    // Si no se encuentra la figura con la base y la altura especificadas
    console.log("No se encontró una figura con la base y altura especificadas.");
}


// Llamar a la función mostrarDatosJson() cuando la página se carga inicialmente
window.onload = function() {
    let storedFiguras = localStorage.getItem("figuras");
    if (storedFiguras) {
        figuras = JSON.parse(storedFiguras);
        mostrarDatosJson(); // Mostrar los datos del JSON al cargar la página
    } else {
        document.getElementById("figuras").textContent = "No hay figuras ingresadas.";
    }
};














function agregarVehiculo() {
    // Obtener los datos del formulario
    let marca = document.getElementById("marcaInput").value;
    let modelo = document.getElementById("modeloInput").value;
    let año = parseInt(document.getElementById("añoInput").value);
    let puertas = parseInt(document.getElementById("puertasInput").value);

    // Crear el objeto del vehículo
    let vehiculo = {
        "marca": marca,
        "modelo": modelo,
        "año": año,
        "puertas": puertas
    };

    // Obtener los vehículos almacenados en localStorage
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

    // Agregar el vehículo al array de vehículos
    vehiculos.push(vehiculo);

    // Guardar el array de vehículos en localStorage
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

    // Mostrar los vehículos en la página
    mostrarVehiculos();
}

// Función para eliminar un vehículo
function eliminarVehiculo() {
    // Obtener los valores del vehículo a eliminar
    let marca = document.getElementById("marcaEliminar").value;
    let modelo = document.getElementById("modeloEliminar").value;
    let año = parseInt(document.getElementById("añoEliminar").value);
    let puertas = parseInt(document.getElementById("puertasEliminar").value);

    // Obtener los vehículos almacenados en localStorage
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

    // Buscar y eliminar el vehículo del array de vehículos
    vehiculos = vehiculos.filter(function(vehiculo) {
        return !(vehiculo.marca === marca && vehiculo.modelo === modelo && vehiculo.año === año && vehiculo.puertas === puertas);
    });

    // Guardar el array actualizado de vehículos en localStorage
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

    // Mostrar los vehículos en la página
    mostrarVehiculos();
}

// Función para mostrar los vehículos en la página
function mostrarVehiculos() {
    // Obtener el elemento <ul> donde se mostrarán los vehículos
    let vehiculosList = document.getElementById("vehiculosList");

    // Limpiar la lista de vehículos antes de volver a mostrarlos
    vehiculosList.innerHTML = "";

    // Obtener los vehículos almacenados en localStorage
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

    // Recorrer los vehículos y agregar cada uno a la lista
    vehiculos.forEach(function(vehiculo) {
        // Crear un nuevo elemento <li> para cada vehículo
        let vehiculoItem = document.createElement("li");
        vehiculoItem.textContent = `Marca: ${vehiculo.marca}, Modelo: ${vehiculo.modelo}, Año: ${vehiculo.año}, Puertas: ${vehiculo.puertas}`;

        // Agregar el elemento <li> a la lista de vehículos
        vehiculosList.appendChild(vehiculoItem);
    });
}

// Mostrar los vehículos al cargar la página
window.onload = function() {
    mostrarVehiculos();
};










function mostrarpersonas() {
    document.getElementById('personasSection').style.display = 'block';
    document.getElementById('RectangulosSection').style.display = 'none';
    document.getElementById('cochesSection').style.display = 'none';
}


function mostrarRectangulo() {
    document.getElementById('personasSection').style.display = 'none';
    document.getElementById('RectangulosSection').style.display = 'block';
    document.getElementById('cochesSection').style.display = 'none';
}

function mostrarCoches() {
    document.getElementById('personasSection').style.display = 'none';
    document.getElementById('RectangulosSection').style.display = 'none';
    document.getElementById('cochesSection').style.display = 'block';
}