// Recherche locale dans les notices (aucune dépendance, aucun appel externe).
(function () {
  var champ = document.getElementById("recherche-champ");
  var liste = document.getElementById("recherche-resultats");
  if (!champ || !liste) return;

  var index = null;
  var source = champ.getAttribute("data-index");

  function normaliser(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[’']/g, " ");
  }

  function charger() {
    if (index) return Promise.resolve(index);
    return fetch(source)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        index = data.map(function (n) {
          n._titre = normaliser(n.titre + " " + (n.alias || []).join(" "));
          n._texte = normaliser(n.resume + " " + n.rubrique);
          return n;
        });
        return index;
      });
  }

  function vider() {
    while (liste.firstChild) liste.removeChild(liste.firstChild);
  }

  function afficher(resultats, requete) {
    vider();
    if (!requete) return;
    if (!resultats.length) {
      var li = document.createElement("li");
      li.className = "vide";
      li.textContent = "Aucune notice ne correspond à « " + requete + " ».";
      liste.appendChild(li);
      return;
    }
    resultats.slice(0, 12).forEach(function (n) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = n.url;
      var t = document.createElement("strong");
      t.textContent = n.titre;
      var d = document.createElement("span");
      d.textContent = n.rubrique + " — " + n.resume;
      a.appendChild(t);
      a.appendChild(d);
      li.appendChild(a);
      liste.appendChild(li);
    });
  }

  function chercher() {
    var requete = champ.value.trim();
    var mots = normaliser(requete).split(/\s+/).filter(Boolean);
    if (!mots.length) { vider(); return; }
    charger().then(function (data) {
      var trouves = [];
      data.forEach(function (n) {
        var score = 0;
        for (var i = 0; i < mots.length; i++) {
          var m = mots[i];
          if (n._titre.indexOf(m) !== -1) score += 3;
          else if (n._texte.indexOf(m) !== -1) score += 1;
          else { score = 0; break; }
        }
        if (score > 0) trouves.push({ n: n, score: score });
      });
      trouves.sort(function (a, b) {
        return b.score - a.score || a.n.titre.localeCompare(b.n.titre, "fr");
      });
      afficher(trouves.map(function (x) { return x.n; }), requete);
    }).catch(function () {
      vider();
      var li = document.createElement("li");
      li.className = "vide";
      li.textContent = "La recherche est indisponible. Utilisez l'index alphabétique.";
      liste.appendChild(li);
    });
  }

  champ.addEventListener("input", chercher);
  champ.addEventListener("focus", function () { charger().catch(function () {}); });
  champ.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { champ.value = ""; vider(); }
  });
})();
