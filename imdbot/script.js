document.addEventListener("DOMContentLoaded", async () => {
    const imageContainer = document.getElementById("imagen-container");
    const banner = document.getElementById("banner");
    const maxImagesPerLoad = 16;
    const imageUrlPrefix = 'https://search.imdbot.workers.dev/?q=';
    let images = []; // Array para almacenar las imágenes y sus nombres

    const generateRandomQuery = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const vowels = 'aeiou';
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        const randomLetter2 = alphabet[Math.floor(Math.random() * alphabet.length)];
        const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
        return randomLetter + randomVowel;
    };

    const fetchRandomImages = async () => {
        const uniqueImages = new Set();
        let imagesLoaded = 0;

        while (imagesLoaded < maxImagesPerLoad) {
            const randomQuery = generateRandomQuery();
            const imageUrl = imageUrlPrefix + randomQuery;

            try {
                const response = await fetch(imageUrl);
                const data = await response.json();

                if (data.description && data.description.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.description.length);
                    let imageSrc = data.description[randomIndex]["#IMG_POSTER"];

                    if (!imageSrc) {
                        imageSrc = "./storage/loadimage.jpg";
                    }

                    if (!uniqueImages.has(imageSrc)) {
                        uniqueImages.add(imageSrc);
                        images.push({ url: imageSrc, name: data.description[randomIndex]["#TITLE"] }); // Almacenar el enlace y el nombre
                        imagesLoaded++;
                    }
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
            }
        }

        renderImages();
    };

    const renderImages = () => {
        imageContainer.innerHTML = '';
    
        images.forEach((imageData, index) => {
            const imgElement = document.createElement("img");
            imgElement.src = imageData.url;
            imgElement.classList.add('image-item');
    
            if (index === 7) {
                imgElement.classList.add('big-image');
                imgElement.onload = () => {
                    banner.style.backgroundImage = `url('${imageData.url}')`;
                    const divAboveImage = document.createElement('div');
                    divAboveImage.classList.add('above-image');
    
                    // Agregar el nombre de la película
                    const nameElement = document.createElement('div');
                    nameElement.textContent = imageData.name; // Mostrar el nombre de la película
                    divAboveImage.appendChild(nameElement); // Agregar el nombre al div
    
                    // Agregar el botón rojo debajo del nombre de la película
                    const redButton = document.createElement('button');
                    redButton.textContent = 'Abrir ventana';
                    redButton.classList.add('red-button');
                    divAboveImage.appendChild(redButton); // Agregar el botón al div
    
                    imageContainer.appendChild(divAboveImage);
                };
            }
    
            if (index === 6 || index === 8) {
                imgElement.addEventListener('click', () => {
                    moveAllImages(index === 6 ? 'left' : 'right');
                });
            }
    
            imageContainer.appendChild(imgElement);
        });
    };

    const moveAllImages = (direction) => {
        const tempImages = [...images];

        if (direction === 'left') {
            const lastImage = tempImages.pop();
            tempImages.unshift(lastImage);
        } else if (direction === 'right') {
            const firstImage = tempImages.shift();
            tempImages.push(firstImage);
        }

        images = [...tempImages];

        renderImages();
    };

    document.addEventListener("keydown", (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            moveAllImages(event.key === 'ArrowLeft' ? 'left' : 'right');
        }
    });

    fetchRandomImages();
});

document.addEventListener("DOMContentLoaded", function() {
    const popupWindow = document.getElementById('popup-window');

    // Listener para el botón dentro del div número 8
    document.querySelector('#imagen-container').addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('red-button') && event.target.textContent === 'Abrir ventana') {
            const imageElement = document.querySelector('#imagen-container .big-image');
            const imageUrl = imageElement.src;
            document.getElementById('left-side').style.backgroundImage = `url('${imageUrl}')`;
            updateTimeLeft();
            popupWindow.classList.remove('hidden');
            popupWindow.style.display = 'flex';
        }
    });

    // Listener para cerrar la ventana emergente al hacer clic fuera de popup-content
    popupWindow.addEventListener('click', function(event) {
        if (event.target === popupWindow) {
            popupWindow.classList.add('hidden');
            popupWindow.style.display = 'none';
        }
    });

    function updateTimeLeft() {
        const timeLeftElement = document.getElementById('time-left');
        const now = new Date();
        const timeLeft = `Time left to purchase: ${now.toLocaleTimeString()}`;
        timeLeftElement.textContent = timeLeft;
    }
});
