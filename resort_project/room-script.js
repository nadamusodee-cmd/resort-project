document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });
  });
});
