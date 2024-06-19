<script setup>
definePageMeta({
  layout: "no-footer",
});
const { setFoods } = useList();
const { $flashMsg, $site } = useNuxtApp();
const route = useRoute();
const response = ref([]);
const logo = ref(null);
const { data, error } = await useFetch((`https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`));

const foods = ref([]);
const existingFood = ref(JSON.parse(localStorage.getItem("foods") || "[]"));
foods.value = existingFood.value;
response.value = data.value?.data;
logo.value = response.value.logo;

const orderLogo = ref(null)
const orders_titleColor = ref(null)

const orders_back_icon_backgroundColor = ref(null)
const orders_back_icon_textColor = ref(null)
const orders_backgroundColor = ref(null)
const orders_no_foodImage = ref(null)
const orders_delete_iconColor = ref(null)
const orders_item_backgroundColor = ref(null)
const orders_item_textColor = ref(null)
const orders_buttons_backgroundColor = ref(null)
const orders_buttons_textColor = ref(null)
const orders_sum_food_backgroundColor = ref(null)
const orders_sum_food_textColor = ref(null)
const footer_backgroundColor = ref(null);
const footer_leftIcon = ref(null);
const footer_left_icon_backgroundColor = ref(null);
const footer_rightIcon = ref(null);
const footer_right_icon_backgroundColor = ref(null);
const footer_middleIcon = ref(null);
const footer_middle_icon_backgroundColor = ref(null);

orders_back_icon_backgroundColor.value = response.value?.orders_back_icon_background_color;
orders_back_icon_textColor.value = response.value?.orders_back_icon_text_color;



orderLogo.value = response.value?.orders_logo;
orders_titleColor.value = response.value?.orders_title_color;
orders_backgroundColor.value = response.value?.orders_background_color;
orders_no_foodImage.value = response.value?.orders_no_food_image;
orders_delete_iconColor.value = response.value?.orders_delete_icon_color;
orders_item_backgroundColor.value = response.value?.orders_item_background_color;
orders_item_textColor.value = response.value?.orders_item_text_color;
orders_buttons_backgroundColor.value = response.value?.orders_buttons_background_color;
orders_buttons_textColor.value = response.value?.orders_buttons_text_color;
orders_sum_food_backgroundColor.value = response.value?.orders_sum_food_background_color;
orders_sum_food_textColor.value = response.value?.orders_sum_food_text_color;
footer_backgroundColor.value = response.value?.footer_background_color;
footer_leftIcon.value = response.value?.footer_left_icon;
footer_left_icon_backgroundColor.value = response.value?.footer_left_icon_background_color;
footer_rightIcon.value = response.value?.footer_right_icon;
footer_right_icon_backgroundColor.value = response.value?.footer_right_icon_background_color;
footer_middleIcon.value = response.value?.footer_middle_icon;
footer_middle_icon_backgroundColor.value = response.value?.footer_middle_icon_background_color;

const swipeContainer = ref(null);
let startX = 0;

const handleTouchStart = (event) => {
  startX = event.touches[0].clientX;
};

const handleTouchEnd = (event, i) => {
  const diffX = startX - event.changedTouches[0].clientX;
  if (diffX > 50) {
    swipeContainer.value[i].style.transform = "translateX(-100px)";
  }
  if (diffX < 50) {
    setTimeout(function () {
      swipeContainer.value[i].style.transform = "translateX(0)";
    }, 100);
  }
};
const deleteFood = (food) => {
  $flashMsg.error({
    text: `${food.name}  از لیست سفارشات حذف شد.`,
  });
  foods.value = foods.value.filter((item) => item !== food);
  const existingFood = JSON.parse(localStorage.getItem("foods"));
  const updateFood = existingFood.filter((item) => item.id !== food.id);
  localStorage.setItem("foods", JSON.stringify(updateFood));
};
const increase = (index) => {
  foods.value[index].count++;
};
const decrease = (index) => {
  if (foods.value[index].count > 1) {
    foods.value[index].count--;
  }
};
const numberFormat = (money) => {
  return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};
const calculateSum = () => {
  return foods.value.reduce(
    (sum, item) =>
      sum + parseFloat(item.count * calculateTotalPrice(item) || 0),
    0
  );
};
const topPrice = ref(null);
foods.value.forEach((item) => {
  item.selected_toping.forEach((top) => {
    topPrice.value = top.price;
  });
});

function calculateTotalPrice(item) {
  const selectedToping = item.selected_toping.map((toping) => toping.price);
  const totalPrice =
    item.price + selectedToping.reduce((food, price) => food + price, 0);
  return totalPrice;
}
const router = useRouter();
function backEvent() {
  console.log("aaaa")
  return router.back(-1);
  
}
</script>
<template>
  <div class="orders-page mb-16" :style="{backgroundColor:orders_backgroundColor}">
    <div class="d-flex justify-space-between align-center theHeader pa-3">
      <div class="fw-bold" :style="{color:orders_titleColor}">سفارشات</div>
      <div class="theHeader-logo">
        <img :src="orderLogo"  alt="" class="" height="100" style="max-width: 100%" />
      </div>
      <button @click="backEvent" style="z-index:1000" >
        <i
          class="fa-solid fa-chevron-left pa-2 rounded-lg"
          :style="{backgroundColor:orders_back_icon_backgroundColor, color:orders_back_icon_textColor }"
        ></i>
      </button>
    </div>
    <!-- <CommonTheHeader page=" سفارشات" class="pa-3" :logo="logo" /> -->
    <div class="d-flex flex-column justify-space-between">
      <div
        class="pa-3 mb-16"
        style="overflow-y: auto; overflow-x: hidden"
        v-if="foods.length"
      >
      <v-row>
        <v-col cols="12" sm="6" lg="4" v-for="(item, index) in foods"
          :key="'swipeContainer' + index">
          
          <v-card
         ref="swipeContainer"
          
            variant="outlined"
            color="pri"
            class="food-card pa-4 rounded-xl w-100 mb-3"
            :style="{backgroundColor:orders_item_backgroundColor}"
            role="button"
           >
            <div class="d-flex flex-column">
              <div class="d-flex border-bottom-solid pb-3">
                <img
                  :src="item.image"
                  alt=""
                  class="rounded-lg aspect-ratio-1x1"
                  style="width: 70px; height: 70px"
                />
                <div class="ps-3 w-100">
                 <div class="d-flex justify-space-between align-center">
                   <span class="fw-bold" :style="{color:orders_item_textColor}">{{ item.name }}</span>
                  <v-icon icon="mdi-delete" :color="orders_delete_iconColor" @click="deleteFood(item, index)"/>
                 </div>
                  <div class="word-break mb-3" :style="{color:orders_item_textColor}">
                    <span v-if="item.selected_toping.length"> به همراه:</span>
                    <ul class="ms-3">
                      <li
                        class="text-dark"
                        v-for="(top, topIndex) in item.selected_toping"
                        :key="topIndex"
                      >
                        {{ top.title }} &nbsp;
                      </li>
                    </ul>
                  </div>
                  <p class="truncation-clamp clamp-2 word-break" :style="{color:orders_item_textColor}">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div
                class="d-flex justify-space-between align-center text-dark mt-3"
               >
                <div class="d-flex align-center">
                  <v-btn
                    class="mx-2 pa-2  rounded-lg"
                    :style="{backgroundColor:orders_buttons_backgroundColor}"
                    flat="true"
                    @click="increase(index)"
                    size="28"
                  >
                    <i class="fa-solid fa-plus" style="font-size: 10px" :style="{color:orders_buttons_textColor}"></i>
                  </v-btn>
                  <span :style="{color:orders_item_textColor}">
                    {{ item.count }}
                  </span>
                  <v-btn
                    class="mx-2 pa-2  rounded-lg"
                    :style="{backgroundColor:orders_buttons_backgroundColor}"
                    flat="true"
                    @click="decrease(index)"
                    size="28"
                  >
                    <i class="fa-solid fa-minus" style="font-size: 10px" :style="{color:orders_buttons_textColor}"></i>
                  </v-btn>
                </div>
                <div :style="{color:orders_item_textColor}">
                  <span class="fw-bold pe-1" >{{
                    numberFormat(calculateTotalPrice(item))
                  }}</span
                  >تومان
                </div>
              </div>
            </div>
          </v-card>
          </v-col>
      </v-row>
      
        <!-- <div
          ref="swipeContainer"
          v-for="(item, index) in foods"
          :key="'swipeContainer' + index"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd($event, index)"
          style="position: relative; transition: 0.2s ease-in-out"
        >
          <v-card
            variant="outlined"
            color="pri"
            class="food-card pa-4 rounded-xl w-100 mb-3"
            :style="{backgroundColor:orders_item_backgroundColor}"
            role="button"
           >
            <div class="d-flex flex-column">
              <div class="d-flex border-bottom-solid pb-3">
                <img
                  :src="item.image"
                  alt=""
                  class="rounded-lg aspect-ratio-1x1"
                  style="width: 70px; height: 70px"
                />
                <div class="ps-3 w-100">
                 <div class="d-flex justify-space-between align-center">
                   <span class="fw-bold" :style="{color:orders_item_textColor}">{{ item.name }}</span>
                  <v-icon icon="mdi-delete" :color="orders_delete_iconColor" @click="deleteFood(item, index)"/>
                 </div>
                  <div class="word-break mb-3" :style="{color:orders_item_textColor}">
                    <span v-if="item.selected_toping.length"> به همراه:</span>
                    <ul class="ms-3">
                      <li
                        class="text-dark"
                        v-for="(top, topIndex) in item.selected_toping"
                        :key="topIndex"
                      >
                        {{ top.title }} &nbsp;
                      </li>
                    </ul>
                  </div>
                  <p class="truncation-clamp clamp-2 word-break" :style="{color:orders_item_textColor}">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div
                class="d-flex justify-space-between align-center text-dark mt-3"
               >
                <div class="d-flex align-center">
                  <v-btn
                    class="mx-2 pa-2  rounded-lg"
                    :style="{backgroundColor:orders_buttons_backgroundColor}"
                    flat="true"
                    @click="increase(index)"
                    size="28"
                  >
                    <i class="fa-solid fa-plus" style="font-size: 10px" :style="{color:orders_buttons_textColor}"></i>
                  </v-btn>
                  <span :style="{color:orders_item_textColor}">
                    {{ item.count }}
                  </span>
                  <v-btn
                    class="mx-2 pa-2  rounded-lg"
                    :style="{backgroundColor:orders_buttons_backgroundColor}"
                    flat="true"
                    @click="decrease(index)"
                    size="28"
                  >
                    <i class="fa-solid fa-minus" style="font-size: 10px" :style="{color:orders_buttons_textColor}"></i>
                  </v-btn>
                </div>
                <div :style="{color:orders_item_textColor}">
                  <span class="fw-bold pe-1" >{{
                    numberFormat(calculateTotalPrice(item))
                  }}</span
                  >تومان
                </div>
              </div>
            </div>
          </v-card>
          <div
            class="bg-dark d-flex align-center justify-center text-center pa-3"
            role="button"
            style="
              width: 19%;
              transition: all 3s;
              position: absolute;
              top: 0;
              right: -90px;
              height: 100%;
              border-radius: 15px;
            "
            @click="deleteFood(item, index)"
          >
            <img src="@/assets/images/delete.svg" alt="" />
          </div>
        </div> -->
      </div>
      <div
        class="d-flex flex-column align-center justify-center"
        style="height: 40rem"
        v-else
      >
      
              <img :src="orders_no_foodImage" class="h-25 mb-6" alt="" />

        <!-- <img src="@/assets/images/no-food.svg" class="h-25 mb-6" alt="" /> -->
        <h3 :style="{color:orders_titleColor}">شما هنوز موردی را انتخاب نکردید</h3>
      </div>
      <div
        class="orderslist"
        style="height: 5rem; overflow-y: auto"
        :style="{backgroundColor:orders_sum_food_backgroundColor, color:orders_sum_food_textColor}"
        v-if="foods.length"
      >
        <!-- <div class="order-list">
        <div class="order-item mb-3 d-flex justify-space-between" v-for="(order, i) in foods" :key="i">
          <div class="order-item_name">
            <div class="order-item_dot"></div>
            {{ order.name }}
          </div>
          <div class="order-item_price d-flex">
            <div class="me-2">
              تعداد: {{ order.count }}
            </div>
            -
            &nbsp;

            <div>
            <span class="fw-bold"> {{ numberFormat(calculateTotalPrice(order)) }}</span> تومان

            </div>
          </div>
        </div>
      </div> -->
        <!-- <v-divider class="text-white"></v-divider> -->
        <div class="order-sum my-3 d-flex justify-space-between">
          <div class="fw-bold">مبلغ کل</div>
          <div class="order-sum_price">
            <span class="fw-bold">{{ numberFormat(calculateSum()) }}</span>
            تومان
          </div>
        </div>
        <!-- <v-btn block class="mb-6" style="border-radius: .7rem;" color="dark">
                سفارش
            </v-btn> -->
      </div>
    </div>
    <!-- <CommonTheFooter
      :isOrderPage="true"
      :haveOrder="foods.length"
      v-if="foods.length"
    />
    <CommonTheFooter :isOrderPage="false" v-else /> -->
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
            <div class="d-flex justify-space-between py-3 px-8 footer_backgroundColor" >
                <div class="footer-section">
                    <NuxtLink to="orders">
                    <v-badge dot color="red" v-if="foods.length">
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
                    <div class="pa-2 rounded-lg  d-flex align-items-center h-100" :style="{backgroundColor:footer_left_icon_backgroundColor}">
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
