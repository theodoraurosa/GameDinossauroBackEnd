
import express, { Request, Response, NextFunction } from 'express';
import { ScoreController } from './controllers/scoreController'; // Exemplo de importação do controlador


const app = express();
const cors = require('cors');
app.use(express.json()); // Middleware para parsing do corpo da requisição

app.use(cors());

// Instância do controlador para manipular as rotas
const scoreController = new ScoreController();

// Definição de rotas
app.post('/score', (req: Request, res: Response) => {
  scoreController.addScore(req, res);  // Chama o método addScore do controlador
});

app.get('/scores', (req: Request, res: Response) => {
  scoreController.getScores(req, res);  // Chama o método getScores do controlador
});

// Middleware para tratamento de erros (deve ser a última coisa a ser definida)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);  // Exibe o erro no console
  res.status(500).json({ message: 'Internal Server Error', error: err.message || err });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

