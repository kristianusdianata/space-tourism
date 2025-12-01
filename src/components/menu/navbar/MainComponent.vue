<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useBreakpoint } from '@composables'
import { useNavbar } from '@store'
import { RouterLink } from 'vue-router'
import NavbarMenu from './NavbarMenu.vue'

const store = useNavbar()
const { isMediumAndUp, isExtraLargeAndUp } = useBreakpoint()
const navbarRef = ref<HTMLElement | null>(null)
const navbarMobileButton = ref<HTMLElement | null>(null)

const closeMobileNavbar = (event: MouseEvent) => {
  if (isMediumAndUp.value) return

  if (
    navbarRef.value &&
    navbarMobileButton.value &&
    !navbarRef.value.contains(event.target as Node) &&
    !navbarMobileButton.value.contains(event.target as Node) &&
    store.isExpanded
  ) {
    store.closeNavbar()
  }
}

onMounted(() => {
  document.addEventListener('click', closeMobileNavbar)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMobileNavbar)
})
</script>

<template>
  <nav class="nav">
    <div class="nav__logo">
      <RouterLink
        :to="{ name: store.menus[0]?.page }"
        class="nav__logo-icon"
        aria-label="Website logo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
          <g fill="none" fill-rule="evenodd">
            <circle cx="24" cy="24" r="24" fill="#FFF" />
            <path
              fill="#0B0D17"
              d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"
            />
          </g>
        </svg>
      </RouterLink>

      <hr v-if="isExtraLargeAndUp" class="nav__logo-decoration" />
    </div>

    <button
      class="nav__mobile"
      aria-label="Open navigation"
      :aria-expanded="store.isExpanded"
      aria-controls="navbarMenuContent"
      @click="store.toogleNavbar"
      v-if="!isMediumAndUp"
      ref="navbarMobileButton"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21">
        <g fill="#D0D6F9" fill-rule="evenodd"><path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" /></g>
      </svg>
    </button>

    <div id="navbarMenuContent" ref="navbarRef">
      <Transition name="slide">
        <NavbarMenu v-if="isMediumAndUp || (!isMediumAndUp && store.isExpanded)" />
      </Transition>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;

.nav {
  @include grid($cols: repeat(2, 1fr));
  @include layout-spacing($margin-block: var(--spacing-300));

  @include media-query-md() {
    @include layout-size($height: 96px);
    @include grid($cols: auto min-content);
    @include layout-spacing($margin: 0px);
  }

  @include media-query-xl() {
    @include grid($cols: repeat(2, 1fr), $gap: 0px);
    @include layout-spacing($margin-block: var(--spacing-400) 0px);
  }

  &__logo {
    @include layout-position($position: relative);
    @include layout-spacing($padding-inline: var(--spacing-300) 0);
    @include layout-size($height: 100%);

    @include media-query-md() {
      @include layout-spacing($padding-inline: var(--spacing-500) 0);
      @include grid($cols: auto 1fr, $align: center);
    }

    @include media-query-xl() {
      @include layout-spacing($padding-inline: var(--spacing-800) 0);
      @include grid($gap: var(--spacing-800));

      &::before {
        content: '';
        @include layout-position($position: absolute, $right: 0, $z-index: 2);
        @include layout-size($height: 1px, $width: 30px);
        @include layout-background($color: var(--white-5));
        transform: translateX(100%);
      }
    }
  }

  &__logo-icon {
    & svg {
      @include layout-size($width: 40px, $height: 40px);

      @include media-query-md() {
        @include layout-size($width: 48px, $height: 48px);
      }
    }
  }

  &__logo-decoration {
    @include layout-size($height: 1px);
    @include layout-background($color: var(--white-5));
  }

  &__mobile {
    justify-self: end;
    @include layout-spacing($padding-inline: 0 var(--spacing-300));
  }
}

.slide {
  &-enter-from,
  &-leave-to {
    transform: translateX(100%);
  }

  &-enter-active,
  &-leave-active {
    transition: transform 0.5s ease-in-out;
  }

  &-enter-to,
  &-leave-from {
    transform: translateX(0);
  }
}
</style>
