const savedTheme = localStorage.getItem("theme");
const prefersDarkMode = window.matchMedia(
	"(prefers-color-scheme: dark)",
).matches;

const themeToggleButton = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

if (savedTheme) {
	document.body.setAttribute("data-theme", savedTheme);
} else if (prefersDarkMode) {
	document.body.setAttribute("data-theme", "dark");
} else {
	document.body.setAttribute("data-theme", "light");
}

function updateIcon() {
	const currentTheme = document.body.getAttribute("data-theme");
	if (currentTheme === "dark") {
		sunIcon.style.display = "block"; 
		moonIcon.style.display = "none"; 
	} else {
		sunIcon.style.display = "none"; 
		moonIcon.style.display = "block"; 
	}
}

updateIcon();

themeToggleButton.addEventListener("click", () => {
	const currentTheme = document.body.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";

	document.body.setAttribute("data-theme", newTheme);

	updateIcon();

	localStorage.setItem("theme", newTheme);
});
