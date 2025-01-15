<script setup lang="ts">
import { cn } from '~layer/lib/utils';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import ScrollBar from './ScrollBar.vue';

const props = defineProps<
  ScrollAreaRootProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
const scrollAreaRef = ref<InstanceType<typeof ScrollAreaRoot> | null>(null);

defineExpose({
  scrollAreaRef,
});
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
    ref="scrollAreaRef"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
