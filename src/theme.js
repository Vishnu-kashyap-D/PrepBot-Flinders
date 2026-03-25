/**
 * PlaceBot — theme.js
 * Shared dark / light mode toggle logic.
 */

(function () {
    const STORAGE_KEY = "placebot_theme";
    const root = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        document.querySelectorAll(".theme-icon").forEach((el) => {
            el.textContent = theme === "dark" ? "🌙" : "☀️";
        });
        localStorage.setItem(STORAGE_KEY, theme);
    }
})();
