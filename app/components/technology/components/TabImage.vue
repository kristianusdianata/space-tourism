<script lang="ts" setup>
const props = defineProps<{
  src?: string;
  alt?: string;
}>();
</script>

<template>
  <img :src="props.src" :alt="props.alt" loading="eager" class="tab-image" />
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.tab-image {
  display: block;
  @include layout-size($height: 100%, $width: 100%);
  aspect-ratio: 21/9;
}
</style>
