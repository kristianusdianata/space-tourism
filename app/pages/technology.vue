<script setup lang="ts">
import {
  MainStructure,
  BodyStructure,
  TabBodyStructure,
  TabLink,
  TabImage,
} from "@/components/technology";
import { MainContainer } from "@/components/ui";
import { useData, useTransition } from "@/composables";
import { onMounted } from "vue";
import { capitalize } from "@/utils";

const config = useRuntimeConfig();
const { technologies, getTechnologyBySlug } = useData();
const route = useRoute();
const { istransitioning, startTransition, stopTransition } = useTransition();
const isMounted = ref<boolean>(false);

const hasParam = computed(() => {
  return typeof route.params.slug === "string"
    ? route.params.slug.toLowerCase()
    : undefined;
});

const activeTabRoute = computed(() => {
  return hasParam.value ?? technologies[0]!.slug.toLowerCase();
});

const data = computed(() => getTechnologyBySlug(activeTabRoute.value));

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
  title: computed(() => `Technology – ${capitalize(data.value!.name)}`),
  link: [
    {
      rel: "canonical",
      href: `${config.public.siteUrl}technology`,
    },
  ],
  meta: [
    {
      name: "description",
      content: computed(
        () => `Our technology : ${capitalize(data.value!.name)}`
      ),
    },
  ],
});
</script>

<template>
  <MainContainer style="overflow: hidden">
    <MainStructure>
      <template #heading-prefix>
        <span class="heading-prefix">03</span>
      </template>

      <template #heading-suffix>
        <span class="heading-suffix">Space launch 101</span>
      </template>

      <template #body>
        <BodyStructure>
          <template #image>
            <Transition
              name="slide"
              @after-leave="stopTransition"
              mode="out-in"
            >
              <TabImage
                v-show="!istransitioning && isMounted"
                :portrait-src="data?.images.portrait"
                :landscape-src="data?.images.landscape"
                :alt="data?.name"
              />
            </Transition>
          </template>

          <template #tab-menu>
            <TabLink
              v-for="(technology, index) in technologies"
              :index="index + 1"
              :key="technology.slug"
              :is-active="technology.slug.toLowerCase() === activeTabRoute"
              :to="{
                name: 'technology-slug',
                params: { slug: technology.slug.toLowerCase() },
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
                <p class="header-text">The terminology...</p>
              </template>

              <template #body-content>
                <Transition
                  name="slide"
                  @after-leave="stopTransition"
                  mode="out-in"
                >
                  <p class="desc" v-show="!istransitioning && isMounted">
                    {{ data?.description }}
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
  @include font-style($color: var(--white), $text-transform: uppercase);

  @include media-query-md() {
    @include tablet-text-preset-3();
  }

  @include media-query-xl() {
    @include desktop-text-preset-3();
  }
}

.header-text {
  @include mobile-text-preset-4();
  @include font-style($color: var(--white-50), $text-transform: uppercase);

  @include media-query-md() {
    @include tablet-text-preset-4();
  }

  @include media-query-xl() {
    @include desktop-text-preset-4();
  }
}

.desc {
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
