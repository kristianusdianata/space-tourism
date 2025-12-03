<script lang="ts" setup>
import { useNavbar, useLoading } from '@store'
import { navbarMenu } from '@config'
import TabComponent from './TabComponent.vue'
import { LoadingComponent } from '@components/common'

const store = useNavbar()
const loadingStore = useLoading()

const pageIndex = store.menus.findIndex((menu) => menu.page === navbarMenu[3])
store.updateActiveNavbar(pageIndex)
</script>

<template>
  <main>
    <LoadingComponent />
    <article
      class="technology"
      v-if="!loadingStore.isLoading && !loadingStore.isError && loadingStore.isSuccess"
    >
      <div class="container">
        <h1 class="technology__title">
          <span>03</span>
          <span>Space launch 101</span>
        </h1>
      </div>

      <TabComponent />
    </article>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/typography' as *;

.container {
  @include layout-spacing(
    $padding-inline: var(--spacing-300),
    $padding-block: var(--spacing-300) 0px
  );

  @include media-query-md() {
    @include layout-spacing($padding-block: var(--spacing-500) 0px);
  }

  @include media-query-xl() {
    @include layout-spacing($padding-inline: 0px, $padding-block: var(--spacing-600) 0px);
  }
}

.technology {
  @include layout-spacing($margin: auto);
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-300));

  @include media-query-xl() {
    @include layout-size($width: 100%, $max-width: 1275px);
    @include layout-spacing(
      $margin: 0px,
      $margin-inline: auto 0px,
      $padding-inline: clamp(0px, calc(64px + (100vw - 1200px) * -0.266666), 64px) 0px
    );
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
