import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      vue(),
      tailwindcss(),
      Components({
        resolvers: [IconsResolver()],
      }),
      Icons({ autoInstall: true }),
    ],
    base: env.VITE_BASE_URL || "/",
  };
});
