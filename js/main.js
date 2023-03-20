let mainColor = localStorage.getItem("color_choose");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--mainColor", mainColor);

  document.querySelectorAll(".clist li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

let landing = document.querySelector(".landing-section");

let imgsArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

let optionBg = true;

let bgInterval;

let bgLocalItem = localStorage.getItem("bg-option");

if (bgLocalItem !== null) {
  if (bgLocalItem === "true") {
    optionBg = true;
  } else {
    optionBg = false;
  }
  document.querySelectorAll(".random-bg span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (bgLocalItem === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

function imgRandomaizer() {
  if (optionBg === true) {
    bgInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArr.length);

      landing.style.backgroundImage = `url(imgs/${imgsArr[randomNum]} )`;
    }, 1000);
  }
}

imgRandomaizer();

let options = document.querySelector(".clicked .gear");

let sBox = document.querySelector(".setting-box");

options.onclick = function () {
  this.classList.toggle("fa-spin");
  sBox.classList.toggle("open");
};

document.onkeyup = function (e) {
  if (e.key === "Escape") {
    sBox.classList.remove("open");
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
  }
};

const colorLi = document.querySelectorAll(".clist li");

colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--mainColor",
      e.target.dataset.color
    );
    localStorage.setItem("color_choose", e.target.dataset.color);

    handleActive(e);
  });
});

const randomBg = document.querySelectorAll(".random-bg span");

randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.bg === "yes") {
      optionBg = true;
      imgRandomaizer();
      localStorage.setItem("bg-option", true);
    } else {
      optionBg = false;
      clearInterval(bgInterval);
      localStorage.setItem("bg-option", false);
    }
  });
});

let mySkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOfsetTop = mySkills.offsetTop;
  let skillsOuterHeight = mySkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOfsetTop + skillsOuterHeight - windowHeight) {
    console.log("Skill Reached");
    let allSkills = document.querySelectorAll(".skill-box .progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.prog;
    });
  }
};

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let headingTitle = document.createTextNode(img.alt);
      imgHeading.appendChild(headingTitle);
      popupBox.appendChild(imgHeading);
    }
    let popupimg = document.createElement("img");
    popupimg.src = img.src;
    popupBox.appendChild(popupimg);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");

    let closeText = document.createTextNode("X");

    closeButton.appendChild(closeText);

    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const allbullets = document.querySelectorAll(".nav-bullets .bullet");

allbullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

let bulletSpan = document.querySelectorAll(".bullet-op span");

let bulCont = document.querySelector(".nav-bullets");

let bLocal = localStorage.getItem("bullet_option");

if (bLocal !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bLocal === "show") {
    bulCont.style.display = "block";
    document.querySelector(".bullet-op .yes").classList.add("active");
  } else {
    bulCont.style.display = "none";
    document.querySelector(".bullet-op .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "yes") {
      bulCont.style.display = "block";
      localStorage.setItem("bullet_option", "show");
    } else {
      bulCont.style.display = "none";
      localStorage.setItem("bullet_option", "hide");
    }
    handleActive(e);
  });
});

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

document.querySelector(".reset-op").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

let togglebtn = document.querySelector(".menu");

let tLink = document.querySelector(".links");

togglebtn.onclick = function () {
  tLink.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== togglebtn && e.target !== tLink) {
    if (tLink.classList.contains("open")) {
      tLink.classList.toggle("open");
    }
  }
});

tLink.onclick = function (e) {
  e.stopPropagation();
};
