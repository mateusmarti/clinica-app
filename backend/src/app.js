import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import consultaRoutes from './routes/consultaRoutes.js'
import cepRoutes from './routes/cepRoutes.js'
import climaRoutes from './routes/climaRoutes.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://clinica-app-roan.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/consultas', consultaRoutes)
app.use('/api/cep', cepRoutes)
app.use('/api/clima', climaRoutes)

app.get('/', (req, res) => {
  res.send('API rodando 🚀')
})

export default app