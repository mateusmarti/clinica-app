<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow border-0">
          <div class="card-body p-4">
            <h1 class="h3 fw-bold mb-4 text-center">Login</h1>

            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input v-model="form.email" type="email" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input v-model="form.senha" type="password" class="form-control" required />
              </div>

              <button class="btn btn-primary w-100" :disabled="loading">
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </button>
            </form>

            <p class="text-center mt-3 mb-0">
              Não tem conta?
              <router-link to="/register">Cadastre-se</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  senha: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await api.post('/auth/login', form)
    localStorage.setItem('token', response.data.token)

    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.msg || err.response?.data?.error || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}
</script>