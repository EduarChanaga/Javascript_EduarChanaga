let camper = []; // Array para almacenar los estudiantes

/**
 * Función para agregar un estudiante al JSON y guardar en localStorage.
 */
function agregarCamper() {
    // Obtener los datos del formulario
    let id = document.getElementById("id").value;
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
    let direccion = document.getElementById("direccion").value;
    let acudiente = document.getElementById("acudiente").value;
    let celular = document.getElementById("celular").value;
    let fijo = document.getElementById("fijo").value;

    // Crear el objeto del estudiante
    let student = {
        "id": id,
        "nombres": nombres,
        "apellidos": apellidos,
        "direccion": direccion,
        "acudiente": acudiente,
        "celular": celular,
        "fijo": fijo,
        "Estado": "Inscrito",
        "Grupo": "",
        "modulos": {
            "Fundamentos de programacion": 0,
            "programacion web": 0,
            "programacion formal": 0,
            "bases de datos": 0,
            "backend": 0
        }
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

/**
 * Función para cambiar el estado de un camper a "Cursando".
 */
function cambiarACamper() {
    // Obtener el ID del camper a cambiar
    let idCambiar = document.getElementById("idMatricular").value;

    // Buscar el camper en el array y cambiar su estado a "Cursando"
    let index = camper.findIndex(student => student.id === idCambiar);
    if (index !== -1) {
        camper[index].Estado = "Cursando"; // Cambiar el estado del camper
        localStorage.setItem("inscritos", JSON.stringify(camper)); // Actualizar localStorage

        // Mostrar los campers y estudiantes actualizados en el JSON
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(camper, null, 2);

        // Limpiar el campo de ID para cambiar a camper
        document.getElementById("idMatricular").value = "";
    } else {
        alert("No se encontró ningún estudiante con la ID especificada.");
    }
}

/**
 * Función para cambiar el estado de un camper a "Graduado".
 */
function cambiarAGraduado() {
    // Obtener el ID del camper a graduar
    let idCambiar = document.getElementById("idGraduar").value;

    // Buscar el camper en el array y cambiar su estado a "Graduado"
    let index = camper.findIndex(student => student.id === idCambiar);
    if (index !== -1) {
        camper[index].Estado = "Graduado"; // Cambiar el estado del camper a "Graduado"
        localStorage.setItem("inscritos", JSON.stringify(camper)); // Actualizar localStorage

        // Mostrar los campers y estudiantes actualizados en el JSON
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(camper, null, 2);

        // Limpiar el campo de ID para cambiar a camper
        document.getElementById("idGraduar").value = "";
    } else {
        alert("No se encontró ningún estudiante con la ID especificada.");
    }
}

/**
 * Función para eliminar un estudiante inscrito.
 */
function eliminarInscrito() {
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

/**
 * Función para cambiar el grupo de un estudiante.
 */
function cambiarGrupo() {
    // Obtener el ID del estudiante a cambiar
    let idCambiar = document.getElementById("idCambiar").value;
    let nuevoGrupo = document.getElementById("nuevoGrupo").value;

    // Verificar que el nuevo grupo sea uno de los grupos válidos
    let gruposValidos = ["p1", "p2", "j1", "j2", "m1", "m2"];
    if (!gruposValidos.includes(nuevoGrupo)) {
        alert("El grupo ingresado no es válido. Los grupos válidos son: p1, p2, j1, j2, m1, m2.");
        return;
    }

    // Buscar el camper en el array y cambiar su grupo
    let index = camper.findIndex(student => student.id === idCambiar);
    if (index !== -1) {
        camper[index].Grupo = nuevoGrupo; // Cambiar el grupo del camper
        localStorage.setItem("inscritos", JSON.stringify(camper)); // Actualizar localStorage

        // Mostrar los campers y estudiantes actualizados en el JSON
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(camper, null, 2);

        // Limpiar los campos de ID y nuevo grupo
        document.getElementById("idCambiar").value = "";
        document.getElementById("nuevoGrupo").value = "";
    } else {
        alert("No se encontró ningún estudiante con la ID especificada.");
    }
}

/**
 * Función para modificar la nota de un módulo de un estudiante.
 */
function modificarModulo() {
    // Obtener el ID del estudiante a modificar y la nueva nota del módulo
    let idModificar = document.getElementById("idModificar").value;
    let modulo = document.getElementById("modulo").value;
    let nuevaNota = parseInt(document.getElementById("nuevaNota").value); // Capturar nueva nota como entero

    // Verificar si la nueva nota es válida (entre 0 y 100)
    if (isNaN(nuevaNota) || nuevaNota < 0 || nuevaNota > 100) {
        alert("Ingrese una nota válida entre 0 y 100.");
        return;
    }

    // Buscar el estudiante en el array y modificar la nota del módulo
    let index = camper.findIndex(student => student.id === idModificar);
    if (index !== -1) {
        camper[index].modulos[modulo] = nuevaNota; // Cambiar la nota del módulo
        localStorage.setItem("inscritos", JSON.stringify(camper)); // Actualizar localStorage

        // Mostrar los estudiantes actualizados en el JSON
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(camper, null, 2);

        // Limpiar los campos para modificar módulo
        document.getElementById("idModificar").value = "";
        document.getElementById("modulo").value = "";
        document.getElementById("nuevaNota").value = "";
    } else {
        alert("No se encontró ningún estudiante con la ID especificada.");
    }
}

/**
 * Función para cargar los estudiantes desde localStorage al cargar la página.
 */
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






/**
 * Función para mostrar la sección de Campers y ocultar las secciones de Trainers y Coordinación.
 */
function mostrarCampers() {
    document.getElementById('campersSection').style.display = 'block';
    document.getElementById('trainersSection').style.display = 'none';
    document.getElementById('coordinacionSection').style.display = 'none';
}

/**
 * Función para mostrar la sección de Trainers y ocultar las secciones de Campers y Coordinación.
 */
function mostrarTrainers() {
    document.getElementById('campersSection').style.display = 'none';
    document.getElementById('trainersSection').style.display = 'block';
    document.getElementById('coordinacionSection').style.display = 'none';
}

/**
 * Función para mostrar la sección de Coordinación y ocultar las secciones de Campers y Trainers.
 */
function mostrarCoordinacion() {
    document.getElementById('campersSection').style.display = 'none';
    document.getElementById('trainersSection').style.display = 'none';
    document.getElementById('coordinacionSection').style.display = 'block';
}
