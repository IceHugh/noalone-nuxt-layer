<template>
  <FormField v-slot="{ value, setValue }" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <TagsInput :value="value" @update:modelValue="setValue">
          <TagsInputItem v-for="item in value" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput v-bind="config?.inputProps" />
        </TagsInput>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
<script setup lang="ts">
import { type FieldProps } from '~layer/components/ui/auto-form/interface';
import { beautifyObjectName } from '~layer/components/ui/auto-form/utils';
const props = defineProps<FieldProps>();
</script>
