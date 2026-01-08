<script setup lang="ts">
import {
  MainStructure,
  BodyStructure,
  TabBodyStructure,
  TabLink,
  TabImage,
} from "@/components/destinations";
import { MainContainer } from "@/components/ui";
import { useData, useTransition } from "@/composables";
import { onMounted } from "vue";
import { capitalize } from "@/utils";

const config = useRuntimeConfig();
const { destinations, getDestinationBySlug } = useData();
const route = useRoute();
const { istransitioning, startTransition, stopTransition } = useTransition();
const isMounted = ref<boolean>(false);

const hasParam = computed(() => {
  return typeof route.params.slug === "string"
    ? route.params.slug.toLowerCase()
    : undefined;
});

const activeTabRoute = computed(() => {
  return hasParam.value ?? destinations[0]!.slug.toLowerCase();
});

const data = computed(() => getDestinationBySlug(activeTabRoute.value));

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
  title: computed(() => `Destination – ${capitalize(data.value!.name)}`),
  link: [
    {
      rel: "canonical",
      href: `${config.public.siteUrl}destinations`,
    },
  ],
  meta: [
    {
      name: "description",
      content: computed(
        () => `Explore destination ${capitalize(data.value!.name)}`
      ),
    },
  ],
});
</script>

<template>
  <MainContainer>
    <MainStructure>
      <template #heading-prefix>
        <span class="heading-prefix">01</span>
      </template>

      <template #heading-suffix>
        <span class="heading-suffix">Pick your destination</span>
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
              v-for="(destination, index) in destinations"
              :key="destination.slug"
              :label="destination.name"
              :is-active="destination.slug.toLowerCase() === activeTabRoute"
              :to="{
                name: 'destinations-slug',
                params: { slug: destination.slug.toLowerCase() },
              }"
            >
            </TabLink>
          </template>

          <template #tab-body>
            <TabBodyStructure>
              <template #sub-heading>
                <Transition
                  name="slide"
                  @after-leave="stopTransition"
                  mode="out-in"
                >
                  <h2
                    class="sub-heading"
                    v-show="!istransitioning && isMounted"
                  >
                    {{ data?.name.toUpperCase() }}
                  </h2>
                </Transition>
              </template>

              <template #sub-desc>
                <Transition
                  name="slide"
                  @after-leave="stopTransition"
                  mode="out-in"
                >
                  <p class="sub-desc" v-show="!istransitioning && isMounted">
                    {{ data?.description }}
                  </p>
                </Transition>
              </template>

              <template #distance>
                <p class="distance-title">avg. distance</p>
                <Transition
                  name="slide"
                  @after-leave="stopTransition"
                  mode="out-in"
                >
                  <span
                    class="distance-desc"
                    v-show="!istransitioning && isMounted"
                  >
                    {{ data?.distance }}
                  </span>
                </Transition>
              </template>

              <template #time>
                <p class="time-title">est. travel time</p>
                <Transition
                  name="slide"
                  @after-leave="stopTransition"
                  mode="out-in"
                >
                  <span
                    class="time-desc"
                    v-show="!istransitioning && isMounted"
                  >
                    {{ data?.travel }}
                  </span>
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

.sub-heading {
  @include layout-size($width: 100%, $height: 64px);
  @include mobile-text-preset-2();
  @include font-style($color: var(--white));
  @include flexbox(
    $display: flex,
    $direction: column,
    $justify: center,
    $align: center
  );

  @include media-query-md() {
    @include layout-size($height: 92px);
    @include tablet-text-preset-2();
  }

  @include media-query-xl() {
    @include flexbox($align: start);
    @include desktop-text-preset-2();
  }
}

.sub-desc {
  @include layout-size($width: 100%);
  @include mobile-text-preset-9();
  @include font-style($color: var(--blue-300), $text-align: center);

  @include media-query-md() {
    @include layout-size($min-height: 87px);
    @include tablet-text-preset-9();
  }

  @include media-query-xl() {
    @include font-style($text-align: start);
    @include desktop-text-preset-9();
  }
}

.distance-title,
.time-title {
  @include desktop-text-preset-7();
  @include font-style($color: var(--blue-300), $text-transform: uppercase);
}

.distance-desc,
.time-desc {
  @include desktop-text-preset-6();
  @include font-style($color: var(--white), $text-transform: uppercase);
}
</style>
