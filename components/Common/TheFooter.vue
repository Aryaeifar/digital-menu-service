<script setup>
const route = useRoute();
const response = ref([]);

const { data: Data, mainError } = await useFetch(
  `https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`
);
response.value = Data.value.data;

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

const props = defineProps({
    isOrderPage:{
        type:Boolean,
        default:false
    }, 
    haveOrder:{
        type:[Boolean, Number],
        default:false
    }
})
</script>
<template>
    <div class="footer">
        <div class="footer-wrapper">
                <div :class="['circle-menu d-flex align-center justify-center footer_middle_icon_backgroundColor', isOrderPage == true ? 'bg-pri-dd' : '' ]">
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
                    <v-badge dot color="red" v-if="haveOrder">
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
</template>
<style>
.footer_backgroundColor {
    background-color: v-bind(footer_backgroundColor);
}
.footer_left_icon_backgroundColor {
    background-color: v-bind(footer_left_icon_backgroundColor);
}
.footer_right_icon_backgroundColor {
    background-color: v-bind(footer_right_icon_backgroundColor);
}
.footer_middle_icon_backgroundColor {
    background-color: v-bind(footer_middle_icon_backgroundColor);
}
</style>