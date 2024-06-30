import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  experimental: {
    env: {
      schema: {
        FIREBASE_API_KEY: envField.string({context: 'server', access: 'secret', }),
        FIREBASE_AUTH_DOMAIN: envField.string({context: 'server', access: 'public'}),
        FIREBASE_PROJECT_ID: envField.string({context: 'server', access: 'public'}),
        FIREBASE_STORAGE_BUCKET: envField.string({context: 'server', access: 'public'}),
        FIREBASE_MESSAGING_SENDER_ID: envField.string({context: 'server', access: 'public'}),
        FIREBASE_APP_ID: envField.string({context:'server', access: 'public'}),
        FIREBASE_MEASUREMENT_ID: envField.string({context: 'server', access: 'public'}),
      },
    },
  },
});
