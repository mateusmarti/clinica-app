import Consulta from '../models/Consulta.js'

// Criar consulta
export const criarConsulta = async (req, res) => {
  try {
    const { data, horario, descricao } = req.body

    const existente = await Consulta.findOne({ data, horario })

    if (existente) {
      return res.status(400).json({ msg: 'Horário já ocupado' })
    }

    const consulta = await Consulta.create({
      paciente: req.user.id,
      data,
      horario,
      descricao
    })

    res.status(201).json(consulta)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Listar consultas
export const listarConsultas = async (req, res) => {
  try {
    let consultas

    if (req.user.tipo === 'secretario') {
      consultas = await Consulta.find()
        .populate('paciente', 'nome email tipo')
        .sort({ createdAt: -1 })
    } else {
      consultas = await Consulta.find({ paciente: req.user.id })
        .populate('paciente', 'nome email tipo')
        .sort({ createdAt: -1 })
    }

    res.json(consultas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}