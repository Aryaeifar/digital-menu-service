<script setup>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
const route = useRoute();
const response = ref([]);

const { data: Data, mainError } = await useFetch(
  `https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`
);
response.value = Data.value.data;

const props = defineProps({
  value: {
    type: Boolean,
  },
  item: {
    type: [Array, Object],
  },
});

const menu_popup_backgroundColor = ref(null);
const menu_popup_titleColor = ref(null);
const menu_popup_descriptionColor = ref(null);

onMounted(() => {
  menu_popup_backgroundColor.value = response.value?.menu_popup_background_color;
  menu_popup_titleColor.value = response.value?.menu_popup_title_color;
  menu_popup_descriptionColor.value = response.value?.menu_popup_description_color;
});
const currentSlide = ref(0);
const slideTo = (val) => {
  currentSlide.value = val;
};
const settings = {
  dir: "rtl",
  snapAlign: "center",
};

const activeDesc = ref(true);
</script>

<template>
  <v-dialog v-model="dialog" class="base-modal">
    <v-card class="base-modal-card rounded-xl pa-5" :style="{ backgroundColor: menu_popup_backgroundColor }">
      <div
        v-if="item.description"
        :class="[
          'footer-vector ',
          activeDesc == true
            ? 'footer-vector-active'
            : 'footer-vector-deactive ',
        ]"
        @click="activeDesc = !activeDesc"
        role="button"
      >
        <img src="@/assets/images/modal-vector.svg" alt="" />
        <img src="@/assets/images/arrow-down.svg" alt="" class="modal-arrow" />
      </div>
      <div class="header d-flex justify-space-between align-center mb-3">
        <span :style="{ color: menu_popup_titleColor }">{{ item.name }}</span>
        <i
          class="fa-solid fa-x text-white"
          @click="$emit('update:modelValue', false)"
          role="button"
        ></i>
      </div>
      <div class="">
        <Carousel
          class="mb-3"
          v-bind="settings"
          id="gallery"
          :items-to-show="1"
          :wrap-around="false"
          v-model="currentSlide"
        >
          <Slide v-for="(slide, i) in item.gallery" :key="i">
            <div class="carousel__item">
              <v-img
                aspect-ratio="4/3"
                class="rounded-xl"
                :src="slide.file"
                cover
              ></v-img>
            </div>
          </Slide>
        </Carousel>
        <Carousel
          id="thumbnails"
          :items-to-show="4"
          v-model="currentSlide"
          ref="carousel"
          v-bind="settings"
        >
          <Slide v-for="(slide, i) in item.gallery" :key="i">
            <div class="carousel__item" @click="slideTo(i)">
              <img
                :src="slide.file"
                class="w-100"
                style="border-radius: 15px"
                role="button"
              />
            </div>
          </Slide>
        </Carousel>
      </div>
      <div v-if="item.description">
        <div class="food-desc mt-3" v-if="activeDesc">
          <div class="d-flex align-center mb-3" :style="{ color: menu_popup_descriptionColor }">
            <img src="@/assets/images/desc-icon.svg" alt="" class="me-2" />
            توضیحات
          </div>
          <div>
            <p  :style="{ color: menu_popup_descriptionColor }">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.carousel__item {
  width: 100%;
  padding: 0 0.3rem;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
