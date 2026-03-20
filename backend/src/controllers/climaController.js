import { buscarClima } from '../services/climaService.js';

export const getClima = async (req, res) => {
  try {
    const { cidade } = req.params;

    const dados = await buscarClima(cidade);

    res.json({
      mensagem: 'Previsão obtida com sucesso',
      dados
    });

  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};