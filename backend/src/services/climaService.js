import axios from 'axios'

export const buscarClima = async (cidade) => {
  try {
    // Coordenadas fixas para simplificar o trabalho
    // Pode manter assim para não quebrar o projeto agora
    const latitude = -22.9068
    const longitude = -43.1729

    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        daily: 'weathercode',
        timezone: 'America/Sao_Paulo',
        forecast_days: 7
      }
    })

    if (!response.data || !response.data.daily) {
      throw new Error('Resposta inválida da API de clima')
    }

    return response.data.daily
  } catch (error) {
    console.error('Erro real no climaService:', error.response?.data || error.message)
    throw new Error('Erro ao buscar clima')
  }
}