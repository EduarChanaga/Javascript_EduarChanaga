document.addEventListener("DOMContentLoaded", async () => {
    const imageContainer = document.getElementById("imagen-container");
    const banner = document.getElementById("banner");
    const maxImagesPerLoad = 20; // Reducir el número máximo de imágenes por carga
    const imageUrlPrefix = 'https://search.imdbot.workers.dev/?q='; // Prefijo de la URL de la API

    // Arreglo para almacenar las imágenes cargadas
    let images = [];

    const generateRandomQuery = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'; // Alfabeto
        const vowels = 'aeiou'; // Vocales
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        const randomLetter2 = alphabet[Math.floor(Math.random() * alphabet.length)]; // Letra aleatoria del alfabeto
        const randomVowel = vowels[Math.floor(Math.random() * vowels.length)]; // Vocal aleatoria
        return randomLetter + randomVowel + randomLetter2; // Combinación de letra, vocal y letra
    };

    const fetchRandomImages = async () => {
        const uniqueImages = new Set(); // Conjunto para mantener un registro de imágenes únicas
        let imagesLoaded = 0;

        // Solicitar imágenes individualmente hasta alcanzar el número máximo de imágenes por carga
        while (imagesLoaded < maxImagesPerLoad) {
            const randomQuery = generateRandomQuery(); // Generar la consulta aleatoria
            const imageUrl = imageUrlPrefix + randomQuery;

            console.log("Solicitando imagen:", imageUrl); // Imprimir la URL de la imagen solicitada

            try {
                const response = await fetch(imageUrl);
                const data = await response.json();

                if (data.description && data.description.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.description.length);
                    let imageSrc = data.description[randomIndex]["#IMG_POSTER"];

                    // Verificar si la imagen está definida
                    if (!imageSrc) {
                        imageSrc = "./storage/loadimage.jpg"; // Establecer la imagen de carga predeterminada
                    }

                    if (!uniqueImages.has(imageSrc)) { // Verificar si la imagen es única
                        uniqueImages.add(imageSrc); // Agregar la imagen al conjunto de imágenes únicas
                        images.push(imageSrc); // Agregar la imagen al arreglo
                        imagesLoaded++; // Incrementar el contador de imágenes cargadas

                        console.log("Imagen cargada:", imageSrc); // Imprimir la URL de la imagen cargada
                    }
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
            }
        }

        renderImages(); // Renderizar las imágenes
    };

    const renderImages = () => {
        // Almacenar el contenido HTML de las imágenes antes de actualizar
        const previousHTML = imageContainer.innerHTML;

        // Limpiar el contenedor de imágenes
        imageContainer.innerHTML = '';

        // Iterar sobre las imágenes y crear elementos <img>
        images.forEach((imageUrl, index) => {
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.classList.add('image-item'); // Agregar clase CSS para controlar el tamaño de las imágenes

            // Si la imagen está en la posición 8, agregar la clase ".big-image"
            if (index === 7) {
                imgElement.classList.add('big-image');
                imgElement.onload = () => {
                    // Cambiar la imagen de fondo del div "banner" cuando la imagen en la posición 8 haya cargado
                    document.getElementById('banner').style.backgroundImage = `url('${imageUrl}')`;
                };
            }

            imageContainer.appendChild(imgElement);
        });

        // Restaurar el contenido HTML de las imágenes que no han cambiado
        const newHTML = imageContainer.innerHTML;
        if (previousHTML === newHTML) {
            imageContainer.innerHTML = previousHTML;
        }
    };

    const moveAllImages = (direction) => {
        const tempImages = [...images]; // Copiar las imágenes originales

        if (direction === 'left') {
            const lastImage = tempImages.pop(); // Quitar la última imagen
            tempImages.unshift(lastImage); // Agregarla al principio
        } else if (direction === 'right') {
            const firstImage = tempImages.shift(); // Quitar la primera imagen
            tempImages.push(firstImage); // Agregarla al final
        }

        // Actualizar el arreglo de imágenes
        images = [...tempImages];

        renderImages(); // Renderizar las imágenes actualizadas
    };

    // Manejar eventos de teclado
    document.addEventListener("keydown", (event) => {
        if (event.key === 'ArrowLeft') {
            moveAllImages('left'); // Mover las imágenes a la izquierda al presionar la tecla de flecha izquierda
        } else if (event.key === 'ArrowRight') {
            moveAllImages('right'); // Mover las imágenes a la derecha al presionar la tecla de flecha derecha
        }
    });

    fetchRandomImages(); // Iniciar la obtención de imágenes al cargar la página
});
