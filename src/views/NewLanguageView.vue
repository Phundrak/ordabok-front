<template>
  <form
    method="post"
    accept="utf-8"
    @submit.prevent="submit"
    class="card flex-col"
  >
    <h2>New Language</h2>
    <Transition name="fade-grow">
      <p class="error rounded" v-if="error">
        {{ error }}
      </p>
    </Transition>
    <div class="container flex-col">
      <div class="form-input">
        <input
          class="input-text"
          name="name"
          type="text"
          placeholder="Name"
          v-model="name"
          required
        />
        <label for="name">Name</label>
      </div>
      <div class="form-input">
        <input
          class="input-text"
          name="native"
          type="text"
          placeholder="Native Name"
          v-model="native"
          required
        />
        <label for="native">Native Name</label>
      </div>
      <div class="form-input">
        <select name="release" v-model="release">
          <option value="public">Public</option>
          <option value="noncommercial">Non Commercial</option>
          <option value="Research">Research</option>
          <option value="Private">Private</option>
        </select>
        <label for="release">Release</label>
      </div>
      <div class="form-input">
        <div class="flex-row">
          <input
            name="genreOrt"
            v-model="genreOrt"
            type="checkbox"
            value="ort"
          />
          <label for="genreOrt">Orthography</label>
        </div>
        <div class="flex-row">
          <input
            name="genreHis"
            v-model="genreHis"
            type="checkbox"
            value="his"
          />
          <label for="genreHis">Historical</label>
        </div>
        <div class="flex-row">
          <input
            name="genreSpe"
            v-model="genreSpe"
            type="checkbox"
            value="spe"
          />
          <label for="genreSpe">Specialized</label>
        </div>
        <div class="flex-row">
          <input
            name="genreTrm"
            v-model="genreTrm"
            type="checkbox"
            value="trm"
          />
          <label for="genreTrm">Terminology</label>
        </div>
        <div class="flex-row">
          <input
            name="genreEty"
            v-model="genreEty"
            type="checkbox"
            value="ety"
          />
          <label for="genreEty">Etymology</label>
        </div>
        <div class="flex-row">
          <input
            name="genreLrn"
            v-model="genreLrn"
            type="checkbox"
            value="lrn"
          />
          <label for="genreLrn">Learning</label>
        </div>
        <div class="flex-row">
          <input
            name="genreGen"
            v-model="genreGen"
            type="checkbox"
            value="gen"
          />
          <label for="genreGen">General</label>
        </div>
        <h4>Genre</h4>
      </div>
      <div class="form-input">
        <input
          class="input-text"
          name="abstract"
          type="text"
          placeholder="Abstract"
          v-model="abstract"
          required
        />
        <label for="abstract">Abstract</label>
      </div>
      <div class="form-input">
        <textarea
          cols="30"
          id="description"
          name="description"
          rows="10"
          v-model="description"
        >
        </textarea>
        <label for="description">Description</label>
      </div>
      <div class="form-input">
        <textarea
          cols="30"
          id="rights"
          name="rights"
          rows="10"
          v-model="rights"
        >
        </textarea>
        <label for="rights">Rights</label>
      </div>
      <div class="form-input">
        <textarea
          cols="30"
          id="license"
          name="license"
          rows="10"
          v-model="license"
        >
        </textarea>
        <label for="license">License</label>
      </div>
    </div>
    <button type="submit" class="top-bottom-margin-1rem form-button">
      <Loader v-if="loading" />
      <p v-else>Login</p>
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAppwrite } from "@/stores/appwrite";

import Loader from "@/components/Loader.vue";

const error = ref("");
const loading = ref(false);
const store = useAppwrite();

const name = ref("");
const native = ref("");
const release = ref("");

const genreGen = ref(false);
const genreLrn = ref(false);
const genreEty = ref(false);
const genreSpe = ref(false);
const genreHis = ref(false);
const genreOrt = ref(false);
const genreTrm = ref(false);

const abstract = ref("");
const description = ref("");
const rights = ref("");
const license = ref("");

const response = ref({} as any);

const submit = () => {
  const query = `mutation NewLanguage($language: NewLanguage) {
  newLanguage(language: $language) {
    name
  }
}`;
  const language = {
    name: name.value,
    native: native.value,
    release: release.value,
    genre: [
      genreGen.value ? "GENERAL" : "",
      genreLrn.value ? "LEARNING" : "",
      genreEty.value ? "ETYMOLOGY" : "",
      genreSpe.value ? "SPECIALIZED" : "",
      genreHis.value ? "HISTORICAL" : "",
      genreOrt.value ? "ORTHOGRAPHY" : "",
      genreTrm.value ? "TERMINOLOGY" : "",
    ].filter((val) => val != ""),
    abstract: abstract.value,
    description: description.value,
    rights: rights.value,
    license: license.value,
  };
  const fetchBody = JSON.stringify({
    query,
    variables: { language },
  });
  console.debug(fetchBody);
  fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${store.session.userId};${store.session.$id}`,
    },
    body: fetchBody,
  })
    .then((r) => r.json())
    .then((data) => (response.value = data));
};
</script>
