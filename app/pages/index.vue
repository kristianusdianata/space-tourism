<script lang="ts" setup>
import { useData, useCanonicalUrl } from "@/composables";
import { MainStructure, ExploreButton } from "@/components/home";
import { HomeContainer } from "@/components/ui";

const { canonicalUrl } = useCanonicalUrl();

useHead({
  title: "Home",
  link: [
    {
      rel: "canonical",
      href: `${canonicalUrl.value}`,
    },
    {
      rel: "preload",
      as: "image",
      href: "/home/background-home-mobile.jpg",
      media: "(max-width: 767px)",
    },
    {
      rel: "preload",
      as: "image",
      href: "/home/background-home-tablet.jpg",
      media: "(min-width: 768px)",
    },
    {
      rel: "preload",
      as: "image",
      href: "/home/background-home-desktop.jpg",
      media: "(min-width: 1280px)",
    },
  ],
  meta: [
    {
      name: "description",
      content: "Let's travel to the space",
    },
  ],
});

const { menus } = useData();
</script>

<template>
  <HomeContainer>
    <MainStructure>
      <template #heading-prefix>
        <span class="heading-prefix">so, you want to travel to</span>
      </template>

      <template #heading-suffix>
        <span class="heading-suffix">space</span>
      </template>

      <template #header-desc>
        <p class="header-desc">
          Let&apos;s face it; if you want to go to space, you might as well
          genuinely go to outer space and not hover kind of on the edge of it.
          Well sit back, and relax because we&apos;ll give you a truly out of
          this world experience!
        </p>
      </template>

      <template #explore-button>
        <ExploreButton :to="menus[1] ? menus[1].label : `index`">
          Explore
        </ExploreButton>
      </template>
    </MainStructure>
  </HomeContainer>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/typography" as *;

.heading-prefix {
  @include mobile-text-preset-6();
  @include font-style($color: var(--blue-300));

  @include media-query-md() {
    @include desktop-text-preset-5();
  }
}

.heading-suffix {
  @include layout-size($height: 92px);
  @include flexbox($display: flex, $align: center);
  @include mobile-text-preset-1();

  @include media-query-md() {
    @include layout-size($height: 165px);
    @include desktop-text-preset-1();
  }
}

.header-desc {
  @include mobile-text-preset-9();
  @include font-style($color: var(--blue-300), $text-align: center);

  @include media-query-md() {
    @include tablet-text-preset-9();
  }

  @include media-query-xl() {
    @include desktop-text-preset-9();
    @include font-style($text-align: start);
  }
}
</style>
