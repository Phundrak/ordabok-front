<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition name="fade-page">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>
