export function useNavbar() {
  const isExpanded = ref<boolean>(false);
  const { isMediumAndUp } = useBreakpoint();

  function openNavbar() {
    isExpanded.value = true;
  }

  function closeNavbar() {
    isExpanded.value = false;
  }

  // handle resize
  watch(isMediumAndUp, (val) => {
    if (val) isExpanded.value = true;
    else isExpanded.value = false;
  });

  onMounted(() => {
    if (isMediumAndUp.value) {
      isExpanded.value = true;
    } else {
      isExpanded.value = false;
    }
  });

  return {
    isExpanded,
    openNavbar,
    closeNavbar,
  };
}
