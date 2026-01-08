<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

const props = defineProps<NuxtLinkProps>();
const { prefetch, noPrefetch, ...rest } = props;
</script>

<template>
  <NuxtLink class="button" v-bind="rest" :prefetch="prefetch">
    <slot />
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/typography" as *;

.button {
  @include flexbox($display: flex, $justify: center, $align: center);
  @include layout-size($width: 144px, $height: 144px);
  @include border($radius: 50%);
  @include layout-background($color: var(--white));
  @include mobile-text-preset-4();
  @include font-style($color: var(--blue-900), $text-transform: uppercase);
  box-shadow: 0 0 0 0px rgba(0, 0, 0, 0);
  transition: box-shadow 0.15s ease-in-out, color 0.15s ease-in-out;

  &:hover {
    @include font-style($color: var(--blue-900-5));
    box-shadow: 0 0 0 88px var(--white-10);
    transition: box-shadow 0.15s ease-in-out, color 0.15s ease-in-out;
  }

  @include media-query-md() {
    @include layout-size($width: 272px, $height: 272px);
    @include desktop-text-preset-4();
  }
}
</style>
