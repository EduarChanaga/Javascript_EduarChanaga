document.addEventListener("DOMContentLoaded", async () => {
    const imageContainer = document.getElementById("imagen-container");
    const maxImagesPerLoad = 20; // Número máximo de imágenes por carga
    const imageUrlPrefix = 'https://search.imdbot.workers.dev/?q='; // Prefijo de la URL de la API

    // Arreglo para almacenar las imágenes cargadas
    let images = [];

    const fetchRandomImages = async () => {
        const uniqueImages = new Set(); // Conjunto para mantener un registro de imágenes únicas
        let imagesLoaded = 0;

        // Solicitar imágenes individualmente hasta alcanzar el número máximo de imágenes por carga
        while (imagesLoaded < maxImagesPerLoad) {
            const randomQuery = Math.random().toString(36).substring(7); // Generar una cadena aleatoria para la consulta
            const imageUrl = imageUrlPrefix + randomQuery;

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
                    }
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
            }
        }

        renderImages(); // Renderizar las imágenes
    };

    const renderImages = () => {
        imageContainer.innerHTML = ''; // Limpiar el contenedor de imágenes
    
        // Iterar sobre las imágenes y crear elementos <img>
        images.forEach((imageUrl, index) => {
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.classList.add('image-item'); // Agregar clase CSS para controlar el tamaño de las imágenes
    
            // Si la imagen está en la posición 8, agregar la clase ".big-image"
            if (index === 7) {
                imgElement.classList.add('big-image');
            }
    
            imgElement.addEventListener("click", () => {
                // Al hacer clic en una imagen en las posiciones 7 o 9, mover todas las imágenes
                if (index === 6 || index === 8) {
                    moveAllImages(index);
                }
            });
    
            imageContainer.appendChild(imgElement);
        });
    };
    

    const moveAllImages = (clickedIndex) => {
        const tempImages = [...images]; // Copiar las imágenes originales
        const centerIndex = Math.floor(images.length / 2); // Índice central
    
        // Si se hace clic en la imagen 9 (derecha)
        if (clickedIndex === 8) {
            const lastImage = tempImages.pop(); // Quitar la última imagen
            tempImages.unshift(lastImage); // Agregarla al principio
        }
    
        // Si se hace clic en la imagen 7 (izquierda)
        if (clickedIndex === 6) {
            const firstImage = tempImages.shift(); // Quitar la primera imagen
            tempImages.push(firstImage); // Agregarla al final
        }
    
        // Actualizar el arreglo de imágenes
        images = [...tempImages];
    
        renderImages(); // Renderizar las imágenes actualizadas
    };
    

    fetchRandomImages(); // Iniciar la obtención de imágenes al cargar la página
});
