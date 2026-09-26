// Liens de soutien partagés par les versions française et anglaise.
const SUPPORT_LINKS = {
  kofi: "https://ko-fi.com/khyrlab",
  tipeee: "https://fr.tipeee.com/khyrlab/",
  patreon: "https://www.patreon.com/cw/Khyrlab"
};

const SUPPORT_NAMES = {
  kofi: "Ko-fi",
  tipeee: "Tipeee",
  patreon: "Patreon"
};

const isEnglish = document.documentElement.lang
  .toLowerCase()
  .startsWith("en");

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

    if (state) {
      state.textContent = isEnglish
        ? `Support me ↗`
        : `Me soutenir ↗`;
    }
  } else {
    link.href = isEnglish ? "#support" : "#soutien";

    link.classList.add("is-unconfigured");
    link.setAttribute("aria-disabled", "true");

    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  }
}