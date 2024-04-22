// Definición de la clase Vehículo
class Vehiculo {
    constructor(marca, modelo, año) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }

    // Método para mostrar los detalles del vehículo
    mostrarDetalles() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.año}`;
    }
}

// Definición de la subclase Coche que hereda de Vehículo
class Coche extends Vehiculo {
    constructor(id, marca, modelo, año, numPuertas) {
        super(marca, modelo, año);
        this.id = id;
        this.numPuertas = numPuertas;
    }

    // Método para mostrar los detalles del coche, incluyendo el número de puertas
    mostrarDetalles() {
        return `${super.mostrarDetalles()}, Número de Puertas: ${this.numPuertas}`;
    }
}

let coches = []; // Array para almacenar los coches

// Función para agregar un coche al JSON
function agregar() {
    // Obtener los datos del formulario
    let id = document.getElementById("id").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let año = document.getElementById("año").value;
    let puertas = document.getElementById("puertas").value;

    // Crear el objeto del coche
    let car = new Coche(id, marca, modelo, año, puertas);

    // Agregar el coche al array
    coches.push(car);

    // Mostrar los coches agregados en el JSON
    let jsonDisplay = document.getElementById("jsonDisplay");
    jsonDisplay.innerHTML = JSON.stringify(coches, null, 2); // Mostrar JSON formateado con espacios de indentación

    // Limpiar el formulario después de agregar un coche
    document.getElementById("studentForm").reset();
}

// Función para eliminar un coche del JSON
function eliminar() {
    // Obtener el ID del coche a eliminar
    let idEliminar = document.getElementById("idEliminar").value;

    // Buscar el coche en el array y eliminarlo si existe
    let index = coches.findIndex(car => car.id === idEliminar);
    if (index !== -1) {
        coches.splice(index, 1); // Eliminar el coche del array

        // Mostrar los coches actualizados en el JSON
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(coches, null, 2);

        // Limpiar el campo de ID para eliminar
        document.getElementById("idEliminar").value = "";
    } else {
        alert("No se encontró ningún coche con la ID especificada.");
    }
}

window.onload = function() {
    let storedCoches = localStorage.getItem("inscritos");
    if (storedCoches) {
        coches = JSON.parse(storedCoches);
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(coches, null, 2);
    } else {
        document.getElementById("campers").textContent = "No hay coches inscritos.";
    }
};
