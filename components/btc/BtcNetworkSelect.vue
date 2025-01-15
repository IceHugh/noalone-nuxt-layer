<template>
  <Select v-model="network" class="w-36">
    <SelectTrigger class="rounded-full">
      <SelectValue :placeholder="slected?.label">
        <div class="flex items-center">
          <img
            :src="slected?.avatar.src"
            :alt="slected?.label"
            class="size-4 rounded-full mr-2"
          />
          {{ slected?.label }}
        </div>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          <div class="flex items-center">
            <img
              :src="option.avatar.src"
              :alt="option.label"
              class="size-4 rounded-full mr-2"
            />
            {{ option.label }}
          </div>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { Network } from 'btc-connect-vue'


const network = defineModel<Network>({
  required: false,
  default: Network.LIVENET,
})

const options = [
  {
    label: 'Bitcoin',
    value: Network.LIVENET,
    avatar: {
      src: '/icon/btc/mainnet.svg',
    },
  },
  {
    label: 'Testnet',
    value: Network.TESTNET,
    avatar: {
      src: '/icon/btc/testnet.svg',
    },
  },
  {
    label: 'Testnet4',
    value: Network.TESTNET4,
    avatar: {
      src: '/icon/btc/testnet.svg',
    },
  },
]

const slected = computed(() => options.find((o) => o.value === network.value))
</script>
