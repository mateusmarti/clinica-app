import express from 'express';
import { criarConsulta, listarConsultas } from '../controllers/consultaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, criarConsulta);
router.get('/', authMiddleware, listarConsultas);

export default router;