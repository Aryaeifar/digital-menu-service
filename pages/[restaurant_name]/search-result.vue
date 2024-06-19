<script setup>
definePageMeta({
  layout: "no-footer",
});
const { $flashMsg, $site } = useNuxtApp();
const route = useRoute();
const response = ref([]);
const logo = ref(null);
const allFoods = ref([]);
const storedResult = JSON.parse(localStorage.getItem("result") || [] );
const { data, searchError } = await useFetch((`https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`));

const { data:Data, error } = await useFetch((`https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`));

allFoods.value = data.value.data
const selectedFood = ref(null);
const dialog = ref(false);
const foods = ref([]);
const existingFood = ref(JSON.parse(localStorage.getItem("foods") || "[]"));
foods.value = existingFood.value;
response.value = Data.value.data;
logo.value = response.value.logo;

const topPrice = ref(null)
foods.value.forEach(item => {
  item.selected_toping.forEach(top => {
    topPrice.value = top.price
  })
})
const existsSubItemIndex = (item, taste) =>
  (item.selected_toping || []).findIndex((entry) => {
    return entry.id == taste.id;
  });
  const addSubfood = (index, subfood) => {
  const item = allFoods.value[index];
  const selectedSubIndex = existsSubItemIndex(item, subfood);
  if (selectedSubIndex > -1) {
    item.selected_toping.splice(selectedSubIndex, 1);
  } else {
    item.selected_toping.push(subfood);
  }
};
const storedItems = ref(JSON.parse(localStorage.getItem("foods")) || [])
const addToStorage = (item, index) => {
  $flashMsg.success({
    text: `${item.name}  به لیست سفارشات اضافه شد.`,
  });
  const selectedFood = allFoods.value[index];
  const selectedItem = {
    name: selectedFood.name,
    id: new Date() + selectedFood.id,
    price: selectedFood.price,
    slug: selectedFood.slug,
    image: selectedFood.image,
    description: selectedFood.description,
    count: 1,
    selected_toping: [...selectedFood.selected_toping],
  };
  allFoods.value[index].selected_toping = [];
  storedItems.value = JSON.parse(localStorage.getItem("foods")) || [];
  storedItems.value.push(selectedItem);
  localStorage.setItem("foods", JSON.stringify(storedItems.value));
};

const openIndex = ref(null);
const isOpen = (index) => {
  return openIndex.value === index;
};
const toggleOpen = (index) => {
  if (openIndex.value === index) {
    openIndex.value = null;
  } else {
    openIndex.value = index;
  }
};
</script>
<template>
  <div class="search-page mb-16">
    <CommonTheHeader page="نتیجه جستجو" class="pa-3" :logo="logo" />
    <section class="pa-3"  ref="foodsContainer">
        <div class="mt-3" v-if="allFoods.length">
          <v-card
            variant="outlined"
            color="pri"
            class="food-card pa-4 rounded-xl w-100 mb-3"
            v-for="(item, index) in allFoods"
            :key="index"
            :id="item.parent_id">
            <div class="no-food d-flex justify-center align-center w-100 h-100" v-if="item.finished == '1'">
              <img src="@/assets/images/done.svg" alt="" width="130" />
            </div>
            <div
              :class="item.finished == '1' ? 'opacity-3' : ''"
              :style="item.finished == '1' ? 'pointer-events: none' : ''">
              <button class="food-card-plus" @click="addToStorage(item, index)">
                <i class="fa-solid fa-plus" style="font-size: 20px"></i>
              </button>
              <div class="d-flex flex-column" @click="(dialog = true), (selectedFood = item)">
                <div class="d-flex">
                  <img :src="item.image" alt="" class="rounded-lg aspect-ratio-1x1" style="width: 70px; height: 70px" />
                  <div class="ps-3 w-100">
                    <span
                      class="fw-bold text-dark truncation-clamp clamp-2 word-break w-75"
                      role="button"
                      @click="selectedFood = item"
                      >{{ item.name }}
                    </span>
                    <p class="text-dark truncation-clamp clamp-2 word-break" role="button" @click="selectedFood = item">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-end text-dark" v-if="item.price" role="button" @click="selectedFood = item">
                  <span class="fw-bold pe-1">{{ item.price }}</span
                  >تومان
                </div>
              </div>
              <v-expansion-panels class="mt-3" multiple v-if="item.toping.length">
                <v-expansion-panel
                  class="menu-expansion"
                  bg-color="pri-l"
                  elevation="0"
                  rounded="lg"
                  :value="isOpen(index)"
                  @input="toggleOpen(index)">
                  <v-expansion-panel-title>
                    <template v-slot="{ open }">
                      <div class="text-pri-d">
                        {{ item.toping_label }}
                      </div>
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="pa-0">
                    <div
                      :class="[
                        'food-taste px-2 py-1 my-2 ',
                        existsSubItemIndex(item, taste) !== -1 ? 'active-border' : 'base-border',
                      ]"
                      role="button"
                      v-for="(taste, i) in item.toping"
                      :key="i"
                      @click="addSubfood(index, taste, i)">
                      <div class="d-flex justify-space-between align-center">
                        <div :class="[existsSubItemIndex(item, taste) !== -1 ? 'text-dark' : 'text-pri-d']">
                          {{ taste.title }}
                        </div>
                        <div :class="[existsSubItemIndex(item, taste) !== -1 ? 'text-dark' : 'text-pri-d']">
                          <span>{{ numberFormat(taste.price) }}</span> تومان
                        </div>
                      </div>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-card>
        </div>
        <div class="d-flex align-center justify-center" style="height: 20rem" v-else>
          <h1>موردی یافت نشد</h1>
        </div>
      </section>
      <ModalBaseModal v-model="dialog" :item="selectedFood" />

    <!-- <CommonTheFooter :isOrderPage="false" :haveOrder="storedItems.length"/> -->
     <div class="footer">
        <div class="footer-wrapper">
                <div class="circle-menu d-flex align-center justify-center" :style="{backgroundColor:footer_middle_icon_backgroundColor}">
            <!-- <div :class="['circle-menu d-flex align-center justify-center', isOrderPage == true ? 'bg-pri-dd' : '' ]"> -->
                <nuxt-link to="menu">
                    <div class=" pa-4 rounded-circle d-flex align-center">
                        <img :src="footer_middleIcon" alt="">
                  <!-- <img src="@/assets/images/home-icon.svg" class="" alt=""> -->
                </div>
                </nuxt-link>
            </div>
            <div class="d-flex justify-space-between py-3 px-8 footer_backgroundColor">
                <div class="footer-section">
                    <NuxtLink to="orders">
                    <v-badge dot color="red" v-if="storedItems.length">
                        <div class="pa-2 rounded-lg footer_right_icon_backgroundColor d-flex align-items-center h-100">
                            <img :src="footer_rightIcon" alt="">
                            <!-- <img src="@/assets/images/menu2-icon.svg" alt=""> -->
                        </div>
                    </v-badge>
                    <div class="pa-2 rounded-lg footer_right_icon_backgroundColor d-flex align-items-center h-100" v-else>
                        <img :src="footer_rightIcon" alt="">
                        <!-- <img src="@/assets/images/menu2-icon.svg" alt=""> -->
                    </div>
                </NuxtLink>
                 <!-- <NuxtLink to="">
                    <div class="pa-2 rounded-lg bg-pri d-flex align-items-center h-100" >
                        <img src="@/assets/images/360-dark.svg" alt="">
                    </div>
                </NuxtLink> -->
                </div>
                <div class="footer-section">
                    <!-- <NuxtLink to="">
                    <div class="pa-2 rounded-lg bg-pri d-flex align-items-center h-100">
                        <img src="@/assets/images/reserved-dark.svg" alt="">
                    </div>
                </NuxtLink> -->
                <NuxtLink to="call" >
                    <div class="pa-2 rounded-lg footer_left_icon_backgroundColor d-flex align-items-center h-100">
                        <img :src="footer_leftIcon" alt="">
                        <!-- <img src="@/assets/images/logo.png" alt=""> -->
                    </div>
                </NuxtLink>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<style scoped>
.food-card {
  transform: v-bind(cardStyle);
}
.swipe-content {
  transition: transform 0.3s ease; /* Add a smooth transition effect */
}
</style>
