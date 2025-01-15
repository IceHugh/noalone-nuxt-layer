<template>
  <div
    v-if="!connected"
    :class="cn(' flex justify-center items-center', buttonClass)"
  >
    <Button
      :ui="{ rounded: 'rounded-full' }"
      variant="secondary"
      @click="setModalVisible(true)"
    >
      Connect
    </Button>
  </div>
  <div class="h-full" v-else>
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
import { useWalletStore } from 'btc-connect-vue';
import { cn } from '~layer/lib/utils';

interface Props {
  buttonClass?: string;
  connected: boolean;
}
withDefaults(defineProps<Props>(), {
  connected: false,
});

const { setModalVisible } = useWalletStore();
</script>
