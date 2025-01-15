<template>
  <Button variant="outline" size="icon" @click="toggleTheme">
    <Icon :name="icon" class="w-4 h-4" />
  </Button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const icon = computed(() => {
  return colorMode.value === 'light'
    ? 'i-solar-moon-sleep-line-duotone'
    : 'i-solar-sun-outline';
});
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>
