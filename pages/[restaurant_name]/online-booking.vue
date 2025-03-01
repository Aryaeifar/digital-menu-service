<script setup>
import DatePicker from "vue3-persian-datetime-picker";
import useVuelidate from "@vuelidate/core";
import {
  numeric,
  required,
  minLength,
  maxLength,
  helpers,
  minValue,
} from "@vuelidate/validators";
const state = ref({
  name: "",
  salon: "",
  subject: "",
  dateTime: "",
  phone: "",
  guestNumber: 0,
});
const rules = ref({
  name: {
    required: helpers.withMessage("لطفا نام خود را وارد کنید", required),
    maxLength: helpers.withMessage(
      "حداکثر 72 کاراکتر میتوانید ثبت کنید",
      maxLength(72)
    ),
  },
  salon: {
    required: helpers.withMessage("لطفا سالن را انتخاب کنید کنید", required),
    maxLength: helpers.withMessage(
      "حداکثر 150 کاراکتر میتوانید ثبت کنید",
      maxLength(150)
    ),
  },
  subject: {
    required: helpers.withMessage("لطفا  موضوع رزرو را انتخاب کنید", required),
  },
  dateTime: {
    required: helpers.withMessage("لطفا  تاریخ رزرو را مشخص کنید", required),
  },
  phone: {
    required: helpers.withMessage(
      "لطفا شماره موبایل خود را وارد کنید",
      required
    ),
    minLength: helpers.withMessage(
      "شماره موبایل باید حداقل 11 رقم باشد",
      minLength(11)
    ),
    maxLength: helpers.withMessage(
      "شماره موبایل باید حداکثر 11 رقم باشد",
      maxLength(11)
    ),
  },
  guestNumber: {
    required: helpers.withMessage("لطفا تعداد مهمان را مشخص کنید", required),
    minValue: helpers.withMessage(
      "حداقل 1 نفر را باید انتخاب باشد",
      minValue(1)
    ),
  },
});

const { $flashMsg, $site } = useNuxtApp();
const route = useRoute();
const response = ref([]);
const logo = ref(null);
const reserveOptions = ref([]);

const { data, error } = await useFetch(`https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`);
response.value = data?.value?.data;
logo.value = response?.value?.logo;

const { data: optionData, error: optionError } = await useFetch(
  `http://menuly.vip/api/v2/reserve/options?slug=${route.params.restaurant_name}`
);
reserveOptions.value = optionData?.value?.data;
const maxGuests = ref(reserveOptions?.value?.guests);
const salon = ref(reserveOptions?.value?.salons);
const subject = ref(reserveOptions?.value?.subjects);
const guestNumber = ref(0);

const increase = () => {
  if (state.value.guestNumber < maxGuests.value.length) {
    state.value.guestNumber++;
  }
};
const decrease = () => {
  if (state.value.guestNumber > 1) {
    state.value.guestNumber--;
  }
};
const loading = ref(false);
const v$ = useVuelidate(rules, state);
const reserveResult = ref(null);
const setToStorage = (data) => {
  localStorage.setItem("reserveinfo", JSON.stringify(data));
};
const onSubmit = async () => {
  loading.value = true;
  v$.value
    .$validate()

    .then((isValid) => {
      if (isValid) {
        useFetch(
          `http://menuly.vip/api/v2/reserve/post?slug=${route.params.restaurant_name}`,
          {
            method: "post",
            body: {
              datetime: state.value.dateTime,
              salon: state.value.salon,
              guest: state.value.guestNumber,
              subject: state.value.subject,
              fullname: state.value.name,
              mobile: state.value.phone,
            },
          }
        )
        .then((data, error) => {
          loading.value = true;
          if(!error) {
            $flashMsg.success({
                text: 'رزرو شما با موفقیت ثبت شد',
              });
            // localStorage.setItem('reserveInfo', JSON.stringify(data.data.value))
            // navigateTo('/' + route.params.restaurant_name + '/online-booking-result')
          } else {
             $flashMsg.error({
                text: 'خخطایی رخ داده است',
              });
          }
        })
      } else {
          $flashMsg.error({
                text: 'لطفا همه فیلد هارا پر کنید',
              });
        loading.value = false;
      }
    });
};
</script>
<template>
  <div>
    <div class="online-booking-page mb-16">
      <CommonTheHeader page=" رزرو آنلاین" class="pa-3" :logo="logo" />
      <div>
        <div class="mb-3">تاریخ رزرو</div>
        <date-picker
          color="#A1917D"
          class="reserve-online-datepicker"
          type="datetime"
          disable="Friday"
          v-model="state.dateTime"
          placeholder="تاریخ رزرو را انتخاب کنید"
        ></date-picker>
        <div class="text-error mt-2" v-if="v$.dateTime.$error">
          لطفا تاریخ رزرو را مشخص کنید
        </div>
      </div>
      <div class="my-4">
        <img src="@/assets/images/guest.svg" alt="" />
        تعداد مهمان

        <v-card
          variant="outlined"
          color="pri-d"
          class="rounded-10 w-100 pa-3 mt-3"
        >
          <div class="d-flex justify-space-between align-center text-dark">
            <div class="d-flex align-center justify-space-between w-100">
              <v-btn
                class="mx-2 pa-2 bg-pri rounded-lg"
                flat
                @click="increase()"
                size="28"
              >
                <i class="fa-solid fa-plus" style="font-size: 10px"></i>
              </v-btn>
              <span> {{ state.guestNumber }} مهمان </span>
              <v-btn
                class="mx-2 pa-2 bg-pri rounded-lg"
                flat
                @click="decrease()"
                size="28"
              >
                <i class="fa-solid fa-minus" style="font-size: 10px"></i>
              </v-btn>
            </div>
          </div>
        </v-card>
        <div class="text-error mt-2" v-if="v$.guestNumber.$error">
          لطفا تعداد مهمان را مشخص کنید
        </div>
      </div>
      <div>
        موضوع
        <v-select
          label="موضوع"
          v-model="state.subject"
          :error-messages="v$.subject.$errors.map((e) => e.$message)"
          hide-details="auto"
          :items="subject"
          class="my-2 salon-input"
          color="pri-d"
          variant="outlined"
        ></v-select>
      </div>
      <div>
        انتخاب سالن
        <v-select
          v-model="state.salon"
          :error-messages="v$.salon.$errors.map((e) => e.$message)"
          hide-details="auto"
          label="سالن"
          :items="salon"
          class="my-2 salon-input"
          color="pri-d"
          variant="outlined"
        ></v-select>
      </div>
      <v-card
        variant="tonal"
        color="pri-d"
        class="reserved-info rounded-10 w-100 mb-3 mt-1 pa-3"
      >
        <v-text-field
          v-model="state.name"
          :error-messages="v$.name.$errors.map((e) => e.$message)"
          label="نام و نام خانوادگی"
          max-width="70"
          hide-details="auto"
          variant="outlined"
          class="reserve-inputs"
        ></v-text-field>
        <v-text-field
          v-model="state.phone"
          :error-messages="v$.phone.$errors.map((e) => e.$message)"
          type="number"
          label="شماره همراه"
          hide-details="auto"
          counter
          counter-value="11"
          max-width="11"
          variant="outlined"
          class="reserve-inputs mt-3"
        ></v-text-field>
      </v-card>
      <v-btn block flat color="dark" class="rounded-lg mb-8" @click="onSubmit"
        >ثبت</v-btn
      >
    </div>
    <!-- <CommonTheFooter /> -->
  </div>
</template>
