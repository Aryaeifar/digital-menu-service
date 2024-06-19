import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@fortawesome/fontawesome-free/css/all.css'
import { fa } from 'vuetify/locale'
const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // Primary
    white: "#ffffff",
    "white-d": "#F6F7F9",
    dark: "#10251C",
    "dark-l": "#22362D",
    "dark-ll": "#999999",
    pri: "#E7E0D6",
    "pri-l": "#F5F0EA",
    "pri-d": "#A1917D",
    "pri-dd": "#BBB4AC",
    "daily-card": "#417444",
    error: "#BC3F53",
  },
};
export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    locale: {
      locale: "fa",
      messages: { fa },
    },
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify)
})