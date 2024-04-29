// Constante para la URL de la API
const API_URL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=20';

// Variables para los mazos de jugador y computadora, puntajes y ID del mazo
let jugadorMazo = [];
let computadoraMazo = [];
let puntajeJugador = 0;
let puntajeComputadora = 0;
let deckId = null;

// Función principal para iniciar el juego
async function iniciarJuego() {
    // Realiza una solicitud a la API para obtener un nuevo mazo
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    // El await se utiliza en JavaScript junto con funciones async para esperar 
    // la finalización de una operación asíncrona antes de continuar 
    // con la ejecución del código. 



    deckId = datos.deck_id;
    // Distribuye las cartas entre el jugador y la computadora
    jugadorMazo = datos.cards.slice(0, 10);
    computadoraMazo = datos.cards.slice(10, 20);

    // Muestra las cartas del jugador en la interfaz gráfica
    mostrarCartasEnMano(jugadorMazo, 'jugador');
}

// Función para mostrar las cartas en la mano del jugador o la computadora
function mostrarCartasEnMano(cartas, jugador) {
    const contenedor = document.getElementById(jugador === 'jugador' ? 'mano-jugador' : 'mano-computadora');
    contenedor.innerHTML = '';

    // Crea elementos de imagen para cada carta y los muestra en el contenedor adecuado
    // Itera sobre cada carta en el arreglo de cartas
cartas.forEach((carta, index) => {
    // Crea un nuevo elemento de imagen (<img>) para representar la carta
    const elementoCarta = document.createElement('img');

    // Establece la clase del elemento de imagen como 'card'
    elementoCarta.className = 'card';

    // Asigna la URL de la imagen de la carta al atributo src del elemento de imagen
    elementoCarta.src = carta.image;

    // Establece el texto alternativo del elemento de imagen con el valor y el palo de la carta
    elementoCarta.alt = `${carta.value} ${carta.suit}`;

    // Asigna un evento onclick al elemento de imagen para manejar el clic en la carta
    elementoCarta.onclick = () => jugarCarta(jugador, carta, index);

    // Agrega el elemento de imagen al contenedor especificado
    contenedor.appendChild(elementoCarta);
});
}

// Función para jugar una carta
function jugarCarta(jugador, cartaJugada, index) {
    // Verifica si se pueden jugar cartas
    if (!cartasHabilitadas) {
        return;
    }

    // Deshabilita temporalmente la jugabilidad para evitar múltiples clics
    cartasHabilitadas = false;

    // Selecciona aleatoriamente una carta del mazo de la computadora
    const cartaComputadora = computadoraMazo[Math.floor(Math.random() * computadoraMazo.length)];

    // Muestra las cartas seleccionadas durante la ronda
    mostrarCartasSeleccionadas(cartaJugada, cartaComputadora);

    // Espera un tiempo antes de continuar con la comparación de cartas y la actualización de puntajes
    setTimeout(() => {
        const resultado = compararCartas(cartaJugada, cartaComputadora);
        actualizarPuntaje(resultado);

        // Elimina las cartas jugadas de los respectivos mazos
        jugadorMazo.splice(index, 1);
        computadoraMazo.splice(computadoraMazo.indexOf(cartaComputadora), 1);

        // Muestra las nuevas manos en la interfaz gráfica
        mostrarCartasEnMano(jugadorMazo, 'jugador');
        ocultarCartaComputadora();

        // Habilita nuevamente la jugabilidad después de un tiempo
        setTimeout(() => {
            cartasHabilitadas = true;
        }, 2000);
    }, 2000);
}

// Función para mostrar las cartas seleccionadas durante la ronda
function mostrarCartasSeleccionadas(cartaJugador, cartaComputadora) {
    const contenedorCartas = document.getElementById('cartas-seleccionadas');
    contenedorCartas.innerHTML = '';

    // Crea elementos de imagen para las cartas seleccionadas y las muestra en el contenedor
    // Creación del elemento de imagen para la carta del jugador
const cartaJugadorElemento = document.createElement('img');

            // Asignación de la clase al elemento de imagen
            cartaJugadorElemento.className = 'carta-seleccionada';

            // Asignación de la URL de la imagen de la carta del jugador al atributo src del elemento de imagen
            cartaJugadorElemento.src = cartaJugador.image;

            // Asignación del texto alternativo al elemento de imagen para accesibilidad e información adicional
            cartaJugadorElemento.alt = `${cartaJugador.value} ${cartaJugador.suit}`;

            // Agregar el elemento de imagen de la carta del jugador al contenedor de cartas seleccionadas en la interfaz
            contenedorCartas.appendChild(cartaJugadorElemento);


    const vsElemento = document.createElement('span');
    vsElemento.className = 'vs';
    vsElemento.textContent = 'vs';
    contenedorCartas.appendChild(vsElemento);

    const cartaComputadoraElemento = document.createElement('img');
    cartaComputadoraElemento.className = 'carta-seleccionada';
    cartaComputadoraElemento.src = cartaComputadora.image;
    cartaComputadoraElemento.alt = `${cartaComputadora.value} ${cartaComputadora.suit}`;
    contenedorCartas.appendChild(cartaComputadoraElemento);

    // Limpia las cartas seleccionadas después de un tiempo para mostrar solo durante la comparación
    setTimeout(() => {
        contenedorCartas.innerHTML = '';
    }, 2000);

    //Obtención del contenedor de cartas: Busca en el HTML el elemento que servirá para mostrar las cartas seleccionadas.

    //Creación de elementos de imagen: Crea imágenes para representar las cartas del jugador y la computadora. 
    //Asigna la URL de la imagen de cada carta (cartaJugador.image y cartaComputadora.image) a estos elementos de imagen.

    //Añadir elementos al contenedor: Coloca las imágenes de las cartas del jugador y la computadora, junto con un texto "vs" para indicar la comparación, 
    //dentro del contenedor obtenido en el paso 1.

    //Limpieza después de un tiempo: Después de 2 segundos, elimina las imágenes y el texto del contenedor para preparar la interfaz para la siguiente
    // acción del juego.
}

// Variable para controlar si se pueden jugar cartas
let cartasHabilitadas = true;

// Función para comparar las cartas jugadas
function compararCartas(cartaJugador, cartaComputadora) {
    // Obtiene los valores numéricos de las cartas para comparar
    const valorCartaJugador = getValorCarta(cartaJugador);
    const valorCartaComputadora = getValorCarta(cartaComputadora);

    // Compara los valores y devuelve un mensaje con el resultado de la ronda
    if (valorCartaJugador > valorCartaComputadora) {
        return 'Ganaste la ronda!';
    } else if (valorCartaJugador < valorCartaComputadora) {
        return 'La Computadora ganó la ronda.';
    } else {
        return 'Empate en la ronda.';
    }
}

// Función para obtener el valor numérico de una carta
function getValorCarta(carta) {
    // Define los valores numéricos para las cartas, considerando ases, reyes, reinas y jotas
    const valores = {
        'ACE': 14,
        'KING': 13,
        'QUEEN': 12,
        'JACK': 11
    };
    // Retorna el valor numérico de la carta o su valor entero si no es un as, rey, reina o jota
    return valores[carta.value] || parseInt(carta.value);
}

// Función para actualizar los puntajes según el resultado de la ronda
function actualizarPuntaje(resultado) {
    // Actualiza los puntajes del jugador y la computadora según el resultado
    if (resultado === 'Ganaste la ronda!') {
        puntajeJugador++;
    } else if (resultado === 'La Computadora ganó la ronda.') {
        puntajeComputadora++;
    }
    // Muestra los puntajes actualizados en la interfaz gráfica
    document.getElementById('info-juego').textContent = `Puntuación Jugador: ${puntajeJugador} | Puntuación Computadora: ${puntajeComputadora}`;
}

// Función para mostrar al ganador del juego
function mostrarGanador() {
    let mensaje = '';
    // Determina quién ganó el juego basándose en los puntajes finales
    if (puntajeJugador > puntajeComputadora) {
        mensaje = '¡Felicidades, has ganado!';
    } else if (puntajeJugador < puntajeComputadora) {
        mensaje = 'La Computadora ha ganado.';
    } else {
        mensaje = 'Empate.';
    }
    // Muestra el mensaje del ganador en la interfaz gráfica
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<h1>${mensaje}</h1>`;
}

// Función para ocultar la carta de la computadora en la interfaz gráfica
function ocultarCartaComputadora() {
    const cartaComputadora = document.getElementById('carta-computadora');
    cartaComputadora.style.display = 'none';
}

// Función para mostrar la carta de la computadora en la interfaz gráfica
function mostrarCartaComputadora(carta) {
    const cartaComputadora = document.getElementById('carta-computadora');
    cartaComputadora.src = carta.image;
    cartaComputadora.alt = `${carta.value} ${carta.suit}`;
    cartaComputadora.style.display = 'block';
}

// Evento al cargar el documento para iniciar el juego
document.addEventListener('DOMContentLoaded', iniciarJuego);
