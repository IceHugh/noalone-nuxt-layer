<template>
  <Transition name="fade">
    <Alert
      v-if="!accepted"
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-background p-4 shadow-lg"
    >
      <AlertTitle>We use Cookies</AlertTitle>
      <AlertDescription>
        We use cookies to improve your browsing experience and provide
        personalized content.
      </AlertDescription>
      <div class="mt-4 flex justify-end space-x-2">
        <Button @click="acceptCookies" variant="default">Accept</Button>
        <Button @click="declineCookies" variant="outline">Decline</Button>
      </div>
    </Alert>
  </Transition>
</template>

<script setup lang="ts">
const accepted = ref(false);

const acceptCookies = () => {
  accepted.value = true;
  localStorage.setItem('cookiesAccepted', 'true');
};

const declineCookies = () => {
  accepted.value = true;
};

if (typeof window !== 'undefined') {
  accepted.value = localStorage.getItem('cookiesAccepted') === 'true';
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
