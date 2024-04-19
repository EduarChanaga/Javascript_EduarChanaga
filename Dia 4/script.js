let persona = {
    nombre: "María",
    edad: 25,
    genero: "femenino",
    ocupacion: "abogada"
};

let coche = {
    marca: "Honda",
    modelo: "Civic",
    año: 2023,
    color: "azul"
};

let libro = {
    titulo: "El Alquimista",
    autor: "Paulo Coelho",
    añoPublicacion: 1988,
    genero: "ficcion"
};

let numero = Math.floor(Math.random() * 100); // Genera un número aleatorio entre 0 y 99

function suma(a, b) {
    return a + b;
}

// Mostrar los objetos y el resultado de la función en la consola
console.log("Persona:", persona);
console.log("Coche:", coche);
console.log("Libro:", libro);
console.log("Número aleatorio:", numero);
console.log("Suma:", suma(15, 30)); // Resultado: 45
