import { Main } from "/frontend/www/modules/main.mjs";
import Stats from "/frontend/www/vector/statjs/0.17.0/Stats.js"

var g_has_init = false;

function init() {
  g_has_init = true;
  var stats = new Stats();
  window['stats'] = stats;
  stats.showPanel(0);
  document.querySelector("#world").appendChild(stats.dom);
  var main = new Main();
  window['main'] = main;
}

if (!g_has_init) init();