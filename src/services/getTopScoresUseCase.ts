
import { ScoreRepository } from '../repositories/scoreRepository';

export class GetTopScoresUseCase {
  private scoreRepository: ScoreRepository;

  constructor() {
    this.scoreRepository = new ScoreRepository();
  }

  public async execute() {
    return await this.scoreRepository.getTopScores();
  }
}