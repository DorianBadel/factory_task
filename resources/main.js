"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var sliderGalleryTop = document.querySelector(".slider__gallery--top");
var sliderGalleryBottom = document.querySelector(".slider__gallery--bottom");
var imagesTop = document.querySelectorAll(".slider__gallery--top img");
var imagesBottom = document.querySelectorAll(".slider__gallery--bottom img");
var btnNext = document.querySelector(".button-next");
var btnPrev = document.querySelector(".button-previous");
var focusIdTop = 1;
var focusIdBottom = 1;
var offsetTop = 0;
var offsetBottom = 0;
var isDisabledBack = false;
var isDisabledForward = false;
var paddingTop = 10;
var paddingBottom = 10;
var buttonContainerWidth = 159; //I am using *2 because i wan't the second array to be my starting position

var arrayWidthTop = calculateWidthTop() * 2;
var arrayWidthBottom = calculateWidthBottom() * 2 + buttonContainerWidth; //Setting up the starting position

setInitialGalleryState();

function setInitialGalleryState() {
  /*
     The rightmost image is the first one so the second one
     has to be the one to its left so the order of images is
     reversed
   */
  sliderGalleryTop.append.apply(sliderGalleryTop, _toConsumableArray(Array.from(sliderGalleryTop.childNodes).reverse()));
  sliderGalleryBottom.append.apply(sliderGalleryBottom, _toConsumableArray(Array.from(sliderGalleryBottom.childNodes).reverse()));
  var galleryTop = document.querySelector(".slider__gallery--top").innerHTML;
  var galleryBottom = document.querySelector(".slider__gallery--bottom").innerHTML; // I am using three identical arrays to allow me to later reset
  // the starting position without it being noticed

  sliderGalleryTop.innerHTML = galleryTop + galleryTop + galleryTop;
  sliderGalleryBottom.innerHTML = galleryBottom + galleryBottom + galleryBottom;
  resetPositionTop();
  resetPositionBottom();
}

function resetPositionTop() {
  sliderGalleryTop.style.transform = "translateX(-".concat(arrayWidthTop, "px)");
}

function resetPositionBottom() {
  sliderGalleryBottom.style.transform = "translateX(-".concat(arrayWidthBottom, "px)");
} // --- Listeners ---


btnPrev.addEventListener("click", function () {
  // Setting the desired animation
  sliderGalleryTop.style.transition = "400ms ease-in-out transform";
  sliderGalleryBottom.style.transition = "400ms ease-in-out transform"; // Here i disable the button for a few seconds to avoid spam
  // and to let the animation play out

  if (!isDisabledBack) {
    isDisabledBack = true;
    moveRowBack();
    setTimeout(function () {
      isDisabledBack = false;
    }, 400);
  }
}); // Same as above

btnNext.addEventListener("click", function () {
  sliderGalleryTop.style.transition = "400ms ease-in-out transform";
  sliderGalleryBottom.style.transition = "400ms ease-in-out transform";

  if (!isDisabledForward) {
    isDisabledForward = true;
    moveRowForward();
    setTimeout(function () {
      isDisabledForward = false;
    }, 400);
  }
});
btnPrev.addEventListener("mouseover", function () {
  btnPrev.firstChild.src = "./assets/images/arrow-blue-left.png";
});
btnPrev.addEventListener("mouseleave", function () {
  btnPrev.firstChild.src = "./assets/images/arrow-gray-left.png";
});
btnNext.addEventListener("mouseover", function () {
  btnNext.firstChild.src = "./assets/images/arrow-blue-right.png";
});
btnNext.addEventListener("mouseleave", function () {
  btnNext.firstChild.src = "./assets/images/arrow-gray-right.png";
});
/*
  These "transitioned" listeners are used to check if
  the offset should be reset.
  This is only triggered when the observed image (rightmost one)
  is the last image of either the first or last array
*/

sliderGalleryTop.addEventListener("transitionend", function () {
  if (Math.abs(focusIdTop) > imagesTop.length || focusIdTop == 1) {
    sliderGalleryTop.style.transition = "none";
    resetPositionTop();
    focusIdTop = 1;
    offsetTop = 0;
  }
});
sliderGalleryBottom.addEventListener("transitionend", function () {
  if (Math.abs(focusIdBottom) > imagesBottom.length || focusIdBottom == 1) {
    sliderGalleryBottom.style.transition = "none";
    resetPositionBottom();
    focusIdBottom = 1;
    offsetBottom = 0;
  }
});

function calculateWidthTop() {
  var sum = 0;
  imagesTop.forEach(function (img) {
    return sum += img.width + paddingTop;
  });
  return sum;
}

function calculateWidthBottom() {
  var sum = 0;
  imagesBottom.forEach(function (img) {
    return sum += img.width + paddingBottom;
  });
  return sum;
}

function moveRowBack() {
  // First we check if we are observing the first image in the second array
  // because the image to its left is our initial image
  if (focusIdTop == imagesTop.length) {
    focusIdTop = 1;
    resetPositionTop();
  } else {
    // The indexes are set as such:
    // ... -4, -3, -2, 1, n, n-1, n-2, ...
    // where 1 is our starting image
    // that's why the focused index is increase if it's bigger than 1
    // and decreased if it is smaller than 1
    if (focusIdTop > 1) {
      offsetTop += imagesTop[focusIdTop - 1].width / 2 + paddingTop;
      sliderGalleryTop.style.transform = "translateX(-".concat(arrayWidthTop - offsetTop, "px)");
      focusIdTop++;
    } else {
      offsetTop += imagesTop[Math.abs(focusIdTop) - 1].width / 2 + paddingTop;
      sliderGalleryTop.style.transform = "translateX(-".concat(arrayWidthTop - offsetTop, "px)");
      focusIdTop == 1 ? focusIdTop = -2 : focusIdTop--;
    }
  } // Same as above


  if (focusIdBottom == imagesBottom.length) {
    focusIdBottom = 1;
    resetPositionBottom();
  } else {
    if (focusIdBottom > 1) {
      offsetBottom += imagesBottom[focusIdBottom - 1].width / 2 + paddingBottom;
      sliderGalleryBottom.style.transform = "translateX(-".concat(arrayWidthBottom - offsetBottom, "px)");
      focusIdBottom++;
    } else {
      offsetBottom += imagesBottom[Math.abs(focusIdBottom) - 1].width / 2 + paddingBottom;
      sliderGalleryBottom.style.transform = "translateX(-".concat(arrayWidthBottom - offsetBottom, "px)");
      focusIdBottom == 1 ? focusIdBottom = -2 : focusIdBottom--;
    }
  }
}

function moveRowForward() {
  // This is here because the first index to the right of
  // the initial one is n - or in onther words the size of the array
  if (Math.abs(focusIdTop) == 1) focusIdTop = imagesTop.length + 1;
  if (Math.abs(focusIdBottom) == 1) focusIdBottom = imagesBottom.length + 1;

  if (focusIdTop > 0) {
    focusIdTop--;
    offsetTop -= imagesTop[Math.abs(focusIdTop) - 1].width / 2 + paddingTop;
    sliderGalleryTop.style.transform = "translateX(-".concat(arrayWidthTop - offsetTop, "px)");
  } else {
    focusIdTop++;
    offsetTop -= imagesTop[Math.abs(focusIdTop) - 1].width / 2 + paddingTop;
    sliderGalleryTop.style.transform = "translateX(-".concat(arrayWidthTop - offsetTop, "px)");
  }

  if (focusIdBottom > 0) {
    focusIdBottom--;
    offsetBottom -= imagesBottom[Math.abs(focusIdBottom) - 1].width / 2 + paddingBottom;
    sliderGalleryBottom.style.transform = "translateX(-".concat(arrayWidthBottom - offsetBottom, "px)");
  } else {
    focusIdBottom++;
    offsetBottom -= imagesBottom[Math.abs(focusIdBottom) - 1].width / 2 + paddingBottom;
    sliderGalleryBottom.style.transform = "translateX(-".concat(arrayWidthBottom - offsetBottom, "px)");
  }
}