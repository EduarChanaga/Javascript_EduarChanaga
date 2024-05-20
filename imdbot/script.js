document.addEventListener("DOMContentLoaded", async () => {
    const horarioButtons = document.querySelectorAll('.horario-button');

    horarioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedHorario = this.textContent;
            const selectedHorarioElement = document.getElementById('Horario_seleccionado');
            selectedHorarioElement.textContent = `Selected Time: ${selectedHorario}`;
        });
    });
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
                    redButton.textContent = 'Book Now';
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
    
     // Función para obtener los próximos 5 días
     function getNext5Days() {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    }

    // Función para formatear la fecha
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    // Función para crear y llenar los botones de fecha
    function createDateButtons() {
        const dateButtonsContainer = document.getElementById('date-buttons-container');
        const dates = getNext5Days();
    
        dates.forEach(date => {
            const button = document.createElement('button');
            button.value = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            button.textContent = formatDate(date);
            button.classList.add('date-button');
            dateButtonsContainer.appendChild(button);
    
            // Agregar evento de clic a cada botón de fecha
            button.addEventListener('click', function() {
                const selectedDate = this.value;
                const selectedDateElement = document.getElementById('Fecha_seleccionada');
                selectedDateElement.textContent = `Selected Date: ${selectedDate}`;
            });
        });
    }
    
    // Crear y llenar los botones de fecha al cargar la página
    createDateButtons();
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
        if (event.target && event.target.classList.contains('red-button') && event.target.textContent === 'Book Now') {
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

const seatingChart = document.getElementById('seating-chart');

function createSeatingChart(rows, cols) {
  const alphabet = 'GFEDCBA';
  const chartWrapper = document.createElement('div');
  chartWrapper.className = 'chart-wrapper';

  const rowLabelsWrapper = document.createElement('div');
  rowLabelsWrapper.className = 'row-labels';
  for (let i = rows - 1; i >= 0; i--) {
    const rowLabel = document.createElement('div');
    rowLabel.className = 'row-label';
    rowLabelsWrapper.appendChild(rowLabel);
  }
  chartWrapper.appendChild(rowLabelsWrapper);

  const seatingTable = document.createElement('div');
  seatingTable.className = 'seating-table';

  for (let i = 0; i < rows; i++) {
    const seatRow = document.createElement('div');
    seatRow.className = 'seat-row';
    for (let j = 0; j < cols; j++) {
      const seat = document.createElement('div');
      seat.className = 'seat';
      seat.dataset.row = alphabet.charAt(i);
      seat.dataset.col = j + 1;
      seat.addEventListener('click', toggleSeat);
      
      // Ocultar asientos específicos
      if (
        (i === 0 && (j === 0 || j === 1 || j === 2|| j === 9 || j === 10 || j === 11)) ||
        (i === 1 && (j === 0 || j === 1 || j === 10 || j === 11)) ||
        (i === 2 && (j === 0 || j === 11))
      ) {
        seat.style.visibility = 'hidden';
      }
      seatRow.appendChild(seat);
    }
    seatingTable.appendChild(seatRow);
  }

  chartWrapper.appendChild(seatingTable);
  seatingChart.appendChild(chartWrapper);
}

function toggleSeat() {
    this.classList.toggle('selected');
    updateSelectedSeats(); // Llamar a la función para actualizar la lista de asientos seleccionados
}

function updateSelectedSeats() {
    const selectedSeatsDiv = document.getElementById('Asientos_seleccionados');
    selectedSeatsDiv.innerHTML = ''; // Limpiar contenido actual

    const selectedSeats = document.querySelectorAll('.seat.selected');
    let totalPrice = 0;

    selectedSeats.forEach(seat => {
        const seatInfo = document.createElement('div');
        seatInfo.textContent = `Row: ${seat.dataset.row}, seat: ${seat.dataset.col} - $24`;
        selectedSeatsDiv.appendChild(seatInfo);
        totalPrice += 24;
    });

    // Actualizar el texto del botón de compra con el precio total
    const purchaseButton = document.querySelector('button[onclick="getSelectedSeats()"]');
    purchaseButton.textContent = `Purchase ($${totalPrice})`;
}

function getSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.selected');
    const seatsArray = Array.from(selectedSeats).map(seat => {
        return {
            row: seat.dataset.row,
            col: seat.dataset.col
        };
    });
    alert(`Asientos seleccionados: ${JSON.stringify(seatsArray)}`);
}

createSeatingChart(7, 12);
