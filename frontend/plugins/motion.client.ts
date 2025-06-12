// plugins/motion.client.ts
import { MotionPlugin } from "@vueuse/motion";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MotionPlugin);
});
