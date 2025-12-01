<script setup lang="ts">
import { useHeroTechnology } from './store'

const technologyStore = useHeroTechnology()
</script>

<template>
  <article class="tab">
    <div class="tab__panel-image" id="panelImage">
      <Transition name="text-morph" @after-leave="technologyStore.stopAnimation">
        <div class="tab__image" v-if="!technologyStore.startAnimation">
          <picture>
            <source
              media="(min-width:1200px)"
              :srcset="technologyStore.items[technologyStore.currActiveIndex]?.images.portrait"
            />
            <img
              :src="technologyStore.items[technologyStore.currActiveIndex]?.images.landscape"
              :alt="technologyStore.items[technologyStore.currActiveIndex]?.name"
            />
          </picture>
        </div>
      </Transition>
    </div>

    <div class="container">
      <div class="wrapper">
        <ul class="tab__list" role="tablist">
          <li class="tab__list-item" v-for="(item, index) in technologyStore.items" :key="index">
            <button
              class="tab__item-button"
              :aria-selected="technologyStore.currActiveIndex === index"
              aria-controls="contentPanel"
              role="tab"
              :aria-label="technologyStore.items[technologyStore.currActiveIndex]?.name"
              @click="
                () => {
                  if (technologyStore.currActiveIndex !== index) {
                    technologyStore.updateActiveIndex(index)
                  }
                }
              "
            >
              {{ index + 1 }}
            </button>
          </li>
        </ul>

        <div
          class="tab__panel"
          role="tabpanel"
          id="contentPanel"
          aria-owns="panelImage"
          aria-live="polite"
        >
          <Transition name="text-morph" @after-leave="technologyStore.stopAnimation">
            <div class="tab__heading" v-if="!technologyStore.startAnimation">
              <h2 class="tab__title">
                <span>{{ `the terminology...`.toUpperCase() }}</span>
                <span>{{
                  technologyStore.items[technologyStore.currActiveIndex]?.name.toUpperCase()
                }}</span>
              </h2>

              <p class="tab__desc">
                {{ technologyStore.items[technologyStore.currActiveIndex]?.description }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/typography' as *;

.container {
  @include layout-spacing(
    $padding-inline: var(--spacing-300),
    $padding-block: 0px var(--spacing-600)
  );

  @include media-query-md() {
    @include layout-spacing($margin: auto, $padding-block: 0px var(--spacing-600));
  }

  @include media-query-xl() {
    @include layout-spacing($padding: 0px);
  }
}

.wrapper {
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-500));

  @include media-query-md() {
    @include layout-size($width: 512px);
  }

  @include media-query-xl() {
    @include layout-size($width: 635px);
    @include flexbox($direction: row, $gap: var(--spacing-800));
  }
}

.tab {
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-400));

  @include media-query-xl() {
    @include grid($cols: repeat(2, 1fr));
    @include layout-size($height: 734px);
  }

  &__panel-image {
    @include layout-spacing($padding-block: var(--spacing-600) 0px);

    @include media-query-xl() {
      @include grid-position($col: 2, $row: 1);
      @include layout-spacing($padding-block: 0px);
      align-self: center;
    }
  }

  &__image {
    @include layout-size($height: 100%, $width: 100%);

    & picture {
      display: block;
      @include layout-size($height: 100%, $width: 100%);
    }

    & img {
      @include layout-size($max-height: 258px);
      aspect-ratio: 384/155;
      object-fit: cover;

      @include media-query-md() {
        @include layout-size($max-height: 357px);
      }

      @include media-query-xl() {
        @include layout-size($max-height: 600px, $max-width: 608px);
        aspect-ratio: 515/527;
      }
    }
  }

  &__list {
    @include flexbox($display: flex, $direction: row, $justify: center, $gap: var(--spacing-200));

    @include media-query-xl() {
      @include flexbox($direction: column, $justify: center, $gap: var(--spacing-400));
    }
  }

  &__item-button {
    @include mobile-text-preset-4();
    @include font-style($color: var(--white));
    @include layout-size($height: 40px, $width: 40px);
    @include layout-background($color: transparent);
    @include border($radius: 50%);
    outline: 1px solid var(--white-25);
    transition:
      outline-color 0.35s ease-in-out,
      background-color 0.35s ease-in-out,
      color 0.35 ease-in-out;

    &:hover:not([aria-selected='true']),
    &:focus:not([aria-selected='true']) {
      outline: 1px solid var(--white);
      transition:
        outline-color 0.35s ease-in-out,
        background-color 0.35s ease-in-out,
        color 0.35 ease-in-out;
    }

    &[aria-selected='true'] {
      @include layout-background($color: var(--white));
      @include font-style($color: var(--blue-900));
      outline: none;
      transition:
        outline-color 0.35s ease-in-out,
        background-color 0.35s ease-in-out,
        color 0.35 ease-in-out;
    }

    @include media-query-md() {
      @include layout-size($height: 56px, $width: 56px);
      @include tablet-text-preset-4();
    }

    @include media-query-xl() {
      @include layout-size($height: 80px, $width: 80px);
      @include desktop-text-preset-4();
    }
  }

  &__heading {
    @include flexbox($display: flex, $direction: column, $gap: var(--spacing-200));
  }

  &__title {
    @include flexbox($display: flex, $direction: column, $gap: var(--spacing-200), $align: center);

    @include media-query-xl() {
      @include flexbox($align: start);
    }

    & span:first-child {
      @include mobile-text-preset-4();
      @include font-style($color: var(--white-50));

      @include media-query-md() {
        @include tablet-text-preset-4();
      }

      @include media-query-xl() {
        @include desktop-text-preset-4();
      }
    }

    & span:nth-child(2) {
      @include mobile-text-preset-3();
      @include font-style($color: var(--white));

      @include media-query-md() {
        @include tablet-text-preset-3();
      }

      @include media-query-xl() {
        @include desktop-text-preset-3();
      }
    }
  }

  &__desc {
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
}

.text-morph-enter-active,
.text-morph-leave-active {
  transition:
    opacity 0.15s linear,
    transform 0.15s linear;
}

.text-morph-enter-from,
.text-morph-leave-to {
  opacity: 0;
  transform: translateX(5px);
}
</style>
