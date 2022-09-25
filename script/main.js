const sliderGalleryTop = document.querySelector('.slider__gallery--top');
const imagesTop = document.querySelectorAll('.slider__gallery--top img');
const btnNext = document.querySelector('.nextBTN');

let focusId = 1;
const arrayWidth = calculateImageSize();
let offset = 0;

setInitialGalleryState();
function setInitialGalleryState(){
  const gallery = document.querySelector('.slider__gallery--top').innerHTML;
  sliderGalleryTop.innerHTML = gallery + gallery;
  sliderGalleryTop.innerHTML += `<img src="assets/images/slider-image-5.jpg" alt="surfer on a beach">`;


  console.log(arrayWidth);
  sliderGalleryTop.style.transform = `translateX(-${arrayWidth*2}px)`;
}

function calculateImageSize(){
  let sum = 0;
  imagesTop.forEach(img => sum += (img.width)+10);
  return sum;
}

btnNext.addEventListener('click', () => {
  sliderGalleryTop.style.transition = '200ms ease-in-out transform';
  console.log(imagesTop[Math.abs(focusId)-1].width);
  offset += imagesTop[Math.abs(focusId)-1].width/2 +10;
  console.log(offset);
  sliderGalleryTop.style.transform = `translateX(-${arrayWidth*2-offset}px)`;


  if(focusId  == 1){
    focusId = -2;
  }else{
    focusId--;
  }
})
