<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '~layer/components/ui/button'
import { cn } from '~layer/lib/utils'
import { HamburgerMenuIcon } from '@radix-icons/vue'
import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <HamburgerMenuIcon />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
