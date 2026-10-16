(function () {
  var CATS = [
    { id: "all", label: "Tous les jeux", icon: "🎮" },
    { id: "popular", label: "Populaires", icon: "🔥" },
    { id: "new", label: "Nouveaux", icon: "🆕" },
    { id: "arcade", label: "Arcade", icon: "🕹️" },
    { id: "puzzle", label: "Puzzle", icon: "🧩" },
    { id: "board", label: "Plateau", icon: "♟️" },
    { id: "skill", label: "Adresse", icon: "🎯" },
    { id: "racing", label: "Course", icon: "🏁" },
    { id: "adventure", label: "Aventure", icon: "🧭" }
  ];
  var CAT_LABEL = { arcade: "Arcade", puzzle: "Puzzle", board: "Plateau", skill: "Adresse", racing: "Course", adventure: "Aventure" };

  var games = [], cat = "all", query = "";
  var $ = function (id) { return document.getElementById(id); };

  function matches(g, c) {
    if (c === "all") return true;
    if (c === "popular") return !!g.popular;
    if (c === "new") return !!g.new;
    return g.category === c;
  }

  function renderCats() {
    var nav = $("cats");
    nav.innerHTML = "";
    CATS.forEach(function (c) {
      var n = games.filter(function (g) { return matches(g, c.id); }).length;
      var b = document.createElement("button");
      b.className = "cat" + (c.id === cat ? " active" : "");
      b.innerHTML = "<span>" + c.icon + "</span><span>" + c.label + '</span><span class="n">' + n + "</span>";
      b.onclick = function () { cat = c.id; $("sidebar").classList.remove("open"); render(); };
      nav.appendChild(b);
    });
  }

  function renderGrid() {
    var q = query.trim().toLowerCase();
    var list = games.filter(function (g) {
      return matches(g, cat) && (!q || (g.title + " " + (g.tags || []).join(" ")).toLowerCase().indexOf(q) !== -1);
    });
    var grid = $("grid");
    grid.innerHTML = "";
    list.forEach(function (g) {
      var a = document.createElement("a");
      a.className = "card";
      a.href = "#play=" + g.id;
      var th = document.createElement("div");
      th.className = "thumb";
      th.style.background = g.thumb && g.thumb.bg ? g.thumb.bg : "linear-gradient(135deg,#8b5cf6,#22d3ee)";
      if (g.thumb && g.thumb.img) {
        var im = document.createElement("img"); im.src = g.thumb.img; im.alt = g.title; im.loading = "lazy"; th.appendChild(im);
      } else {
        th.textContent = (g.thumb && g.thumb.emoji) || "🎮";
      }
      var info = document.createElement("div");
      info.className = "info";
      var t = document.createElement("b"); t.textContent = g.title;
      var s = document.createElement("span"); s.textContent = CAT_LABEL[g.category] || g.category;
      info.appendChild(t); info.appendChild(s);
      a.appendChild(th); a.appendChild(info);
      grid.appendChild(a);
    });
    $("empty").hidden = list.length > 0;
    var cur = CATS.filter(function (c) { return c.id === cat; })[0];
    $("title-icon").textContent = cur.icon;
    $("title-text").textContent = cur.label;
    $("title-count").textContent = "(" + list.length + ")";
  }

  function render() { renderCats(); renderGrid(); }

  function openGame(id) {
    var g = games.filter(function (x) { return x.id === id; })[0];
    if (!g) return;
    $("player-title").textContent = g.title;
    $("frame").src = g.url;
    $("player").hidden = false;
    document.body.style.overflow = "hidden";
    document.title = g.title + " – " + SITE_CONFIG.siteName;
    window.initAdSlots($("player"));
  }
  function closeGame() {
    $("player").hidden = true;
    $("frame").src = "about:blank";
    document.body.style.overflow = "";
    document.title = SITE_CONFIG.siteName + " – Jeux en ligne gratuits";
  }
  function route() {
    var m = location.hash.match(/^#play=(.+)$/);
    if (m) openGame(decodeURIComponent(m[1])); else closeGame();
  }

  $("search").addEventListener("input", function (e) { query = e.target.value; renderGrid(); });
  $("burger").onclick = function () { $("sidebar").classList.toggle("open"); };
  $("back").onclick = function () { if (location.hash) history.back(); else closeGame(); };
  $("fs").onclick = function () { var f = $("frame"); (f.requestFullscreen || f.webkitRequestFullscreen || function () {}).call(f); };
  window.addEventListener("hashchange", route);
  $("year").textContent = new Date().getFullYear();

  fetch("data/games.json").then(function (r) { return r.json(); }).then(function (data) {
    games = data;
    $("count").textContent = games.length + " jeux";
    render();
    window.initAdSlots(document);
    route();
  }).catch(function () {
    $("empty").hidden = false;
    $("empty").textContent = "Impossible de charger les jeux. Lance le site avec un serveur (voir README).";
  });
})();
