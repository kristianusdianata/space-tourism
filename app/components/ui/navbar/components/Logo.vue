<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 48 48"
    class="logo"
  >
    <g fill="none" fill-rule="evenodd">
      <circle cx="24" cy="24" r="24" fill="#FFF" />
      <path
        fill="#0B0D17"
        d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"
      />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.logo {
  @include layout-size($width: 40px, $height: 40px);

  @include media-query-md() {
    @include layout-size($width: 48px, $height: 48px);
  }
}
</style>
