"use strict";
///////////////////////////////////////

//* *********************** slider ************************
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // creating dots dinamically
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `
    <button class="dots__dot " data-slide="${i}"></button>`
      );
    });
  };

  // activate dots

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // Go to Slide Number
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // next slide

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //previous slide

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // event listener
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // key enevnt to move slider

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//* *********************** Navigation fading animation ************************

const mainNav = document.querySelector(".main-nav");
const handleOver = function (e) {
  if (e.target.classList.contains("main-nav-link")) {
    const links = e.target;
    const siblings = links
      .closest(".header")
      .querySelectorAll(".main-nav-link");

    siblings.forEach((el) => {
      if (el !== links) el.style.opacity = this;
    });
  }
};

mainNav.addEventListener("mouseover", handleOver.bind(0.5));
mainNav.addEventListener("mouseout", handleOver.bind(1));

//* *********************** Mobile navigation open and close ************************
const header = document.querySelector(".header");
const btnMobileNav = document.querySelector(".btn-mobile-nav");

btnMobileNav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

//* *********************** Smooth Scrolling ************************

const btns = document.querySelectorAll(".btn");

// smooth scrolling function

const scrollSmooth = function (el) {
  const id = el.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
};

//  smooth page navigation

header.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("main-nav-link")) {
    // to remove nav-open after clicking on one of link
    header.classList.toggle("nav-open");

    scrollSmooth(e);
  }
});

// smooth btn navigation

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (!e.target.classList.contains("cta-btn")) {
      e.preventDefault();

      scrollSmooth(e);
    }
  });
});

// EMPTY '#' SOLUTION FOR SMOOTH SCROLL
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  const href = link.getAttribute("href");
  link.addEventListener("click", function (e) {
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
});
//* *********************** Sticky navigation ************************

const sectionHero = document.querySelector(".hero-section");
const body = document.body;
const navHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    body.classList.add("sticky");
  }
  if (entry.isIntersecting) {
    body.classList.remove("sticky");
  }
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`,
});

heroObserver.observe(sectionHero);

// * *********************** lazy loading images for website performance ************************

const lazyImgs = document.querySelectorAll("img[data-src]");

const lazyLoding = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replacing data-src to src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(lazyLoding, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

lazyImgs.forEach((img) => imageObserver.observe(img));

// * *********************** get full year in copyright ************************

const fullYear = new Date().getFullYear();
const yearEl = document.querySelector(".year");
yearEl.textContent = fullYear;

// * *********************** Section reveal on scroll ************************

const allSections = document.querySelectorAll(".section");
const allContent = document.querySelectorAll(".content");

const revealItem = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  if (entry.target.classList.contains("content-right")) {
    entry.target.classList.add("reveal-right");
  }

  if (entry.target.classList.contains("content-left")) {
    entry.target.classList.add("reveal-left");
  }

  observer.unobserve(entry.target);
};

const sectionsObserver = new IntersectionObserver(revealItem, {
  root: null,
  threshold: 0.07,
});

allSections.forEach((section) => {
  sectionsObserver.observe(section);
  section.classList.add("section--hidden");
});

const contentObserver = new IntersectionObserver(revealItem, {
  root: null,
  threshold: 0,
});

allContent.forEach((content) => {
  contentObserver.observe(content);
});
