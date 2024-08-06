<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const route = useRoute();
const { $site } = useNuxtApp();
const foodList = ref([]);
const model = ref(null);
const response = ref([]);
const dialog = ref(false);
const allFoods = ref([]);
const selectedFood = ref(null);
const searchVal = ref(null);
const isActive = ref(null);
const logo = ref(null);
const { data:Data, mainError } = await useFetch((`https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`));

const { data, error } = await useFetch(`https://menuly.vip/api/v2/menu?slug=${route.params.restaurant_name}`);
const { $flashMsg } = useNuxtApp();
const foodsContainer = ref(null);
const mainFoods = ref([]);
const mainSlider = ref(null);
response.value = Data.value.data;
logo.value = response.value.logo;
foodList.value = data.value.data;
foodList.value.forEach((item) => {
  allFoods.value.push(...item.foods);
});
const menu_logo = ref(null)
const menu_backgroudColor = ref(null)
const menu_item_backgroundColor = ref(null)
const menu_item_titleColor = ref(null)
const menu_item_descriptionColor = ref(null)
const menu_item_plus_backgroundColor = ref(null)
const menu_item_plus_textColor = ref(null)
const menu_item_dailyFood_background = ref(null)
const menu_item_dailyFood_textColor = ref(null)
const menu_item_specialFood_background = ref(null)
const menu_item_specialFood_textColor = ref(null)
const menu_searchbox_backgroundColor = ref(null)
const menu_searchbox_textColor = ref(null)
const menu_searchbox_iconColor = ref(null)
const menu_selected_category_backgroundColor = ref(null)
const menu_selected_category_textColor = ref(null)
const menu_normal_category_backgroundColor = ref(null)
const menu_normal_category_textColor = ref(null)
const footer_backgroundColor = ref(null);
const footer_leftIcon = ref(null);
const footer_left_icon_backgroundColor = ref(null);
const footer_rightIcon = ref(null);
const footer_right_icon_backgroundColor = ref(null);
const footer_middleIcon = ref(null);
const footer_middle_icon_backgroundColor = ref(null);
footer_backgroundColor.value = response.value?.footer_background_color;
footer_leftIcon.value = response.value?.footer_left_icon;
footer_left_icon_backgroundColor.value = response.value?.footer_left_icon_background_color;
footer_rightIcon.value = response.value?.footer_right_icon;
footer_right_icon_backgroundColor.value = response.value?.footer_right_icon_background_color;
footer_middleIcon.value = response.value?.footer_middle_icon;
footer_middle_icon_backgroundColor.value = response.value?.footer_middle_icon_background_color;
menu_logo.value = response.value?.menu_logo
menu_backgroudColor.value = response.value?.menu_background_color
menu_item_backgroundColor.value = response.value?.menu_item_background_color
menu_item_titleColor.value = response.value?.menu_item_title_color
menu_item_descriptionColor.value = response.value?.menu_item_description_color
menu_item_plus_backgroundColor.value = response.value?.menu_item_plus_background_color
menu_item_plus_textColor.value = response.value?.menu_item_plus_text_color
menu_item_dailyFood_background.value = response.value?.menu_daily_food_background_color
menu_item_dailyFood_textColor.value = response.value?.menu_daily_food_text_color
menu_item_specialFood_background.value = response.value?.menu_special_food_background_color
menu_item_specialFood_textColor.value = response.value?.menu_special_food_text_color
menu_searchbox_backgroundColor.value = response.value?.menu_searchbox_background_color
menu_searchbox_textColor.value = response.value?.menu_searchbox_text_color
menu_searchbox_iconColor.value = response.value?.menu_searchbox_icon
menu_selected_category_backgroundColor.value = response.value?.menu_selected_category_background_color
menu_selected_category_textColor.value = response.value?.menu_selected_category_text_color
menu_normal_category_backgroundColor.value = response.value?.menu_normal_category_background_color
menu_normal_category_textColor.value = response.value?.menu_normal_category_text_color



const current_section_id = ref("");
const cat_clicked = ref(false);
const options = ref({
  threshold: 1,
});
onMounted(() => {
  let startedCatScroller = false;
  let timer = null;
  let timer2 = null;
  const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
      const exec = (_entry) => {
        current_section_id.value = _entry.target.getAttribute("id");
        let el = document.querySelector("#food" + current_section_id.value);
        const index = Array.from(
          document.querySelectorAll(".top-slider-vcard")
        ).indexOf(el);
        if (mainSlider.value) {
          mainSlider.value.slideTo(index);
        }
        // mainSlider.value.slideTo(index);
      };

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (cat_clicked.value) {
        if (cat_clicked.value == entry.target.getAttribute("id")) {
          if (!timer2) {
            const _entry_ = entry;
            timer2 = setTimeout(() => {
              cat_clicked.value = false;
              timer2 = null;
              exec(_entry_);
            }, 200);
          }
        }
        break;
      }

      timer = setTimeout(() => exec(entry), 200);

      if (!startedCatScroller) {
        startedCatScroller = true;
        break;
      }
    }
  }, options.value);
  const allSections = foodsContainer.value.querySelectorAll(".food-card");
  allSections.forEach((section) => {
    observer.observe(section);
  });
});
const selectedCategory = ref(0)
const changeFoods = (food, i) => {
  cat_clicked.value = food.id;
  current_section_id.value = food.id;
  const subfood = foodsContainer.value.querySelectorAll(".food-card");
  const index = Array.from(allFoods.value).findIndex(
    (card) => card.parent_id === food.id
  );
  if (subfood[index]) {
    subfood[index].scrollIntoView({ behavior: "smooth" });
    isActive.value = i;
  }
};
const search = () => {
  localStorage.setItem("result", JSON.stringify(searchVal.value));
  navigateTo({ path: "/" + route.params.restaurant_name + "/search-result" });
};

const existsSubItemIndex = (item, taste) =>
  (item.selected_toping || []).findIndex((entry) => {
    return entry.id == taste.id;
  });

const addSubfood = (index, subfood) => {
  const item = allFoods.value[index];
  if (item.toping_type == "single") {
    item.selected_toping = [];
  }
  const selectedSubIndex = existsSubItemIndex(item, subfood);
  if (selectedSubIndex > -1) {
    item.selected_toping.splice(selectedSubIndex, 1);
  } else {
    item.selected_toping.push(subfood);
  }
};

const storedItems = ref(JSON.parse(localStorage.getItem("foods")) || []);
const addDailyFood = (item, id) => {
  console.log(item)
}
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
const numberFormat = (money) => {
  return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};
const settings = {
  itemsToShow: 3,
  dir: "rtl",
};
const breakpoints = ref({
      // 700px and up
      700: {
        itemsToShow: 4,
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
      },
       1200: {
        itemsToShow: 7,
      },
    },)
</script>
<template>
  <div class="menu-page" :style="{backgroundColor:menu_backgroudColor}">
    <div class="pa-3 mb-16">
      <div>
        <div class="d-flex justify-center mb-3">
          <img :src="menu_logo" alt="" height="100" style="max-width: 100%" />
        </div>
        <div class="search-box menu_searchbox_backgroundColor d-block d-md-none">
          <input
            type="text"
            class="ps-5 w-75 menu_searchbox_textColor"
            placeholder="جستجو..."
            v-model="searchVal"
            @keyup.enter="search"
          />
          <i class="fa-solid fa-magnifying-glass search-icon menu_searchbox_iconColor" @click="search" role="button" style="font-size: 15px;"/>
        </div>
        <div class="border-bottom-solid pb-3 mb-3">
          <div class="food-list__slider">
            <carousel v-bind="settings" ref="mainSlider" :breakpoints="breakpoints">
              <slide v-for="(food, i) in foodList" :key="i">
                <v-card
                  :class="[
                    'my-3 mx-1 pa-2 d-flex flex-column justify-center align-center foods-parent top-slider-vcard',
                    food.id == current_section_id ? 'menu_selected_category_backgroundColor transform' : 'menu_normal_category_backgroundColor',
                  ]"
                  stacked
                  width="130"
                  height="130"
                  rounded="lg"
                  @click="changeFoods(food, i)"
                  ref="mainFoods"
                  :id="'food' + food.id"
                >
                  <img
                    :src="
                      food.id == current_section_id
                        ? food.icon
                        : food.icon_disable
                    "
                    alt=""
                    class="mb-1"
                    width="40"
                  />
                  <div :class="food.id == current_section_id ? 'menu_selected_category_textColor' : 'menu_normal_category_textColor'">
                    <span
                    class="text-center truncation-clamp clamp-2 word-break mb-1"
                    style="font-size: 12px"
                    >{{ food.name }}</span
                  >
                  <span >
                    {{ food.slug }}
                  </span>
                  </div>
                  
                </v-card>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
      <section
        style="height: 30rem; overflow: hidden; overflow-y: scroll"
        ref="foodsContainer"
      >
        <div class="mt-3" v-if="allFoods.length">
          <v-row>
            <v-col cols="12" sm="6" lg="4" v-for="(item, index) in allFoods" :key="index">
              <div >
            
         <!-- Special food -->
            <v-card
              color="pri-d"
              class="pa-4 mb-3 rounded-xl special-food menu_item_specialFood_background "
              variant="tonal"
              :id="item.parent_id"
              v-if="item.special == 1"
            >
              <div style="position: relative">
                <div
                  class="no-food d-flex justify-center align-center w-100 h-100"
                  v-if="item.finished == '1'"
                   >
                  <img src="@/assets/images/done.svg" alt="" width="130" />
                </div>
                <div
                  :class="item.finished == '1' ? 'opacity-3' : ''"
                  :style="item.finished == '1' ? 'pointer-events: none' : ''"
                >
                  <img :src="item.image" alt="" class="aspect-ratio-1x1 special-food-img"   @click="(dialog = true), (selectedFood = item)" role="button"/>
                  <button
                    class="food-card-plus menu_item_plus-background-color"
                    style="border-top-left-radius: 1rem"
                    @click="addToStorage(item, index)"
                  >
                    <i
                      class="fa-solid fa-plus menu_item_plus_text_color"
                      style="font-size: 20px; color: white"

                    ></i>
                  </button>
                </div>
                <div
                  class="my-2 d-flex justify-space-between align-center"
                  v-if="item.price"
                  role="button"
                   @click="(dialog = true), (selectedFood = item)"
                 >
                  <div class="menu_item_specialFood_textColor">{{ item.name }}</div>
                  <div class="menu_item_specialFood_textColor">{{ item.price }} تومان</div>
                 </div>
                 <div
                  class="menu_item_specialFood_textColor"
                  role="button"
                   @click="(dialog = true), (selectedFood = item)"
                 >
                  {{ item.description }}
                </div>
                <v-expansion-panels
                  class="mt-3"
                  multiple
                  v-if="item.toping.length"
                >
                  <v-expansion-panel
                    class="menu-expansion"
                    bg-color="pri-l"
                    elevation="0"
                    rounded="lg"
                    :value="isOpen(index)"
                    @input="toggleOpen(index)"
                  >
                    <v-expansion-panel-title>
                      <template v-slot="{ open }">
                        <div class="menu_item_specialFood_textColor">
                          {{ item.toping_label }}
                        </div>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="pa-0">
                      <div
                        :class="[
                          'food-taste px-2 py-1 my-2 ',
                          existsSubItemIndex(item, taste) !== -1
                            ? 'active-border'
                            : 'base-border',
                        ]"
                        role="button"
                        v-for="(taste, i) in item.toping"
                        :key="i"
                        @click="addSubfood(index, taste, i)"
                      >
                        <div class="d-flex justify-space-between align-center">
                          <div
                            :class="[
                              existsSubItemIndex(item, taste) !== -1
                                ? 'menu_item_specialFood_textColor'
                                : 'text-pri-d',
                            ]"
                          >
                            {{ taste.title }}
                          </div>
                          <div
                            :class="[
                              existsSubItemIndex(item, taste) !== -1
                                ? 'menu_item_specialFood_textColor'
                                : 'text-pri-d',
                            ]"
                          >
                            <span>{{ numberFormat(taste.price) }}</span> تومان
                          </div>
                        </div>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-card>
            <!-- daily food -->
            <v-card
              variant="flat"
              class="food-card pa-4 rounded-xl w-100 mb-3 menu_item_dailyfood-background-color"
              :id="item.parent_id"
              v-if="item.daily == 1"
            >
              <div
                class="no-food d-flex justify-center align-center w-100 h-100"
                v-if="item.finished == '1'"
              >
                <img src="@/assets/images/done.svg" alt="" width="130" />
              </div>
              <div
                :class="item.finished == '1' ? 'opacity-3' : ''"
                :style="item.finished == '1' ? 'pointer-events: none' : ''"
              >
                <button
                  class="food-card-plus menu_item_plus-background-color"
                  @click="addToStorage(item, index)"
                >
                  <i class="fa-solid fa-plus menu_item_plus_text_color"  style="font-size: 20px"></i>
                </button>
                <div
                  class="d-flex flex-column"
                  @click="(dialog = true), (selectedFood = item)"
                >
                  <div class="d-flex">
                    <img
                      :src="item.image"
                      alt=""
                      class="rounded-lg aspect-ratio-1x1"
                      style="width: 70px; height: 70px"
                      role="button"
                    />
                    <div class="ps-3 w-100">
                      <span
                        class="fw-bold menu_item_dailyfood-text-color truncation-clamp clamp-2 word-break w-75"
                        role="button"
                        @click="selectedFood = item"
                        >{{ item.name }}
                      </span>
                      <p
                        class="menu_item_dailyfood-text-color truncation-clamp clamp-2 word-break"
                        role="button"
                        @click="selectedFood = item"
                      >
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="d-flex justify-end menu_item_dailyfood-text-color"
                    v-if="item.price"
                    role="button"
                    @click="selectedFood = item"
                  >
                    <span class="fw-bold pe-1">{{ item.price }}</span
                    >تومان
                  </div>
                </div>
                <v-expansion-panels
                  class="mt-3"
                  multiple
                  v-if="item.toping.length"
                >
                  <v-expansion-panel
                    class="menu-expansion daily-food-expansion border border-white"
                    bg-color="transparent"
                    elevation="0"
                    rounded="lg"
                    :value="isOpen(index)"
                    @input="toggleOpen(index)"
                  >
                    <v-expansion-panel-title>
                      <template v-slot="{ open }">
                        <div class="menu_item_dailyfood-text-color">
                          {{ item.toping_label }}
                        </div>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="pa-0">
                      <div
                        :class="[
                          'food-taste px-2 py-1 my-2 ',
                          existsSubItemIndex(item, taste) !== -1
                            ? 'active-border'
                            : 'base-border',
                        ]"
                        role="button"
                        v-for="(taste, i) in item.toping"
                        :key="i"
                        @click="addSubfood(index, taste, i)"
                      >
                        <div class="d-flex justify-space-between align-center">
                          <div
                            :class="[
                              existsSubItemIndex(item, taste) !== -1
                                ? 'menu_item_dailyfood-text-color'
                                : 'text-pri-d',
                            ]"
                          >
                            {{ taste.title }}
                          </div>
                          <div
                            :class="[
                              existsSubItemIndex(item, taste) !== -1
                                ? 'menu_item_dailyfood-text-color'
                                : 'text-pri-d',
                            ]"
                          >
                            <span>{{ numberFormat(taste.price) }}</span> تومان
                          </div>
                        </div>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-card>

              <!-- Regular food -->
               <v-card
              variant="outlined"
              color="pri"
              class="food-card pa-4 rounded-xl w-100 mb-3 menu-item_background-color"
              :id="item.parent_id"
              v-else
            >
              <div
                class="no-food d-flex justify-center align-center w-100 h-100"
                v-if="item.finished == '1'"
              >
                <img src="@/assets/images/done.svg" alt="" width="130" />
              </div>
              <div
                :class="item.finished == '1' ? 'opacity-3' : ''"
                :style="item.finished == '1' ? 'pointer-events: none' : ''"
              >
                <button
                  class="food-card-plus menu_item_plus-background-color"
                  @click="addToStorage(item, index)"
                >
                  <i class="fa-solid fa-plus menu_item_plus_text_color" style="font-size: 20px"></i>
                </button>
                <div
                  class="d-flex flex-column"
                  @click="(dialog = true), (selectedFood = item)"
                >
                  <div class="d-flex">
                    <img
                      :src="item.image"
                      alt=""
                      class="rounded-lg aspect-ratio-1x1"
                      style="width: 70px; height: 70px"
                      role="button"
                    />
                    <div class="ps-3 w-100">
                      <span
                        class="fw-bold menu_item_title-color truncation-clamp clamp-2 word-break w-75"
                        role="button"
                        @click="selectedFood = item"
                        >{{ item.name }}
                      </span>
                      <p
                        class="menu_item_description-color truncation-clamp clamp-2 word-break"
                        role="button"
                        @click="selectedFood = item"
                      >
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="d-flex justify-end menu_item_description-color"
                    v-if="item.price"
                    role="button"
                    @click="selectedFood = item"
                  >
                    <span class="fw-bold pe-1">{{ item.price }}</span
                    >تومان
                  </div>
                </div>
                <v-expansion-panels
                  class="mt-3"
                  multiple
                  v-if="item.toping.length"
                >
                  <v-expansion-panel
                    class="menu-expansion"
                    bg-color="pri-l"
                    elevation="0"
                    rounded="lg"
                    :value="isOpen(index)"
                    @input="toggleOpen(index)"
                  >
                    <v-expansion-panel-title>
                      <template v-slot="{ open }">
                        <div class="menu_item_description-color">
                          {{ item.toping_label }}
                        </div>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="pa-0">
                      <div
                        :class="[
                          'food-taste px-2 py-1 my-2 ',
                          existsSubItemIndex(item, taste) !== -1
                            ? 'active-border'
                            : 'base-border',
                        ]"
                        role="button"
                        v-for="(taste, i) in item.toping"
                        :key="i"
                        @click="addSubfood(index, taste, i)"
                      >
                        <div class="d-flex justify-space-between align-center">
                          <div
                            :class="[
                              existsSubItemIndex(item, taste) !== -1
                                ? 'menu_item_description-color'
                                : 'text-pri-d',
                            ]"
                          >
                            {{ taste.title }}
                          </div>
                          <div
                            :class="[
                              existsSubItemIndex(item, taste) !== -1
                                ? 'menu_item_description-color'
                                : 'text-pri-d',
                            ]"
                          >
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
            </v-col>
          </v-row>
          
        </div>
        <div
          class="d-flex align-center justify-center"
          style="height: 20rem"
          v-else
        >
          <h1>موردی یافت نشد</h1>
        </div>
      </section>
    </div>
    <ModalBaseModal v-model="dialog" :item="selectedFood" />
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
                        <div class="pa-2 rounded-lg  d-flex align-items-center h-100" :style="{backgroundColor:footer_right_icon_backgroundColor}">
                            <img :src="footer_rightIcon" alt="">
                            <!-- <img src="@/assets/images/menu2-icon.svg" alt=""> -->
                        </div>
                    </v-badge>
                    <div class="pa-2 rounded-lg  d-flex align-items-center h-100" :style="{backgroundColor:footer_right_icon_backgroundColor}" v-else>
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
                    <div class="pa-2 rounded-lg footer_left_icon_backgroundColor d-flex align-items-center h-100" :style="{backgroundColor:footer_left_icon_backgroundColor}">
                        <img :src="footer_leftIcon" alt="">
                        <!-- <img src="@/assets/images/logo.png" alt=""> -->
                    </div>
                </NuxtLink>
                </div>
            </div>
        </div>
    </div>
    <!-- <CommonTheFooter :haveOrder="storedItems.length" /> -->
  </div>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.card {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: white;
}
/* .menu-background-color {
  background-color: v-bind(menu_backgroudColor)
} */
.menu-item_background-color{
  background-color: v-bind(menu_item_backgroundColor)
}
.menu_item_title-color {
  color:v-bind(menu_item_titleColor)
}
.menu_item_description-color {
  color: v-bind(menu_item_descriptionColor)
}
.menu_item_plus-background-color {
  background-color: v-bind(menu_item_plus_backgroundColor);
}
.menu_item_plus_text_color {
  color: v-bind(menu_item_plus_textColor);
}
.menu_item_dailyfood-background-color {
  background-color: v-bind(menu_item_dailyFood_background) ;
}
.menu_item_dailyfood-text-color {
  color: v-bind(menu_item_dailyFood_textColor) ;
}

.menu_item_specialFood_background {
  background-color: v-bind(menu_item_specialFood_background) ;
}
.menu_item_specialFood_textColor {
  color: v-bind(menu_item_specialFood_textColor) ;
}
.menu_searchbox_backgroundColor {
  background-color: v-bind(menu_searchbox_backgroundColor) ;
}
.menu_searchbox_textColor {
  color: v-bind(menu_searchbox_textColor) ;
}
.menu_searchbox_iconColor {
  color: v-bind(menu_searchbox_iconColor) ;
}
.menu_selected_category_backgroundColor {
  background-color: v-bind(menu_selected_category_backgroundColor) ;
}
.menu_selected_category_textColor {
  color: v-bind(menu_selected_category_textColor) ;
}
.menu_normal_category_backgroundColor {
  background-color: v-bind(menu_normal_category_backgroundColor) ;
}
.menu_normal_category_textColor {
  color: v-bind(menu_normal_category_textColor) ;
}

</style>
