<template>
  <main class="container">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.container {
  @include layout-spacing(
    $padding-inline: var(--spacing-300),
    $padding-block: var(--spacing-300)
  );

  @include media-query-md() {
    @include layout-spacing(
      $margin: auto,
      $padding-inline: var(--spacing-500),
      $padding-block: var(--spacing-1600)
    );
  }

  @include media-query-xl() {
    @include layout-spacing(
      $padding-inline: 0px,
      $padding-block: var(--spacing-1600)
    );
  }
}
</style>
