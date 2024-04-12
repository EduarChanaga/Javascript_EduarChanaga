let campers = []; // Ahora campers es un array
dato=true;
while (dato==true) {
    let tipo_de_usuario = parseInt(prompt("¿A qué módulo desea ingresar?\n1. Camper\n2. Trainer\n3. Coordinación\n4. Reportes\n5. Cerrar"));

    if (tipo_de_usuario === 1) {
        let pree_registro = parseInt(prompt("¿Desea realizar el Pre-Registro a campus?\n1. Sí\n2. No"));

        if (pree_registro === 1) {
            console.log("Pre-Registro a Campus");

            let nuevo_dato = {
                "n_identificacion": prompt("Número de identificación: "),
                "Nombre": prompt("Nombre completo: "),
                "Direccion": prompt("Dirección: "),
                "Acudiente": prompt("Nombre acudiente: "),
                "Celular": prompt("Número celular: "),
                "Fijo": prompt("Número fijo: "),
                "Estado": "proceso_de_inscripcion",
                "Riesgo": ""
            };
            
            // Agregar el nuevo dato al array campers
            campers.push(nuevo_dato);
            console.log("Datos del camper almacenados correctamente.");
            
            // Mostrar los datos en la consola
            console.log("Datos del camper:", nuevo_dato);
            
            // Guardar campers en el almacenamiento local del navegador como un string
            localStorage.setItem('campers', JSON.stringify(campers));
            console.log("Datos guardados en el almacenamiento local del navegador");
        } else {
            console.log("Volviendo al inicio");
        }
    };

    if (tipo_de_usuario === 2) {
        console.log("Trainer");
        let trainer_opciones = parseInt(prompt("¿Qué desea realizar?\n1. Ver grupos según entrenador asignado\n2. Ingresar notas de campers\n3. Salir"));
        if (trainer_opciones === 1) {

        }

        if (trainer_opciones === 2) {
            let notacamper = prompt("Ingresar notas de campers");
        }

        if (trainer_opciones === 3) {
            dato = false;
        }
    }

    if (tipo_de_usuario === 3) {
        let cordinador_opciones = prompt(" ¿Que desea realizar?\n 1. Ver opciones sobre los campers\n 2. Ver opciones sobre los trainers\n 3. Grupos (creación, vista...)\n 4. Salir");
        if (cordinador_opciones === 1) {
            let opcion = prompt("1. Inscripción (Autorizar campers para realizar la prueba de ingreso)\n2. Ingresar la nota de los campers que se han registrado\n3. Matriculas (Asignar grupo a camper Aprobado)\n4. Graduar campers (comprueba que todos los módulos fueron realizados)\n5. Expulsar campers\n6. Modificar nota de módulo de camper\n7. Salir");
        }

        if (cordinador_opciones === 2) {
            let opcion = prompt("1. Ingreso de trainer\n2. Ver rutas según trainers\n3. Ver información de trainer\n4. Salir");
        }
        if (cordinador_opciones === 3) {
            let opcion = prompt("1. Crear grupo\n2. Ver grupos\n3. Modificar grupo\n4. Eliminar grupo\n5. Salir");
        }
    };

    if (tipo_de_usuario === 4) {
        let reporte_opciones = prompt("1. Listar los campers que se encuentren en estado de inscrito.\n2. Listar los campers que aprobaron el examen inicial.\n3. Listar los entrenadores que se encuentran trabajando con CampusLands.\n4. Listar los campers que cuentan con bajo rendimiento.\n5. Listar los campers y trainers que se encuentren asociados a una ruta de entrenamiento.\n6. Mostrar cuantos campers perdieron y aprobaron cada uno de los módulos teniendo en cuenta la ruta de entrenamiento y el entrenador encargado.\n7. Salir");
    };
    if (tipo_de_usuario === 5) {
        dato = false;
    };
}
