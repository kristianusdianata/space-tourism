<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Navbar } from '@components/menu'
</script>

<template>
  <div class="container">
    <header>
      <Navbar />
    </header>

    <RouterView v-slot="{ Component }">
      <Transition name="slide" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@style/utils/index' as *;

.container {
  @include layout-size($width: 100%);
  @include layout-spacing($margin: auto);

  @include media-query-md() {
    @include layout-size($max-width: 1440px);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.4s;
}

.slide-enter-from {
  transform: translateX(5px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-5px);
  opacity: 0;
}
</style>
