const sliderGalleryTop = document.querySelector('.slider__gallery--top');
const sliderGalleryBottom = document.querySelector('.slider__gallery--bottom');
const imagesTop = document.querySelectorAll('.slider__gallery--top img');
const imagesBottom = document.querySelectorAll('.slider__gallery--bottom img');
const btnNext = document.querySelector('.button-next');
const btnPrev = document.querySelector('.button-previous');

let focusIdTop = 1;
let focusIdBottom = 1;
let offsetTop = 0;
let offsetBottom = 0;
let isDisabledBack = false;
let isDisabledForward = false;

//I am using *2 because i wan't the second array to be my starting position
const arrayWidthTop = calculateWidthTop()*2;
const arrayWidthBottom = calculateWidthBottom()*2;

//Setting up the starting position
setInitialGalleryState();

function setInitialGalleryState(){
  /*
  The leftmost image is the first one so the second one
  has to be the one to its right so I just
   reversed the order of the images
  */

  sliderGalleryTop.append(...Array.from(sliderGalleryTop.childNodes).reverse());
  sliderGalleryBottom.append(...Array.from(sliderGalleryBottom.childNodes).reverse());

  const galleryTop = document.querySelector('.slider__gallery--top').innerHTML;
  const galleryBottom = document.querySelector('.slider__gallery--bottom').innerHTML;

  // I am using three identical arrays to allow me to later reset
  // the starting position without it being noticed
  sliderGalleryTop.innerHTML = galleryTop + galleryTop + galleryTop;
  sliderGalleryBottom.innerHTML = galleryBottom + galleryBottom + galleryBottom;

  resetPositionTop();
  resetPositionBottom();
}

function resetPositionTop(){
  sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop}px)`;
}

function resetPositionBottom(){
  sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom}px)`;
}

btnPrev.addEventListener('click', () => {
  sliderGalleryTop.style.transition = '400ms ease-in-out transform';
  sliderGalleryBottom.style.transition = '600ms ease-in-out transform';

  if(!isDisabledBack){
    btnPrev.classList.add('disabled');
    btnPrev.src = "./assets/images/arrow-gray-left.png";
    isDisabledBack = true;
    moveRowBack();
  }
})

btnNext.addEventListener('click', () => {
  sliderGalleryTop.style.transition = '600ms ease-in-out transform';
  sliderGalleryBottom.style.transition = '400ms ease-in-out transform';

  if(!isDisabledForward){
    btnNext.classList.add('disabled');
    btnNext.src = "./assets/images/arrow-gray-Right.png";
    isDisabledForward = true;
    moveRowForward();
  }
})


sliderGalleryTop.addEventListener('transitionend', () => {
  if(Math.abs(focusIdTop)>imagesTop.length || focusIdTop == 1){
    sliderGalleryTop.style.transition = 'none';
    sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop}px)`;
    focusIdTop = 1;
    offsetTop = 0;
  }

})

sliderGalleryBottom.addEventListener('transitionend', () => {
  if(Math.abs(focusIdBottom)>imagesBottom.length || focusIdBottom == 1){
    sliderGalleryBottom.style.transition = 'none';
    sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom}px)`;
    focusIdBottom = 1;
    offsetBottom = 0;
  }
})



function calculateWidthTop(){
  let sum = 0;
  imagesTop.forEach(img => sum += (img.width)+10);
  return sum;
}

function calculateWidthBottom(){
  let sum = 0;
  imagesBottom.forEach(img => sum += (img.width)+10);
  console.log(sum);
  return sum;
}



function moveRowBack(){
  if(focusIdTop == imagesTop.length){
    focusIdTop = 1;
    sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop}px)`;
  } else {
    if(focusIdTop > 1){
      offsetTop += imagesTop[focusIdTop-1].width/2 +10;
      sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop-offsetTop}px)`;
      focusIdTop++;

    } else {
      offsetTop += imagesTop[Math.abs(focusIdTop)-1].width/2 +10;
      sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop-offsetTop}px)`;
      focusIdTop == 1 ? focusIdTop = -2 : focusIdTop--;
    }
  }

  if(focusIdBottom == imagesBottom.length){
    focusIdBottom = 1;
    sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom}px)`;
  }else {
    if(focusIdBottom > 1){
      offsetBottom += imagesBottom[focusIdBottom-1].width/2 +10;
      sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom-offsetBottom}px)`;
      focusIdBottom++;
    } else {
      offsetBottom += imagesBottom[Math.abs(focusIdBottom)-1].width/2 +10;
      sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom-offsetBottom}px)`;
      focusIdBottom == 1 ? focusIdBottom = -2 : focusIdBottom--;
    }
  }

  setTimeout(function(){
    isDisabledBack = false;
    btnPrev.classList.remove('disabled');
    btnPrev.src = "./assets/images/arrow-blue-left.png";
  },600);
}

function moveRowForward() {
  if(Math.abs(focusIdTop) == 1) focusIdTop = imagesTop.length+1;
  if(Math.abs(focusIdBottom) == 1) focusIdBottom = imagesBottom.length+1;

  if(focusIdTop > 0){
    focusIdTop--;
    offsetTop -= imagesTop[Math.abs(focusIdTop)-1].width/2 +10;
    sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop-offsetTop}px)`;
  } else {
    focusIdTop++;
    offsetTop -= imagesTop[Math.abs(focusIdTop)-1].width/2 +10;
    sliderGalleryTop.style.transform = `translateX(-${arrayWidthTop-offsetTop}px)`;

  }

  if(focusIdBottom > 0){
    focusIdBottom--;
    offsetBottom -= imagesBottom[Math.abs(focusIdBottom)-1].width/2 +10;
    sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom-offsetBottom}px)`;

  } else {
    focusIdBottom++;
    offsetBottom -= imagesBottom[Math.abs(focusIdBottom)-1].width/2 +10;
    sliderGalleryBottom.style.transform = `translateX(-${arrayWidthBottom-offsetBottom}px)`;
  }

  setTimeout(function(){
    isDisabledForward = false;
    btnNext.classList.remove('disabled');
    btnNext.src = "./assets/images/arrow-blue-right.png";
  },600);

}
