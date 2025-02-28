import { defineStore } from 'pinia'

export const usePremissionStore = defineStore('premissionStore', {
    state: () => ({ count: 0 }),
    actions: {
        getPremissions() {
            return new Promise((resolve, reject) => {
                useFetch("https://www.menuly.vip/api/v2/permissions")
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => reject(err));
            });
        },
    }
})