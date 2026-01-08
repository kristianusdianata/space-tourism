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
  @include layout-spacing($margin: auto);
  @include layout-size($max-width: 514px, $max-height: 700px);
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 0%,
    rgba(0, 0, 0, 0.6) 80%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    black 0%,
    rgba(0, 0, 0, 0.6) 80%,
    transparent 100%
  );
}
</style>
