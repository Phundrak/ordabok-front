<template>
  <form
    method="post"
    accept="utf-8"
    @submit.prevent="submit"
    class="card flex-col"
  >
    <h2>User Registration</h2>
    <div class="container flex-col">
      <Transition name="fade-grow">
        <p class="error rounded" v-if="error">
          {{ error }}
        </p>
      </Transition>
      <div class="form-input">
        <input
          name="displayName"
          type="text"
          placeholder="Display Name"
          v-model="name"
          class="input-text"
          required
        />
        <label for="displayName">Display Name</label>
      </div>
      <div class="form-input">
        <Transition name="fade-grow">
          <p class="error rounded" v-if="usernameError">
            {{ usernameError }}
          </p>
        </Transition>
        <input
          name="username"
          type="text"
          placeholder="Username"
          v-model="username"
          class="input-text"
          required
        />
        <label for="username">Username</label>
      </div>
      <div class="form-input">
        <input
          name="email"
          type="email"
          placeholder="Email"
          v-model="email"
          class="input-text"
          required
        />
        <label for="email">Email</label>
      </div>
      <div class="form-input">
        <Transition name="fade-grow">
          <p class="error rounded" v-if="passwordError">
            {{ passwordError }}
          </p>
        </Transition>
        <input
          name="password"
          type="password"
          placeholder="Password"
          v-model="password"
          class="input-text"
          required
        />
        <label for="password">Password</label>
      </div>
      <div class="form-input">
        <Transition name="fade-grow">
          <p class="error rounded" v-if="passwordRepeatError">
            {{ passwordRepeatError }}
          </p>
        </Transition>
        <input
          name="passwordRepeat"
          type="password"
          placeholder="Repeat Password"
          v-model="passwordRepeat"
          class="input-text"
          required
        />
        <label for="passwordRepeat">Repeat Password</label>
      </div>
      <button type="submit" class="top-bottom-margin-1rem">
        <Loader v-if="loading" />
        <p v-else>Register</p>
      </button>
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

const usernameError = ref("");
const passwordError = ref("");
const passwordRepeatError = ref("");
const error = ref("");

const router = useRouter();

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const passwordRepeat = ref("");
const loading = ref(false);
const store = useAppwrite();

const usernameValidation = new RegExp("^[a-zA-Z0-9]+$");
const passwordValidation = new RegExp("^[!@#$%^&\*a-zA-Z0-9]+$");

const submit = async () => {
  if (!validateForm()) {
    return false;
  }
  loading.value = true;
  store
    .register(username.value, email.value, password.value, name.value)
    .then((loggedIn: boolean) => {
      loading.value = true;
      if (loggedIn) {
        router.push({ path: "/" });
      }
    });
};

const validateForm = () => {
  usernameError.value = usernameValidation.test(username.value)
    ? ""
    : "Invalid username, must only contain alphanumerical characters";
  if (password.value.length < 8) {
    passwordError.value = "Password must contain at least eight characters";
  } else if (!passwordValidation.test(password.value)) {
    passwordError.value =
      "Characters in password must be alphanumerical or !@#$%^&*";
  } else {
    passwordError.value = "";
  }
  passwordRepeatError.value =
    password.value != passwordRepeat.value ? "Passwords don't match" : "";
  return (
    usernameError.value == "" &&
    passwordError.value == "" &&
    passwordRepeatError.value == ""
  );
};
</script>

<style lang="less">
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

@hide-label-names: "displayName", "username", "email", "psw", "psw2";
.hide-label-no-placeholder(@hide-label-names);
</style>
