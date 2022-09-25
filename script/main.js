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
    The rightmost image is the first one so the second one
    has to be the one to its left so the order of images is
    reversed
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

// --- Listeners ---

btnPrev.addEventListener('click', () => {
  // Setting the desired animation
  sliderGalleryTop.style.transition = '400ms ease-in-out transform';
  sliderGalleryBottom.style.transition = '400ms ease-in-out transform';

  // Here i disable the button for a few seconds to avoid spam
  // and to let the animation play out
  if(!isDisabledBack){
    btnPrev.classList.add('disabled');
    btnPrev.src = "./assets/images/arrow-gray-left.png";
    isDisabledBack = true;

    moveRowBack();

    setTimeout(function(){
      isDisabledBack = false;
      btnPrev.classList.remove('disabled');
      btnPrev.src = "./assets/images/arrow-blue-left.png";
    },400);
  }
})


// Same as above
btnNext.addEventListener('click', () => {
  sliderGalleryTop.style.transition = '400ms ease-in-out transform';
  sliderGalleryBottom.style.transition = '400ms ease-in-out transform';

  if(!isDisabledForward){
    btnNext.classList.add('disabled');
    btnNext.src = "./assets/images/arrow-gray-Right.png";
    isDisabledForward = true;

    moveRowForward();

    setTimeout(function(){
      isDisabledForward = false;
      btnNext.classList.remove('disabled');
      btnNext.src = "./assets/images/arrow-blue-right.png";
    },400);
  }
})

/*
  These "transitioned" listeners are used to check if
  the offset should be reset.
  This is only triggered when the observed image (rightmost one)
  is the last image of either the first or last array
*/
sliderGalleryTop.addEventListener('transitionend', () => {
  if(Math.abs(focusIdTop)>imagesTop.length || focusIdTop == 1){
    sliderGalleryTop.style.transition = 'none';
    resetPositionTop();
    focusIdTop = 1;
    offsetTop = 0;
  }

})

sliderGalleryBottom.addEventListener('transitionend', () => {
  if(Math.abs(focusIdBottom)>imagesBottom.length || focusIdBottom == 1){
    sliderGalleryBottom.style.transition = 'none';
    resetPositionBottom();
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
  // First we check if we are observing the first image in the second array
  // because the image to its left is our initial image
  if(focusIdTop == imagesTop.length){
    focusIdTop = 1;
    resetPositionTop();
  } else {
    // The indexes are set as such:
    // ... -4, -3, -2, 1, n, n-1, n-2, ...
    // where 1 is our starting image
    // that's why the focused index is increase if it's bigger than 1
    // and decreased if it is smaller than 1
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

  // Same as above
  if(focusIdBottom == imagesBottom.length){
    focusIdBottom = 1;
    resetPositionBottom();
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


}


function moveRowForward() {

  // This is here because the first index to the right of
  // the initial one is n - or in onther words the size of the array
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
}
