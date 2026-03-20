import mongoose from 'mongoose';

const consultaSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  data: {
    type: String,
    required: true
  },
  horario: {
    type: String,
    required: true
  },
  descricao: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('Consulta', consultaSchema);