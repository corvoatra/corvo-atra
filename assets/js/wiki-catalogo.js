
/* Busca, filtros, ordenação e paginação dos catálogos de Guardiões do Véu. */
(function () {
  "use strict";
  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
  }
  function initCatalog(root) {
    var input = root.querySelector("[data-catalog-search]");
    var filter = root.querySelector("[data-catalog-filter]");
    var sort = root.querySelector("[data-catalog-sort]");
    var grid = root.querySelector("[data-catalog-grid]");
    var count = root.querySelector("[data-catalog-count]");
    var clear = root.querySelector("[data-catalog-clear]");
    var empty = root.querySelector("[data-catalog-empty]");
    var pager = root.querySelector("[data-catalog-pagination]");
    var prev = root.querySelector("[data-catalog-prev]");
    var next = root.querySelector("[data-catalog-next]");
    var pageLabel = root.querySelector("[data-catalog-page-label]");
    if (!input || !filter || !sort || !grid || !count || !clear || !empty || !pager || !prev || !next || !pageLabel) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-catalog-item]"));
    var page = 1;
    var pageSize = 8;
    function update() {
      var query = normalize(input.value);
      var filterValue = filter.value;
      var matches = cards.filter(function (card) {
        var searchable = normalize(card.getAttribute("data-search") || card.textContent);
        var tags = (card.getAttribute("data-filters") || "").split(" ");
        return (!query || searchable.indexOf(query) !== -1) && (!filterValue || tags.indexOf(filterValue) !== -1);
      });
      matches.sort(function (a, b) {
        var nameA = normalize(a.getAttribute("data-name"));
        var nameB = normalize(b.getAttribute("data-name"));
        return sort.value === "za" ? nameB.localeCompare(nameA, "pt-BR") : nameA.localeCompare(nameB, "pt-BR");
      });
      var pages = Math.max(1, Math.ceil(matches.length / pageSize));
      page = Math.min(page, pages);
      var start = (page - 1) * pageSize;
      cards.forEach(function (card) { card.hidden = true; });
      matches.forEach(function (card) { grid.appendChild(card); });
      matches.slice(start, start + pageSize).forEach(function (card) { card.hidden = false; });
      count.textContent = matches.length === 1 ? "1 resultado encontrado" : matches.length + " resultados encontrados";
      empty.hidden = matches.length !== 0;
      pager.hidden = matches.length <= pageSize;
      prev.disabled = page <= 1;
      next.disabled = page >= pages;
      pageLabel.textContent = "Página " + page + " de " + pages;
    }
    function resetPage() { page = 1; update(); }
    input.addEventListener("input", resetPage);
    filter.addEventListener("change", resetPage);
    sort.addEventListener("change", resetPage);
    clear.addEventListener("click", function () {
      input.value = ""; filter.value = ""; sort.value = "az"; resetPage(); input.focus();
    });
    prev.addEventListener("click", function () { if (page > 1) { page--; update(); } });
    next.addEventListener("click", function () { page++; update(); });
    update();
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-catalog]").forEach(initCatalog);
  });
})();
