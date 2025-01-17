<template>
  <div
    class="w-full h-full p-4 lg:p-6 relatvie overflow-y-auto"
    ref="scrollAreaRef"
  >
    <slot />
    <ClientOnly>
      <BackToTop
        @click="topHandler"
        :scrollElement="scrollAreaRef"
        v-if="scrollAreaRef"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const scrollAreaRef = ref<any | null>(null);
const topHandler = () => {
  if (scrollAreaRef.value) {
    scrollAreaRef.value.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};
</script>
