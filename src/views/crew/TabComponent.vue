<script setup lang="ts">
import { useHeroCrew } from './store'

const crewStore = useHeroCrew()
</script>

<template>
  <article class="tab">
    <div class="wrapper">
      <div
        class="tab__panel"
        role="tabpanel"
        id="contentPanel"
        aria-owns="panelImage"
        aria-live="polite"
      >
        <Transition name="text-morph" @after-leave="crewStore.stopAnimation">
          <div class="tab__heading" v-if="!crewStore.startAnimation">
            <h2 class="tab__title">
              <span>{{ crewStore.items[crewStore.currActiveIndex]?.role.toUpperCase() }}</span>
              <span>{{ crewStore.items[crewStore.currActiveIndex]?.name.toUpperCase() }}</span>
            </h2>

            <p class="tab__desc">
              {{ crewStore.items[crewStore.currActiveIndex]?.bio }}
            </p>
          </div>
        </Transition>
      </div>

      <ul class="tab__list" role="tablist">
        <li class="tab__list-item" v-for="(item, index) in crewStore.items" :key="index">
          <button
            class="tab__item-button"
            :aria-selected="crewStore.currActiveIndex === index"
            aria-controls="contentPanel"
            role="tab"
            :aria-label="crewStore.items[crewStore.currActiveIndex]?.name"
            @click="
              () => {
                if (crewStore.currActiveIndex !== index) {
                  crewStore.updateActiveIndex(index)
                }
              }
            "
          ></button>
        </li>
      </ul>
    </div>

    <div class="tab__panel-image" id="panelImage">
      <Transition name="text-morph" @after-leave="crewStore.stopAnimation">
        <div class="tab__image" v-if="!crewStore.startAnimation">
          <img
            :src="crewStore.items[crewStore.currActiveIndex]?.images.webp"
            :alt="crewStore.items[crewStore.currActiveIndex]?.name"
          />
        </div>
      </Transition>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/typography' as *;

.wrapper {
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-300));

  @include media-query-md() {
    @include layout-size($width: 512px);
    @include layout-spacing($margin: auto);
  }

  @include media-query-xl() {
    @include layout-size($width: 539px);
    @include flexbox($gap: var(--spacing-500));
  }
}

.tab {
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-400));

  @include media-query-xl() {
    @include flexbox($direction: row);
    @include layout-size($max-height: 734px);
  }

  &__panel {
    @include media-query-xl() {
      @include layout-size($height: 631px);
      @include flexbox($display: flex, $direction: column, $justify: center);
    }
  }

  &__heading {
    @include flexbox($display: flex, $direction: column, $gap: var(--spacing-300));
  }

  &__title {
    @include flexbox($display: flex, $direction: column, $gap: var(--spacing-100), $align: center);
    @include layout-spacing($padding-block: var(--spacing-500) 0);

    @include media-query-md() {
      @include flexbox($gap: var(--spacing-200));
    }

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

  &__list {
    @include flexbox($display: flex, $direction: row, $gap: var(--spacing-200), $justify: center);

    @include media-query-xl() {
      @include layout-size($height: 63px);
      @include flexbox($justify: start, $gap: var(--spacing-500));
    }
  }

  &__item-button {
    @include layout-size($height: 10px, $width: 10px);
    @include border($radius: 50%);
    @include layout-background($color: var(--white-17));
    transition: background-color 0.35s ease-in-out;

    &:hover:not([aria-selected='true']),
    &:focus:not([aria-selected='true']) {
      @include layout-background($color: var(--white-50));
      transition: background-color 0.35s ease-in-out;
    }

    &[aria-selected='true'] {
      @include layout-background($color: var(--white));
      transition: background-color 0.35s ease-in-out;
    }

    @include media-query-xl() {
      @include layout-size($height: 15px, $width: 15px);
    }
  }

  &__panel-image {
    @include layout-size($height: 351px, $width: 100%);

    @include media-query-md() {
      @include layout-size($height: 463px);
    }

    @include media-query-xl() {
      @include layout-size($width: 539px, $height: 100%);
    }
  }

  &__image {
    @include layout-size($height: 100%, $width: 100%);

    & img {
      @include layout-spacing($margin: auto);
      @include layout-size($max-width: 514px, $max-height: 700px);
      aspect-ratio: 257/350;
      -webkit-mask-image: linear-gradient(
        to bottom,
        black 0%,
        rgba(0, 0, 0, 0.6) 80%,
        transparent 100%
      );
      mask-image: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.6) 80%, transparent 100%);
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
