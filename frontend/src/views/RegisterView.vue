<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-6">
        <div class="card shadow border-0">
          <div class="card-body p-4">
            <h1 class="h3 fw-bold mb-4 text-center">Cadastro</h1>

            <div v-if="success" class="alert alert-success">
              {{ success }}
            </div>

            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label">Nome</label>
                <input v-model="form.nome" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input v-model="form.email" type="email" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input v-model="form.senha" type="password" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Tipo</label>
                <select v-model="form.tipo" class="form-select">
                  <option value="paciente">Paciente</option>
                  <option value="secretario">Secretário</option>
                </select>
              </div>

              <button class="btn btn-success w-100" :disabled="loading">
                {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
              </button>
            </form>

            <p class="text-center mt-3 mb-0">
              Já tem conta?
              <router-link to="/login">Entrar</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '../services/api'

const loading = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({
  nome: '',
  email: '',
  senha: '',
  tipo: 'paciente'
})

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await api.post('/auth/register', form)
    success.value = response.data.msg || 'Usuário criado com sucesso'

    form.nome = ''
    form.email = ''
    form.senha = ''
    form.tipo = 'paciente'
  } catch (err) {
    error.value = err.response?.data?.msg || err.response?.data?.error || 'Erro ao cadastrar'
  } finally {
    loading.value = false
  }
}
</script>