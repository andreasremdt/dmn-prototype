(function() {
  "use strict";

  window.__commandPaletteIsOpen = false;

  var palette = document.querySelector(".command-palette");
  var buttons = palette.querySelectorAll("button");

  function handleKeyDown(evt) {
    if (evt.key == "p" && evt.ctrlKey) {
      toggleCommandPalette();
    }

    if (window.__commandPaletteIsOpen) {
      if (evt.key == "Escape") {
        hideCommandPalette();
      } else if (evt.key == "ArrowDown") {
        evt.preventDefault();
        highlight("next");
      } else if (evt.key == "Enter") {
        triggerEvent();
      } else if (evt.key == "ArrowUp") {
        evt.preventDefault();
        highlight("prev");
      } else {
        filterDisplayResults();
      }
    }
  }

  function handleClick(evt) {
    if (window.__commandPaletteIsOpen) {
      if (!evt.target.closest(".command-palette")) {
        hideCommandPalette();
      }

      if (evt.target.closest("button")) {
        if (evt.target.closest("button").getAttribute("data-event")) {
          window.dispatchEvent(
            new Event(evt.target.closest("button").getAttribute("data-event"))
          );

          hideCommandPalette();
        }

        if (evt.target.closest("button").getAttribute("data-target")) {
          var target = palette.querySelector(
            evt.target.closest("button").getAttribute("data-target")
          );

          target.removeAttribute("hidden");
          palette
            .querySelector(".command-palette-inner")
            .setAttribute("hidden", true);
          target.firstElementChild.setAttribute("data-selected", true);
        }
      }
    }
  }

  function triggerEvent() {
    var current = palette.querySelector("button[data-selected]");

    if (current.getAttribute("data-event")) {
      window.dispatchEvent(new Event(current.getAttribute("data-event")));

      hideCommandPalette();
    }

    if (current.getAttribute("data-target")) {
      palette.firstElementChild.value = "";

      filterDisplayResults();

      var target = palette.querySelector(current.getAttribute("data-target"));

      target.removeAttribute("hidden");
      palette
        .querySelector(".command-palette-inner")
        .setAttribute("hidden", true);
      target.firstElementChild.setAttribute("data-selected", true);
    }
  }

  function filterDisplayResults() {
    var filter = palette.firstElementChild.value.trim().toLowerCase();

    for (let button of buttons) {
      if (button.textContent.toLowerCase().includes(filter)) {
        button.style.display = "flex";
      } else {
        button.style.display = "none";
      }
    }

    var availableButtons = Array.from(buttons).filter(
      button => button.style.display != "none"
    );

    if (availableButtons.length > 0) {
      let current = palette.querySelector("button[data-selected]");

      if (current.style.display == "none") {
        current.removeAttribute("data-selected");
        availableButtons[0].setAttribute("data-selected", true);
      }
    }
  }

  function highlight(direction) {
    var availableButtons = Array.from(buttons).filter(
      button => button.style.display != "none"
    );

    var index = availableButtons.findIndex(button =>
      button.hasAttribute("data-selected")
    );

    if (direction == "next") {
      let next = availableButtons[index + 1];

      if (next) {
        next.setAttribute("data-selected", true);
        next.scrollIntoView(false);
        availableButtons[index].removeAttribute("data-selected");
      }
    } else {
      let prev = availableButtons[index - 1];

      if (prev) {
        prev.setAttribute("data-selected", true);
        prev.scrollIntoView(true);
        availableButtons[index].removeAttribute("data-selected");
      }
    }
  }

  function toggleCommandPalette() {
    if (palette.hasAttribute("hidden")) {
      window.__commandPaletteIsOpen = true;

      palette.removeAttribute("hidden");
      palette.firstElementChild.focus();
      buttons[0].setAttribute("data-selected", true);
    } else {
      hideCommandPalette();
    }
  }

  function hideCommandPalette() {
    palette.setAttribute("hidden", true);
    palette
      .querySelector("button[data-selected]")
      .removeAttribute("data-selected");
    window.__commandPaletteIsOpen = false;
    palette.firstElementChild.value = "";
    palette.querySelector(".command-palette-inner").removeAttribute("hidden");

    Array.from(document.querySelectorAll(".submenu")).forEach(menu =>
      menu.setAttribute("hidden", true)
    );
  }

  window.addEventListener("keyup", handleKeyDown);
  window.addEventListener("click", handleClick);
})();
