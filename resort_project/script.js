const sections = document.querySelectorAll('.section');
let currentSectionIndex=0;
let isScrolling= false;

window.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    
    if (event.deltaY > 0) {
        if (currentSectionIndex < sections.length-1) {
            currentSectionIndex++;
            scrollToSection(currentSectionIndex);
        }
}       else {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
        }
}
});

function scrollToSection(index) {
    isScrolling = true;
    sections[index].scrollIntoView({
        behavior: 'smooth'
    });
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", function (e) {{"path":"/tauri/C/Users/USER/Documents/Phoenix Code/resort_project/script.js"}
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault(); 
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
function toggleReadMore(btn) {
  const text = btn.previousElementSibling;
  if (!text) return;
  text.classList.toggle('expanded');
  if (text.classList.contains('expanded')) {
    btn.textContent = 'Read Less';
  } else {
    btn.textContent = 'Read More';
  }
}

