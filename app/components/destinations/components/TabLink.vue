<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  label: string;
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
  >
    {{ label.toUpperCase() }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/typography" as *;

.tab-link {
  @include layout-position($position: relative);
  @include font-style($color: var(--blue-300));
  @include layout-size($height: 100%);
  @include mobile-text-preset-8();
  @include flexbox($display: flex);

  @include media-query-md() {
    @include desktop-text-preset-8();
  }

  &::before {
    content: "";
    @include layout-position(
      $position: absolute,
      $bottom: 0,
      $right: 0,
      $left: 0
    );
    @include layout-size($width: 100%, $height: 3px);
    @include layout-background($color: var(--white-50));
    opacity: 0;
    transition: opacity 0.35s ease-in-out;
  }

  &:hover:not([aria-current="page"]),
  &:focus:not([aria-current="page"]) {
    &::before {
      opacity: 1;
      transition: opacity 0.35s ease-in-out;
    }
  }

  &[aria-current="page"] {
    @include font-style($color: var(--white));

    &::before {
      opacity: 1;
      @include layout-background($color: var(--white));
    }
  }
}
</style>
