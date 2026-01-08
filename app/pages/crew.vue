<script setup lang="ts">
import {
  MainStructure,
  BodyStructure,
  TabBodyStructure,
  TabLink,
  TabImage,
} from "@/components/crew";
import { MainContainer } from "@/components/ui";
import { useData, useTransition, useCanonicalUrl } from "@/composables";
import { onMounted } from "vue";
import { capitalize } from "@/utils";

const { canonicalUrl } = useCanonicalUrl();
const { crew, getCrewBySlug } = useData();
const route = useRoute();
const { istransitioning, startTransition, stopTransition } = useTransition();
const isMounted = ref<boolean>(false);

const hasParam = computed(() => {
  return typeof route.params.slug === "string"
    ? route.params.slug.toLowerCase()
    : undefined;
});

const activeTabRoute = computed(() => {
  return hasParam.value ?? crew[0]!.slug.toLowerCase();
});

const data = computed(() => getCrewBySlug(activeTabRoute.value));

watch(
  () => route.params.slug,
  (newTab, _) => {
    if (!newTab) return;

    /**
     * UI transition is started when the route tab changes.
     * This is used to sync animations with the active tab.
     */
    startTransition();
  }
);

onMounted(() => {
  isMounted.value = true;
});

useHead({
  title: computed(() => `Crew – ${capitalize(data.value!.name)}`),
  link: [
    {
      rel: "canonical",
      href: `${canonicalUrl.value}`,
    },
    {
      rel: "preload",
      as: "image",
      href: "/crew/background-crew-mobile.jpg",
      media: "(max-width: 767px)",
    },
    {
      rel: "preload",
      as: "image",
      href: "/crew/background-crew-tablet.jpg",
      media: "(min-width: 768px)",
    },
    {
      rel: "preload",
      as: "image",
      href: "/crew/background-crew-desktop.jpg",
      media: "(min-width: 1280px)",
    },
  ],
  meta: [
    {
      name: "description",
      content: computed(
        () =>
          `Meet your ${capitalize(data.value!.role)} - ${capitalize(
            data.value!.name
          )}`
      ),
    },
  ],
});
</script>

<template>
  <MainContainer>
    <MainStructure>
      <template #heading-prefix>
        <span class="heading-prefix">02</span>
      </template>

      <template #heading-suffix>
        <span class="heading-suffix">Meet your crew</span>
      </template>

      <template #body>
        <BodyStructure>
          <template #image>
            <NuxtImg
              :custom="true"
              :src="data?.images.webp"
              :placeholder="true"
              v-slot="{ src, imgAttrs }"
            >
              <Transition
                name="slide"
                @after-leave="stopTransition"
                mode="out-in"
              >
                <TabImage
                  v-show="!istransitioning && isMounted"
                  :src="src"
                  :alt="data?.name"
                  v-bind="imgAttrs"
                />
              </Transition>
            </NuxtImg>
          </template>

          <template #tab-menu>
            <TabLink
              v-for="(data, index) in crew"
              :key="data.slug"
              :is-active="data.slug.toLowerCase() === activeTabRoute"
              :to="{
                name: 'crew-slug',
                params: { slug: data.slug.toLowerCase() },
              }"
            >
            </TabLink>
          </template>

          <template #tab-body>
            <TabBodyStructure>
              <template #heading>
                <Transition
                  name="slide"
                  @after-leave="stopTransition"
                  mode="out-in"
                >
                  <h2 class="name" v-show="!istransitioning && isMounted">
                    {{ data?.name }}
                  </h2>
                </Transition>
              </template>

              <template #desc>
                <Transition
                  name="slide"
                  @after-leave="stopTransition"
                  mode="out-in"
                >
                  <p class="role" v-show="!istransitioning && isMounted">
                    {{ data?.role }}
                  </p>
                </Transition>
              </template>

              <template #body-content>
                <Transition
                  name="slide"
                  @after-leave="stopTransition"
                  mode="out-in"
                >
                  <p class="bio" v-show="!istransitioning && isMounted">
                    {{ data?.bio }}
                  </p>
                </Transition>
              </template>
            </TabBodyStructure>
          </template>
        </BodyStructure>
      </template>
    </MainStructure>
  </MainContainer>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/typography" as *;

.heading-prefix {
  @include barlow-condensed-bold();
  @include font-style(
    $color: var(--white-25),
    $font-size: 16px,
    $letter-spacing: 0.15em,
    $text-transform: uppercase
  );

  @include media-query-md() {
    @include font-style($font-size: 20px);
  }

  @include media-query-xl() {
    @include font-style($font-size: 28px, $letter-spacing: 4.72px);
  }
}

.heading-suffix {
  @include mobile-text-preset-6();
  @include font-style($color: var(--white), $text-transform: uppercase);

  @include media-query-md() {
    @include tablet-text-preset-5();
  }

  @include media-query-xl() {
    @include desktop-text-preset-5();
  }
}

.name {
  @include mobile-text-preset-3();
  @include font-style($color: var(--white));
  @include font-style($text-transform: uppercase);

  @include media-query-md() {
    @include tablet-text-preset-3();
  }

  @include media-query-xl() {
    @include desktop-text-preset-3();
  }
}

.role {
  @include mobile-text-preset-4();
  @include font-style($color: var(--white-50));
  @include font-style($text-transform: uppercase);

  @include media-query-md() {
    @include tablet-text-preset-4();
  }

  @include media-query-xl() {
    @include desktop-text-preset-4();
  }
}

.bio {
  @include mobile-text-preset-9();
  @include font-style($color: var(--blue-300), $text-align: center);
  @include layout-size($min-height: 163px);

  @include media-query-md() {
    @include tablet-text-preset-9();
    @include layout-size($min-height: 117px);
  }

  @include media-query-xl() {
    @include desktop-text-preset-9();
    @include font-style($text-align: start);
  }
}
</style>
