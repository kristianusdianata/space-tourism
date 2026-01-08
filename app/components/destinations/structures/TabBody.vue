<template>
  <article class="article">
    <header class="header">
      <slot name="sub-heading" />
      <slot name="sub-desc" />
    </header>

    <hr />

    <div class="body">
      <div class="body-content">
        <slot name="distance" />
      </div>

      <div class="body-content">
        <slot name="time" />
      </div>
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
}

.header {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-200),
    $justify: center
  );
}

hr {
  @include layout-size($width: 100%, $min-height: 1px);
  @include layout-background($color: var(--white-25));
}

.body {
  @include grid($cols: 1fr, $gap: var(--spacing-300));

  @include media-query-md() {
    @include grid($cols: repeat(2, 1fr));
  }
}

.body-content {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-150),
    $align: center
  );

  @include media-query-xl() {
    @include flexbox($align: start);
  }
}
</style>
