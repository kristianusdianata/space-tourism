<template>
  <article class="article">
    <header class="header">
      <slot name="heading" />
      <slot name="desc" />
    </header>

    <div class="body">
      <slot name="body-content" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.article {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-300)
  );

  @include media-query-xl() {
    @include layout-size($height: 631px);
    @include flexbox($justify: center);
  }
}

.header {
  @include flexbox(
    $display: flex,
    $direction: column-reverse,
    $align: center,
    $gap: var(--spacing-100)
  );

  @include media-query-md() {
    @include flexbox($gap: var(--spacing-200));
  }

  @include media-query-xl() {
    @include flexbox($align: start);
  }
}

.body {
  @include layout-size($min-height: 164px);

  @include media-query-md() {
    @include layout-size($min-height: 117px);
  }

  @include media-query-xl() {
    @include layout-size($min-height: auto);
  }
}
</style>
