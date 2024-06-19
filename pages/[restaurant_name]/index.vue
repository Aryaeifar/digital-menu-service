<script setup>
definePageMeta({
    layout:'no-footer'
})

const route = useRoute();
const { $site } = useNuxtApp();
const response = ref([])
const splash_background = ref(null)
const copyright_text = ref(null)
const meta_title = ref(null)
const description = ref(null)
const short_subject = ref(null)

const short_body = ref(null)
const splash_logo = ref(null)
const locationLink = ref(null)
const title_color = ref(null)
const description_color = ref(null)
const slogan_color = ref(null)
const icons_color = ref(null)
const bgColor = ref(null)
const selected_category_color = ref(null)

const leftIcon = ref(null)
const middleIcon = ref(null)
const rightIcon = ref(null)

const leftIconURL = ref(null)
const middleIconURL = ref(null)
const rightIconURL = ref(null)

const { data, error } = await useFetch((`https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`));
response.value = data.value.data
splash_background.value = "url(" + response.value.image + ")"
copyright_text.value = response.value.copyright_text
meta_title.value = response.value.meta_title
description.value = response.value.description
short_subject.value = response.value.short_subject
short_body.value = response.value.short_body
splash_logo.value = response.value.splash_logo
locationLink.value = response.value.right_url
selected_category_color.value = response.value.selected_category_color
title_color.value = response.value.landing_title_color
description_color.value = response.value.landing_description_color
slogan_color.value = response.value.landing_slogan_color
icons_color.value = response.value.landing_icon_background_color
leftIcon.value = response.value.left_icon
middleIcon.value = response.value.middle_icon
rightIcon.value = response.value.right_icon
leftIconURL.value = response.value.left_url
middleIconURL.value = response.value.middle_url
rightIconURL.value = response.value.right_url

useHead({
  title:meta_title.value,
  meta: [
    { name: "description", content: '' },
    { name: "keywords", content: '' }
  ],
});
const items = ref(
  [
    { title: 'FA' },
    { title: 'FR' },
    { title: 'EN' },
  ]
)
const selectedLang = ref('EN')
const isActiveReserve = ref(false)
const isActive360 = ref(false)
const isActiveIdea = ref(false)
</script>
<template>
  <div class="landing-page h-screen" style="position: relative;">
    <div style="position: fixed; bottom: 1%; right: 0%; left: 0;">
      <div class="d-flex justify-center">
        <img :src="splash_logo" alt="" class="mt-16" height="300" style="max-width: 100%;">
    </div>
    <div class="d-flex flex-column align-center text-center mt-5">
        <div class="base_title main-title__color">{{ meta_title}}</div>
         <div class="divider-wrapper my-5 d-block d-sm-none">
            <span class="divider"></span>
        </div>
        <p class="main-description__color w-75 fw-regular">{{ short_subject }} </p>
        <p class="main_slogan__color w-75 fw-regular">{{ short_body }} </p>
        <!-- <div class="lang-btn pa-3">
          
          <div class="d-flex align-center">
            <img src="@/assets/images/language.svg" class="mx-2"alt="">
            تغییر زبان
          </div>
          <div>
            EN
          </div>
          
        </div> -->
        <v-menu>
      <!-- <template v-slot:activator="{ props }">
        <div
          class="lang-btn pa-3"
          v-bind="props"
        >
          <div class="d-flex align-center w-100">
            <img src="@/assets/images/language.svg" class="mx-2"alt="">
            تغییر زبان
          </div>
          <div>
            {{ selectedLang }}
          </div>
        </div>
      </template> -->
      <v-list bg-color="dark-l">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
        <div class="lang-item" type="button" @click="selectedLang = item.title">
          {{ item.title }}
        </div>
          <!-- <v-list-item-title></v-list-item-title> -->
        </v-list-item>
      </v-list>
    </v-menu>
        <div class="my-10 w-75">
        <v-row>
         
          <v-col >
            <v-btn :href="rightIconURL" :color="icons_color || 'dark-l'" stacked class="rounded-lg " :width="80" :height="80" flat="true">
                <!-- <img src="@/assets/images/call-icon.svg" alt="" class="mb-3 w-75" > -->
                                <img :src="rightIcon" alt="" class="mb-3 w-75" >

                <span>تماس</span>
            </v-btn>
          </v-col>
           <v-col >
            <v-btn :href="middleIconURL" :color="icons_color || 'dark-l'" stacked class="rounded-lg " :width="80" :height="80" flat="true">
                <!-- <img src="@/assets/images/menu-icon.svg" alt="" class="mb-3 w-100" > -->
                                                <img :src="middleIcon" alt="" class="mb-3 w-100" >

                <span>منو</span>
            </v-btn>
          </v-col>
          <v-col >
            <v-btn :href="leftIconURL" :color="icons_color || 'dark-l'" stacked class="rounded-lg " :width="80" :height="80" flat="true">
                <!-- <img src="@/assets/images/location-icon.svg" alt="" class="mb-3 w-50" > -->
                                                <img :src="leftIcon" alt="" class="mb-3 w-50" >

                <span>موقعیت</span>
            </v-btn>
          </v-col>
          <v-col  v-if="isActiveReserve">
            <v-btn :to="'/' + $route.params.restaurant_name + '/online-booking'" :color="icons_color || 'dark-l'" stacked class="rounded-lg " :width="80" :height="80" flat="true">
                <img src="@/assets/images/reserved2.svg" alt="" class="w-100 " height="25" >
                <span>رزرو آنلاین</span>
            </v-btn>
          </v-col>
          <v-col  v-if="isActive360">
            <v-btn  :color="icons_color || 'dark-l'" stacked class="rounded-lg " :width="80" :height="80" flat="true">
                <img src="@/assets/images/360.svg" alt="" class="mb-3 w-100" >
                <span>تور</span>
            </v-btn>
          </v-col>
          <v-col  v-if="isActiveIdea">
            <v-btn :to="'/' + $route.params.restaurant_name + '/offers'" :color="icons_color || 'dark-l'" stacked class="rounded-lg " :width="80" :height="80" flat="true">
                <img src="@/assets/images/idea.svg" alt="" class="mb-3 w-50" >
                <span>پیشنهادات</span>
            </v-btn>
          </v-col>
        </v-row>
             <!-- <v-btn :to="'/' + $route.params.restaurant_name + '/menu'" :color="selected_category_color || 'dark-l'" stacked class="rounded-lg py-6 mx-2" :width="80" :height="80" flat="true">
                <img src="@/assets/images/menu-icon.svg" alt="" class="mb-3 w-100" >
                <span>منو</span>
            </v-btn>
            <v-btn :to="'/' + $route.params.restaurant_name + '/call'" :color="selected_category_color || 'dark-l'" stacked class="rounded-lg py-6 mx-2" :width="80" :height="80" flat="true">
                <img src="@/assets/images/call-icon.svg" alt="" class="mb-3 w-75" >
                <span>تماس</span>
            </v-btn>
            
            <v-btn :href="locationLink" :color="selected_category_color || 'dark-l'" stacked class="rounded-lg py-6 mx-2" :width="80" :height="80" flat="true">
                <img src="@/assets/images/location-icon.svg" alt="" class="mb-3 w-50" >
                <span>موقعیت</span>
            </v-btn> -->
         </div>
         <div class="text-white mb-3">{{ copyright_text }}</div>
    </div> 
    </div>
  </div>
</template>
<style scoped>
.landing-page {
    background-image: v-bind(splash_background);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.main-title__color {
  color: v-bind(title_color)
}
.main-description__color {
  color: v-bind(description_color);
}
.main_slogan__color {
  color: v-bind(slogan_color)
}
.main-icons__background {
  background-color: v-bind(icons_color);
}
</style>