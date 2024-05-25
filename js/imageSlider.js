const imagesCode = location.search.slice(1);
const slides = JSON.parse(decodeURIComponent(imagesCode));

if (slides.length < 2) {
  document.getElementById("nextSlideBtn").style.display = "none";
  document.getElementById("prevSlideBtn").style.display = "none";
}
document.getElementById("the-image").src = `./public/images/${slides[0]}`;
let slideIndex = 0;
showSlide(slideIndex);
function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  document.getElementById(
    "the-image"
  ).src = `./public/images/${slides[slideIndex]}`;
}

function nextSlide() {
  slideIndex--;
  showSlide(slideIndex);
}
function prevSlide() {
  slideIndex++;
  showSlide(slideIndex);
}
