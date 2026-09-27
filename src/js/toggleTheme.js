/**
 * toggleTheme.js — Light mode / Dark mode
 */

export function toggleTheme(el) {
  if (!el) return;

  const btnIcon = el.querySelector(".icon");

  el.addEventListener("click", function () {
    const isDark =
      document.documentElement.getAttribute("data-bs-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.setAttribute("data-bs-theme", newTheme);

    if (btnIcon) {
      btnIcon.setAttribute("name", newTheme === "dark" ? "sunny" : "moon");
    }

    localStorage.setItem("theme", newTheme);

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 350);
  });
}
