<template>
  <section class="body">
    <div class="image">
      <slot name="image" />
    </div>

    <div class="tab">
      <div class="tab-wrapper">
        <nav class="tab-menu">
          <slot name="tab-menu" />
        </nav>

        <slot name="tab-body" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.body {
  @include grid($cols: 1fr, $gap: var(--spacing-400));
  @include layout-spacing($padding-block: var(--spacing-800) 0px);

  @include media-query-xl() {
    @include grid($cols: repeat(2, 1fr));
    @include layout-size($height: 734px);
    @include layout-spacing($padding-block: 0px);
  }
}

.image {
  @include layout-size($width: 100vw);
  @include layout-spacing($margin-inline: calc(50% - 50vw));
  @include grid-position($col: 1, $row: 1);

  @include media-query-xl() {
    @include layout-size($height: 100%, $width: 100%);
    @include layout-spacing($margin-inline: 0px);
    @include grid-position($col: 2, $row: 1);
  }
}

.tab {
  @include flexbox($display: flex, $align: center);
  @include layout-size($height: 100%, $width: 100%);
}

.tab-wrapper {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-500)
  );
  @include layout-size($width: 100%);

  @include media-query-md() {
    @include layout-size($width: 512px);
    @include layout-spacing($margin: auto);
  }

  @include media-query-xl() {
    @include layout-size($width: 635px, $height: 304px);
    @include flexbox(
      $justify: center,
      $direction: row,
      $gap: var(--spacing-800)
    );
    @include layout-spacing($margin: 0px);
  }
}

.tab-menu {
  @include flexbox(
    $display: flex,
    $justify: center,
    $direction: row,
    $gap: var(--spacing-200)
  );

  @include media-query-xl() {
    @include flexbox(
      $direction: column,
      $justify: center,
      $gap: var(--spacing-400)
    );
  }
}
</style>
