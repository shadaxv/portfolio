let scrollPosition = window.pageYOffset;
const header = document.querySelector('.main-slider__heading');
const windowWidth = window.innerWidth;
const menuHeight = (windowWidth < 440) ? 90 : 60;
const emValue = parseInt(window.getComputedStyle(document.getElementsByTagName("body")[0]).fontSize, 10);
const headerBrakeHeight = header.offsetTop - (10 * emValue);
const footerBrakeHeight = document.querySelector('#kontakt').offsetTop - emValue;
const menuBrakeWidth = 930;
const documentBody = (document.scrollingElement || document.documentElement || document.body.parentNode || document.body);

function mobileNoJS() {
  if (windowWidth < menuBrakeWidth) {
    document.querySelector(".main-menu__list").classList.add("none");
    document.querySelector(".main-menu__list--mobile").classList.add("flex");
  }
  document.querySelector(".position-fixed-fix").classList.remove("none");
  document.querySelector(".static").classList.remove("static");
}
mobileNoJS();


window.addEventListener('resize', toogleMenu);

function toogleMenu() {
  if (window.innerWidth < menuBrakeWidth) {
    document.querySelector(".main-menu__list").classList.add("none");
    document.querySelector(".main-menu__list--mobile").classList.add("flex");
  } else {
    document.querySelector(".main-menu__list").classList.remove("none");
    document.querySelector(".main-menu__list--mobile").classList.remove("flex");
    mobileNavigation.classList.add("hidden");
  }
}

function changeActive() {
  'use strict';
  const section = document.querySelectorAll(".section-divider");
  let sections = {};
  let i = 0;

  Array.prototype.forEach.call(section, function(event) {
    sections[event.id] = event.offsetTop;
  });

  window.addEventListener("scroll", position);

  function position() {
    let scrollPosition = window.pageYOffset;
  }
  for (i in sections) {
    if (sections[i] <= scrollPosition + menuHeight) {
      let activeAnchors = document.querySelectorAll('.main-menu__anchor--active');
      activeAnchors.forEach(anchor => anchor.classList.remove("main-menu__anchor--active"));
      let nowActiveAnchors = document.querySelectorAll('a[href*=' + i + ']');
      // nowActiveAnchors.forEach(anchor => anchor.classList.add("main-menu__anchor--active"));
      nowActiveAnchors.forEach(function(anchor) {
        if (anchor.classList.contains("main-menu__anchor")) {
          anchor.classList.add("main-menu__anchor--active");
        }
      });
    }
  }

};


function toogleClassOnScroll(add) {
  switch (add) {
    case 0:
      navigation.classList.remove("main-menu--on-top");
      navigation.classList.remove("main-menu--on-bottom");
      break;
    case 1:
      navigation.classList.add("main-menu--on-top");
      navigation.classList.remove("main-menu--on-bottom");
      break;
    case 2:
      navigation.classList.add("main-menu--on-bottom");
      navigation.classList.remove("main-menu--on-top");
      break;
    default:
      break;
  }
}

const mobileMenuOpenButton = document.querySelector(".main-menu__icon");
mobileMenuOpenButton.addEventListener('click', toogleClassOnClick);

const mobileMenuCloseButton = document.querySelector(".mobile-menu__icon");
mobileMenuCloseButton.addEventListener('click', toogleClassOnClick);

const mobileNavigation = document.querySelector(".mobile-menu");

function toogleClassOnClick() {
  mobileNavigation.classList.toggle("hidden");
}

const mobileAnchors = document.querySelectorAll(".mobile-menu__anchor");
mobileAnchors.forEach(anchor => anchor.addEventListener('click', toogleClassOnClick));
mobileAnchors.forEach(anchor => anchor.addEventListener('click', preventJump));

mobileNavigation.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);


function watchScroll() {
  scrollPosition = window.pageYOffset;
  if (scrollPosition > footerBrakeHeight) {
    toogleClassOnScroll(2);
  } else if (scrollPosition > headerBrakeHeight) {
    toogleClassOnScroll(0);
  } else {
    toogleClassOnScroll(1);
  }
}

window.addEventListener("scroll", watchScroll);
window.addEventListener("scroll", changeActive);

const anchors = document.querySelectorAll(".main-menu__anchor");
anchors.forEach(anchor => anchor.addEventListener('click', preventJump));

function preventJump(event) {
  event.preventDefault();
  const hash = this.getAttribute("href");

  if (history.pushState) {
    history.pushState(null, null, hash);
  } else {
    location.hash = hash;
  }

  if (this.classList.contains("main-menu__anchor")) {
    this.classList.add("main-menu__anchor--active");
  }

  if (hash == "#start") {
    document.querySelector("#startAnchor").classList.add("main-menu__anchor--active");
  }
  this.blur();

  const difference = Math.abs(document.querySelector(hash).offsetTop - window.pageYOffset);
  const duration = difference / 2;

  const elementPosition = document.querySelector(hash).offsetTop;
  if (hash == "#kontakt") {
    smoothScroll(elementPosition, duration, 0);
  } else {
    smoothScroll(elementPosition, duration, menuHeight);
  }
}

function smoothScroll(scrollTo, duration, fixedHeight) {
  if (duration <= 0) {
    if (scrollTo == window.pageYOffset) {
      return;
    } else {
      documentBody.scrollTop = scrollTo - fixedHeight;
      return;
    }
  }
  let scrollFrom = window.pageYOffset;
  let difference = scrollTo - scrollFrom - fixedHeight;
  let perTick = difference / duration * 10;

  setTimeout(function() {
    documentBody.scrollTop = documentBody.scrollTop + perTick;
    smoothScroll(scrollTo, duration - 10, fixedHeight);
  }, 10);
}

const fixedPositionAnchors = document.querySelectorAll(".fixed-section-link");
const sections = document.querySelectorAll(".section");
fixedPositionAnchors.forEach(anchor => anchor.addEventListener('focus', scrollToLastSection));

function scrollToLastSection() {
  const scrollTo = sections[(sections.length - 2)].offsetTop + sections[(sections.length - 2)].offsetHeight;
  const scrollFrom = window.pageYOffset;
  const difference = scrollTo - scrollFrom;
  documentBody.scrollTop = documentBody.scrollTop + difference;
}