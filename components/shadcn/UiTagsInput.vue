<template>
  <TagsInput v-model="tags">
    <TagsInputItem v-for="item in tags" :key="item" :value="item">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>
    <TagsInputInput :placeholder="placeHolder"/>
  </TagsInput>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeHolder?: string;
  }>(),
  {
    placeHolder: 'Add a tag',
  },
);
const tags = defineModel<string[]>({
  required: false,
  default: () => [],
});

</script>

