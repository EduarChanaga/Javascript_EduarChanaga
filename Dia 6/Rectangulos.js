let camper = []; // Array para almacenar los estudiantes

/**
 * Función para agregar un estudiante al JSON y guardar en localStorage.
 */
function agregar() {
    // Obtener los datos del formulario
    let id = document.getElementById("id").value;
    let base = document.getElementById("base").value;
    let altura = document.getElementById("altura").value;
   

    // Crear el objeto del estudiante
    let student = {
        "id": id,
        "Base": base,
        "Altura": altura,
        "Area": base * altura,
        "Perimetro": (base * 2)+(altura*2)
    };

    // Agregar el estudiante al array
    camper.push(student);

    // Guardar en localStorage
    localStorage.setItem("inscritos", JSON.stringify(camper));

    // Mostrar los estudiantes agregados en el JSON
    let jsonDisplay = document.getElementById("jsonDisplay");
    jsonDisplay.innerHTML = JSON.stringify(camper, null, 2); // Mostrar JSON formateado con espacios de indentación

    // Limpiar el formulario después de agregar un estudiante
    document.getElementById("studentForm").reset();
}

function eliminar() {
    // Obtener el ID del estudiante a eliminar
    let idEliminar = document.getElementById("idEliminar").value;

    // Buscar el estudiante en el array y eliminarlo si existe
    let index = camper.findIndex(student => student.id === idEliminar);
    if (index !== -1) {
        camper.splice(index, 1); // Eliminar el estudiante del array
        localStorage.setItem("inscritos", JSON.stringify(camper)); // Actualizar localStorage

        // Mostrar los estudiantes actualizados en el JSON
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(camper, null, 2);

        // Limpiar el campo de ID para eliminar
        document.getElementById("idEliminar").value = "";
    } else {
        alert("No se encontró ningún estudiante con la ID especificada.");
    }
}

window.onload = function() {
    let storedcamper = localStorage.getItem("inscritos");
    if (storedcamper) {
        camper = JSON.parse(storedcamper);
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(camper, null, 2);
    } else {
        document.getElementById("campers").textContent = "No hay campers inscritos.";
    }
};
