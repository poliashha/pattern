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
