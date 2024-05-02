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
    const contenedor = document.getElementById(jugador === 'jugador' ? 'mano-jugador' : 'cartas-computadora-container');

    // Si el jugador es la computadora, agregamos las cartas nuevas a las anteriores
    if (jugador === 'computadora') {
        cartas.forEach(carta => {
            const elementoCarta = document.createElement('img');
            elementoCarta.className = 'card';
            elementoCarta.src = carta.image;
            elementoCarta.alt = `${carta.value} ${carta.suit}`;
            contenedor.appendChild(elementoCarta);
        });
    } else { // Si el jugador es el jugador humano, mantenemos el comportamiento actual
        contenedor.innerHTML = '';
        cartas.forEach((carta, index) => {
            const elementoCarta = document.createElement('img');
            elementoCarta.className = 'card';
            elementoCarta.src = carta.image;
            elementoCarta.alt = `${carta.value} ${carta.suit}`;
            elementoCarta.onclick = () => jugarCarta(jugador, carta, index);
            contenedor.appendChild(elementoCarta);
        });
    }
}

let mostrandoCartasComputadora = false;

// Función para jugar una carta
function jugarCarta(jugador, cartaJugada, index) {
    // Deshabilita temporalmente la jugabilidad para evitar múltiples clics
    cartasHabilitadas = false;

    // Reproduce el sonido de clic
    const sonidoClick = document.getElementById('sonidoClick');
    sonidoClick.play();

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

        // Actualiza las cartas de la computadora en el contenedor
        const contenedorCartasComputadora = document.getElementById('cartas-computadora-container');
        contenedorCartasComputadora.innerHTML = ''; // Limpiamos el contenedor antes de agregar las nuevas cartas
        mostrarCartasEnMano(computadoraMazo, 'computadora');

        // Verifica si ambos jugadores se quedaron sin cartas
        if (jugadorMazo.length === 0 && computadoraMazo.length === 0) {
            // Si ambos jugadores se quedaron sin cartas, muestra al ganador
            mostrarGanador();
        } else {
            // Si no, habilita nuevamente la jugabilidad después de un tiempo
            setTimeout(() => {
                cartasHabilitadas = true;
            }, 1000); // Reducir el tiempo de espera a 1000 milisegundos (1 segundo)
        }
    }, 1000); // Reducir el tiempo de espera a 1000 milisegundos (1 segundo)
}






// Evento de clic para el botón de ver cartas de la computadora
document.getElementById('ver-cartas-computadora-btn').addEventListener('click', () => {
    mostrandoCartasComputadora = true;
    mostrarCartasComputadora();
});

// Función para mostrar las cartas de la computadora
function mostrarCartasComputadora() {
    // Mostrar el contenedor de las cartas de la computadora
    const contenedorCartas = document.getElementById('cartas-computadora-container');
    contenedorCartas.style.display = 'block';
    document.getElementById('ver-cartas-computadora-btn').style.display = 'none';
    document.getElementById('cerrar-cartas-computadora-btn').style.display = 'block';

    // Mostrar cada carta de la computadora en el contenedor
    computadoraMazo.forEach((carta) => {
        const elementoCarta = document.createElement('img');
        elementoCarta.className = 'card';
        elementoCarta.src = carta.image;
        elementoCarta.alt = `${carta.value} ${carta.suit}`;
        contenedorCartas.appendChild(elementoCarta);
    });

    // Ocultar el botón después de mostrar las cartas
    document.getElementById('ver-cartas-computadora-btn').style.display = 'none';
}

// Función para cerrar la ventana de las cartas de la computadora
function cerrarCartasComputadora() {
    const contenedorCartas = document.getElementById('cartas-computadora-container');
    contenedorCartas.innerHTML = ''; // Limpiar el contenido del contenedor
    contenedorCartas.style.display = 'none'; // Ocultar el contenedor
    mostrandoCartasComputadora = false; // Restablecer la variable global
    document.getElementById('ver-cartas-computadora-btn').style.display = 'block'; // Mostrar nuevamente el botón
}

// Función para mostrar las cartas seleccionadas durante la ronda
function mostrarCartasSeleccionadas(cartaJugador, cartaComputadora) {
    const contenedorCartas = document.getElementById('cartas-seleccionadas');
    contenedorCartas.innerHTML = '';

    // Creación del elemento de imagen para la carta del jugador
    const cartaJugadorElemento = document.createElement('img');
    cartaJugadorElemento.className = 'carta-seleccionada';
    cartaJugadorElemento.src = cartaJugador.image;
    cartaJugadorElemento.alt = `${cartaJugador.value} ${cartaJugador.suit}`;
    contenedorCartas.appendChild(cartaJugadorElemento);

    const vsElemento = document.createElement('span');
    vsElemento.className = 'vs';
    vsElemento.textContent = 'vs';
    contenedorCartas.appendChild(vsElemento);

    // Creación del elemento de imagen para la carta de la computadora
    const cartaComputadoraElemento = document.createElement('img');
    cartaComputadoraElemento.className = 'carta-seleccionada';
    cartaComputadoraElemento.src = cartaComputadora.image;
    cartaComputadoraElemento.alt = `${cartaComputadora.value} ${cartaComputadora.suit}`;
    contenedorCartas.appendChild(cartaComputadoraElemento);

    // Limpieza después de un tiempo para mostrar solo durante la comparación
    setTimeout(() => {
        contenedorCartas.innerHTML = '';
    }, 1000); // Reducir el tiempo de espera a 1000 milisegundos (1 segundo)
}
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

// Función para mostrar al ganador del juego y las victorias de ambos jugadores
function mostrarGanador() {
    let mensaje = '';
    let img = '';
    // Determina quién ganó el juego basándose en los puntajes finales
    if (puntajeJugador > puntajeComputadora) {
        mensaje = '¡Felicidades, has ganado!';
        img = 'persona.png';
        // Incrementa el contador de victorias del jugador
        const victoriasJugador = parseInt(localStorage.getItem('victoriasJugador')) || 0;
        localStorage.setItem('victoriasJugador', victoriasJugador + 1);
    } else if (puntajeJugador < puntajeComputadora) {
        mensaje = 'La Computadora ha ganado.';
        img = 'computadora.png';
        // Incrementa el contador de victorias de la computadora
        const victoriasComputadora = parseInt(localStorage.getItem('victoriasComputadora')) || 0;
        localStorage.setItem('victoriasComputadora', victoriasComputadora + 1);
    } else {
        mensaje = 'Empate.';
    }
    // Muestra el mensaje del ganador en la interfaz gráfica
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
    <h1>${mensaje}</h1>
    <img src="./storage/${img}" width="300" alt="imagen del ganador">
    `;

    // Mostrar el número total de victorias del jugador y la computadora
    const totalVictoriasJugador = parseInt(localStorage.getItem('victoriasJugador')) || 0;
    const totalVictoriasComputadora = parseInt(localStorage.getItem('victoriasComputadora')) || 0;
   
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
document.addEventListener('DOMContentLoaded', () => {
    iniciarJuego();
    mostrarTotalVictorias();
});



// Función para mostrar al ganador del juego y actualizar el contador de victorias
function mostrarGanador() {
    let mensaje = '';
    let img = '';
    // Determina quién ganó el juego basándose en los puntajes finales
    if (puntajeJugador > puntajeComputadora) {
        mensaje = '¡Felicidades, has ganado!';
        img = 'persona.png';
        // Incrementa el contador de victorias del jugador
        const victoriasJugador = parseInt(localStorage.getItem('victoriasJugador')) || 0;
        localStorage.setItem('victoriasJugador', victoriasJugador + 1);
    } else if (puntajeJugador < puntajeComputadora) {
        mensaje = 'La Computadora ha ganado.';
        img = 'computadora.png';
        // Incrementa el contador de victorias de la computadora
        const victoriasComputadora = parseInt(localStorage.getItem('victoriasComputadora')) || 0;
        localStorage.setItem('victoriasComputadora', victoriasComputadora + 1);
    } else {
        mensaje = 'Empate.';
        img = 'empate.png';
    }
    // Muestra el mensaje del ganador en la interfaz gráfica
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
    <h1>${mensaje}</h1>
    <img src="./storage/${img}" width="300" alt="imagen del ganador">
    `;

    // Actualiza y muestra el número total de victorias del jugador y la computadora
    mostrarTotalVictorias();
}

                            // Función para mostrar el número total de victorias del jugador y la computadora
                            function mostrarTotalVictorias() {
                                const victoriasJugador = parseInt(localStorage.getItem('victoriasJugador')) || 0;
                                const victoriasComputadora = parseInt(localStorage.getItem('victoriasComputadora')) || 0;

                                const victoriasJugadorDiv = document.getElementById('victorias-jugador');
                                const victoriasComputadoraDiv = document.getElementById('victorias-computadora');

                                victoriasJugadorDiv.textContent = `Total de victorias del jugador: ${victoriasJugador}`;
                                victoriasComputadoraDiv.textContent = `Total de victorias de la computadora: ${victoriasComputadora}`;
                            }
// Evento al cargar el documento para iniciar el juego
document.addEventListener('DOMContentLoaded', iniciarJuego);



// Obtén el elemento de audio
const audio = document.getElementById('baraja');

// Aumenta la velocidad de reproducción al doble
audio.playbackRate = 3;
