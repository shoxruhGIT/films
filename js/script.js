"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabParents = document.querySelector(".tabheader__items"),
    tabHeaders = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);

  function hideTab() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabHeaders.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function openTab(i = 0) {
    tabContent[i].style.display = "block";
    tabHeaders[i].classList.add("tabheader__item_active");
  }

  hideTab();
  openTab();

  tabParents.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabHeaders.forEach((item, idx) => {
        if (target === item) {
          hideTab();
          openTab(idx);
        }
      });
    }
  });

  // TIMER ---------------------------------

  const deadline = "2024-08-22";

  function discountTime(endtime) {
    let days, hours, minutes, seconds;

    const timer = Date.parse(endtime) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / 1000 / 60) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = discountTime(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal ----------------------------------------

  const openModal = document.querySelectorAll("[data-modal]"),
    closeModal = document.querySelector("[data-close]"),
    modal = document.querySelector(".modal");

  function openModalFunc() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModalFunc() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
  openModal.forEach((item) => {
    item.addEventListener("click", openModalFunc);
  });

  closeModal.addEventListener("click", closeModalFunc);

  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      closeModalFunc();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && (modal.style.display = "block")) {
      closeModalFunc();
    }
  });

  //  Menu --------------------------------------

  class cardMenu {
    constructor(src, alt, title, descr, price, parentSelector, ...classess) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classess = classess;
      this.parent = document.querySelector(parentSelector);
      this.transform = 11000;
      this.changeToUzs();
    }

    changeToUzs() {
      this.price = this.price * this.transform;
    }

    render() {
      const element = document.createElement("div");

      if (this.classess.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classess.forEach((className) => element.classList.add(className));
      }
      console.log(this.classess);

      element.innerHTML = `
        
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
            </div>
          
      `;

      this.parent.append(element);
    }
  }

  new cardMenu(
    "img/tabs/1.png",
    "usual",
    'Plan "Usual"',
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    10,
    ".menu .container",
  ).render();
  new cardMenu(
    "img/tabs/2.jpg",
    "premium",
    'Plan "Premium"',

    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    60,
    ".menu .container",
    "menu__item"
  ).render();
  new cardMenu(
    "img/tabs/3.jpg",
    "vip",
    'Plan "vip"',
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    30,
    ".menu .container",
    "menu__item"
  ).render();
});
