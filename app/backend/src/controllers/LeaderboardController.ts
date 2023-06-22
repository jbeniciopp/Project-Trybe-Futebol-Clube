import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getAllMatchesHome(_req: Request, res: Response) {
    const matches = await this.leaderboardService.getAllMatchesHome();

    res.status(200).json(matches.data);
  }

  public async getAllMatchesAway(_req: Request, res: Response) {
    const matches = await this.leaderboardService.getAllMatchesAway();

    res.status(200).json(matches.data);
  }

  public async getAllMatches(_req: Request, res: Response) {
    const matches = await this.leaderboardService.getAllMatches();

    res.status(200).json(matches.data);
  }
}
