<template>
  <div>
    <Button
      @click="isModalOpen = true"
      :disabled="loading"
      variant="outline"
      class="rounded-full"
    >
      {{ displayedRate }} sat/vB
    </Button>

    <Dialog v-model:open="isModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>选择费率 / Select Fee Rate</DialogTitle>
        </DialogHeader>
        <div class="grid grid-cols-4 gap-2">
          <Button
            v-for="option in options"
            :key="option.key"
            @click="selectRate(option.key)"
            :variant="selectedRate === option.key ? 'default' : 'outline'"
            class="h-auto flex flex-col items-center justify-center p-2 text-xs"
          >
            <span class="text-lg mb-1">{{ option.icon }}</span>
            <span>{{ option.label }}</span>
            <span class="text-[10px]">{{ option.value }} sat/vB</span>
          </Button>
        </div>
        <div v-if="selectedRate === 'custom'" class="mt-4 space-y-2">
          <Label for="customRate" class="text-sm font-medium">
            自定义费率 / Custom Fee Rate (sat/vB)
          </Label>
          <div class="flex items-center gap-2">
            <Input
              id="customRate"
              v-model="customRate"
              type="number"
              class="w-24"
              :min="1"
              :max="1000"
              placeholder="Enter rate"
            />
            <Slider v-model="customRate" :min="1" :max="1000" class="flex-1" />
          </div>
        </div>
        <DialogFooter>
          <Button @click="isModalOpen = false" class="w-full">
            确认 / Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRefs } from 'vue';
import { watchOnce } from '@vueuse/core';
import { getBtcFee } from '~layer/apis';
import { Network } from 'btc-connect-vue';
import { useQuery } from '@tanstack/vue-query';

interface FeeSelectProps {
  network?: Network;
}

const props = withDefaults(defineProps<FeeSelectProps>(), {
  network: Network.LIVENET,
});
const { network } = toRefs(props);
const emit = defineEmits(['change']);

const {
  data,
  isFetching: loading,
  suspense,
} = useQuery({
  queryKey: ['btcFee', network],
  queryFn: () => getBtcFee(network.value),

});
console.log(data.value);

onServerPrefetch(async () => {
  console.log('onServerPrefetch');
  await suspense();
});

const options = computed(() => [
  {
    icon: '🐢',
    key: 'slow',
    value: data.value?.hourFee || 0,
    label: 'Slow',
  },
  {
    icon: '🚗',
    key: 'average',
    value: data.value?.halfHourFee || 0,
    label: 'Average',
  },
  {
    icon: '🚀',
    key: 'fast',
    value: data.value?.fastestFee || 0,
    label: 'Fast',
  },
  {
    icon: '⚙️',
    key: 'custom',
    value: data.value?.fastestFee || 0,
    label: 'Custom',
  },
]);

const selectedRate = ref('average');
const customRate = ref(
  options.value.find((option) => option.key === 'fast')!.value,
);
const isModalOpen = ref(false);

watchOnce(options, () => {
  customRate.value = options.value.find(
    (option) => option.key === 'fast',
  )!.value;
});

const selectRate = (k: string) => {
  selectedRate.value = k;
  if (k !== 'custom') {
    customRate.value = options.value.find((option) => option.key === k)!.value;
    isModalOpen.value = false;
  }
};

const displayedRate = computed(() =>
  selectedRate.value === 'custom'
    ? customRate.value
    : options.value.find((option) => option.key === selectedRate.value)!.value,
);

watch(
  displayedRate,
  (value) => {
    emit('change', value);
  },
  { immediate: true },
);
</script>
