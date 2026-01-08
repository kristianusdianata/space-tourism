export function useCanonicalUrl() {
  const route = useRoute();
  const requestURL = useRequestURL();
  const canonicalUrl = computed(() => `${requestURL.origin}${route.fullPath}`);

  return {
    canonicalUrl,
  };
}
