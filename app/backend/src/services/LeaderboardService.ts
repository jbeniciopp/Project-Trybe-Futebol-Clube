import { ITeam } from '../Interfaces/teams/ITeam';
import sort from '../utils/sortMatches';
import LeaderboardModel from '../models/LeaderboardModel';
import TeamModel from '../models/TeamModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
    private teamModel = new TeamModel(),
  ) { }

  public async getAllMatchesHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await Promise.all(teams.map(async (t: ITeam) => {
      const match = await this.leaderboardModel.getFineshedMatchesHome(t.id);
      return match;
    }));

    sort(matches);

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getAllMatchesAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await Promise.all(teams.map(async (t: ITeam) => {
      const match = await this.leaderboardModel.getFineshedMatchesAway(t.id);
      return match;
    }));

    sort(matches);

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getAllMatches(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await Promise.all(teams.map(async (t: ITeam) => {
      const match = await this.leaderboardModel.getFineshedMatches(t.id);
      return match;
    }));

    sort(matches);

    return { status: 'SUCCESSFUL', data: matches };
  }
}
