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
    $gap: var(--spacing-200)
  );

  @include media-query-xl() {
    @include flexbox($gap: var(--spacing-300));
  }
}

.header {
  @include flexbox(
    $display: flex,
    $direction: column-reverse,
    $align: center,
    $gap: var(--spacing-200)
  );

  @include media-query-xl() {
    @include flexbox($align: start);
  }
}
</style>
