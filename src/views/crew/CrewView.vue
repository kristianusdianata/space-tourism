<script lang="ts" setup>
import { useNavbar } from '@store'
import { navbarMenu } from '@config'
import TabComponent from './TabComponent.vue'

const store = useNavbar()

const pageIndex = store.menus.findIndex((menu) => menu.page === navbarMenu[2])
store.updateActiveNavbar(pageIndex)
</script>

<template>
  <main class="container">
    <article class="crew">
      <h1 class="crew__title">
        <span>02</span>
        <span>Meet your crew</span>
      </h1>

      <TabComponent />
    </article>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/typography' as *;

.container {
  @include layout-spacing($padding-inline: var(--spacing-300), $padding-block: var(--spacing-300));

  @include media-query-md() {
    @include layout-spacing($padding: var(--spacing-500));
  }

  @include media-query-xl() {
    @include layout-spacing($padding-inline: 0px, $padding-block: var(--spacing-600));
  }
}

.crew {
  @include layout-spacing($margin: auto);
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-300));

  @include media-query-xl() {
    @include layout-size($width: 100%, $max-width: 1110px);
  }

  &__title {
    @include flexbox($display: flex, $direction: row, $gap: var(--spacing-300), $justify: center);
    @include font-style($color: var(--white), $text-transform: uppercase);

    @include media-query-md() {
      @include flexbox($justify: start);
    }

    & span:first-child {
      @include barlow-condensed-bold();
      @include font-style($color: var(--white-25), $font-size: 16px, $letter-spacing: 0.15em);

      @include media-query-md() {
        @include font-style($font-size: 20px);
      }

      @include media-query-xl() {
        @include font-style($font-size: 28px, $letter-spacing: 4.72px);
      }
    }

    & span:nth-child(2) {
      @include mobile-text-preset-6();

      @include media-query-md() {
        @include tablet-text-preset-5();
      }

      @include media-query-xl() {
        @include desktop-text-preset-5();
      }
    }
  }
}
</style>
