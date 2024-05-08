document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("imageContainer");
    const loadMoreButton = document.getElementById("loadMoreButton");
    const fondoDiv = document.getElementById("fondo");
    const maxImagesPerLoad = 5; // Número máximo de imágenes por carga
    const imageUrlPrefix = 'https://search.imdbot.workers.dev/?q='; // Prefijo de la URL de la API
    let loadedImages = 0; // Contador de imágenes cargadas

    const fetchRandomImages = async () => {
        const uniqueImages = new Set(); // Conjunto para mantener un registro de imágenes únicas

        while (uniqueImages.size < maxImagesPerLoad) { // Mientras no se hayan obtenido todas las imágenes deseadas
            const randomQuery = Math.random().toString(36).substring(7); // Generar una cadena aleatoria para la consulta
            const imageUrl = imageUrlPrefix + randomQuery;

            try {
                const response = await fetch(imageUrl);
                const data = await response.json();

                if (data.description && data.description.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.description.length);
                    const imageSrc = data.description[randomIndex]["#IMG_POSTER"];

                    if (imageSrc && !uniqueImages.has(imageSrc)) { // Verificar si la imagen es única
                        const imgElement = document.createElement("img");
                        imgElement.src = imageSrc;
                        imgElement.addEventListener("click", () => {
                            fondoDiv.style.backgroundImage = `url('${imageSrc}')`;
                            fondoDiv.style.backgroundSize = 'cover';
                            fondoDiv.style.backgroundRepeat = 'no-repeat';
                            fondoDiv.style.backgroundPosition = 'center';
                            imgElement.style.filter = 'blur(0px)'; // Quitar el efecto borroso de la imagen
                        });
                        imageContainer.appendChild(imgElement);
                        uniqueImages.add(imageSrc); // Agregar la imagen al conjunto de imágenes únicas
                        loadedImages++; // Incrementar el contador de imágenes cargadas
                    }
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
            }
        }

        if (loadedImages < maxImagesPerLoad) { // Si no se alcanza el máximo de imágenes por carga, ocultar el botón de cargar más
            loadMoreButton.style.display = 'none';
        }
    };

    loadMoreButton.addEventListener('click', () => {
        fetchRandomImages(); // Cargar más imágenes al hacer clic en el botón
    });

    fetchRandomImages(); // Iniciar la obtención de imágenes al cargar la página
});