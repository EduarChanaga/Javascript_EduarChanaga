function imprimirTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        console.log(tablero[i].join(' '));
    }
}

function esSeguro(tablero, fila, columna) {
    // Verificar si hay una reina en la misma fila
    for (let i = 0; i < columna; i++) {
        if (tablero[fila][i] === 'R') {
            return false;
        }
    }

    // Verificar la diagonal superior izquierda
    for (let i = fila, j = columna; i >= 0 && j >= 0; i--, j--) {
        if (tablero[i][j] === 'R') {
            return false;
        }
    }

    // Verificar la diagonal inferior izquierda
    for (let i = fila, j = columna; i < 8 && j >= 0; i++, j--) {
        if (tablero[i][j] === 'R') {
            return false;
        }
    }

    return true;
}

function resolverOchoReinas(tablero, columna) {
    // Si todas las reinas están colocadas, retornar true
    if (columna >= 8) {
        return true;
    }

    // Intentar colocar esta reina en todas las filas de la columna actual
    for (let i = 0; i < 8; i++) {
        if (esSeguro(tablero, i, columna)) {
            tablero[i][columna] = 'R';

            // Recursivamente colocar el resto de las reinas
            if (resolverOchoReinas(tablero, columna + 1)) {
                return true;
            }

            // Si colocar la reina en [i][columna] lleva a una solución inválida, entonces retroceder
            tablero[i][columna] = 'O';
        }
    }

    // Si no se puede colocar la reina en ninguna fila de esta columna, retornar false
    return false;
}

function colocarReinas(fila, columna) {
    // Crear un tablero de ajedrez vacío
    let tablero = new Array(8).fill(0).map(() => new Array(8).fill('O'));

    // Colocar la primera reina en la posición dada
    tablero[fila - 1][columna - 1] = 'R';

    // Resolver el problema de las 8 reinas
    if (resolverOchoReinas(tablero, 1)) {
        // Si se encuentra una solución, imprimir el tablero
        imprimirTablero(tablero);
    } else {
        console.log("No se encontró solución.");
    }
}

// Interacción con el usuario
console.log("**Entrada:**");
console.log("Posición de la primera reina:");

// Suponiendo que recibimos la entrada del usuario en el formato "fila columna"
let entrada = "8 8";
let posicion = entrada.split(" ");
let fila = parseInt(posicion[0]);
let columna = parseInt(posicion[1]);

colocarReinas(fila, columna);
