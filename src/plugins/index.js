/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import { createPinia } from "pinia";
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'

const pinia = createPinia();
export function registerPlugins(app) {
  loadFonts();

  app.component('DatePicker', Vue3PersianDatetimePicker);
  app.use(pinia).use(vuetify).use(router);
}
