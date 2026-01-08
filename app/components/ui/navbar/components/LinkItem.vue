<script lang="ts" setup>
import { useRoute } from "vue-router";

const props = defineProps<{
  linkPathname: string;
  indexItem: number;
  labelItem: string;
}>();

const route = useRoute();
const isActive = computed(() => {
  return route.name === props.linkPathname;
});
</script>

<template>
  <li :class="'list-item'">
    <NuxtLink
      :to="{ name: props.linkPathname }"
      class="link-item"
      active-class="active"
      exact
      :aria-current="isActive ? `page` : undefined"
    >
      <span class="link-index">{{ `0${props.indexItem}` }}</span>
      <span class="link-label"> {{ props.labelItem.toUpperCase() }}</span>
    </NuxtLink>
  </li>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/typography" as *;

.list-item {
  @include layout-size($height: 100%);
}

.link-item {
  @include flexbox($display: flex, $direction: row, $gap: var(--spacing-100));
  @include layout-size($height: 100%);
  @include layout-position($position: relative);
  @include font-style($color: var(--white));

  &::before {
    content: "";
    @include layout-position(
      $position: absolute,
      $top: 0,
      $bottom: 0,
      $right: 0
    );
    @include layout-size($width: 3px);
    @include layout-background($color: var(--white-50));
    opacity: 0;
    transition: opacity 0.35s ease-in-out;
  }

  &:hover:not(.active),
  &:focus:not(.active) {
    &::before {
      content: "";
      opacity: 1;
      transition: opacity 0.35s ease-in-out;
    }
  }

  &.active {
    &::before {
      @include layout-background($color: var(--white));
      opacity: 1;
    }
  }

  @include media-query-md() {
    @include flexbox($display: flex, $align: center);

    &::before {
      content: "";
      @include layout-position(
        $position: absolute,
        $top: unset,
        $bottom: 0,
        $right: 0,
        $left: 0
      );
      @include layout-size($width: 100%, $height: 3px);
    }
  }
}

.link-index {
  @include desktop-text-preset-8-bold();
}

.link-label {
  @include desktop-text-preset-8();
}
</style>
