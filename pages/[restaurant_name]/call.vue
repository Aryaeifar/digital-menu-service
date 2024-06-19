<script setup>
const route = useRoute();
const { $site } = useNuxtApp();
const response = ref([]);
const description = ref(null);
const address = ref(null);
const schedule = ref(null);
const locationLink = ref(null);
const logo = ref(null);
const phone = ref(null);
const contact_aboutIcon = ref(null);
const contact_addressIcon = ref(null);
const contact_contactIcon = ref(null);
const contact_phoneIcon = ref(null);
const contact_working_hourIcon = ref(null);
const contact_back_icon_backgroundColor = ref(null);
const contact_back_icon_textColor = ref(null);
const contact_backgroundColor = ref(null);
const contact_content_borderColor = ref(null);
const contact_content_titleColor = ref(null);
const contact_content_textColor = ref(null);
const contactLogo = ref(null);
const footer_backgroundColor = ref(null);
const footer_leftIcon = ref(null);
const footer_left_icon_backgroundColor = ref(null);
const footer_rightIcon = ref(null);
const footer_right_icon_backgroundColor = ref(null);
const footer_middleIcon = ref(null);
const footer_middle_icon_backgroundColor = ref(null);
const contact_icon_backgroundColor = ref(null);
const { data, error } = await useFetch(
  `https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`
);
response.value = data.value?.data;
description.value = response.value?.description;
address.value = response.value?.address;
locationLink.value = response.value?.right_url;
schedule.value = response.value?.days;
logo.value = response.value?.logo;
phone.value = response.value?.phone;
contact_icon_backgroundColor.value =
  response.value?.contact_icon_background_color;
contactLogo.value = response.value?.contact_logo;
contact_aboutIcon.value = response.value?.contact_about_icon;
contact_working_hourIcon.value = response.value?.contact_working_hour_icon;
contact_addressIcon.value = response.value?.contact_address_icon;
contact_contactIcon.value = response.value?.contact_contact_icon;
contact_phoneIcon.value = response.value?.contact_phone_icon;
contact_back_icon_backgroundColor.value =
  response.value?.contact_back_icon_background_color;
contact_back_icon_textColor.value =
  response.value?.contact_back_icon_text_color;
contact_backgroundColor.value = response.value?.contact_background_color;
contact_content_borderColor.value =
  response.value?.contact_content_border_color;
contact_content_titleColor.value = response.value?.contact_content_title_color;
contact_content_textColor.value = response.value?.contact_content_text_color;
footer_backgroundColor.value = response.value?.footer_background_color;
footer_leftIcon.value = response.value?.footer_left_icon;
footer_left_icon_backgroundColor.value =
  response.value?.footer_left_icon_background_color;
footer_rightIcon.value = response.value?.footer_right_icon;
footer_right_icon_backgroundColor.value =
  response.value?.footer_right_icon_background_color;
footer_middleIcon.value = response.value?.footer_middle_icon;
footer_middle_icon_backgroundColor.value =
  response.value?.footer_middle_icon_background_color;
const router = useRouter();
function backEvent() {
  return router.back(-1);
}
</script>
<template>
  <div
    class="call-page mb-16"
    :style="{ backgroundColor: contact_backgroundColor }"
  >
    <div class="d-flex justify-space-between align-center theHeader">
      <div class="fw-bold" :style="{ color: contact_content_titleColor }">
        اطلاعات تماس
      </div>
      <div class="theHeader-logo">
        <img
          :src="contactLogo"
          alt=""
          class=""
          height="100"
          style="max-width: 100%"
        />
      </div>
      <button @click="backEvent" style="z-index:1000" >
        <i
          class="fa-solid fa-chevron-left pa-2 rounded-lg"
          :style="{
            backgroundColor: contact_back_icon_backgroundColor,
            color: contact_back_icon_textColor,
          }"
        ></i>
      </button>
    </div>
    <v-card
      variant="outlined"
      :color="contact_content_borderColor"
      class="pa-3 rounded-xl"
    >
      <div
        class="d-flex flex-column align-center mb-4 pb-4 border-bottom-dotted"
      >
        <div>
          <img :src="contact_aboutIcon" alt="" />
        </div>
        <div class="base_title" :style="{ color: contact_content_titleColor }">
          درباره مجموعه
        </div>
        <div class="divider-wrapper my-4  d-sm-none">
          <span class="divider"></span>
        </div>
        <p
          class="text-center fw-regular"
          :style="{ color: contact_content_textColor }"
        >
          {{ description }}
        </p>
      </div>
      <div class="d-flex flex-column align-center border-bottom-dotted mb-3">
        <div>
          <img :src="contact_working_hourIcon" alt="" />
        </div>
        <div class="base_title" :style="{ color: contact_content_titleColor }">
          ساعت کاری ما
        </div>
        <div class="divider-wrapper my-4  d-sm-none">
          <span class="divider"></span>
        </div>
        <!-- <v-card variant="outlined" color="pri" class="py-3 rounded-xl w-100 mb-3">
                    <div class="days d-flex justify-space-around border-bottom-solid pb-3 mb-3">
                        <div class="days_item">شنبه</div>
                        <v-divider :thickness="2" vertical></v-divider>
                        <div class="days_item">یکشنبه</div>
                        <v-divider :thickness="2" vertical></v-divider>
                        <div class="days_item">دوشنبه</div>
                        <v-divider :thickness="2" vertical></v-divider>
                        <div class="days_item">سه شنبه</div>
                    </div>
                    <div class="time">
                        <div class="fw-regular2 text-dark text-center">
                            7 صبح الی 12 شب
                        </div>
                    </div>
                </v-card> -->
        <!-- <v-card variant="outlined" color="pri" class="py-3 rounded-xl w-100 mb-3">
                    <div class="days d-flex justify-space-around border-bottom-solid pb-3 mb-3">
                        <div class="days_item">چهارشنبه</div>
                        <v-divider :thickness="2" vertical></v-divider>
                        <div class="days_item">پنجشنبه</div>
              
                    </div>
                    <div class="time">
                        <div class="fw-regular2 text-dark text-center">
                           7 صبح الی 12 شب
                        </div>
                    </div>
                </v-card> -->
        <v-row class="w-100">
          <v-col cols="12" sm="6" md="4">
            <v-card
              variant="outlined"
              :color="contact_content_borderColor"
              class="pb-3 w-100 mb-3"
              style="border-radius: 10px"
            >
              <div
                class="days d-flex justify-space-around border-bottom-solid py-1 mb-3"
              >
                <div
                  class="days_item"
                  :style="{ color: contact_content_titleColor }"
                >
                  شنبه
                </div>
              </div>
              <div class="time">
                <div
                  class="fw-regular2 text-center"
                  :style="{ color: contact_content_textColor }"
                >
                  {{ schedule.saturday }}
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card
              variant="outlined"
              :color="contact_content_borderColor"
              class="pb-3 w-100 mb-3"
              style="border-radius: 10px"
            >
              <div
                class="days d-flex justify-space-around border-bottom-solid py-1 mb-3"
              >
                <div
                  class="days_item"
                  :style="{ color: contact_content_titleColor }"
                >
                  یکشنبه
                </div>
              </div>
              <div class="time">
                <div
                  class="fw-regular2 text-center"
                  :style="{ color: contact_content_textColor }"
                >
                  {{ schedule.sunday }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card
              variant="outlined"
              :color="contact_content_borderColor"
              class="pb-3 w-100 mb-3"
              style="border-radius: 10px"
            >
              <div
                class="days d-flex justify-space-around border-bottom-solid py-1 mb-3"
              >
                <div
                  class="days_item"
                  :style="{ color: contact_content_titleColor }"
                >
                  دوشنبه
                </div>
              </div>
              <div class="time">
                <div
                  class="fw-regular2 text-center"
                  :style="{ color: contact_content_textColor }"
                >
                  {{ schedule.monday }}
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card
              variant="outlined"
              :color="contact_content_borderColor"
              class="pb-3 w-100 mb-3"
              style="border-radius: 10px"
            >
              <div
                class="days d-flex justify-space-around border-bottom-solid py-1 mb-3"
              >
                <div
                  class="days_item"
                  :style="{ color: contact_content_titleColor }"
                >
                  سه شنبه
                </div>
              </div>
              <div class="time">
                <div
                  class="fw-regular2 text-center"
                  :style="{ color: contact_content_textColor }"
                >
                  {{ schedule.tuesday }}
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card
              variant="outlined"
              :color="contact_content_borderColor"
              class="pb-3 w-100 mb-3"
              style="border-radius: 10px"
            >
              <div
                class="days d-flex justify-space-around border-bottom-solid py-1 mb-3"
              >
                <div
                  class="days_item"
                  :style="{ color: contact_content_titleColor }"
                >
                  چهارشنبه
                </div>
              </div>
              <div class="time">
                <div
                  class="fw-regular2 text-center"
                  :style="{ color: contact_content_textColor }"
                >
                  {{ schedule.wednesday }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card
              variant="outlined"
              :color="contact_content_borderColor"
              class="pb-3 w-100 mb-3"
              style="border-radius: 10px"
            >
              <div
                class="days d-flex justify-space-around border-bottom-solid py-1 mb-3"
              >
                <div
                  class="days_item"
                  :style="{ color: contact_content_titleColor }"
                >
                  پنجشنبه
                </div>
              </div>
              <div class="time">
                <div
                  class="fw-regular2 text-center"
                  :style="{ color: contact_content_textColor }"
                >
                  {{ schedule.thursday }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card
              variant="outlined"
              :color="contact_content_borderColor"
              class="pb-3 w-100 mb-3"
              style="border-radius: 10px"
            >
              <div
                class="days d-flex justify-space-around border-bottom-solid py-1 mb-3"
              >
                <div
                  class="days_item"
                  :style="{ color: contact_content_titleColor }"
                >
                  جمعه
                </div>
              </div>
              <div class="time">
                <div
                  class="fw-regular2 text-center"
                  :style="{ color: contact_content_textColor }"
                >
                  {{ schedule.friday }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="d-flex flex-column pb-3 mb-4">
        <div class="d-flex flex-column align-center">
          <div>
            <img :src="contact_contactIcon" alt="" width="30" />
          </div>
          <div
            class="base_title"
            :style="{ color: contact_content_titleColor }"
          >
            تماس با ما
          </div>
        </div>
        <div class="divider-wrapper my-4  d-sm-none">
          <span class="divider"></span>
        </div>
        <div class="d-flex justify-space-between mb-5">
          <div class="d-flex align-center">
            <img :src="contact_addressIcon" alt="" />
            <div class="ms-3">
              <div
                class="fw-bold"
                :style="{ color: contact_content_titleColor }"
              >
                آدرس
              </div>
              <p
                class="fw-regular"
                :style="{ color: contact_content_textColor }"
              >
                {{ address }}
              </p>
            </div>
          </div>
          <button
            class="d-flex align-center justify-center"
            style="
              width: 3.7rem;
              height: 3rem;
              border-radius: 10px;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            "
            :style="{ backgroundColor: contact_icon_backgroundColor }"
          >
            <a :href="locationLink" class="mb-0" style="line-height: 0">
              <img :src="contact_addressIcon" alt="" width="20" />
            </a>
          </button>
        </div>
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <img :src="contact_phoneIcon" alt="" />
            <div class="ms-3">
              <div
                class="fw-bold"
                :style="{ color: contact_content_titleColor }"
              >
                شماره تماس
              </div>
              <p
                class="fw-regular"
                :style="{ color: contact_content_textColor }"
              >
                {{ phone }}
              </p>
            </div>
          </div>
          <button
            class="d-flex align-center justify-center"
            style="
              width: 3rem;
              height: 3rem;
              border-radius: 10px;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            "
            :style="{ backgroundColor: contact_icon_backgroundColor }"
          >
            <a :href="'tel:' + phone" class="mb-0" style="line-height: 0">
              <img :src="contact_phoneIcon" alt="" />
            </a>
          </button>
        </div>
      </div>
    </v-card>
  </div>
  <div class="footer">
    <div class="footer-wrapper">
      <div
        class="circle-menu d-flex align-center justify-center"
        :style="{ backgroundColor: footer_middle_icon_backgroundColor }"
      >
        <nuxt-link to="menu">
          <div class="pa-4 rounded-circle d-flex align-center">
            <img :src="footer_middleIcon" alt="" />
          </div>
        </nuxt-link>
      </div>
      <div
        class="d-flex justify-space-between py-3 px-8 footer_backgroundColor"
      >
        <div class="footer-section">
          <NuxtLink to="orders">
            <div
              class="pa-2 rounded-lg d-flex align-items-center h-100"
              :style="{ backgroundColor: footer_right_icon_backgroundColor }"
            >
              <img :src="footer_rightIcon" alt="" />
            </div>
          </NuxtLink>
        </div>
        <div class="footer-section">
          <NuxtLink to="call">
            <div
              class="pa-2 rounded-lg d-flex align-items-center h-100"
              :style="{ backgroundColor: footer_left_icon_backgroundColor }"
            >
              <img :src="footer_leftIcon" alt="" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
