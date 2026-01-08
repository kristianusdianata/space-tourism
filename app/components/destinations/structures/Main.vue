<template>
  <article class="destination">
    <div class="wrapper">
      <h1 class="heading">
        <slot name="heading-prefix" />
        <slot name="heading-suffix" />
      </h1>

      <slot name="body" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.destination {
  @include layout-spacing($margin: auto);
  @include layout-size($max-width: 1110px);
}

.wrapper {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-300)
  );
}

.heading {
  @include flexbox(
    $display: flex,
    $direction: row,
    $gap: var(--spacing-300),
    $justify: center
  );

  @include media-query-md() {
    @include flexbox($justify: start);
  }
}
</style>
