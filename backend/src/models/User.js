import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['paciente', 'secretario'],
    default: 'paciente'
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);