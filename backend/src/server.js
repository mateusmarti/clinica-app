import app from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error.message)
    process.exit(1)
  }
}

startServer()