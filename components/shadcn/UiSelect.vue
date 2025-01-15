<script setup lang="ts">
interface Option {
  label: string;
  value: any;
}

const props = withDefaults(
  defineProps<{
    options: Option[];
    placeholder?: string;
  }>(),
  {
    options: () => [],
    placeholder: 'Select',
  },
);

const { options } = toRefs(props);
const selectedValue = defineModel<any>({
  required: false,
});
</script>

<template>
  <Select v-model="selectedValue">
    <SelectTrigger class="w-full">
      <SelectValue :placeholder="selectedValue || props.placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
