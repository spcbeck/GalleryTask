class Gallery {
  constructor(selector = '#gallery', settings = {}) {
    this.selector = selector;
    this.settings = settings;

    this.slides = document.querySelectorAll(`${selector} li.gallery-slide`);

    this.paginationButtons = document.querySelectorAll('button.pagination-control');

    this.slideArray = [].slice.call(this.slides);
    this.currentSlide = 1;
    this.slideWidth = document.querySelector(`${selector} li.gallery-slide`).offsetWidth;
  }

  /*
  * Initialize the gallery, add event listeners to the controls.
  */
  init() {
    this.previousSlide();
    this.createControls();
    this.initGestures();
  }

  /*
  * Move the gallery 1 item forward, update the current slide index, and re-render the gallery.
  */
  nextSlide() {
    this.slideArray.push(this.slideArray.shift());
    this.currentSlide++;
    this.updatePosition();
    return this.currentSlide;
  }

  /*
  * Move the gallery 1 item backward, update the current slide index, and re-render the gallery.
  */
  previousSlide() {
    this.slideArray.unshift(this.slideArray.pop());
    this.currentSlide--;
    this.updatePosition();
    return this.currentSlide;
  }

  /*
  * Go to a specific index in the gallery. Accepts a 0-based index parameter.
  */
  goToSlide(slideIndex) {
    let delta = this.currentSlide - slideIndex;

    if(delta < 0) {
      for(let i = 0; i > delta; i--)
        this.nextSlide();
    } else if(delta > 0) {
      for(let i = 0; i < delta; i++)
        this.previousSlide();
    }

    return this.currentSlide;
  }

  /*
  * Re-render the array of slides in the gallery, and add the active class to the displayed slide.
  */
  updatePosition() {
    let i = -1;

    for(let slide of this.slideArray) {
      slide.classList.remove("active");
      slide.style.transform = "translate(" + (i * this.slideWidth) + "px, 0)";
      i++;
    }

    this.slideArray[1].classList.add("active");
    document.querySelector('ul.gallery-slides').style.height = this.slideArray[1].firstChild.offsetHeight + "px";
  }

  /*
  * Handle swiping events for mobile and mouse.
  */
  initGestures() {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const swipeArea = document.querySelector(this.selector);

    ['touchstart', 'mousedown'].forEach( (event) => {
      swipeArea.addEventListener(event, (event) => {
        if(event.type != 'mousedown') {
          touchstartX = event.changedTouches[0].screenX;
          touchstartY = event.changedTouches[0].screenY;
        } else {
          touchstartX = event.screenX;
          touchstartY = event.screenY;
        }
      })
    });

    ['touchend', 'mouseup'].forEach( (event) => {
      swipeArea.addEventListener(event, (event) => {
        if(event.type != 'mouseup') {
          touchendX = event.changedTouches[0].screenX;
          touchendY = event.changedTouches[0].screenY;
        } else {
          touchendX = event.screenX;
          touchendY = event.screenY;
        }

        if (touchendX < touchstartX) {
            this.nextSlide();
        }

        if (touchendX > touchstartX) {
            this.previousSlide();
        }
      })
    });
  }

  /*
  * Add event listeners to the pagination and previous and next buttons to allow them to function properly.
  */
  createControls() {
    document.getElementById('next').addEventListener('click', () => {
        this.nextSlide();
    });

    document.getElementById('prev').addEventListener('click', () => {
        this.previousSlide();
    });

    for(let pager of this.paginationButtons) {
      pager.addEventListener('click', (event) => {
        let index = event.target.dataset.index;
        this.goToSlide(index);
      });
    }
  }
}
window.addEventListener('load', function() {
  const gallery = new Gallery('#gallery');
  gallery.init();
});
