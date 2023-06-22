import { IMatches } from '../Interfaces/matches/IMatches';

const mapMatchesHome = (matches: IMatches[]) => {
  let countVictories = 0;
  let countDraws = 0;
  let countGoalsFavor = 0;
  let countGoalsOwn = 0;
  matches.map((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      countVictories += 1;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      countDraws += 1;
    }
    countGoalsFavor += match.homeTeamGoals;
    countGoalsOwn += match.awayTeamGoals;
    return { countDraws, countVictories, countGoalsFavor, countGoalsOwn };
  });
  return { countDraws, countVictories, countGoalsFavor, countGoalsOwn };
};

const mapMatchesAway = (matches: IMatches[]) => {
  let countVictories = 0;
  let countDraws = 0;
  let countGoalsFavor = 0;
  let countGoalsOwn = 0;
  matches.map((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      countVictories += 1;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      countDraws += 1;
    }
    countGoalsFavor += match.awayTeamGoals;
    countGoalsOwn += match.homeTeamGoals;
    return { countDraws, countVictories, countGoalsFavor, countGoalsOwn };
  });
  return { countDraws, countVictories, countGoalsFavor, countGoalsOwn };
};

export {
  mapMatchesHome,
  mapMatchesAway,
};
