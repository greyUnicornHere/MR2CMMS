// SSES CMMS – small progressive enhancements (no framework).
(function () {
    "use strict";

    // Ask for confirmation before submitting forms (or via buttons) marked with data-confirm.
    document.addEventListener("submit", function (e) {
        var msg = (e.submitter && e.submitter.getAttribute("data-confirm")) || (e.target.getAttribute && e.target.getAttribute("data-confirm"));
        if (msg && !window.confirm(msg)) e.preventDefault();
    });

    // Auto-submit filter forms when a select marked data-autosubmit changes.
    document.addEventListener("change", function (e) {
        if (e.target.matches && e.target.matches("[data-autosubmit]")) e.target.form.submit();
    });

    // Clickable table rows: <tr data-href="...">
    document.addEventListener("click", function (e) {
        var row = e.target.closest && e.target.closest("tr[data-href]");
        if (!row || e.target.closest("a,button,input,select,label,form")) return;
        window.location = row.getAttribute("data-href");
    });

    // Searchable selects: <select data-search> gets a filter box above it.
    function enhanceSearch(select) {
        if (select.dataset.searchReady) return;
        select.dataset.searchReady = "1";
        var input = document.createElement("input");
        input.type = "search";
        input.className = "form-control form-control-sm search-select-filter";
        input.placeholder = "Type to filter…";
        select.parentNode.insertBefore(input, select);
        input.addEventListener("input", function () {
            var q = input.value.trim().toLowerCase();
            var firstMatch = null;
            Array.prototype.forEach.call(select.options, function (o) {
                if (!o.value) return;
                var allowed = o.dataset.hidden !== "1";
                var match = allowed && (!q || o.text.toLowerCase().indexOf(q) >= 0);
                o.hidden = !match;
                if (match && !firstMatch) firstMatch = o;
            });
            if (q && firstMatch && (select.selectedIndex < 0 || select.options[select.selectedIndex].hidden)) {
                select.value = firstMatch.value;
                select.dispatchEvent(new Event("change", { bubbles: true }));
            }
        });
    }
    document.querySelectorAll("select[data-search]").forEach(enhanceSearch);

    // Location → asset filtering. <select data-asset-for="#LocationId"> with options carrying data-path="|3|1|".
    document.querySelectorAll("select[data-asset-for]").forEach(function (assetSelect) {
        var locSelect = document.querySelector(assetSelect.getAttribute("data-asset-for"));
        if (!locSelect) return;
        function applyFilter() {
            var loc = locSelect.value;
            Array.prototype.forEach.call(assetSelect.options, function (o) {
                if (!o.value) return;
                var hide = loc && o.dataset.path.indexOf("|" + loc + "|") < 0;
                o.dataset.hidden = hide ? "1" : "0";
                o.hidden = hide;
            });
            var sel = assetSelect.options[assetSelect.selectedIndex];
            if (sel && sel.value && sel.hidden) assetSelect.value = "";
        }
        locSelect.addEventListener("change", applyFilter);
        assetSelect.addEventListener("change", function () {
            var o = assetSelect.options[assetSelect.selectedIndex];
            if (o && o.value && o.dataset.location && !locSelect.value) {
                locSelect.value = o.dataset.location;
            }
        });
        applyFilter();
    });

    // Repeating rows: <button data-add-row="#tbody" data-template="#tpl">; rows use __i__ as the index placeholder.
    document.addEventListener("click", function (e) {
        var add = e.target.closest && e.target.closest("[data-add-row]");
        if (add) {
            e.preventDefault();
            var body = document.querySelector(add.getAttribute("data-add-row"));
            var tpl = document.querySelector(add.getAttribute("data-template"));
            var index = body.querySelectorAll("[data-row]").length;
            var html = tpl.innerHTML.replace(/__i__/g, index);
            body.insertAdjacentHTML("beforeend", html);
            renumber(body);
            return;
        }
        var remove = e.target.closest && e.target.closest("[data-remove-row]");
        if (remove) {
            e.preventDefault();
            var row = remove.closest("[data-row]");
            var parent = row.parentNode;
            row.remove();
            renumber(parent);
        }
    });

    // Keep list indexes contiguous so MVC model binding sees every row.
    function renumber(body) {
        body.querySelectorAll("[data-row]").forEach(function (row, i) {
            row.querySelectorAll("[name]").forEach(function (el) {
                el.name = el.name.replace(/\[\d+\]/, "[" + i + "]");
            });
            var seq = row.querySelector("[data-seq]");
            if (seq) seq.textContent = i + 1;
        });
    }

    // Enable Bootstrap tooltips.
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
        new bootstrap.Tooltip(el);
    });
})();
