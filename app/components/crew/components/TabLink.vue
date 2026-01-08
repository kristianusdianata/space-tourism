<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  isActive: boolean;
  to: RouteLocationRaw;
}>();
</script>

<template>
  <NuxtLink
    class="tab-link"
    :aria-current="isActive ? 'page' : undefined"
    :to="props.to"
    :replace="true"
  />
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/typography" as *;

.tab-link {
  @include border($radius: 50%);
  @include layout-size($height: 10px, $width: 10px);
  @include layout-background($color: var(--white-17));
  transition: background-color 0.35s ease-in-out;

  &:hover:not([aria-current="page"]),
  &:focus:not([aria-current="page"]) {
    @include layout-background($color: var(--white-50));
    transition: background-color 0.35s ease-in-out;
  }

  &[aria-current="page"] {
    @include layout-background($color: var(--white));
    transition: background-color 0.35s ease-in-out;
  }

  @include media-query-xl() {
    @include layout-size($height: 15px, $width: 15px);
  }
}
</style>
