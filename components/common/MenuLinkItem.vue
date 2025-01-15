<template>
  <NuxtLink
    :to="to"
    v-bind="$attrs"
    class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all  text-base font-bold hover:text-primary"
    :class="{
      'text-primary bg-muted': active,
    }"
  >
    <Icon v-if="icon" :name="icon" class="size-5" />
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  icon?: string;
  active?: boolean;
}>();
</script>
