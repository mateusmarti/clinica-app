<template>
  <section class="py-4 py-md-5">
    <div class="container">
      <div class="dashboard-hero text-white p-4 p-md-5 rounded-4 shadow mb-4">
        <div class="row align-items-center g-3">
          <div class="col-lg-8">
            <span class="badge rounded-pill text-bg-light mb-3 px-3 py-2">
              Painel Administrativo
            </span>
            <h1 class="display-6 fw-bold mb-2">Consultas da clínica</h1>
            <p class="mb-0">
              Visualize todos os agendamentos cadastrados no sistema.
            </p>
          </div>

          <div class="col-lg-4 text-lg-end">
            <router-link to="/agendar" class="btn btn-light btn-lg rounded-pill px-4">
              Nova consulta
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div class="row g-4 mb-4">
        <div class="col-md-4">
          <div class="stats-card h-100">
            <div class="text-secondary small mb-2">Total de consultas</div>
            <div class="display-6 fw-bold">{{ consultas.length }}</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="stats-card h-100">
            <div class="text-secondary small mb-2">Autenticação</div>
            <div class="fs-4 fw-bold">JWT ativo</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="stats-card h-100">
            <div class="text-secondary small mb-2">Status do painel</div>
            <div class="fs-4 fw-bold">Online</div>
          </div>
        </div>
      </div>

      <div class="card border-0 shadow rounded-4 overflow-hidden">
        <div class="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h2 class="h4 fw-bold mb-1">Lista de consultas</h2>
            <p class="text-secondary mb-0">Atendimentos cadastrados no sistema</p>
          </div>

          <button class="btn btn-outline-primary rounded-pill px-4" @click="fetchConsultas">
            Atualizar
          </button>
        </div>

        <div class="card-body p-0">
          <div v-if="loading" class="text-center p-5">
            <div class="spinner-border text-primary"></div>
            <p class="mt-3 mb-0 text-secondary">Carregando consultas...</p>
          </div>

          <div v-else-if="consultas.length === 0" class="text-center p-5">
            <h3 class="h5 fw-bold">Nenhuma consulta cadastrada</h3>
            <p class="text-secondary mb-3">
              Cadastre uma nova consulta para aparecer aqui.
            </p>
            <router-link to="/agendar" class="btn btn-primary rounded-pill px-4">
              Agendar consulta
            </router-link>
          </div>

          <div v-else class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-4">Paciente</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Descrição</th>
                  <th class="pe-4">E-mail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="consulta in consultas" :key="consulta._id">
                  <td class="ps-4 fw-semibold">
                    {{ consulta.paciente?.nome || 'Paciente' }}
                  </td>
                  <td>{{ consulta.data }}</td>
                  <td>
                    <span class="badge bg-primary-subtle text-primary-emphasis rounded-pill px-3 py-2">
                      {{ consulta.horario }}
                    </span>
                  </td>
                  <td>{{ consulta.descricao || 'Sem descrição' }}</td>
                  <td class="pe-4 text-dark">
                    {{ consulta.paciente?.email || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../services/api'

const consultas = ref([])
const loading = ref(false)
const error = ref('')

const fetchConsultas = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get('/consultas')
    consultas.value = response.data
  } catch (err) {
    error.value =
      err.response?.data?.msg ||
      err.response?.data?.error ||
      'Erro ao listar consultas'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConsultas()
})
</script>