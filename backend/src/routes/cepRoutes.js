import express from 'express';
import { getCep } from '../controllers/cepController.js';

const router = express.Router();

router.get('/:cep', getCep);

export default router;