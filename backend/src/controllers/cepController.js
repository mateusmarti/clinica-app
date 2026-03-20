import { buscarCep } from '../services/cepService.js';

export const getCep = async (req, res) => {
  try {
    const { cep } = req.params;

    const dados = await buscarCep(cep);

    res.json({
      cep: dados.cep,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });

  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};