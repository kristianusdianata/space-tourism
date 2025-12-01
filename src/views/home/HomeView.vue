<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useNavbar } from '@store'
import { navbarMenu } from '@config'

const store = useNavbar()
const pageIndex = store.menus.findIndex((menu) => menu.page === navbarMenu[0])

store.updateActiveNavbar(pageIndex)
</script>

<template>
  <main class="container">
    <article class="home">
      <div class="wrapper">
        <div class="home__heading">
          <h1 class="title">
            <span>so, you want to travel to</span>
            <span>space</span>
          </h1>

          <p class="desc">
            Let&apos;s face it; if you want to go to space, you might as well genuinely go to outer
            space and not hover kind of on the edge of it. Well sit back, and relax because
            we&apos;ll give you a truly out of this world experience!
          </p>
        </div>

        <div class="home__body">
          <RouterLink :to="navbarMenu[1]" class="button">explore</RouterLink>
        </div>
      </div>
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
    @include layout-spacing(
      $padding-inline: var(--spacing-500),
      $padding-block: var(--spacing-1600)
    );
  }

  @include media-query-xl() {
    @include layout-spacing($padding-inline: 0px, $padding-block: var(--spacing-1600));
  }
}

.wrapper {
  @include layout-size($width: 100%, $height: 100%);
  @include flexbox($display: flex, $direction: column, $justify: space-between);

  @include media-query-xl() {
    @include flexbox($direction: row, $align: center);
    @include layout-size($width: 100%, $height: 343px);
  }
}

.home {
  @include layout-spacing($margin: auto);

  @include media-query-md() {
    @include layout-size($width: 512px, $height: 672px);
  }

  @include media-query-xl() {
    @include layout-size($width: 100%, $height: 632px, $max-width: 1110px);
    @include flexbox($display: flex, $direction: column, $justify: end);
  }

  &__heading {
    @include media-query-xl() {
      @include layout-size($width: 540px, $height: 343px);
    }

    & .title {
      @include flexbox(
        $display: flex,
        $direction: column,
        $gap: var(--spacing-300),
        $align: center
      );
      @include font-style($color: var(--white), $text-transform: uppercase);
      @include layout-spacing($margin-block: 0 var(--spacing-300));

      & span:first-child {
        @include mobile-text-preset-6();
        @include font-style($color: var(--blue-300));

        @include media-query-md() {
          @include desktop-text-preset-5();
        }
      }

      & span:nth-child(2) {
        @include layout-size($height: 92px);
        @include flexbox($display: flex, $align: center);
        @include mobile-text-preset-1();

        @include media-query-md() {
          @include layout-size($height: 165px);
          @include desktop-text-preset-1();
        }
      }
    }

    & .desc {
      @include mobile-text-preset-9();
      @include font-style($color: var(--blue-300), $text-align: center);

      @include media-query-md() {
        @include tablet-text-preset-9();
      }

      @include media-query-xl() {
        @include desktop-text-preset-9();
      }
    }
  }

  &__body {
    @include layout-size($height: 382px);
    @include flexbox($display: flex, $justify: center, $align: center, $direction: column);

    @include media-query-md() {
      @include layout-size($height: fit-content);
    }

    & .button {
      @include flexbox($display: flex, $justify: center, $align: center);
      @include layout-size($width: 144px, $height: 144px);
      @include border($radius: 50%);
      @include layout-background($color: var(--white));
      @include mobile-text-preset-4();
      @include font-style($color: var(--blue-900), $text-transform: uppercase);
      box-shadow: 0 0 0 0px rgba(0, 0, 0, 0);
      transition:
        box-shadow 0.15s ease-in-out,
        color 0.15s ease-in-out;

      &:hover {
        @include font-style($color: var(--blue-900-5));
        box-shadow: 0 0 0 88px var(--white-10);
        transition:
          box-shadow 0.15s ease-in-out,
          color 0.15s ease-in-out;
      }

      @include media-query-md() {
        @include layout-size($width: 272px, $height: 272px);
        @include desktop-text-preset-4();
      }
    }
  }
}
</style>
