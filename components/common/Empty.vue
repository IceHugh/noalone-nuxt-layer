<template>
  <div class="flex flex-col items-center justify-center p-8 text-center">
    <Icon
      :name="icon"
      class="mb-4 text-gray-400 dark:text-gray-500 w-16 h-16 md:w-24 md:h-24"
    />
    <h3
      class="mb-2 text-lg font-semibold text-gray-900 dark:text-white md:text-xl"
    >
      {{ title }}
    </h3>
    <p
      class="mb-6 text-sm text-gray-500 dark:text-gray-400 md:text-base max-w-md"
    >
      {{ description }}
    </p>
    <Button
      v-if="actionText"
      @click="$emit('action')"
      class="font-medium"
    >{{ actionText}}</Button>
  </div>
</template>

<script setup lang="ts">
interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionText?: string;
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  icon: 'i-solar-inbox-linear',
  title: 'No data available',
  description: "There's no data to display at the moment.",
  actionText: undefined,
});

const emit = defineEmits<{
  (e: 'action'): void;
}>();
</script>
