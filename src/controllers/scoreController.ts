import { Request, Response } from 'express';
import { AddScoreUseCase } from '../services/addScoreUseCase';
import { GetTopScoresUseCase } from '../services/getTopScoresUseCase';

export class ScoreController {
  private addScoreUseCase: AddScoreUseCase;
  private getTopScoresUseCase: GetTopScoresUseCase;

  constructor() {
    this.addScoreUseCase = new AddScoreUseCase();
    this.getTopScoresUseCase = new GetTopScoresUseCase();
  }

  public async addScore(req: Request, res: Response): Promise<void> {
    try {
      const { playerName, score } = req.body;
      if (!playerName || !score) {
        res.status(400).json({ message: 'Player name and score are required' });
        return;
      }

      const newScore = await this.addScoreUseCase.execute(playerName, score);
      res.status(201).json(newScore);
    } catch (error) {
      res.status(500).json({ message: 'Error saving score', error });
    }
  }

  public async getScores(req: Request, res: Response): Promise<void> {
    try {
      const scores = await this.getTopScoresUseCase.execute();
      res.status(200).json(scores);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving scores', error });
    }
  }
}