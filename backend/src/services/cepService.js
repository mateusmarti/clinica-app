import axios from 'axios';

export const buscarCep = async (cep) => {
  try {
    const cepLimpo = cep.replace(/\D/g, '');

    const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return response.data;

  } catch (error) {
    throw new Error('Erro ao buscar CEP');
  }
};