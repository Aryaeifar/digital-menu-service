<script setup>
const props = defineProps({
    page:{
        type:String
    },
    logo:{
        type:String
    }
})
const router = useRouter();
function backEvent() {
  return router.back(-1);
}
</script>
<template>
    <div class="d-flex justify-space-between align-center theHeader">
        <div class="fw-bold">
            {{ page }}
        </div>
        <div class="theHeader-logo">
            <img :src="logo" alt="" class="" height="100" style="max-width: 100%;">
        </div>
       <button @click="backEvent" style="z-index:1000">
         <i class="fa-solid fa-chevron-left pa-2 bg-pri rounded-lg" style="font-size: ;"></i>
       </button>
    </div>
</template>


<style lang="scss" scoped>

</style>