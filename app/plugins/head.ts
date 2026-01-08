export default defineNuxtPlugin(() => {
  useHead({
    titleTemplate: (title) => {
      return title && title !== "Space Tourism"
        ? `Space Tourism | ${title}`
        : "Space Tourism";
    },
  });
});
