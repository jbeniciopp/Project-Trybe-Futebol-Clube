import { Identifiable } from '..';

export interface IMatches extends Identifiable {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type newMatch = {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
};

export interface IMatchesUpdate {
  message: string,
}
