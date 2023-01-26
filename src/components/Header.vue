<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <div class="inline" v-if="store.connected">
        <router-link to="/new-language">New Language</router-link> |
        <router-link to="/followed-lang">Followed Languages</router-link> |
        <router-link to="/learn">Learning</router-link> |
        <div class="inline">
          <button class="button-as-link" @click="store.logout">Logout</button>
        </div>
        |
      </div>
      <ThemeSwitcher />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAppwrite } from "@/stores/appwrite";
import ThemeSwitcher from "./ThemeSwitcher.vue";
const store = useAppwrite();
</script>

<style lang="less" scoped>
@import "@/assets/main.less";

a,
a:visited {
  color: inherit;
  font-size: 1rem;
  font-weight: bold;
}

header {
  padding: 1rem 0;
  .theme(background-color, @nord4, @nord0);
}
</style>
