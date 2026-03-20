<template>
  <nav class="navbar navbar-expand-lg navbar-dark app-navbar shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/dashboard">
        Clínica Med
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="menu">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li class="nav-item" v-if="isLogged">
            <router-link class="nav-link text-white" to="/dashboard">Painel</router-link>
          </li>

          <li class="nav-item" v-if="isLogged">
            <router-link class="nav-link text-white" to="/agendar">Agendar</router-link>
          </li>

          <li class="nav-item" v-if="!isLogged">
            <router-link class="nav-link text-white" to="/login">Login</router-link>
          </li>

          <li class="nav-item" v-if="!isLogged">
            <router-link class="nav-link text-white" to="/register">Cadastro</router-link>
          </li>

          <li class="nav-item" v-if="isLogged">
            <button class="btn btn-outline-light ms-lg-2" @click="logout">
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLogged = ref(!!localStorage.getItem('token'))

watch(
  () => route.fullPath,
  () => {
    isLogged.value = !!localStorage.getItem('token')
  },
  { immediate: true }
)

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLogged.value = false
  router.push('/login')
}
</script>