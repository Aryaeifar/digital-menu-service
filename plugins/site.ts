export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('site', {
        url(path: string|undefined) {
            return (process.env.NODE_ENV === "development" ? 'https://menuly.vip' : (location.protocol + '//' + location.host )) + (path ?? '')
        }
    });
  })