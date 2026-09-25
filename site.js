(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (header && toggle && nav) {
    const closeMenu = () => {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const willOpen = !header.classList.contains('menu-open');
      header.classList.toggle('menu-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const localSectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')]
    .filter((link) => link.getAttribute('href').length > 1);

  if ('IntersectionObserver' in window && localSectionLinks.length) {
    const linkById = new Map(localSectionLinks.map((link) => [link.hash.slice(1), link]));
    const sections = [...linkById.keys()]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      localSectionLinks.forEach((link) => link.classList.remove('is-active'));
      linkById.get(visible.target.id)?.classList.add('is-active');
    }, { rootMargin: '-28% 0px -62% 0px', threshold: [0, 0.1, 0.3] });

    sections.forEach((section) => observer.observe(section));
  }
})();
