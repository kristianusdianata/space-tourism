<script lang="ts" setup>
const props = defineProps<{
  src?: string;
  alt?: string;
}>();
</script>

<template>
  <img :src="props.src" :alt="props.alt" class="tab-image" />
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.tab-image {
  @include layout-size($width: 150px, $height: 150px);

  @include media-query-md() {
    @include layout-size($width: 300px, $height: 300px);
  }

  @include media-query-xl() {
    @include layout-size($width: 480px, $height: 480px);
  }
}
</style>
