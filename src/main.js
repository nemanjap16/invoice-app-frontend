import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
// css
import "./assets/main.css";
// js

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/**
 * @without pinia plugin
 */
// pinia.use((context) => {
//   const storeID = context.store.$id;

//   // sync store with local storage
//   const localStorage = JSON.parse(window.localStorage.getItem(storeID));
//   if (localStorage) {
//     context.store.$patch(localStorage);
//   }

//   // listen for changes and update local storage
//   context.store.$subscribe((mutation, state) => {
//     window.localStorage.setItem(storeID, JSON.stringify(state));
//   });
// });

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
