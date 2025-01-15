<template>
  <Transition name="fade">
    <Button
      v-if="showButton"
      @click="clickHandler"
      class="absolute bottom-6 right-6 rounded-full p-2 backdrop-blur-sm"
      size="icon"
      variant="outline"
      aria-label="Back to top"
      ref="buttonRef"
    >
      <ChevronUp class="h-4 w-4" />
    </Button>
  </Transition>
</template>

<script setup lang="ts">
import { ChevronUp } from 'lucide-vue-next';

const props = defineProps<{ scrollElement: HTMLElement | null }>();

const showButton = ref(false);
const scrollThreshold = 300;
const emit = defineEmits(['click']);
const buttonRef = ref<HTMLElement | null>(null);

const checkScroll = () => {
  if (props.scrollElement) {
    showButton.value = props.scrollElement.scrollTop > scrollThreshold;
  }
};

const clickHandler = () => {
  emit('click');
};

onMounted(() => {
  props.scrollElement?.addEventListener('scroll', () => checkScroll());
});

onUnmounted(() => {
  props.scrollElement?.removeEventListener('scroll', () => checkScroll());
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
