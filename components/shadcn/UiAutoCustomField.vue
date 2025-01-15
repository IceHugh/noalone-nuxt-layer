<script setup lang="ts">
import { type FieldProps } from '~layer/components/ui/auto-form/interface';
import { beautifyObjectName } from '~layer/components/ui/auto-form/utils';
import UiSelect from './UiSelect.vue';
import MultiSelect from './MultiSelect.vue';
import UiTagsInput from './UiTagsInput.vue';
const props = defineProps<FieldProps>();
const component = computed(() => {

  switch ((props.config as any)?.componentProps?.component) {
    case 'multiselect':
      return MultiSelect;
    case 'tagsinput':
      return UiTagsInput;
    default:
      return UiSelect;
  }
});


</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <pre v-if="(props.config as any)?.componentProps?.component === 'tagsinput'">
          {{ slotProps }}
        </pre>
        <slot v-bind="slotProps">
          <component :is="component" v-bind="{ ...slotProps.componentField, ...config?.inputProps }"/>
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
