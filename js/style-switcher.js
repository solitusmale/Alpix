const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

// Hide on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

// Alternate styles logic
const alternativeStyles = document.querySelectorAll(".alternate-style");
let lastActiveStyle = "color-1"; // default
let rgbMode = false;
let rgbAnimationId = null;

const rgbToggle = document.querySelector(".rgb-toggle");

function setActiveStyle(color) {
    if (rgbMode) {
        stopRgbSkinColor(); // this will stop animation but leave the color
        rgbMode = false;
        rgbToggle.classList.remove("active");

        // ✅ remove the custom RGB color so alternate-style takes effect
        document.documentElement.style.removeProperty('--skin-color');
    }

    lastActiveStyle = color;

    alternativeStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

// Day/Night mode
const dayNight = document.querySelector(".day-night");
const moonIcon = dayNight.querySelector(".fa-moon");
const sunIcon = dayNight.querySelector(".fa-sun");

function updateIcons() {
    const isDark = document.body.classList.contains("dark");
    moonIcon.style.display = isDark ? "none" : "inline-block";
    sunIcon.style.display = isDark ? "inline-block" : "none";
}

dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateIcons();
});

window.addEventListener("load", () => {
    updateIcons();
});

// RGB animation logic
function startRgbSkinColor() {
    let hue = 0;
    function animateSkinColor() {
        hue = (hue + 1) % 360;
        const newColor = `hsl(${hue}, 100%, 50%)`;
        document.documentElement.style.setProperty('--skin-color', newColor);
        rgbAnimationId = requestAnimationFrame(animateSkinColor);
    }
    animateSkinColor();
}

function stopRgbSkinColor() {
    if (rgbAnimationId) {
        cancelAnimationFrame(rgbAnimationId);
        rgbAnimationId = null;
    }
}

rgbToggle.addEventListener("click", () => {
    rgbMode = !rgbMode;
    if (rgbMode) {
        startRgbSkinColor();
        rgbToggle.classList.add("active");
    } else {
        stopRgbSkinColor();
        rgbToggle.classList.remove("active");
    }
});


// Make setActiveStyle accessible globally
window.setActiveStyle = setActiveStyle;
