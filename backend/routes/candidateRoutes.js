import express from 'express';
import {candidateLogin} from '../controllers/candidateController.js';

const router = express.Router();    

router.post('/login', candidateLogin);

export default router;