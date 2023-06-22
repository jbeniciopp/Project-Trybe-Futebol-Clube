import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatches, newMatch } from '../Interfaces/matches/IMatches';

export default class MatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async getInProgressMatches(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: 1 },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async getFineshedMatches(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: 0 },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async updateMatchFinished(id: number): Promise<boolean> {
    try {
      await this.model.update({ inProgress: false }, { where: { id } });

      return true;
    } catch (error) {
      return false;
    }
  }

  async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<boolean> {
    try {
      await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

      return true;
    } catch (error) {
      return false;
    }
  }

  async createMatch(match: newMatch): Promise<IMatches | null> {
    const NewMatch = await this.model.create({ ...match, inProgress: true });
    const newMatchObj = await this.model.findOne({ where: { id: NewMatch.dataValues.id } });

    if (!newMatchObj) return null;

    return newMatchObj;
  }
}
