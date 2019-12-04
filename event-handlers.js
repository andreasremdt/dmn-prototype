(function() {
  "use strict";

  var table = document.querySelector("table");

  window.addEventListener("insertrulebelow", function() {
    var active = getCurrentActive(table);
    var row = active.parentNode;
    var clone = row.cloneNode(true);

    row.parentNode.insertBefore(clone, row.nextElementSibling);
    cleanValues(clone);
  });

  window.addEventListener("insertruleabove", function() {
    var active = getCurrentActive(table);
    var row = active.parentNode;
    var clone = row.cloneNode(true);

    row.parentNode.insertBefore(clone, row);
    cleanValues(clone);
  });

  window.addEventListener("insertinputleft", function() {
    var active = getCurrentActive(table);
    var index = Array.from(active.parentNode.children).indexOf(active);

    table.querySelectorAll("tbody tr").forEach(row => {
      var td = document.createElement("td");
      td.textContent = "-";
      td.setAttribute("data-clickable", true);

      row.insertBefore(td, row.children[index]);
    });

    var head = table.querySelector("thead tr:last-child");
    var th = document.createElement("th");
    th.textContent = "-";
    th.setAttribute("data-clickable", true);
    head.insertBefore(th, head.children[index - 1]);

    updateSpan(table, true);
  });

  window.addEventListener("insertinputright", function() {
    var active = getCurrentActive(table);
    var index = Array.from(active.parentNode.children).indexOf(active);

    table.querySelectorAll("tbody tr").forEach(row => {
      var td = document.createElement("td");
      td.textContent = "-";
      td.setAttribute("data-clickable", true);

      row.insertBefore(td, row.children[index + 1]);
    });

    var head = table.querySelector("thead tr:last-child");
    var th = document.createElement("th");
    th.textContent = "-";
    th.setAttribute("data-clickable", true);
    head.insertBefore(th, head.children[index]);

    updateSpan(table, true);
  });

  window.addEventListener("deleteinput", function() {
    var active = getCurrentActive(table);
    var index = Array.from(active.parentNode.children).indexOf(active);

    if (active.nextElementSibling) {
      active.nextElementSibling.setAttribute("data-active", true);
    } else {
      active.previousElementSibling.setAttribute("data-active", true);
    }

    table.querySelectorAll("tbody tr").forEach(row => {
      row.children[index].remove();
    });

    var head = table.querySelector("thead tr:last-child");
    head.children[index].remove();

    updateSpan(table, false);
  });

  window.addEventListener("deleterule", function() {
    var active = getCurrentActive(table);
    var row = active.parentNode;
    var index = Array.from(active.parentNode.children).indexOf(active);
    var next = null;

    if (row.nextElementSibling) {
      next = row.nextElementSibling.children[index];
    } else if (row.previousElementSibling) {
      next = row.previousElementSibling.children[index];
    }

    next.setAttribute("data-active", true);
    row.remove();
  });
})();

/***********************/
function getCurrentActive(table) {
  return table.querySelector("[data-active]");
}

function updateSpan(table, increment = true) {
  var element = table.querySelector('[data-col="input"]');

  var value = Number(element.getAttribute("colspan"));

  if (increment) {
    element.setAttribute("colspan", value + 1);
  } else {
    element.setAttribute("colspan", value - 1);
  }
}

function cleanValues(row) {
  Array.from(row.children).forEach(child => {
    child.textContent = "-";

    if (child.hasAttribute("data-active")) {
      child.removeAttribute("data-active");
    }
  });
}
