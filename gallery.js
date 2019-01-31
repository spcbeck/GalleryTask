class Gallery {
  constructor(selector = '#gallery', settings = {}) {
    this.slides = document.querySelectorAll(`${selector} li.gallery-slide`);
    this.paginationButtons = document.querySelectorAll('li.pagination-control');
    this.selector = selector;
    this.settings = settings;

    this.slideArray = [].slice.call(this.slides);
    this.currentSlide = 1;
    this.slideWidth = document.querySelector(`${selector} li.gallery-slide`).offsetWidth;
  }

  init() {
    this.previousSlide();
    this.createControls();
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
      slide.style.transform = "translate(" + (i * this.slideWidth) + "px, 0)";
      i++;
    }
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

const gallery = new Gallery('#gallery');
gallery.init();
