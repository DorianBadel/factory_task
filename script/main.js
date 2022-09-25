const sliderGalleryTop = document.querySelector('.slider__gallery--top');
const sliderGalleryBottom = document.querySelector('.slider__gallery--bottom');
const imagesTop = document.querySelectorAll('.slider__gallery--top img');
const imagesBottom = document.querySelectorAll('.slider__gallery--bottom img');
const btnNext = document.querySelector('.button-next');

let focusIdTop = 1;
let focusIdBottom = 1;
let offsetTop = 0;
let offsetBottom = 0;
const arrayWidthTop = calculateWidthTop();
const arrayWidthBottom = calculateWidthBottom();

setInitialGalleryState();

btnNext.addEventListener('click', () => {
  sliderGalleryTop.style.transition = '400ms ease-in-out transform';
  sliderGalleryBottom.style.transition = '600ms ease-in-out transform';

  offsetTop += imagesTop[Math.abs(focusIdTop)-1].width/2 +10;
  offsetBottom += imagesBottom[Math.abs(focusIdBottom)-1].width/2 +10;

  sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop*2-offsetTop}px)`;
  sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom*2-offsetBottom}px)`;


  if(focusIdTop  == 1){
    focusIdTop = -2;
  }else{
    focusIdTop--;
  }

  if(focusIdBottom  == 1){
    focusIdBottom = -2;
  }else{
    focusIdBottom--;
  }
})

sliderGalleryTop.addEventListener('transitionend', () => {
  if(Math.abs(focusIdTop)>imagesTop.length){
    sliderGalleryTop.style.transition = 'none';
    sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop*2}px)`;
    focusIdTop = 1;
    offsetTop = 0;
  }

})

sliderGalleryBottom.addEventListener('transitionend', () => {
  if(Math.abs(focusIdBottom)>imagesBottom.length){
    sliderGalleryBottom.style.transition = 'none';
    sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom*2}px)`;
    focusIdBottom = 1;
    offsetBottom = 0;
  }
})

function setInitialGalleryState(){
  sliderGalleryTop.append(...Array.from(sliderGalleryTop.childNodes).reverse());
  sliderGalleryBottom.append(...Array.from(sliderGalleryBottom.childNodes).reverse());

  const galleryTop = document.querySelector('.slider__gallery--top').innerHTML;
  const galleryBottom = document.querySelector('.slider__gallery--bottom').innerHTML;

  sliderGalleryTop.innerHTML = galleryTop + galleryTop;
  sliderGalleryBottom.innerHTML = galleryBottom + galleryBottom;

  resetPosition();
}

function calculateWidthTop(){
  let sum = 0;
  imagesTop.forEach(img => sum += (img.width)+10);
  console.log("top" + sum);
  return sum;
}

function calculateWidthBottom(){
  let sum = 0;
  imagesBottom.forEach(img => sum += (img.width)+10);
  console.log(sum);
  return sum;
}

function resetPosition(){
  sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop*2}px)`;
  sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom*2}px)`;
}
