<template>
  <article class="technology">
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

.technology {
  @include layout-spacing($margin: auto);
  @include layout-size($max-width: 1275px);

  @include media-query-xl() {
    @include layout-spacing(
      $margin: 0px,
      $margin-inline: auto 0px,
      $padding-inline:
        clamp(0px, calc(64px + (100vw - 1200px) * -0.266666), 64px) 0px
    );
  }
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
