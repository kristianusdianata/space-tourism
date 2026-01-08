<script lang="ts" setup>
const props = defineProps<{
  portraitSrc?: string;
  landscapeSrc?: string;
  alt?: string;
}>();
</script>

<template>
  <!-- <img :src="props.src" :alt="props.alt" class="tab-image" /> -->
  <picture class="tab-image">
    <source media="(min-width:1280px)" :srcset="props.portraitSrc" />
    <NuxtImg :src="props.landscapeSrc" :alt="props.alt" :placeholder="true" />
  </picture>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.tab-image {
  display: block;
  @include layout-size($height: 100%, $width: 100%);
}
</style>
