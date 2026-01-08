<template>
  <nav class="menu">
    <div class="header">
      <div class="header-wrapper">
        <slot name="nav-close-button" />
      </div>
    </div>

    <ol class="menu-list">
      <slot name="menu-list" />
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.menu {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-600)
  );
  @include layout-spacing($padding-inline: var(--spacing-400) 0);
  @include layout-position(
    $position: fixed,
    $top: 0,
    $bottom: 0,
    $right: 0,
    $z-index: 99
  );
  @include layout-size($width: 254px);

  @include media-query-md() {
    @include layout-position($position: relative, $z-index: 0);
    @include layout-spacing($padding-inline: var(--spacing-500));
    @include layout-size($width: auto, $height: 100%);
    @include flexbox($justify: center);
  }
}
.header {
  @include layout-spacing($padding-block: var(--spacing-400));

  @include media-query-md() {
    display: none;
  }
}

.header-wrapper {
  @include layout-spacing($padding-inline: 0 var(--spacing-300));
  @include flexbox($display: flex, $justify: end);
}

.menu-list {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-400)
  );

  @include media-query-md() {
    @include flexbox($direction: row, $gap: var(--spacing-600), $justify: end);
    @include layout-position($position: relative);
    @include layout-size($height: 100%);
  }
}
</style>
