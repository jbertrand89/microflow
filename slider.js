function initComparisons() {
  const comps = document.getElementsByClassName("img-comp-overlay");
  for (let i = 0; i < comps.length; i++) {
    compareImages(comps[i]);
  }

  function compareImages(img) {
    let slider, clicked = 0, w, h;
    const container = img.parentElement;

    w = container.offsetWidth; // Get the full width of the container
    h = img.offsetHeight;

    img.style.width = (w / 2) + "px"; // Set initial width of the overlay image

    // Create slider
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");

    // Insert slider
    container.insertBefore(slider, img);
    slider.style.top = 0;
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

    // Mouse and touch events
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    // Click-to-move behavior
    slider.addEventListener("click", slideMoveClick);

    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      clicked = 0;
    }

    function slideMove(e) {
      if (!clicked) return false;
      let pos;
      pos = getCursorPos(e);
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }

    // New function to move the slider based on where you click
    function slideMoveClick(e) {
      let pos = getCursorPos(e);
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }

    function getCursorPos(e) {
      let x = 0, rect = container.getBoundingClientRect(); // Use the container's bounding rect for position calculation
      e = e || window.event;
      if (e.touches) {
        x = e.touches[0].pageX - rect.left;
      } else {
        x = e.pageX - rect.left;
      }
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      img.style.width = x + "px"; // Set width of the overlay image based on the slider's position
      slider.style.left = (x - (slider.offsetWidth / 2)) + "px"; // Set the slider position to match the width of the image
    }
  }
}

// Initialize after page load
window.onload = function() {
  initComparisons();
};
