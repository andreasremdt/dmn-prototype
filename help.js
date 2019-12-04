(function() {
  "use strict";

  var helpWrapper = document.querySelector(".keyboard-shortcuts");

  window.addEventListener("keydown", function(evt) {
    if (evt.key == "Escape" && !helpWrapper.hasAttribute("hidden")) {
      helpWrapper.setAttribute("hidden", true);
    }

    if (evt.key == "h" && evt.ctrlKey) {
      helpWrapper.removeAttribute("hidden");
    }
  });

  helpWrapper.querySelector("button").addEventListener("click", function() {
    helpWrapper.setAttribute("hidden", true);
  });
})();
