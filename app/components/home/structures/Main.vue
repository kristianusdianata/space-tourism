<template>
  <article class="home">
    <div class="container">
      <div class="header">
        <h1 class="heading">
          <slot name="heading-prefix" />
          <slot name="heading-suffix" />
        </h1>
        <slot name="header-desc" />
      </div>

      <div class="body">
        <slot name="explore-button" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.home {
  @include layout-size($width: 100%, $height: 676px);

  @include media-query-md() {
    @include layout-spacing($margin: auto);
    @include layout-size($max-width: 688px, $height: 672px);
  }

  @include media-query-xl() {
    @include flexbox($display: flex, $align: end);
    @include layout-size($max-width: 1110px, $height: 632px);
  }
}

.container {
  @include layout-size($height: 100%, $width: 100%);

  @include media-query-md() {
    @include layout-spacing($margin: auto);
    @include flexbox(
      $display: flex,
      $direction: column,
      $justify: space-between
    );
    @include layout-size($max-width: 512px);
  }

  @include media-query-xl() {
    @include layout-spacing($margin: 0px);
    @include flexbox($direction: row, $align: center);
    @include layout-size($height: 343px, $max-width: 100%);
  }
}

.header {
  @include layout-size($width: 100%);
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-300)
  );

  @include media-query-xl() {
    @include layout-size($width: 540px, $height: 100%);
  }
}

.heading {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-300),
    $align: center
  );
  @include font-style($color: var(--white), $text-transform: uppercase);

  @include media-query-xl() {
    @include flexbox($align: start);
  }
}

.body {
  @include layout-size($height: 382px);
  @include flexbox(
    $display: flex,
    $justify: center,
    $align: center,
    $direction: column
  );

  @include media-query-md() {
    @include layout-size($height: fit-content);
  }

  @include media-query-xl() {
    @include layout-size($width: 540px);
    @include flexbox($align: end);
  }
}
</style>
