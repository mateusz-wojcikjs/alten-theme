const yearElement = document.getElementById("year");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

yearElement.innerText = currentYear.toString();
const navbar = document.getElementById("navigation");

window.addEventListener("scroll", () => {
  navbar.classList.add("bg-white");

  if (window.location.pathname !== "/") return;
  if (window.scrollY > 80) {
    navbar.classList.remove("bg-transparent");
    navbar.classList.remove("text-white");
    navbar.classList.add("bg-white");
    navbar.classList.add("text-black");
  } else {
    navbar.classList.remove("bg-white");
    navbar.classList.remove("text-black");
    navbar.classList.add("bg-transparent");
    navbar.classList.add("text-white");
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

  // ids.forEach((slider) => {
  //   new Swiper(`#${slider}`, {
  //     slidesPerView: 1,
  //     spaceBetween: 30,
  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true
  //     },
  //     breakpoints: {
  //       480: {
  //         slidesPerView: 2
  //       },
  //       899: {
  //         slidesPerView: 4
  //       }
  //     }
  //   });
  // });
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
  parent.addEventListener("mouseenter", () => {
    dropdown.style.display = "block";
  });
  parent.addEventListener("mouseleave", () => {
    dropdown.style.display = "none";
  });
});
