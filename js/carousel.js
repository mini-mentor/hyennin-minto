const carousel = document.querySelector(".carousel");
let position = 0;

function nextSlide() {
  position -= 100;
  if (position < -(carousel.children.length - 1) * 100) {
    position = 0;
  }
  carousel.style.transform = `translateX(${position}%)`;
}

setInterval(nextSlide, 2000);