<template>
  <button
    :class="
      cn(
        'bg-btc py-2 px-6 text-black border-black rounded-xl text-lg',
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { cn } from '~layer/lib/utils';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<style scoped>
/* From Uiverse.io by adamgiebl */
button {
  font-family: inherit;
  font-weight: 900;
  border: 3px solid black;
  box-shadow: 0.1em 0.1em;
  cursor: pointer;
}

button:hover {
  transform: translate(-0.05em, -0.05em);
  box-shadow: 0.15em 0.15em;
}

button:active {
  transform: translate(0.05em, 0.05em);
  box-shadow: 0.05em 0.05em;
}
</style>
