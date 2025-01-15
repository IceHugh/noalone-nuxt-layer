<template>
  <div class="error-page">
    <Error404 v-if="statusCode == 404" />
    <!-- <h1 v-if="statusCode === 404">Page Not Found</h1>
    <h1 v-else>Something Went Wrong</h1>
    <p v-if="statusCode === 404">The page you're looking for doesn't exist.</p>
    <NuxtLink to="/">Go back to homepage</NuxtLink> -->
  </div>
</template>

<script setup>
const statusCode = useNuxtApp().payload.error?.statusCode || 500;
console.log(useNuxtApp().payload.error);

</script>

<style>
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
.error-page h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.error-page p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
</style>
