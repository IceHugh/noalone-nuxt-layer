<template>
  <Button variant="ghost" size="icon" @click="copyHandler">
    <Icon name="i-solar-copy-linear" v-if="copied" class="h-4 w-4" />
    <Icon name="i-solar-check-read-linear" v-else class="h-4 w-4" />
  </Button>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

interface Props {
  text: string;
}

const props = defineProps<Props>();

const { copy, copied, isSupported } = useClipboard();

const copyHandler = () => {
  if (isSupported && props.text) {
    copy(props.text);
  }
};
</script>
