<template>
  <WalletConnect :config="config" :message="message" :theme="theme">
    <Popover>
      <PopoverTrigger asChild>
        <div class="inline-flex rounded-full overflow-hidden">
          <Button variant="default" size="xs" class="rounded-r-none">
            {{ showBalance }}
            <Icon name="cryptocurrency-color-btc" class="size-4" />
          </Button>
          <Button  size="xs" variant="secondary" class="rounded-l-none">
            {{ showAddress }}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent class="w-48 p-2">
        <Button size="xs" variant="destructive" class="w-full" @click="disconnect">
          Disconnect
        </Button>
      </PopoverContent>
    </Popover>
  </WalletConnect>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, toRefs, watch } from 'vue'
import { WalletConnect, useWalletStore } from 'btc-connect-vue'
import { Network } from 'btc-connect-vue'
import { satsToBtc } from '~layer/utils/web3/btc'

interface Props {
  theme: 'light' | 'dark'
  checkStatus?: boolean
  networkForce?: boolean
  message?: string
  network?: Network
}

const props = withDefaults(defineProps<Props>(), {
  network: Network.LIVENET,
})

const { network, message, networkForce } = toRefs(props)
const { check, btcWallet, connected, balance, address, disconnect } = useWalletStore()

const config = computed(() => ({
  networkForce: networkForce.value,
  defaultNetwork: network.value as any,
  message: message.value,
}))

const showBalance = computed(() =>
  (balance.value?.total ? satsToBtc(balance.value.total) : 0).toString()
)

const showAddress = computed(() => address.value?.slice(-4))

const accountAndNetworkChange = () => {
  // disconnect()
}

onMounted(() => {
  if (props.checkStatus) {
    check()
  }
})

watch(connected, (b) => {
  if (b && btcWallet.value) {
    btcWallet.value.on('accountsChanged', accountAndNetworkChange)
    btcWallet.value.on('networkChanged', accountAndNetworkChange)
  }
})

onUnmounted(() => {
  if (connected.value && btcWallet.value) {
    btcWallet.value.removeListener('accountsChanged', accountAndNetworkChange)
    btcWallet.value.removeListener('networkChanged', accountAndNetworkChange)
  }
})
</script>
