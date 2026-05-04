(function () {
  // Находим ВСЕ карточки и ВСЕ модалки
  const cards = document.querySelectorAll(".card"); // все карточки
  const modals = document.querySelectorAll(".modal"); // все модалки
  const closeBtns = document.querySelectorAll(".closeModalBtn"); // все кнопки закрытия

  // Для каждой карточки настраиваем свою модалку
  cards.forEach((card, index) => {
    // Модалка у каждой карточки своя (находится в том же <article>)
    const modal = card.closest("article").querySelector(".modal");
    const modalImg = modal.querySelector("img");
    const previewImg = card.querySelector(".card-preview img");

    // Функция открытия именно ЭТОЙ модалки
    function openModal() {
      // Берём src из превью и подставляем в модалку
      if (previewImg && previewImg.src) {
        modalImg.src = previewImg.src;
      }
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }

    // Функция закрытия
    function closeModal() {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }

    // Клик по карточке → открываем её модалку
    card.addEventListener("click", function (e) {
      e.stopPropagation();
      openModal();
    });

    // Клик по фону модалки → закрываем
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Находим кнопку закрытия внутри этой модалки и вешаем событие
    const closeBtn = modal.querySelector(".closeModalBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeModal();
      });
    }
  });

  // Глобальное закрытие по ESC (закрывает только активную модалку)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.show");
      if (activeModal) {
        activeModal.classList.remove("show");
        document.body.style.overflow = "";
      }
    }
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("introContainer");

  // Общее время анимации: 4s (slide-out-container) + 2.8s (задержка) = 6.8s
  // Добавляем небольшой запас 0.2s
  setTimeout(function () {
    if (container) {
      // Плавно скрываем контейнер
      container.style.opacity = "0";
      container.style.transition = "opacity 0.8s ease";

      // Удаляем контейнер из DOM после завершения анимации
      setTimeout(function () {
        if (container && container.parentNode) {
          container.style.display = "none";
          // Или полностью удаляем: container.remove();
        }
      }, 400);
    }
  }, 6800); // 6.8 секунд
});

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
