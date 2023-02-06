import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import "./firebase.js"

createApp(App).use(store).mount("#app")
