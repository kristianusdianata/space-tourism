<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  index: number;
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
    >{{ props.index.toString() }}</NuxtLink
  >
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/typography" as *;

.tab-link {
  @include flexbox($display: flex, $align: center, $justify: center);
  @include border($radius: 50%);
  @include mobile-text-preset-4();
  @include font-style($color: var(--white));
  @include layout-size($height: 40px, $width: 40px);
  @include layout-background($color: transparent);
  outline: 1px solid var(--white-25);
  transition: outline-color 0.35s ease-in-out,
    background-color 0.35s ease-in-out, color 0.35 ease-in-out;

  &:hover:not([aria-current="page"]),
  &:focus:not([aria-current="page"]) {
    outline: 1px solid var(--white);
    transition: outline-color 0.35s ease-in-out,
      background-color 0.35s ease-in-out, color 0.35 ease-in-out;
  }

  &[aria-current="page"] {
    @include layout-background($color: var(--white));
    @include font-style($color: var(--blue-900));
    outline: none;
    transition: outline-color 0.35s ease-in-out,
      background-color 0.35s ease-in-out, color 0.35 ease-in-out;
  }

  @include media-query-md() {
    @include layout-size($height: 56px, $width: 56px);
    @include tablet-text-preset-4();
  }

  @include media-query-xl() {
    @include layout-size($height: 80px, $width: 80px);
    @include desktop-text-preset-4();
  }
}
</style>
