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
    th.scope = "col";
    th.textContent = "-";
    th.setAttribute("data-clickable", true);
    head.insertBefore(th, head.children[index - 1]);

    updateHead(table, index, true);
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
    th.scope = "col";
    th.setAttribute("data-clickable", true);
    head.insertBefore(th, head.children[index]);

    updateHead(table, index, true);
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

    var col = document.querySelector(
      `col.${
        table.querySelector("thead tr:first-child").children[index].dataset.col
      }`
    );
    col.span = Number(col.span) - 1;

    table.querySelector("thead tr:first-child").children[index].remove();
    table.querySelector("thead tr:last-child").children[index].remove();
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

  window.addEventListener("hitpolicyunique", function() {
    document.getElementById("hit-policy-select").children[0].selected =
      "selected";
  });

  window.addEventListener("hitpolicyfirst", function() {
    document.getElementById("hit-policy-select").children[1].selected =
      "selected";
  });

  window.addEventListener("hitpolicypriority", function() {
    document.getElementById("hit-policy-select").children[2].selected =
      "selected";
  });
  window.addEventListener("hitpolicyany", function() {
    document.getElementById("hit-policy-select").children[3].selected =
      "selected";
  });
  window.addEventListener("hitpolicycollect", function() {
    document.getElementById("hit-policy-select").children[4].selected =
      "selected";
  });
  window.addEventListener("hitpolicyrorder", function() {
    document.getElementById("hit-policy-select").children[5].selected =
      "selected";
  });
  window.addEventListener("hitpolicyoorder", function() {
    document.getElementById("hit-policy-select").children[7].selected =
      "selected";
  });
})();

/***********************/
function getCurrentActive(table) {
  return table.querySelector("[data-active]");
}

function updateHead(table, index) {
  var heads = table.querySelectorAll("thead tr:first-child th");
  var th = document.createElement("th");
  th.textContent = "And";
  th.scope = "col";
  th.setAttribute("data-col", heads[index].dataset.col);

  table
    .querySelector("thead tr:first-child")
    .insertBefore(th, heads[index + 1]);

  var col = document.querySelector(`col.${heads[index].dataset.col}`);
  col.span = Number(col.span) + 1;
}

function cleanValues(row) {
  Array.from(row.children).forEach(child => {
    child.textContent = "-";

    if (child.hasAttribute("data-active")) {
      child.removeAttribute("data-active");
    }
  });
}
