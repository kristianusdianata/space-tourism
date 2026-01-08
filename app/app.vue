<script lang="ts" setup>
import { NavbarComponent } from "@/components/ui";

const route = useRoute();
const bgClass = computed(() => {
  const routeName = route.name as string;
  const routePrefix = routeName.split("-")[0];
  return `bg-${routePrefix === "index" ? "home" : routePrefix}`;
});
</script>

<template>
  <div :class="['bg-container', 'bg-image', bgClass]">
    <div class="container">
      <header>
        <NavbarComponent />
      </header>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.container {
  @include layout-size($width: 100%, $max-width: 1440px);
  @include layout-spacing($margin: auto);
}

.bg-container {
  @include layout-size($min-height: 100vh);
  overflow: hidden;
}

.bg-image {
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-home {
  background-image: url("/home/background-home-mobile.jpg");

  @include media-query-md() {
    background-image: url("/home/background-home-tablet.jpg");
  }

  @include media-query-xl() {
    background-image: url("/home/background-home-desktop.jpg");
  }
}

.bg-destinations {
  background-image: url("/destinations/background-destination-mobile.jpg");

  @include media-query-md() {
    background-image: url("/destinations/background-destination-tablet.jpg");
  }

  @include media-query-xl() {
    background-image: url("/destinations/background-destination-desktop.jpg");
  }
}

.bg-crew {
  background-image: url("/crew/background-crew-mobile.jpg");

  @include media-query-md() {
    background-image: url("/crew/background-crew-tablet.jpg");
  }

  @include media-query-xl() {
    background-image: url("/crew/background-crew-desktop.jpg");
  }
}

.bg-technology {
  background-image: url("/technology/background-technology-mobile.jpg");

  @include media-query-md() {
    background-image: url("/technology/background-technology-tablet.jpg");
  }

  @include media-query-xl() {
    background-image: url("/technology/background-technology-desktop.jpg");
  }
}
</style>
