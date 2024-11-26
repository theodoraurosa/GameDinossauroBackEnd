import { ScoreRepository } from '../repositories/scoreRepository';

export class AddScoreUseCase {
  private scoreRepository: ScoreRepository;

  constructor() {
    this.scoreRepository = new ScoreRepository();
  }

  public async execute(playerName: string, score: number) {
    return await this.scoreRepository.save(playerName, score);
  }
}
