// Obtención de elementos del DOM
const slidesContainer = document.getElementById('carouselSlides');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let currentIndex = 0;
const totalSlides = slides.length;

// 1. Generar los círculos indicadores de manera dinámica según el número de imágenes
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active'); // El primero inicia activo
    
    // Permitir saltar al slide correspondiente al hacer clic en el círculo
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
    
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// 2. Función encargada de actualizar la posición visual del carrusel
function updateCarousel() {
    // Desplaza el contenedor el porcentaje correspondiente al slide actual
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Actualiza las clases activas en los círculos
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// 3. Eventos para las flechas de navegación
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides; // Cicla al inicio si llega al final
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Cicla al final si retrocede desde el inicio
    updateCarousel();
});

// 4. Automatización Opcional: Cambio de imagen automático cada 5 segundos
let autoPlay = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}, 5000);

// Resetear el temporizador cada vez que el usuario interactúa manualmente
const resetTimer = () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);
};

// Adjuntar el reset de tiempo a todos los botones e indicadores
[prevBtn, nextBtn, ...dots].forEach(element => {
    element.addEventListener('click', resetTimer);
});// JavaScript Document