<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Separator } from '~layer/components/ui/separator'
import { cn } from '~layer/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Separator
    data-sidebar="separator"
    :class="cn('mx-2 w-auto bg-sidebar-border', props.class)"
  >
    <slot />
  </Separator>
</template>
