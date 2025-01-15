<script setup lang="ts">
import { ReloadIcon } from '@radix-icons/vue';

interface Props {
  isLoading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});
</script>

<template>
  <Button v-bind="$attrs" :disabled="isLoading || $attrs.disabled">
    <template v-if="isLoading">
      <ReloadIcon class="size-3 animate-spin" />
    </template>
    <slot />
  </Button>
</template>
