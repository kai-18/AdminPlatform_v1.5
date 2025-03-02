<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-md" style="width: 350px; border-radius: 10px; background-color: #fafafa;">
          <q-card-section>
            <div class="text-h5">Login</div>
          </q-card-section>
          <q-card-section>
            <q-input style="border: 1px solid #4a4a4a; border-radius: 10px;" v-model="username" label="Username" filled /> <br>
            <q-input style="border: 1px solid #4a4a4a; border-radius: 10px;" v-model="password" label="Password" type="password" filled />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Login" color="primary" @click="login" />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useQuasar } from "quasar";
import axios from "axios";
import { Notify } from 'quasar'

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
    const response = await axios.post("http://192.168.1.101:8080/api/login", {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);
    router.push("/dashboard");

    if(username.value === "" || password.value === "") {
      Notify.create({
        type: 'negative',
        message: 'Please fill in all fields'
      })
      return;
    }
  };
</script>

<style scoped>
body {
  background-color: #4a5888;
}
</style>
