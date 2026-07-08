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

// Ждём загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Находим контейнер с карточками
  const grid = document.getElementById("templateGrid");
  // Находим кнопку
  const showBtn = document.getElementById("showMoreBtn");

  // Получаем все карточки (прямые потомки контейнера)
  const allCards = Array.from(grid.children);
  const total = allCards.length;

  // Если шаблонов 4 или меньше — скрываем кнопку и выходим
  if (total <= 4) {
    if (showBtn) showBtn.style.display = "none";
    return;
  }

  // Скрываем все карточки, начиная с 5-й (индекс 4)
  allCards.forEach((card, index) => {
    if (index >= 4) {
      card.style.display = "none"; // скрываем
    }
  });

  // Счётчик показанных карточек
  let visibleCount = 4;

  // Обработчик нажатия на кнопку
  showBtn.addEventListener("click", function () {
    // Находим все скрытые карточки
    const hiddenCards = allCards.filter(
      (card) => card.style.display === "none",
    );

    // Если скрытых нет — прячем кнопку
    if (hiddenCards.length === 0) {
      showBtn.style.display = "none";
      return;
    }

    // Показываем следующие 4 (или сколько осталось)
    const toShow = Math.min(4, hiddenCards.length);
    for (let i = 0; i < toShow; i++) {
      hiddenCards[i].style.display = ""; // показываем (убираем inline-стиль)
    }

    // Если после этого скрытых не осталось — прячем кнопку
    const remaining = allCards.filter((card) => card.style.display === "none");
    if (remaining.length === 0) {
      showBtn.style.display = "none";
    }
  });
});
