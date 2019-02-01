class Gallery {
  constructor(selector = '#gallery', settings = {}) {
    this.selector = selector;
    this.settings = settings;
    this.external = settings.external || false;
    if(!this.external)
      this.slides = document.querySelectorAll(`${selector} li.gallery-slide`);
    else
      this.slides = document.querySelectorAll(`${selector} li.gallery-slide`);

    this.paginationButtons = document.querySelectorAll('button.pagination-control');

    this.slideArray = [].slice.call(this.slides);
    this.currentSlide = 1;
    this.slideWidth = document.querySelector(`${selector} li.gallery-slide`).offsetWidth;
  }

  init() {
    this.previousSlide();
    this.createControls();
    this.initGestures();
  }

  nextSlide() {
    this.slideArray.push(this.slideArray.shift());
    this.currentSlide++;
    this.updatePosition();
    return this.currentSlide;
  }

  previousSlide() {
    this.slideArray.unshift(this.slideArray.pop());
    this.currentSlide--;
    this.updatePosition();
    return this.currentSlide;
  }

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
