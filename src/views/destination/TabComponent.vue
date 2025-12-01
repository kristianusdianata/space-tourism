<script setup lang="ts">
import { useHeroDestination } from './store'

const destinationStore = useHeroDestination()
</script>

<template>
  <article class="tab">
    <Transition name="text-morph" @after-leave="destinationStore.stopAnimation">
      <div class="tab__image" v-if="!destinationStore.startAnimation" id="panelImage">
        <img
          :src="destinationStore.items[destinationStore.currActiveIndex]?.images.webp"
          :alt="destinationStore.items[destinationStore.currActiveIndex]?.name"
        />
      </div>
    </Transition>

    <div class="wrapper">
      <ul class="tab__list" role="tablist">
        <li class="tab__list-item" v-for="(item, index) in destinationStore.items" :key="index">
          <button
            class="tab__item-button"
            :aria-selected="destinationStore.currActiveIndex === index"
            aria-controls="contentPanel"
            role="tab"
            @click="
              () => {
                if (destinationStore.currActiveIndex !== index) {
                  destinationStore.updateActiveIndex(index)
                }
              }
            "
          >
            {{ item.name.toUpperCase() }}
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
        <Transition name="text-morph" @after-leave="destinationStore.stopAnimation">
          <div class="tab__panel-heading" v-if="!destinationStore.startAnimation">
            <h2 class="tab__panel-title">
              {{ destinationStore.items[destinationStore.currActiveIndex]?.name.toUpperCase() }}
            </h2>

            <p class="tab__panel-desc" v-if="!destinationStore.startAnimation">
              {{ destinationStore.items[destinationStore.currActiveIndex]?.description }}
            </p>
          </div>
        </Transition>

        <hr class="tab__decoration" />

        <div class="tab__panel-body">
          <div class="tab__desc-info">
            <p class="tab__label">avg. distance</p>
            <Transition name="text-morph" @after-leave="destinationStore.stopAnimation">
              <span class="tab__value" v-if="!destinationStore.startAnimation">
                {{ destinationStore.items[destinationStore.currActiveIndex]?.distance }}</span
              >
            </Transition>
          </div>
          <div class="tab__desc-info">
            <p class="tab__label">est. travel time</p>
            <Transition name="text-morph" @after-leave="destinationStore.stopAnimation">
              <span class="tab__value" v-if="!destinationStore.startAnimation">
                {{ destinationStore.items[destinationStore.currActiveIndex]?.travel }}
              </span>
            </Transition>
          </div>
        </div>
      </div>
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
    @include layout-size($width: 514px);
    @include layout-spacing($margin: auto);
  }

  @include media-query-xl() {
    @include layout-size($width: 448px);
  }
}

.tab {
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-400));

  @include media-query-xl() {
    @include flexbox($direction: row, $gap: var(--spacing-400));
    @include layout-size($height: 734px);
  }

  &__image {
    @include flexbox($display: flex, $justify: center, $align: center);
    @include layout-size($height: 203px, $width: 150px);
    @include layout-spacing($margin: auto);

    @include media-query-md() {
      @include layout-size($height: 384px, $width: 300px);
    }

    @include media-query-xl() {
      @include layout-size($height: 100%, $width: 480px);
    }

    & img {
      @include layout-size($max-width: 445px, $max-height: 445px);
      aspect-ratio: 1/1;
    }
  }

  &__list {
    @include layout-size($height: 32px);
    @include flexbox(
      $display: flex,
      $direction: row,
      $gap: var(--spacing-400),
      $justify: center,
      $align: start
    );
  }

  &__list-item {
    @include layout-position($position: relative);
    @include layout-size($height: 100%);
    @include font-style($color: var(--blue-300));
  }

  &__item-button {
    @include font-style($color: inherit);
    @include layout-size($height: inherit);
    @include mobile-text-preset-8();
    @include flexbox($display: flex);

    @include media-query-md() {
      @include desktop-text-preset-8();
    }

    &::before {
      content: '';
      @include layout-position($position: absolute, $bottom: 0, $right: 0, $left: 0);
      @include layout-size($width: 100%, $height: 3px);
      @include layout-background($color: var(--white-50));
      opacity: 0;
      transition: opacity 0.35s ease-in-out;
    }

    &:hover:not([aria-selected='true']),
    &:focus:not([aria-selected='true']) {
      &::before {
        opacity: 1;
        transition: opacity 0.35s ease-in-out;
      }
    }

    &[aria-selected='true'] {
      @include font-style($color: var(--white));

      &::before {
        opacity: 1;
        @include layout-background($color: var(--white));
      }
    }
  }

  &__panel {
    @include flexbox($display: flex, $direction: column, $gap: var(--spacing-300));
  }

  &__panel-heading {
    @include flexbox($display: flex, $direction: column, $gap: var(--spacing-300));
  }

  &__panel-title {
    @include layout-position($position: relative);
    @include layout-size($width: 100%, $height: 64px);
    @include mobile-text-preset-2();
    @include font-style($color: var(--white));
    @include flexbox($display: flex, $direction: column, $justify: center, $align: center);

    @include media-query-md() {
      @include layout-size($height: 92px);
      @include tablet-text-preset-2();
    }
  }

  &__panel-desc {
    @include layout-size($width: 100%, $min-height: 136px);
    @include mobile-text-preset-9();
    @include font-style($color: var(--blue-300), $text-align: center);

    @include media-query-md() {
      @include layout-size($min-height: 87px);
      @include tablet-text-preset-9();
    }
  }

  &__decoration {
    @include layout-size($width: 100%, $min-height: 1px);
    @include layout-background($color: var(--white-25));
  }

  &__panel-body {
    @include flexbox($display: flex, $direction: column, $gap: var(--spacing-300));

    @include media-query-md() {
      @include flexbox($direction: row, $gap: var(--spacing-300), $justify: space-between);
    }
  }

  &__desc-info {
    @include flexbox(
      $display: flex,
      $direction: column,
      $gap: var(--spacing-150),
      $align: center,
      $justify: center
    );

    @include media-query-md() {
      @include layout-size($width: 245px);
    }
  }

  &__label {
    @include desktop-text-preset-7();
    @include font-style($color: var(--blue-300), $text-transform: uppercase);
  }

  &__value {
    @include desktop-text-preset-6();
    @include font-style($color: var(--white), $text-transform: uppercase);
  }

  &__panel-transition {
    @include layout-position($position: absolute);
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
