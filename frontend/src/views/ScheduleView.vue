<template>
  <section class="py-4 py-md-5">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-7">
          <div class="card border-0 shadow rounded-4">
            <div class="card-body p-4 p-md-5">
              <div class="mb-4">
                <h1 class="h3 fw-bold mb-2">Agendar consulta</h1>
                <p class="text-secondary mb-0">
                  Informe data, horário, CEP e descrição do atendimento.
                </p>
              </div>

              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div v-if="error" class="alert alert-danger">
                {{ error }}
              </div>

              <form @submit.prevent="handleSchedule">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Data</label>
                    <input
                      v-model="form.data"
                      type="date"
                      class="form-control form-control-lg"
                      required
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Horário</label>
                    <input
                      v-model="form.horario"
                      type="time"
                      class="form-control form-control-lg"
                      required
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label fw-semibold">CEP</label>
                    <div class="input-group input-group-lg">
                      <input
                        v-model="form.cep"
                        type="text"
                        class="form-control"
                        placeholder="Digite o CEP"
                        maxlength="9"
                      />
                      <button type="button" class="btn btn-outline-primary" @click="buscarEndereco">
                        Buscar CEP
                      </button>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Rua</label>
                    <input
                      v-model="form.rua"
                      type="text"
                      class="form-control form-control-lg"
                      readonly
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Bairro</label>
                    <input
                      v-model="form.bairro"
                      type="text"
                      class="form-control form-control-lg"
                      readonly
                    />
                  </div>

                  <div class="col-md-8">
                    <label class="form-label fw-semibold">Cidade</label>
                    <input
                      v-model="form.cidade"
                      type="text"
                      class="form-control form-control-lg"
                      readonly
                    />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label fw-semibold">Estado</label>
                    <input
                      v-model="form.estado"
                      type="text"
                      class="form-control form-control-lg"
                      readonly
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label fw-semibold">Descrição</label>
                    <textarea
                      v-model="form.descricao"
                      class="form-control"
                      rows="4"
                      placeholder="Descreva o motivo da consulta"
                    ></textarea>
                  </div>

                  <div class="col-12 d-grid mt-2">
                    <button class="btn btn-primary btn-lg" :disabled="loading">
                      {{ loading ? 'Salvando...' : 'Confirmar agendamento' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="card border-0 shadow rounded-4 mb-4">
            <div class="card-body p-4">
              <h2 class="h5 fw-bold mb-3">Resumo do endereço</h2>

              <ul class="list-group list-group-flush">
                <li class="list-group-item px-0 d-flex justify-content-between">
                  <span class="text-secondary">CEP</span>
                  <strong>{{ form.cep || '-' }}</strong>
                </li>
                <li class="list-group-item px-0 d-flex justify-content-between">
                  <span class="text-secondary">Rua</span>
                  <strong>{{ form.rua || '-' }}</strong>
                </li>
                <li class="list-group-item px-0 d-flex justify-content-between">
                  <span class="text-secondary">Cidade</span>
                  <strong>{{ form.cidade || '-' }}</strong>
                </li>
                <li class="list-group-item px-0 d-flex justify-content-between">
                  <span class="text-secondary">Estado</span>
                  <strong>{{ form.estado || '-' }}</strong>
                </li>
              </ul>
            </div>
          </div>

          <div class="card border-0 shadow rounded-4 clima-box">
            <div class="card-body p-4">
              <h2 class="h5 fw-bold mb-3">Previsão do tempo</h2>

              <div v-if="climaMensagem" class="alert alert-info mb-0">
                {{ climaMensagem }}
              </div>

              <p v-else class="text-secondary mb-0">
                A previsão será exibida após a busca do CEP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '../services/api'

const loading = ref(false)
const error = ref('')
const success = ref('')
const climaMensagem = ref('')

const form = reactive({
  data: '',
  horario: '',
  cep: '',
  rua: '',
  bairro: '',
  cidade: '',
  estado: '',
  descricao: ''
})

const buscarEndereco = async () => {
  error.value = ''

  try {
    const cepLimpo = form.cep.replace(/\D/g, '')
    const response = await api.get(`/cep/${cepLimpo}`)

    form.rua = response.data.rua
    form.bairro = response.data.bairro
    form.cidade = response.data.cidade
    form.estado = response.data.estado

    await buscarClima()
  } catch (err) {
    error.value =
      err.response?.data?.msg ||
      err.response?.data?.error ||
      'Erro ao buscar CEP'
  }
}

const buscarClima = async () => {
  try {
    if (!form.cidade) return

    const response = await api.get(`/clima/${form.cidade}`)
    const dados = response.data?.dados

    if (dados?.weathercode?.length) {
      climaMensagem.value =
        'Previsão carregada com sucesso. Verifique a possibilidade de chuva no dia da consulta.'
    } else {
      climaMensagem.value = 'Não foi possível interpretar a previsão do clima.'
    }
  } catch (err) {
    climaMensagem.value = 'Não foi possível obter a previsão do tempo.'
  }
}

const handleSchedule = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const payload = {
      data: form.data,
      horario: form.horario,
      descricao: `${form.descricao} | Endereço: ${form.rua}, ${form.bairro}, ${form.cidade}-${form.estado}`
    }

    await api.post('/consultas', payload)

    success.value = 'Consulta agendada com sucesso'

    form.data = ''
    form.horario = ''
    form.cep = ''
    form.rua = ''
    form.bairro = ''
    form.cidade = ''
    form.estado = ''
    form.descricao = ''
    climaMensagem.value = ''
  } catch (err) {
    error.value =
      err.response?.data?.msg ||
      err.response?.data?.error ||
      'Erro ao agendar consulta'
  } finally {
    loading.value = false
  }
}
</script>