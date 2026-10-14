
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "firebase-service-worker-env",
        closeBundle() {
          const sourcePath = path.resolve(
            process.cwd(),
            "public/firebase-messaging-sw.js"
          );

          const outputPath = path.resolve(
            process.cwd(),
            "dist/firebase-messaging-sw.js"
          );

          let content = fs.readFileSync(sourcePath, "utf8");

          const replacements = {
            __FIREBASE_API_KEY__: env.VITE_FIREBASE_API_KEY,
            __FIREBASE_AUTH_DOMAIN__: env.VITE_FIREBASE_AUTH_DOMAIN,
            __FIREBASE_PROJECT_ID__: env.VITE_FIREBASE_PROJECT_ID,
            __FIREBASE_STORAGE_BUCKET__: env.VITE_FIREBASE_STORAGE_BUCKET,
            __FIREBASE_MESSAGING_SENDER_ID__:
              env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            __FIREBASE_APP_ID__: env.VITE_FIREBASE_APP_ID,
          };

          for (const [placeholder, value] of Object.entries(replacements)) {
            if (!value) {
              throw new Error(
                `Missing environment variable for ${placeholder}`
              );
            }

            content = content.replaceAll(
              placeholder,
              JSON.stringify(value)
            );
          }

          fs.writeFileSync(outputPath, content);
        },
      },
    ],
  };
});
