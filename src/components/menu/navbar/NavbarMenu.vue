<script lang="ts" setup>
import { useNavbar } from '@store'
import { RouterLink } from 'vue-router'
import { useBreakpoint } from '@composables'

const store = useNavbar()
const { isMediumAndUp } = useBreakpoint()
</script>

<template>
  <div class="nav-menu">
    <div class="nav-menu__heading" v-if="!isMediumAndUp">
      <button
        aria-label="Close navigation"
        :aria-expanded="store.isExpanded"
        @click="store.toogleNavbar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21">
          <g fill="#D0D6F9" fill-rule="evenodd">
            <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
            <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
          </g>
        </svg>
      </button>
    </div>

    <ol class="nav-menu__list">
      <li
        v-for="(menu, index) in store.menus"
        :key="index"
        :class="`nav-menu__list-item ${menu.active ? `nav-menu__list-item--active` : ``}`"
        :aria-current="menu.active ? `page` : undefined"
      >
        <RouterLink
          :to="{ name: menu.page }"
          class="nav-menu__list-link"
          @click="store.updateActiveNavbar(index)"
          >{{ menu.page.toUpperCase() }}</RouterLink
        >
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/typography' as *;

.nav-menu {
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-600));
  @include layout-position($position: fixed, $top: 0, $bottom: 0, $right: 0, $z-index: 99);
  @include layout-size($width: 254px);
  @include layout-spacing($padding-inline: var(--spacing-400) 0);
  @include layout-background($color: var(--white-5));
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px);

  @include media-query-md() {
    @include layout-position($position: relative);
    @include layout-spacing($padding-inline: var(--spacing-500));
    @include layout-size($width: auto, $height: 100%);
    @include flexbox($justify: center);
  }

  &__heading {
    @include layout-spacing(
      $margin-inline: auto var(--spacing-300),
      $margin-block: var(--spacing-400)
    );
  }

  &__list {
    counter-reset: myIndex -1;
    @include flexbox($display: flex, $direction: column, $gap: var(--spacing-400));

    @include media-query-md() {
      @include flexbox($direction: row, $gap: var(--spacing-600), $justify: end);
      @include layout-position($position: relative);
      @include layout-size($height: 100%);
    }
  }

  &__list-item {
    @include layout-position($position: relative);
    @include font-style($color: var(--white));

    &::before {
      content: '';
      @include layout-position($position: absolute, $top: 0, $bottom: 0, $right: 0);
      @include layout-size($width: 3px);
      @include layout-background($color: var(--white-50));
      opacity: 0;
      transition: opacity 0.35s ease-in-out;
    }

    &:hover:not(.item--active),
    &:focus:not(.item--active) {
      &::before {
        content: '';
        opacity: 1;
        transition: opacity 0.35s ease-in-out;
      }
    }

    &--active {
      &::before {
        @include layout-background($color: var(--white));
        opacity: 1;
      }
    }

    @include media-query-md() {
      @include flexbox($display: flex, $align: center);

      &::before {
        content: '';
        @include layout-position($position: absolute, $top: unset, $bottom: 0, $right: 0, $left: 0);
        @include layout-size($width: 100%, $height: 3px);
      }
    }
  }

  &__list-link {
    display: block;
    counter-increment: myIndex;
    @include desktop-text-preset-8();

    &::before {
      content: counter(myIndex, decimal-leading-zero);
      @include layout-spacing($padding-inline: 0 var(--spacing-150));
      @include desktop-text-preset-8-bold();
    }
  }
}
</style>
