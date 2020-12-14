import { Main } from "../modules/main.mjs";
// var main = new Main();
// console.log(main);

var g_has_init = false;

function init() {
  g_has_init = false;
  var main = new Main();
  window['main'] = main;
}

if (!g_has_init) init();