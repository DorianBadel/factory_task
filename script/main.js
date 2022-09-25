const sliderGalleryTop = document.querySelector('.slider__gallery--top');
const imagesTop = document.querySelectorAll('.slider__gallery--top img');
const btnNext = document.querySelector('.nextBTN');

let focusId = 1;
const arrayWidth = calculateImageSize();
let offset = 0;
setInitialGalleryState();
function setInitialGalleryState(){

  sliderGalleryTop.append(...Array.from(sliderGalleryTop.childNodes).reverse());
  const gallery = document.querySelector('.slider__gallery--top').innerHTML;
  sliderGalleryTop.innerHTML = gallery + gallery;
  resetPosition();
}

function calculateImageSize(){
  let sum = 0;
  imagesTop.forEach(img => sum += (img.width)+10);
  return sum;
}

function resetPosition(){
  sliderGalleryTop.style.transform = `translateX(-${arrayWidth*2}px)`;
}

btnNext.addEventListener('click', () => {
  sliderGalleryTop.style.transition = '200ms ease-in-out transform';
  offset += imagesTop[Math.abs(focusId)-1].width/2 +10;
  sliderGalleryTop.style.transform = `translateX(-${arrayWidth*2-offset}px)`;


  if(focusId  == 1){
    focusId = -2;
  }else{
    focusId--;
  }
})

sliderGalleryTop.addEventListener('transitionend', () => {
  if(Math.abs(focusId)>imagesTop.length){
    sliderGalleryTop.style.transition = 'none';
    sliderGalleryTop.style.transform = `translateX(-${arrayWidth*2}px)`;
    focusId = 1;
    offset = 0;
  }

})
