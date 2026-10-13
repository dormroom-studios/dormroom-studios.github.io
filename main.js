// Live countdown to launch.
// Launch: 25 February 2027. Time of day is a guess (10:00 Pacific, Steam's usual release hour); adjust if the dev gives one.
const LAUNCH = new Date('2027-02-25T18:00:00Z');

const pad = (n) => String(n).padStart(2, '0');
const fields = ['days', 'hours', 'minutes', 'seconds'].map((name) => ({
  name, nodes: document.querySelectorAll(`[data-${name}]`),
}));

function tick() {
  const left = Math.max(0, LAUNCH - Date.now());
  const s = Math.floor(left / 1000);
  const value = {
    days: Math.floor(s / 86400),
    hours: Math.floor(s / 3600) % 24,
    minutes: Math.floor(s / 60) % 60,
    seconds: s % 60,
  };
  for (const { name, nodes } of fields) {
    for (const node of nodes) node.textContent = pad(value[name]);
  }
}

tick();
setInterval(tick, 1000);
