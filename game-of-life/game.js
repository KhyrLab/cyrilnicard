(() => {
  const root = document.querySelector('[data-game-of-life]');
  if (!root) return;

  const canvas = root.querySelector('[data-gol-canvas]');
  const ctx = canvas.getContext('2d');
  const cols = Number(root.dataset.cols || 96);
  const rows = Number(root.dataset.rows || 54);
  const cellPx = 10;

  const patterns = {
    cell: [[0, 0]],
    glider: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
    beacon: [[0, 0], [1, 0], [0, 1], [1, 1], [2, 2], [3, 2], [2, 3], [3, 3]],
    pulsar: [
      [-4,-6],[-3,-6],[-2,-6],[2,-6],[3,-6],[4,-6],[-6,-4],[-1,-4],[1,-4],[6,-4],
      [-6,-3],[-1,-3],[1,-3],[6,-3],[-6,-2],[-1,-2],[1,-2],[6,-2],[-4,-1],[-3,-1],[-2,-1],[2,-1],[3,-1],[4,-1],
      [-4,1],[-3,1],[-2,1],[2,1],[3,1],[4,1],[-6,2],[-1,2],[1,2],[6,2],[-6,3],[-1,3],[1,3],[6,3],
      [-6,4],[-1,4],[1,4],[6,4],[-4,6],[-3,6],[-2,6],[2,6],[3,6],[4,6]
    ],
    lwss: [[1,0],[4,0],[0,1],[0,2],[4,2],[0,3],[1,3],[2,3],[3,3]],
    gun: [
      [-18,-1],[-17,-1],[-18,0],[-17,0],[16,1],[17,1],[16,2],[17,2],[2,0],[3,0],[2,1],[3,1],[2,2],[3,2],
      [4,-1],[4,3],[6,-1],[6,-2],[6,3],[6,4],[-1,-1],[-2,-2],[-2,-1],[-2,0],[-3,-3],[-3,1],[-4,-1],
      [-5,-4],[-5,2],[-6,-4],[-6,2],[-7,-3],[-7,1],[-8,-2],[-8,-1],[-8,0]
    ]
  };

  const palettes = {
    blue: { dead: '#0b1d35', alive: '#9ec8ff', grid: 'rgba(255,255,255,.06)' },
    light: { dead: '#f7fbff', alive: '#2154b1', grid: 'rgba(21,36,58,.08)' },
    green: { dead: '#07160f', alive: '#82f6ad', grid: 'rgba(130,246,173,.08)' }
  };

  let grid = new Uint8Array(cols * rows);
  let next = new Uint8Array(cols * rows);
  let generation = 0;
  let running = false;
  let speed = Number(root.querySelector('[data-speed]')?.value || 10);
  let wrapEdges = Boolean(root.querySelector('[data-wrap]')?.checked);
  let theme = root.querySelector('[data-theme]')?.value || 'blue';
  let selectedPattern = 'glider';
  let rotation = 0;
  let rafId = 0;
  let previousTick = 0;
  let drawing = false;

  canvas.width = cols * cellPx;
  canvas.height = rows * cellPx;

  const idx = (x, y) => y * cols + x;

  const get = (x, y) => {
    if (wrapEdges) {
      x = (x + cols) % cols;
      y = (y + rows) % rows;
      return grid[idx(x, y)];
    }
    if (x < 0 || x >= cols || y < 0 || y >= rows) return 0;
    return grid[idx(x, y)];
  };

  const rotatePoint = (x, y) => {
    let rx = x;
    let ry = y;
    for (let i = 0; i < rotation; i += 1) {
      [rx, ry] = [-ry, rx];
    }
    return [rx, ry];
  };

  const updateStats = () => {
    const population = grid.reduce((sum, value) => sum + value, 0);
    root.querySelector('[data-generation]').textContent = String(generation);
    root.querySelector('[data-population]').textContent = String(population);
    root.querySelector('[data-speed-value]').textContent = `${speed} fps`;
  };

  const render = () => {
    const palette = palettes[theme] || palettes.blue;
    ctx.fillStyle = palette.dead;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = palette.alive;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (grid[idx(x, y)]) {
          ctx.fillRect(x * cellPx + 1, y * cellPx + 1, cellPx - 1, cellPx - 1);
        }
      }
    }

    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= cols; x += 1) {
      const px = x * cellPx + 0.5;
      ctx.moveTo(px, 0);
      ctx.lineTo(px, canvas.height);
    }
    for (let y = 0; y <= rows; y += 1) {
      const py = y * cellPx + 0.5;
      ctx.moveTo(0, py);
      ctx.lineTo(canvas.width, py);
    }
    ctx.stroke();

    updateStats();
  };

  const step = () => {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        let neighbors = 0;
        for (let oy = -1; oy <= 1; oy += 1) {
          for (let ox = -1; ox <= 1; ox += 1) {
            if (ox === 0 && oy === 0) continue;
            neighbors += get(x + ox, y + oy);
          }
        }
        const alive = grid[idx(x, y)] === 1;
        next[idx(x, y)] = neighbors === 3 || (alive && neighbors === 2) ? 1 : 0;
      }
    }
    [grid, next] = [next, grid];
    next.fill(0);
    generation += 1;
    render();
  };

  const loop = (time) => {
    if (!running) return;
    const interval = 1000 / speed;
    if (time - previousTick >= interval) {
      step();
      previousTick = time;
    }
    rafId = requestAnimationFrame(loop);
  };

  const play = () => {
    if (running) return;
    running = true;
    root.classList.add('is-running');
    previousTick = performance.now();
    rafId = requestAnimationFrame(loop);
  };

  const pause = () => {
    running = false;
    root.classList.remove('is-running');
    cancelAnimationFrame(rafId);
  };

  const clear = () => {
    pause();
    grid.fill(0);
    generation = 0;
    render();
  };

  const randomize = () => {
    pause();
    generation = 0;
    for (let i = 0; i < grid.length; i += 1) {
      grid[i] = Math.random() > 0.78 ? 1 : 0;
    }
    render();
  };

  const placePattern = (name, centerX, centerY) => {
    const pattern = patterns[name];
    if (!pattern) return;
    pattern.forEach(([x, y]) => {
      const [rx, ry] = rotatePoint(x, y);
      const px = centerX + rx;
      const py = centerY + ry;
      if (px >= 0 && px < cols && py >= 0 && py < rows) grid[idx(px, py)] = 1;
    });
    render();
  };

  const setSelectedPattern = (name) => {
    if (!patterns[name]) return;
    selectedPattern = name;
    root.querySelectorAll('[data-pattern]').forEach((button) => {
      const active = button.dataset.pattern === name;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  const canvasCellFromEvent = (event) => {
    const rect = canvas.getBoundingClientRect();
    return [
      Math.floor(((event.clientX - rect.left) / rect.width) * cols),
      Math.floor(((event.clientY - rect.top) / rect.height) * rows)
    ];
  };

  const drawAtEvent = (event) => {
    const [x, y] = canvasCellFromEvent(event);
    if (selectedPattern === 'cell') {
      grid[idx(x, y)] = 1;
      render();
    } else {
      placePattern(selectedPattern, x, y);
    }
  };

  canvas.addEventListener('pointerdown', (event) => {
    drawing = true;
    canvas.setPointerCapture?.(event.pointerId);
    drawAtEvent(event);
  });

  canvas.addEventListener('pointermove', (event) => {
    if (!drawing || selectedPattern !== 'cell') return;
    drawAtEvent(event);
  });

  canvas.addEventListener('pointerup', () => { drawing = false; });
  canvas.addEventListener('pointercancel', () => { drawing = false; });

  root.querySelector('[data-action="play"]')?.addEventListener('click', play);
  root.querySelector('[data-action="pause"]')?.addEventListener('click', pause);
  root.querySelector('[data-action="step"]')?.addEventListener('click', () => { pause(); step(); });
  root.querySelector('[data-action="clear"]')?.addEventListener('click', clear);
  root.querySelector('[data-action="random"]')?.addEventListener('click', randomize);
  root.querySelector('[data-action="center"]')?.addEventListener('click', () => placePattern(selectedPattern, Math.floor(cols / 2), Math.floor(rows / 2)));

  root.querySelector('[data-action="rotate-left"]')?.addEventListener('click', () => {
    rotation = (rotation + 3) % 4;
    root.querySelector('[data-rotation]').textContent = `${rotation * 90}°`;
  });
  root.querySelector('[data-action="rotate-right"]')?.addEventListener('click', () => {
    rotation = (rotation + 1) % 4;
    root.querySelector('[data-rotation]').textContent = `${rotation * 90}°`;
  });

  root.querySelectorAll('[data-pattern]').forEach((button) => {
    button.addEventListener('click', () => setSelectedPattern(button.dataset.pattern));
  });

  root.querySelector('[data-speed]')?.addEventListener('input', (event) => {
    speed = Number(event.target.value);
    updateStats();
  });

  root.querySelector('[data-wrap]')?.addEventListener('change', (event) => {
    wrapEdges = event.target.checked;
  });

  root.querySelector('[data-theme]')?.addEventListener('change', (event) => {
    theme = event.target.value;
    render();
  });

  canvas.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      if (running) pause(); else play();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      pause();
      step();
    }
  });

  setSelectedPattern('glider');
  placePattern('glider', Math.floor(cols * 0.42), Math.floor(rows * 0.42));
  placePattern('beacon', Math.floor(cols * 0.58), Math.floor(rows * 0.56));
  render();
})();
