import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
    private teamService = new TeamService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (!inProgress) {
      const serviceResponse = await this.matchesService.getAllMatches();
      return res.status(200).json(serviceResponse.data);
    } if (inProgress === 'true') {
      const serviceResponse = await this.matchesService.getInProgressMatches();
      return res.status(200).json(serviceResponse.data);
    } if (inProgress === 'false') {
      const serviceResponse = await this.matchesService.getFineshedMatches();
      return res.status(200).json(serviceResponse.data);
    }
  }

  public async updateMatchFinished(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.updateMatchFinished(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await this.matchesService
      .updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId } = req.body;

    const homeTeam = await this.teamService.getTeamById(homeTeamId);
    const awayTeam = await this.teamService.getTeamById(awayTeamId);

    if (homeTeam.status === 'NOT_FOUND' || awayTeam.status === 'NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const response = await this.matchesService
      .createMatch({ homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId });
    return res.status(201).json(response.data);
  }
}
