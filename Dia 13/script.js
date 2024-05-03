let persona = []; // Array para almacenar los estudiantes

function agregar() {
    let nombres = document.getElementById("nombres").value;
    let actor = document.getElementById("actor").value;
    let edad = document.getElementById("edad").value;
    let ubicacion = document.getElementById("Ubicacion").value;
    let poster = document.getElementById("Poster").value;
    let fecha = document.getElementById("fecha").value;
    let productora = document.getElementById("Productora").value;
    let traje = document.getElementById("traje").value;

    // Crear el objeto del estudiante
    let Heroes = {
        "nombres": nombres,
        "actor": actor,
        "edad": edad,
        "ubicacion": ubicacion,
        "poster": poster,
        "fecha": fecha,
        "productora": productora,
        "traje": traje,
    };

    // Agregar el estudiante al array
    persona.push(Heroes);

    // Guardar en localStorage
    localStorage.setItem("agregados", JSON.stringify(persona));

    // Mostrar los estudiantes agregados en el JSON
    let jsonDisplay = document.getElementById("jsonDisplay");
    jsonDisplay.innerHTML = JSON.stringify(persona, null, 2); // Mostrar JSON formateado con espacios de indentación

    // Limpiar el formulario después de agregar un estudiante
    document.getElementById("HeroesForm").reset();
}

function eliminar() {
    // Obtener el ID del estudiante a eliminar
    let idEliminar = document.getElementById("idEliminar").value;

    // Buscar el estudiante en el array y eliminarlo si existe
    let index = persona.findIndex(Heroes => Heroes.nombres === idEliminar);
    if (index !== -1) {
        persona.splice(index, 1); // Eliminar el estudiante del array
        localStorage.setItem("agregados", JSON.stringify(persona)); // Actualizar localStorage

        // Mostrar los estudiantes actualizados en el JSON
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(persona, null, 2);

        // Limpiar el campo de ID para eliminar
        document.getElementById("idEliminar").value = "";
    } else {
        alert("No se encontró ningún estudiante con la ID especificada.");
    }
}

window.onload = function() {
    let storedpersona = localStorage.getItem("agregados");
    if (storedpersona) {
        persona = JSON.parse(storedpersona);
        let jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = JSON.stringify(persona, null, 2);
    } else {
        document.getElementById("personas").textContent = "No hay personas agregados.";
    }
};


var addid = 0;

function agregar_trajes(addid){
    var docstyle = document.getElementById('nombre_trajes').style.display;
    if(docstyle == 'none')
        document.getElementById('addlist').style.display = '';

    addid++;

    var text = "<div id='additem_"+addid+"'><p id='p'>Nombre traje:</p><input id='traje' type='text' size='100' value='' class='buckinput' name='items[]' style='padding:5px;' /></div>";

    document.getElementById('nombre_trajes').innerHTML += text;
}

function trajes(){
    var el = document.getElementById("trajes");
el.setAttribute("style", "display: content;");
}



let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
            location.reload();
})