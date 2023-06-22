import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import leaderboardOBJ from '../utils/leaderboardOBJ';
import { mapMatchesHome, mapMatchesAway } from '../utils/mapMatches';

export default class LeaderboardModel {
  private matchesModel = SequelizeMatches;
  private teamModel = SequelizeTeam;
  private matchesHome = mapMatchesHome;
  private matchesAway = mapMatchesAway;

  async getFineshedMatchesHome(id: number): Promise<ILeaderboard> {
    const matchesHome = await this.matchesModel
      .findAll({ where: { inProgress: 0, homeTeamId: id } });
    const team = await this.teamModel.findByPk(id) as unknown as ITeam;
    const { countDraws, countVictories, countGoalsFavor, countGoalsOwn } = this
      .matchesHome(matchesHome);
    const totalPoints = countVictories * 3 + countDraws;
    return {
      name: team.teamName,
      totalPoints,
      totalGames: matchesHome.length,
      totalVictories: countVictories,
      totalDraws: countDraws,
      totalLosses: matchesHome.length - countVictories - countDraws,
      goalsFavor: countGoalsFavor,
      goalsOwn: countGoalsOwn,
      goalsBalance: countGoalsFavor - countGoalsOwn,
      efficiency: Number((100 * (totalPoints / (matchesHome.length * 3))).toFixed(2)),
    };
  }

  async getFineshedMatchesAway(id: number): Promise<ILeaderboard> {
    const matchesAway = await this.matchesModel
      .findAll({ where: { inProgress: 0, awayTeamId: id } });
    const team = await this.teamModel.findByPk(id) as unknown as ITeam;
    const { countDraws, countVictories, countGoalsFavor, countGoalsOwn } = this
      .matchesAway(matchesAway);
    const totalPoints = countVictories * 3 + countDraws;
    return {
      name: team.teamName,
      totalPoints,
      totalGames: matchesAway.length,
      totalVictories: countVictories,
      totalDraws: countDraws,
      totalLosses: matchesAway.length - countVictories - countDraws,
      goalsFavor: countGoalsFavor,
      goalsOwn: countGoalsOwn,
      goalsBalance: countGoalsFavor - countGoalsOwn,
      efficiency: Number((100 * (totalPoints / (matchesAway.length * 3))).toFixed(2)),
    };
  }

  async getFineshedMatches(id: number): Promise<ILeaderboard> {
    const matchesAway = await this.matchesModel
      .findAll({ where: { inProgress: 0, awayTeamId: id } });
    const matchesHome = await this.matchesModel
      .findAll({ where: { inProgress: 0, homeTeamId: id } });

    const team = await this.teamModel.findByPk(id) as unknown as ITeam;
    const totalGames = matchesHome.length + matchesAway.length;
    const mapAway = this.matchesAway(matchesAway);
    const mapHome = this.matchesHome(matchesHome);

    const points = (mapAway.countVictories + mapHome.countVictories) * 3
        + mapAway.countDraws + mapHome.countDraws;
    const victories = mapAway.countVictories + mapHome.countVictories;
    const draws = mapAway.countDraws + mapHome.countDraws;
    const gf = mapAway.countGoalsFavor + mapHome.countGoalsFavor;
    const go = mapAway.countGoalsOwn + mapHome.countGoalsOwn;

    return leaderboardOBJ({ points, victories, draws, gf, go, team, totalGames });
  }
}
