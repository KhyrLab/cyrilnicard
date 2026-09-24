// Ajoute ici tes deux liens de soutien. Aucun autre fichier n'a besoin d'être modifié.
const SUPPORT_LINKS = {
  tipeee: "",
  patreon: ""
};

for (const [name, url] of Object.entries(SUPPORT_LINKS)) {
  const link = document.querySelector(`[data-support="${name}"]`);
  if (!link) continue;
  if (url && /^https?:\/\//i.test(url)) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.classList.remove("is-unconfigured");
    link.removeAttribute("aria-disabled");
    const state = link.querySelector("[data-support-state]");
    if (state) state.textContent = name === "tipeee" ? "Me soutenir sur Tipeee ↗" : "Me soutenir sur Patreon ↗";
  } else {
    link.href = "#soutien";
    link.classList.add("is-unconfigured");
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => event.preventDefault());
  }
}
