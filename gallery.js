class Gallery {
  constructor(selector = '#gallery', settings = {}) {
    this.slides = document.querySelectorAll(`${selector} li`);
    this.selector = selector;
    this.settings = settings;

    this.slideArray = [].slice.call(this.slides);
    this.currentSlide = 0;
    this.slideWidth = document.querySelector(`${selector} li`).offsetWidth;
    this.slideHeight = document.querySelector(`${selector} img`).offsetHeight;
    this.galleryWidth = this.slideWidth * (this.slides.length - 1);
  }

  init() {
    this.updatePosition();
    document.getElementById('next').addEventListener('click', () => {
        this.nextSlide();
    });

    document.getElementById('prev').addEventListener('click', () => {
        this.previousSlide();
    });
  }

  nextSlide() {
    this.slideArray.push(this.slideArray.shift());
    this.updatePosition();
    this.currentSlide++;
    return this.currentSlide;
  }

  previousSlide() {
    this.slideArray.unshift(this.slideArray.pop());
    this.updatePosition();
    this.currentSlide--;
    return this.currentSlide;
  }

  updatePosition() {
    let i = -1;

    for(let slide of this.slideArray) {
      slide.style.transform = "translate(" + (i * this.slideWidth) + "px, 0)";
      i++;
    }
  }
}

const gallery = new Gallery('#gallery');
gallery.init();
