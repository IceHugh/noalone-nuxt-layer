<template>
  <div class="mx-auto">
    <div
      v-if="isLoading"
      class="flex justify-center items-center h-64 scale-75 transform"
    >
      <Loading />
    </div>
    <!-- <UiErrorNotification v-if="error" :message="error" /> -->
    <Empty
      v-if="isEmpty && !isLoading"
      v-bind="emptyStateProps"
      @action="$emit('emptyAction')"
    />
    <slot v-else-if="!isLoading && !error"></slot>
  </div>
</template>

<script setup lang="ts">
interface ContainerProps {
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyStateProps?: {
    icon: string;
    title: string;
    description: string;
    actionText?: string;
  };
}

const props = defineProps<ContainerProps>();

const emit = defineEmits<{
  (e: 'emptyAction'): void;
}>();
</script>
