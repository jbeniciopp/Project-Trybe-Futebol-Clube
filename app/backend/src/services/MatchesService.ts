import MatchesModel from '../models/MatchesModel';
import { IMatches, IMatchesUpdate, newMatch } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getInProgressMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.getInProgressMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getFineshedMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.getFineshedMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateMatchFinished(id: number): Promise<ServiceResponse<IMatchesUpdate>> {
    const updated = await this.matchesModel.updateMatchFinished(id);

    if (updated === false) {
      const error = { message: 'Id not found' };
      return { status: 'NOT_FOUND', data: error };
    }

    const finished = { message: 'Finished' };

    return { status: 'SUCCESSFUL', data: finished };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatchesUpdate>> {
    const updated = await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    if (updated === false) {
      const error = { message: 'Id not found' };
      return { status: 'NOT_FOUND', data: error };
    }
    const finished = { message: 'Updated' };

    return { status: 'SUCCESSFUL', data: finished };
  }

  public async createMatch(match: newMatch): Promise<ServiceResponse<IMatches | null>> {
    const created = await this.matchesModel.createMatch(match);

    if (created === null) {
      const error = { message: 'Internal error' };
      return { status: 'ERROR', data: error };
    }

    return { status: 'SUCCESSFUL', data: created };
  }
}
