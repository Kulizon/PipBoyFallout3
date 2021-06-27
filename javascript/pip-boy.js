const bottomMenuButtons = document.querySelectorAll(".pip-boy__bottom-menu__button__button");
const bottomMenuButtonTitles = document.querySelectorAll(".pip-boy__bottom-menu__button h2");

const sectionScreens = document.querySelector(".pip-boy__screen-casing");

let currentActiveSection = "stats";

const bottomMenu = document.querySelectorAll(".pip-boy__screen__bottom-menu h3");
let menus = document.querySelector(".pip-boy__screen--" + currentActiveSection);
const knob = document.querySelector(".knobRotate");
const wheel = document.querySelector(".pip-boy__left-panel__wheel__wheel");

const scanBoxes = document.querySelectorAll(".pip-boy__screen__scan");

const resetScan = () => {
  scanBoxes.forEach((scanBox) => {
    scanBox.style.animation = "none";
    setTimeout(() => {
      scanBox.style.animation = "";
    }, 50);
  });
};

const addButtonListeners = () => {
  bottomMenu.forEach((sectionTitle) => {
    resetScan();
    sectionTitle.addEventListener("click", () => {
      const sectionName = sectionTitle.innerHTML.toLowerCase().split(".").join("").split(" ").join("-");
      const menu = document.querySelector(".pip-boy__screen__main-content--" + sectionName);

      if (sectionName === "status" || sectionName === "weapons" || sectionName === "local-map") knob.style.transform = "rotate(60deg)";
      if (sectionName === "special" || sectionName === "apparel" || sectionName === "world-map") knob.style.transform = "rotate(30deg)";
      if (sectionName === "skills" || sectionName === "aid" || sectionName === "quests") knob.style.transform = "rotate(0deg)";
      if (sectionName === "perks" || sectionName === "misc" || sectionName === "notes") knob.style.transform = "rotate(-30deg)";
      if (sectionName === "general" || sectionName === "ammo" || sectionName === "radio") knob.style.transform = "rotate(-60deg)";

      for (let i = 2; i < 7; i++) {
        menus.children[i].style.display = "none";
      }

      menu.style.display = "block";
    });
  });
};

const changeRadScale = () => {
  const radPointer = document.querySelector(".radRotate");

  const rotateValue = Math.floor(Math.random() * (270 - 90)) + 90;

  radPointer.style.transform = `rotate(${rotateValue}deg)`;
};

setInterval(() => {
  changeRadScale();
}, 4000);

addButtonListeners(currentActiveSection);

bottomMenuButtons.forEach((button, i) => {
  button.addEventListener("click", function () {
    resetScan();

    bottomMenuButtons.forEach((button) => {
      button.style.background = "#6A2A13";
    });
    this.style.background = "#FF4D02";

    currentActiveSection = bottomMenuButtonTitles[i].innerHTML.toLocaleLowerCase();

    for (let i = 0; i < sectionScreens.children.length - 1; i++) {
      sectionScreens.children[i].style.display = "none";
    }

    const sectionScreen = document.querySelector(".pip-boy__screen--" + currentActiveSection);
    sectionScreen.style.display = "grid";

    menus = document.querySelector(".pip-boy__screen--" + currentActiveSection);

    let scrollValue;
    if (currentActiveSection === "stats") scrollValue = 100;
    if (currentActiveSection === "items") scrollValue = 300;
    if (currentActiveSection === "data") scrollValue = 150;

    wheel.scroll({
      top: scrollValue,
      behavior: "smooth",
    });

    let defaultMenu;
    if (currentActiveSection === "stats") defaultMenu = "status";
    if (currentActiveSection === "items") defaultMenu = "weapons";
    if (currentActiveSection === "data") defaultMenu = "local-map";

    const menu = document.querySelector(".pip-boy__screen__main-content--" + defaultMenu);

    for (let i = 2; i < 7; i++) {
      menus.children[i].style.display = "none";
    }

    menu.style.display = "block";

    addButtonListeners();
  });
});

const adjustDate = (date) => {
  if (date < 10) return (date = "0" + date);
  return date;
};

const changeDateDisplay = () => {
  const dateDisplay = document.getElementById("currentTime");

  const currentDate = new Date();

  const hours = adjustDate(currentDate.getHours());
  const minutes = adjustDate(currentDate.getMinutes());
  const currentTime = `${hours}:${minutes}`;

  let month = adjustDate(currentDate.getMonth());
  let day = adjustDate(currentDate.getDate());

  dateDisplay.innerText = `${month}.${day}.77, ${currentTime}`;
};

changeDateDisplay();

setInterval(() => {
  changeDateDisplay();
}, 60000);

const canvas = document.querySelector("#radioLine");
const context = canvas.getContext("2d");
let bottom = 50;
let goUndergroup = 50;
let reverse = false;

function animateRadio() {
  requestAnimationFrame(animateRadio);
  if (bottom <= 100 && goUndergroup >= 0 && !reverse) {
    if (bottom == 0) {
      reverse = true;
    }

    bottom--;
    goUndergroup++;
  } else {
    bottom++;
    goUndergroup--;

    if (bottom == 100) {
      reverse = false;
    }
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#25D852";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, 50);
  context.quadraticCurveTo(50, bottom, 100, 50);
  context.quadraticCurveTo(150, goUndergroup, 200, 50);
  context.quadraticCurveTo(250, bottom, 300, 50);
  context.stroke();
}

animateRadio();
