<script setup>
const { $flashMsg, $site } = useNuxtApp();
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
const route = useRoute();
const response = ref([]);
const logo = ref(null);
const { data, error } = await useFetch((`https://menuly.vip/api/v2/info?slug=${route.params.restaurant_name}`));

response.value = data.value.data;
logo.value = response.value.logo;
const rating = ref(null);
const state = ref({
  name: "",
  phonenumber: "",
  offers:""
});
const rules = ref({
  phonenumber: {
    required: helpers.withMessage(
      "لطفا شماره موبایل خود را وارد کنید",
      required
    ),
    // minLength: [
    //   helpers.withMessage("شماره موبایل باید حداقل 11 رقم باشد", required),
    //   minLength(11),
    // ],
    // maxLength: [
    //   helpers.withMessage("شماره موبایل باید حداکثر 11 رقم باشد", required),
    //   maxLength(11),
    // ],
  },

  name: {
    required: helpers.withMessage(
      "لطفا نام و نام خانوادگی  خود را وارد کنید",
      required
    ),
  },
  offers: {
    required: helpers.withMessage(
      "لطفا پیشنهاد خود را وارد کنید",
      required
    ),
  },
});
const v$ = useVuelidate(rules, state)
const OnSubmit = () => {
  v$.value.$validate()
  .then((isValid) => {
    if(isValid){
      console.log('send')
    } else {
      console.log('failed')
    }
  })
}
</script>
<template>
  <div>
    <div class="online-booking-page mb-16">
      <CommonTheHeader page=" پیشنهادات" class="pa-3" :logo="logo" />
      <div class="mt-3">
        <v-card
          variant="tonal"
          color="pri-d"
          class="reserved-info rounded-10 w-100 my-3 pa-3"
        >
          پیشنهادات خودتون را برای فلای لانژ ارسال کنید.
          
          <v-text-field
            label="نام و نام خانوادگی"
            max-width="70"
            v-model="state.name"
            :error-messages="v$.name.$errors.map(e => e.$message)"
            hide-details="auto"
            variant="outlined"
            class="reserve-inputs mt-6"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            type="number"
            label="شماره همراه"
             v-model="state.phonenumber"
            :error-messages="v$.phonenumber.$errors.map(e => e.$message)"
            hide-details="auto"
            counter
            counter-value="11"
            max-width="11"
            variant="outlined"
            class="offers-inputs mt-6"
            prepend-icon="mdi-phone"
          ></v-text-field>
          <v-textarea
            label="پیشنهادات"
            variant="outlined"
            v-model="state.offers"
            :error-messages="v$.offers.$errors.map(e => e.$message)"
            hide-details="auto"
            clearable
            prepend-icon="mdi-lightbulb-on"
            class="mt-6"
          ></v-textarea>
          <div class="text-center">
            <div class="d-flex align-center">
              <div>به ما امتیاز دهید</div>
              <v-rating v-model="rating" hover></v-rating>
            </div>
          </div>
          <v-btn block flat color="dark" class="rounded-lg" @click="OnSubmit"
            >ثبت</v-btn
          >
        </v-card>
      </div>
    </div>
    <!-- <CommonTheFooter /> -->
  </div>
</template>

<style lang="scss" scoped></style>
