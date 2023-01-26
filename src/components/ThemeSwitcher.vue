<template>
  <button @click="toggleDark()" class="button-as-link">
    {{ isDark ? "Light" : "Dark" }} Theme
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "theme",
  valueDark: "",
  valueLight: "light",
});

const toggleDark = useToggle(isDark);
</script>
