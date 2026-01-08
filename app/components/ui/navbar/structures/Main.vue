<template>
  <div class="navbar">
    <div class="navbar-wrapper">
      <div class="logo">
        <slot name="logo" />
        <hr />
      </div>

      <div class="nav-toggle">
        <slot name="nav-open-button" />
      </div>

      <slot name="nav-menu" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.navbar {
  @include layout-spacing($padding-block: var(--spacing-300));

  @include media-query-md() {
    @include layout-spacing($padding: 0px);
  }

  @include media-query-xl() {
    @include layout-spacing($padding-block: var(--spacing-500) 0px);
  }
}

.navbar-wrapper {
  @include layout-size($height: 40px);
  @include grid($cols: repeat(2, 1fr), $align: center);

  @include media-query-md() {
    @include layout-size($height: 96px);
    @include grid($cols: min-content auto);
  }

  @include media-query-xl() {
    @include grid($cols: repeat(2, 1fr));
  }
}

.logo {
  @include layout-position($position: relative);
  @include layout-spacing($padding-inline: var(--spacing-300) 0);

  @include media-query-md() {
    @include layout-size($height: 100%, $width: 128px);
    @include layout-spacing($padding-inline: var(--spacing-500) 0);
    @include grid($cols: 1fr, $align: center);
  }

  @include media-query-xl() {
    @include layout-size($width: auto);
    @include layout-spacing($padding-inline: var(--spacing-800) 0);
    @include grid($cols: auto 1fr, $gap: var(--spacing-800));

    &::before {
      content: "";
      @include layout-position($position: absolute, $right: 0, $z-index: 2);
      @include layout-size($height: 1px, $width: 30px);
      @include layout-background($color: var(--white-5));
      transform: translateX(100%);
    }
  }
}

hr {
  @include layout-size($height: 1px, $width: 100%);
  @include layout-background($color: var(--white-5));
  display: none;

  @include media-query-xl() {
    display: block;
  }
}

.nav-toggle {
  @include layout-spacing(
    $padding-inline: 0 var(--spacing-300),
    $margin-inline: auto 0px
  );

  @include media-query-md() {
    display: none;
  }
}
</style>
