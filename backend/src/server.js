import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = 3000;

// 👇 ISSO AQUI É O QUE FALTAVA
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
import consultaRoutes from './routes/consultaRoutes.js';

app.use('/api/consultas', consultaRoutes);
import cepRoutes from './routes/cepRoutes.js';

app.use('/api/cep', cepRoutes);
import climaRoutes from './routes/climaRoutes.js';

app.use('/api/clima', climaRoutes);