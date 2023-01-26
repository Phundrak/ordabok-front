<template>
  <form
    method="post"
    accept="utf-8"
    @submit.prevent="login"
    class="card flex-col"
  >
    <h2>User Authentification</h2>
    <Transition name="fade-grow">
      <p class="error rounded" v-if="error">
        {{ error }}
      </p>
    </Transition>
    <div class="container flex-col">
      <div class="form-input">
        <input
          name="uname"
          type="email"
          v-model="email"
          placeholder="Email"
          class="input-text"
          required
        />
        <label for="uname">Email</label>
      </div>
      <div class="form-input">
        <input
          name="psw"
          type="password"
          placeholder="Password"
          v-model="password"
          class="input-text"
          required
        />
        <label for="psw">Password</label>
      </div>
      <button type="submit" class="top-bottom-margin-1rem">
        <Loader v-if="loading" />
        <p v-else>Login</p>
      </button>
      <router-link to="/register">
        <button class="top-bottom-margin-1rem">
          <p>Register</p>
        </button>
      </router-link>
    </div>
    <div
      class="container flex-row flex-stretch top-bottom-margin-1rem gap-1rem"
    >
      <button class="flex-v-centered" type="button">Forgot password?</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAppwrite } from "@/stores/appwrite";
import { useRouter } from "vue-router";

import Loader from "@/components/Loader.vue";

const router = useRouter();
const error = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const store = useAppwrite();
const login = async () => {
  store.login(email.value, password.value).then((loggedIn: boolean) => {
    if (loggedIn) {
      router.push({ path: "/" });
    }
  });
};
</script>

<style lang="less" scoped="">
@import "@/assets/main.less";
@import "node_modules/nord/src/lesscss/nord";

label,
h2,
.error {
  .form-side-margin();
  .default-font();
}

h2 {
  text-align: center;
  font-size: 2em;
}

button {
  .rounded();
  .breathe();
  .theme(background-color, @nord4, @nord3);
  .theme(color, @nord3, @nord5);
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }

  p {
    margin: 0;
    padding: 0;
  }
}

.cancelbtn {
  .breathe();
  background-color: @nord11 !important;
  color: @nord6 !important;
}

.container {
  padding: 1.3rem;
  .rounded();
}

.error {
  padding: 1rem;
  background-color: @nord11;
}

@hide-label-names: "uname", "psw";
.hide-label-no-placeholder(@hide-label-names);
</style>
