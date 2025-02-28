
import 'hemend-js-library/dist/require'
import { Dirent } from 'fs'

const { join, dirname, basename } = require('path')
const { copySync, removeSync, readdirSync, readFileSync, writeFileSync } = require('fs-extra')

const publicDir = join(dirname(dirname(__dirname)), 'public');

const theme = basename(__dirname);
const themePath = join('themes', theme);
const themeUrl = '/' + themePath.replace(/\\/g, '/');
const themeAssetsPath = join(themePath, 'assets');
const themeAssetsUrl = '/' + themeAssetsPath.replace(/\\/g, '/');
const publicThemeDir = join(publicDir, themePath);
const publicThemeAssetsDir = join(publicDir, themeAssetsPath);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  srcDir: __dirname,
  app: {
    baseURL: "/",
    buildAssetsDir: themeAssetsUrl,
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
  },
  link: [
    {
      rel: "manifest",
      href: "@/assets/manifest.json",
    },
  ],
  build: {
    transpile: ["vuetify", { rtl: true }],
  },
  modules: [
    '@pinia/nuxt'
  ],
  css: [
    "@/assets/scss/app.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  runtimeConfig: {
    public: {
      storage: {
        prefix: "restaurant",
        driver: "local",
        ttl: 0,
      },
      flashMessage: {
        rtl: true,
        time: 1000,
        strategy: "multiple",
        position: "left bottom",
      },
    },
  },

  // hooks: {
  //   close(nuxt: any) {
  //     if (
  //       nuxt.options.dev === false &&
  //       nuxt.options.ssr === false &&
  //       nuxt.options._generate
  //     ) {
  //       const indexFilePath = join(publicThemeDir, "index.html");
  //       const distDir =
  //         nuxt.options.nitro?.output?.publicDir ||
  //         nuxt.options.nitro?.output?.dir ||
  //         join(__dirname, ".output", "public");

  //       removeSync(publicThemeDir);
  //       copySync(join(distDir, themeAssetsPath), publicThemeAssetsDir);
  //       copySync(join(distDir, "200.html"), join(publicThemeDir, "index.html"));
  //       readdirSync(distDir, { withFileTypes: true }).forEach(
  //         (dirent: Dirent) => {
  //           if (
  //             dirent.isFile() &&
  //             !["200.html", "index.html"].includes(dirent.name)
  //           ) {
  //             copySync(
  //               join(distDir, dirent.name),
  //               join(publicThemeDir, dirent.name)
  //             );
  //           } else if (
  //             dirent.isDirectory() &&
  //             !["themes"].includes(dirent.name)
  //           ) {
  //             copySync(
  //               join(distDir, dirent.name),
  //               join(publicThemeDir, dirent.name)
  //             );
  //           }
  //         }
  //       );
  //       removeSync(distDir);

  //       if (nuxt.options.app.baseURL !== "/") {
  //         let baseUrl = nuxt.options.app.baseURL;

  //         let firstChar = baseUrl.substring(0, 1);

  //         if (firstChar === "/") {
  //           baseUrl = baseUrl.substring(1);
  //         }

  //         let content = readFileSync(indexFilePath, "utf-8");

  //         let re = new RegExp(`${baseUrl}/?themes/`, "g");
  //         content = content.replace(re, `themes/`);
  //         writeFileSync(indexFilePath, content);
  //       }
  //     }
  //   },
  // },
});
 