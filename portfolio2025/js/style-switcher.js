const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})
// hide style - switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }    
    })

// Theme colors

const alternativeStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    alternativeStyles.forEach((style) => {
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled", "true");
        }
    })
}
// theme light and dark mode
const dayNight = document.querySelector(".day-night");
const moonIcon = dayNight.querySelector(".fa-moon");
const sunIcon = dayNight.querySelector(".fa-sun");

function updateIcons() {
  const isDark = document.body.classList.contains("dark");
  moonIcon.style.display = isDark ? "none" : "inline-block";
  sunIcon.style.display = isDark ? "inline-block" : "none";
}

// Toggle mode and update icons
dayNight.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateIcons();
});

// On page load, update icons based on current mode
window.addEventListener("load", () => {
  updateIcons();
});

