<script lang="ts" setup>
import { MainStructure, MenuStructure } from "./structures";
import { Logo, CloseButton, OpenButton, LinkItem } from "./components";
import { useData, useBreakpoint, useNavbar } from "@/composables";
import { ref, onMounted, onBeforeUnmount } from "vue";

const { menus } = useData();
const { isMediumAndUp } = useBreakpoint();
const { isExpanded, closeNavbar, openNavbar } = useNavbar();
const isMounted = ref<boolean>(false);

const navMenuRef = ref<HTMLElement | null>(null);
const navToggleRef = ref<InstanceType<typeof OpenButton> | null>(null);

function closeMobileNavbar(event: MouseEvent) {
  if (isMediumAndUp.value) return;
  if (!isExpanded) return;

  const navMenu = navMenuRef.value;
  const navToggle = navToggleRef.value?.openButtonRef;

  if (!navMenu || !navToggle) return;

  const target = event.target as Node;

  if (!navMenu.contains(target) && !navToggle.contains(target)) {
    closeNavbar();
  }
}

onMounted(() => {
  document.addEventListener("click", closeMobileNavbar);
  isMounted.value = true;
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMobileNavbar);
});
</script>

<template>
  <MainStructure>
    <template #logo>
      <Logo />
    </template>

    <template #nav-open-button>
      <OpenButton
        aria-label="Open navigation"
        :aria-expanded="isExpanded"
        aria-controls="navMenu"
        @click="openNavbar"
        ref="navToggleRef"
      />
    </template>

    <template #nav-menu>
      <div id="navMenu" ref="navMenuRef">
        <Transition name="navbar-slide" mode="out-in">
          <MenuStructure class="nav-menu" v-show="isExpanded && isMounted">
            <template #nav-close-button>
              <CloseButton
                aria-label="Close navigation"
                :aria-expanded="isExpanded"
                @click="closeNavbar"
              />
            </template>

            <template #menu-list>
              <LinkItem
                v-for="(menu, index) in menus"
                :key="menu.label"
                :index-item="index"
                :label-item="menu.label"
                :link-pathname="menu.routeName"
              />
            </template>
          </MenuStructure>
        </Transition>
      </div>
    </template>
  </MainStructure>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/typography" as *;

#navMenu {
  @include layout-size($height: 100%);
}

.nav-menu {
  @include layout-background($color: var(--white-5));
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px);
}

.navbar-slide {
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
