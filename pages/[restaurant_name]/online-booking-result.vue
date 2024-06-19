<script setup>
const { $flashMsg, $site } = useNuxtApp();
const route = useRoute();
const response = ref([]);
const logo = ref(null);
const { data, error } = await useFetch(
  `https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`
);
response.value = data.value.data;
logo.value = response.value.logo;
const reservedInfo = ref(null);
const info = ref({
  datetime: "",
  fullname: "",
  guest: "",
  mobile: "",
  salon: "",
  subject: "",
});
onMounted(() => {
  const storedObject = localStorage.getItem("reserveInfo");
  if (storedObject) {
    reservedInfo.value = JSON.parse(storedObject);
    info.value.datetime = reservedInfo.value.data.datetime;
    info.value.fullname = reservedInfo.value.data.fullname;
    info.value.subject = reservedInfo.value.data.subject;
    info.value.guest = reservedInfo.value.data.guest;
    info.value.mobile = reservedInfo.value.data.mobile;
    info.value.salon = reservedInfo.value.data.salon;
  }
});
</script>
<template>
  <div>
    <div class="online-booking-page mb-16">
      <CommonTheHeader page=" رزرو آنلاین" class="pa-3" :logo="logo" />
      <v-card variant="outlined" color="pri" class="pa-3 rounded-xl">
        <div class="d-flex flex-column align-center mb-4 pb-4">
          <div>
            <img src="@/assets/images/person.svg" alt="" />
          </div>
          <div class="divider-wrapper mt-1">
            <span class="divider"></span>
          </div>
          <div class="reserver-person-element my-3">
            {{ info.fullname }} - {{ info.mobile }}
          </div>
          <div>
            <img src="@/assets/images/calendar-icon.svg" alt="" />
          </div>
          <div class="base_title text-dark">تاریخ و ساعت</div>
          <div class="divider-wrapper mt-3">
            <span class="divider"></span>
          </div>
          <v-card
            variant="outlined"
            color="pri"
            class="py-3 w-100 mb-3"
            style="border-radius: 10px; border: 2px solid"
          >
         <div class="flex justify-center text-dark text-center text-h6">
           {{ info.datetime }} 
         </div>
            <!-- <div
              class="days d-flex justify-space-around border-bottom-dotted py-3 mb-3"
            >
              <div class="days_item text-dark">تاریخ : تاریخ مشخص شده</div>
            </div>
            <div class="time">
              <div class="fw-regular2 text-dark text-center">
                ساعت: ساعت مشخص شده
              </div>
            </div> -->
          </v-card>
          <v-card
            variant="tonal"
            color="pri-d"
            class="reserved-info rounded-10 w-100 pa-3"
          >
            <div
              class="border-bottom-dashed d-flex justify-space-between pa-3 text-dark"
            >
              <div>تعداد مهمان:</div>
              <div>{{ info.guest }}</div>
            </div>
            <div
              class="border-bottom-dashed d-flex justify-space-between pa-3 text-dark"
            >
              <div>موضوع مراسم:</div>
              <div>{{info.subject}}</div>
            </div>
            <div class="d-flex justify-space-between pa-3 text-dark">
              <div>انتخاب سالن:</div>
              <div>{{ info.salon }}</div>
            </div>
          </v-card>
        </div>
      </v-card>
    </div>
    <CommonTheFooter />
  </div>
</template>
