import axios from 'axios';

export const buscarClima = async (cidade) => {
  try {
    // coordenadas simples (exemplo SP)
    const lat = -23.55;
    const lon = -46.63;

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode&timezone=America/Sao_Paulo`
    );

    return response.data.daily;

  } catch (error) {
    throw new Error('Erro ao buscar clima');
  }
};