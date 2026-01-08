import { ref } from "vue";

export function useTransition() {
  const istransitioning = ref<boolean>(false);

  function startTransition() {
    istransitioning.value = true;
  }

  function stopTransition() {
    istransitioning.value = false;
  }

  return {
    istransitioning,
    startTransition,
    stopTransition,
  };
}
