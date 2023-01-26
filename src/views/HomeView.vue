<template>
  <main>
    <h1>Welcome {{ store.session.userId }}!</h1>
    <h2>Your Languages</h2>
  </main>
</template>

<script setup lang="ts">
import { useAppwrite } from "@/stores/appwrite";
const store = useAppwrite();
</script>
