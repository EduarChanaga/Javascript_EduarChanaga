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
    let images = [];

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
                        images.push({ url: imageSrc, name: data.description[randomIndex]["#TITLE"] });
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
    
                    const nameElement = document.createElement('div');
                    nameElement.textContent = imageData.name;
                    divAboveImage.appendChild(nameElement);
    
                    const redButton = document.createElement('button');
                    redButton.textContent = 'Book Now';
                    redButton.classList.add('red-button');
                    divAboveImage.appendChild(redButton);
    
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

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    function createDateButtons() {
        const dateButtonsContainer = document.getElementById('date-buttons-container');
        const dates = getNext5Days();
    
        dates.forEach(date => {
            const button = document.createElement('button');
            button.value = date.toISOString().split('T')[0];
            button.textContent = formatDate(date);
            button.classList.add('date-button');
            dateButtonsContainer.appendChild(button);
    
            button.addEventListener('click', function() {
                const selectedDate = this.value;
                const selectedDateElement = document.getElementById('Fecha_seleccionada');
                selectedDateElement.textContent = `Selected Date: ${selectedDate}`;
            });
        });
    }
    
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
            
            if (
                (i === 0 && (j === 0 || j === 1 || j === 2 || j === 9 || j === 10 || j === 11)) ||
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
    updateSelectedSeats();
}

function updateSelectedSeats() {
    const selectedSeatsDiv = document.getElementById('Asientos_seleccionados');
    selectedSeatsDiv.innerHTML = '';

    const selectedSeats = document.querySelectorAll('.seat.selected');
    let totalPrice = 0;

    selectedSeats.forEach(seat => {
        const seatInfo = document.createElement('div');
        seatInfo.textContent = `Row: ${seat.dataset.row}, seat: ${seat.dataset.col} - $24`;
        selectedSeatsDiv.appendChild(seatInfo);
        totalPrice += 24;
    });

    const purchaseButton = document.querySelector('button[onclick="showPopupWindow2()"]');
    purchaseButton.textContent = `Purchase ($${totalPrice})`;

    const purchaseButton2 = document.getElementById('purchase');
    purchaseButton2.textContent = `Purchase ($${totalPrice})`;
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

function showPopupWindow2() {
    var popupWindow2 = document.getElementById("popup-window2");
    popupWindow2.style.display = "block";
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        const popupWindow2 = document.getElementById("popup-window2");
        popupWindow2.style.display = "none";
    }
});

function updateTimeLeft() {
    const timeLeftElement = document.getElementById('time-left');
    const now = new Date();
    const timeLeft = `Time left to purchase: ${now.toLocaleTimeString()}`;
    timeLeftElement.textContent = timeLeft;
}

document.addEventListener("DOMContentLoaded", function() {
    const popupWindow = document.getElementById('popup-window');

    popupWindow.addEventListener('click', function(event) {
        if (event.target === popupWindow) {
            popupWindow.classList.add('hidden');
            popupWindow.style.display = 'none';
        }
    });
});

async function fetchMovies() {
    console.log('Fetching movies...');
    const response = await fetch('https://search.imdbot.workers.dev/?q=');
    const data = await response.json();

    if (!data.description || !Array.isArray(data.description)) {
        throw new Error("Unexpected API response format");
    }

    console.log('Movies fetched successfully!');
    const movies = data.description;

    const sortedMovies = movies.sort((a, b) => b["#YEAR"] - a["#YEAR"]);
    const recentMovies = sortedMovies.slice(0, 7);

    const currentlyPlayingDiv = document.getElementById('Currently_playing');

    recentMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie-div';
        movieDiv.style.backgroundImage = `url(${movie["#IMG_POSTER"]})`;

        const movieTitle = document.createElement('div');
        movieTitle.className = 'movie-title';
        movieTitle.textContent = movie["#TITLE"];

        const movieButton = document.createElement('button');
        movieButton.className = 'movie-button';
        movieButton.textContent = 'Book Now';
        movieButton.onclick = () => {
            const imageUrl = movie["#IMG_POSTER"];
            document.getElementById('left-side').style.backgroundImage = `url('${imageUrl}')`;
            updateTimeLeft();
            popupWindow.classList.remove('hidden');
            popupWindow.style.display = 'flex';
        };

        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(movieButton);
        currentlyPlayingDiv.appendChild(movieDiv);
    });
}

fetchMovies().catch(error => console.error(error));

