

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".conteiner-video");

  if (container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.style.cursor = "grabbing";
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.style.cursor = "grab";
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.style.cursor = "grab";
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  }
});

const cards = document.querySelectorAll(".article");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".closeModalBtn");

// ========== Логика показа карточек (по 4 штуки) ==========
let visibleCount = 4; // изначально показано 4 карточки
const step = 4; // за раз показываем ещё 4 карточки

// Функция обновления видимости карточек
function updateVisibleCards() {
  cards.forEach((card, index) => {
    if (index < visibleCount) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  // Если все карточки уже показаны — скрываем кнопку
  if (visibleCount >= cards.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}

// Показать ещё 4 карточки
function loadMoreCards() {
  visibleCount = Math.min(visibleCount + step, cards.length);
  updateVisibleCards();
}

// Назначаем обработчик на кнопку
loadMoreBtn.addEventListener("click", loadMoreCards);

// ========== Логика модального окна (увеличение картинки) ==========


// Инициализация: показываем первые 4 карточки
updateVisibleCards();
