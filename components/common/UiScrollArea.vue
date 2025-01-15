<template>
  <ScrollArea class="w-full h-full p-4 lg:p-6 relatvie" ref="scrollAreaRef">
    <slot />
    <BackToTop @click="topHandler" :scrollElement="viewport" v-if="viewport"/>
  </ScrollArea>
</template>

<script setup lang="ts">
const scrollAreaRef = ref<any | null>(null);
const viewport = computed(() => scrollAreaRef.value?.$el?.querySelector('[data-radix-scroll-area-viewport]'));

const topHandler = () => {
  if (viewport.value) {
    viewport.value.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  // scrollAreaRef.value?.scrollAreaRef?.scrollTop();
};
</script>
