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

  @include media-query-xl() {
    @include grid($cols: repeat(2, 1fr));
    @include layout-size($height: 734px);
  }
}

.image {
  @include flexbox(
    $display: flex,
    $direction: column,
    $justify: center,
    $align: center
  );
  @include layout-size($height: 203px, $width: 100%);

  @include media-query-md() {
    @include layout-size($height: 384px);
  }

  @include media-query-xl() {
    @include layout-size($height: 100%);
  }
}

.tab {
  @include layout-size($width: 100%, $height: 100%);
}

.tab-wrapper {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-300)
  );
  @include layout-size($width: 100%);

  @include media-query-md() {
    @include layout-size($width: 514px);
    @include layout-spacing($margin: auto);
  }

  @include media-query-xl() {
    @include layout-size($width: 445px, $height: 100%);
    @include flexbox($justify: center, $gap: var(--spacing-500));
  }
}

.tab-menu {
  @include flexbox(
    $display: flex,
    $justify: center,
    $direction: row,
    $gap: var(--spacing-400)
  );

  @include layout-size($height: 32px);

  @include media-query-xl() {
    @include flexbox($justify: start);
  }
}
</style>
