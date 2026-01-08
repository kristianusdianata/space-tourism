import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    /**
     * Browser-managed scroll restoration.
     * This is triggered when navigating via back/forward buttons.
     * The previously saved scroll position is restored.
     */
    if (savedPosition) {
      return savedPosition;
    }

    /**
     * The root route path is extracted from the matched route records.
     * The first matched record always represents the top-level page
     * in the routing tree (e.g. /destinations).
     */
    const toRoot = to.matched[0]?.path;
    const fromRoot = from.matched[0]?.path;

    /**
     * Determines whether the navigation stays within the same
     * top-level route group.
     */
    const sameRoot = toRoot && fromRoot && toRoot === fromRoot;

    /**
     * The route depth is determined by the number of matched records.
     * This directly reflects the nesting level in the pages directory.
     *
     * Examples:
     * - /destinations              -> depth 1
     * - /destinations/mars         -> depth 2 (tab)
     * - /destinations/mars/details -> depth 3 (detail page)
     */
    const toDepth = to.matched.length;

    /**
     * Tab navigation is identified when:
     * - navigation stays within the same top-level route group
     * - the target route does not exceed depth level 2
     *
     * This includes:
     * - entering the first tab from the parent page
     * - switching between sibling tabs
     *
     * In such cases, scroll position must be preserved
     * to mimic native tab-switching behavior.
     */
    const isTabNavigation = sameRoot && toDepth <= 2;

    if (isTabNavigation) {
      /**
       * Returning false prevents any scroll adjustment
       * and keeps the current scroll position intact.
       */
      return false;
    }

    /**
     * For all other navigations (entering a new section,
     * opening a detail page, or leaving the current group),
     * the scroll position is reset to the top of the page.
     */
    return { top: 0 };
  },
};
