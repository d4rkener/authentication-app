import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/_boilerplate.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faEnvelope,
  faLock,
  faExclamationCircle,
  faCamera,
  faChevronUp,
  faChevronDown,
  faSignOutAlt,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebook,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSearch,
  faEnvelope,
  faLock,
  faGoogle,
  faFacebook,
  faTwitter,
  faGithub,
  faExclamationCircle,
  faCamera,
  faChevronDown,
  faChevronUp,
  faSignOutAlt,
  faChevronLeft
);

createApp(App)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
