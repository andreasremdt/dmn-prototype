(function() {
  "use strict";

  var table = document.querySelector("table");
  var menu = document.querySelector(".context-menu");

  var store = {};

  window.addEventListener("contextmenu", function(evt) {
    if (evt.target.closest("table")) {
      evt.preventDefault();

      menu.style.top = `${evt.clientY}px`;
      menu.style.left = `${evt.clientX}px`;
      menu.style.display = "block";

      store.isContextMenuShown = true;
    } else {
      if (store.isContextMenuShown) {
        menu.style.display = "none";
        store.isContextMenuShown = false;
      }
    }
  });

  window.addEventListener("keydown", function(evt) {
    if ((evt.key == "Escape" && store.isContextMenuShown) || evt.ctrlKey) {
      menu.style.display = "none";
      store.isContextMenuShown = false;
    }
  });

  window.addEventListener("click", function(evt) {
    if (!evt.target.closest(".context-menu")) {
      menu.style.display = "none";
      store.isContextMenuShown = false;
    }
  });
})();
