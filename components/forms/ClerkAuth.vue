<template>
  <div class="h-10 w-full flex justify-between items-center">
    <SignedOut>
      <SignInButton mode="modal">
        <Button class="w-full" variant="secondary" >
          Sign In
        </Button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <div class="px-6 w-full justify-between items-center flex">
        <UserButton />
        <span>{{ user?.fullName }}</span>
      </div>
    </SignedIn>
  </div>
</template>

<script setup lang="ts">
const { user } = useUser();
</script>

