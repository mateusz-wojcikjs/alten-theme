const yearElement = document.getElementById("year");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

yearElement.innerText = currentYear.toString();
const navbar = document.getElementById("navigation");

window.addEventListener("scroll", () => {
  navbar.classList.add("bg-white");

  if (window.location.pathname !== "/") return;
  if (window.scrollY > 80) {
    navbar.classList.remove("nav--homepage");
    // navbar.classList.remove("text-white");
    navbar.classList.add("bg-white");
    navbar.classList.add("text-black");
  } else {
    navbar.classList.remove("bg-white");
    navbar.classList.remove("text-black");
    navbar.classList.add("nav--homepage");
    // navbar.classList.add("text-white");
  }
});

const containers = [
  ...document.querySelectorAll(".reveal"),
  ...document.querySelectorAll(".reveal-left"),
  ...document.querySelectorAll(".reveal-300"),
  ...document.querySelectorAll(".reveal-600"),
  ...document.querySelectorAll(".reveal-right")
];
const windowHeight = window.innerHeight;

if (containers.length > 0) {
  function reveal() {
    containers.forEach((container) => {
      const containerTop = container.getBoundingClientRect().top;
      if (containerTop < windowHeight) {
        container.classList.add("reveal-show");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  document.addEventListener("DOMContentLoaded", reveal);
}

const container = document.getElementById("container");
const containerToRight = document.getElementById("containerToRight");
const backgroundToLeft = document.getElementById("background");
const backgroundToRight = document.getElementById(
  "backgroundToRight"
);

const updateBackgroundPosition = (container, background) => {
  if (window.innerWidth >= 1024) {
    background.style.width =
      container.offsetLeft + container.offsetWidth / 2 + 15 + "px";
  } else {
    background.style.width = "100%";
  }
};

if (container) {
  window.addEventListener("resize", () =>
    updateBackgroundPosition(container, backgroundToLeft)
  );
  document.addEventListener("DOMContentLoaded", () =>
    updateBackgroundPosition(container, backgroundToLeft)
  );
}
if (backgroundToRight) {
  window.addEventListener("resize", () =>
    updateBackgroundPosition(containerToRight, backgroundToRight)
  );
  document.addEventListener("DOMContentLoaded", () =>
    updateBackgroundPosition(containerToRight, backgroundToRight)
  );
}

const swiper = document.querySelector(".swiper");

if (swiper) {
  const ids = ["newRecipesSlider"];

  new Swiper("#newsSlider", {
    slidesPerView: 1,
    spaceBetween: 32,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      640: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      },
      1536: {
        slidesPerView: 4
      }
    }
  });

  new Swiper("#empolyeesSlider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

const sectionToRight = document.getElementById("sliderMask");
const sliderContainer = document.getElementById("sliderContainer");
const updateSectionPositionToContainerSize = (container) => {
  const computedStyle = window.getComputedStyle(container);
  const marginLeft = computedStyle.getPropertyValue("margin-left");
  const height = window
    .getComputedStyle(sliderContainer)
    .getPropertyValue("height");

  sectionToRight.style.marginLeft = marginLeft;
  sectionToRight.style.height = height;
};

if (sectionToRight) {
  const tailwindContainer =
    document.getElementsByClassName("container")[0];
  document.addEventListener("DOMContentLoaded", () =>
    updateSectionPositionToContainerSize(tailwindContainer)
  );
  window.addEventListener("resize", () =>
    updateSectionPositionToContainerSize(tailwindContainer)
  );
}
const initAccordion = (accordion) => {
  const accordionItems =
    accordion.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item;
    const content = item.nextElementSibling;

    // Add click event listener to accordion header
    header.addEventListener("click", () => {
      item.classList.toggle("active");
      content.classList.toggle("active");
      const buttonApply = document.querySelector(
        `[data-button="apply"]`
      );

      if (buttonApply) {
        buttonApply.addEventListener("click", (e) =>
          e.stopPropagation()
        );
      }

      if (
        content.parentElement.classList.contains("accordion--buttons")
      ) {
        const button = document.querySelector(
          `[data-accordion='${item.attributes["data-button"].value}']`
        );
        if (item.classList.contains("active")) {
          button.innerText = "Zamknij";
        } else {
          button.innerText = "Szczegóły";
        }
      }

      // If there's a nested accordion, initialize it
      const nestedAccordion = content.querySelector(".accordion");
      if (nestedAccordion) {
        initAccordion(nestedAccordion);
      }
    });
  });
};

const accordions = document.querySelectorAll(".accordion");
accordions.forEach((accordion) => {
  initAccordion(accordion);
});

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const parent = dropdown.parentElement;
  const parentMenuItem = [...parent.children].find(
    (element) => element.nodeName === "A"
  );
  const closeButton = [...dropdown.children].find(
    (element) => element.nodeName === "BUTTON"
  );

  parent.addEventListener("mouseenter", () => {
    dropdown.style.display = "flex";
    parent.classList.add("active");
  });
  parent.addEventListener("mouseleave", () => {
    dropdown.style.display = "none";
    parent.classList.remove("active");
  });

  if (window.innerWidth <= 1024) {
    parentMenuItem.addEventListener("click", (e) => {
      e.preventDefault();
      parent.classList.add("open");
    });

    closeButton &&
      closeButton.addEventListener("click", () => {
        parent.classList.remove("open");
      });
  }
});

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navigation");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

initMap();

// Get all the SVG decorative triangles
const triangles = document.querySelectorAll(".decorative-triangle");

// Function to generate a random number within a given range
function getRandomValue() {
  return Math.floor(Math.random() * 31) - 10; // Generate a random number between -10 and 10
} // Function to generate a random number within a given range
function getRandomRotateValue() {
  return Math.floor(Math.random() * 60);
}

if (triangles.length) {
  triangles.forEach((triangle, index) => {
    const animationName = `float${index + 1}`;

    const style = document.createElement("style");
    style.textContent = `
    @keyframes ${animationName} {
      0% { transform: translate(0, 0) rotate(0deg); }
      20% { transform: translate(${getRandomValue()}px, ${getRandomValue()}px) rotate(${getRandomRotateValue()}deg); }
      40% { transform: translate(${getRandomValue()}px, ${getRandomValue()}px) rotate(${getRandomRotateValue()}deg); }
      60% { transform: translate(${getRandomValue()}px, ${getRandomValue()}px) rotate(${getRandomRotateValue()}deg); }
      80% { transform: translate(${getRandomValue()}px, ${getRandomValue()}px) rotate(${getRandomRotateValue()}deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
  `;

    triangle.style.setProperty("--animation-name", animationName);

    document.head.appendChild(style);
  });

  window.addEventListener("scroll", function () {
    const parallaxImage = document.querySelector(".triangle");
    const scrolled = window.scrollY;
    parallaxImage.style.transform = `translateY(-${
      scrolled * 0.2
    }px)`; // Adjust the factor as needed
  });
}

const timeLineSlider = document.getElementById("timeLineSlider");

if (timeLineSlider) {
  const test = [
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015"
  ];
  new Swiper(timeLineSlider, {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        console.log(index);
        return (
          '<span class="' + className + '">' + test[index] + "</span>"
        );
      }
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

const selectTrigger = document.querySelector(".select-trigger");
const optionList = document.querySelector(".option-list");
const optionItems = document.querySelectorAll(".option-list li");

if (selectTrigger) {
  selectTrigger.addEventListener("click", function () {
    selectTrigger.classList.toggle("open");
    optionList.style.display =
      optionList.style.display === "block" ? "none" : "block";
  });

  optionItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue = this.dataset.value;
      selectTrigger.textContent = this.textContent;
      optionList.style.display = "none";
      selectTrigger.classList.remove("open");

      // Use 'selectedValue' as needed (e.g., submit it in a form)
      console.log("Selected value:", selectedValue);
    });
  });
}

function animateCountUpOnScroll(
  element,
  targetNumber,
  decimalPlaces = 0
) {
  const duration = 2000;
  const startTimestamp = performance.now();
  const initialValue = parseFloat(element.innerText) || 0;

  function updateCounter(timestamp) {
    const elapsed = timestamp - startTimestamp;
    const progress = Math.min(elapsed / duration, 1);

    const currentValue =
      initialValue + (targetNumber - initialValue) * progress;
    element.innerText = currentValue.toFixed(decimalPlaces);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    console.log([...entry.target.getElementsByTagName("h4")]);

    if (entry.isIntersecting) {
      [...entry.target.getElementsByTagName("h4")].forEach(
        (element) => {
          const targetNumber = parseFloat(element.dataset.count) || 0;
          const decimalPlaces =
            parseInt(element.dataset.decimalPlaces) || 0;

          animateCountUpOnScroll(
            element,
            targetNumber,
            decimalPlaces
          );
        }
      );

      observer.unobserve(entry.target);
    }
  });
}

const options = {
  threshold: 0.5 // Adjust as needed
};

const observer = new IntersectionObserver(
  handleIntersection,
  options
);
const counterSection = document.getElementById("counter-section"); // Replace with the ID of your counter section
observer.observe(counterSection);
