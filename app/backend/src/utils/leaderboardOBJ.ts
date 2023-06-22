type obj = {
  points: number;
  victories: number;
  draws: number;
  gf: number;
  go: number;
  team: { teamName: string };
  totalGames: number;
};

const leaderboardOBJ = ({ points, victories, draws, gf, go, team, totalGames }: obj) => {
  const obj = {
    name: team.teamName,
    totalPoints: points,
    totalGames,
    totalVictories: victories,
    totalDraws: draws,
    totalLosses: totalGames - victories - draws,
    goalsFavor: gf,
    goalsOwn: go,
    goalsBalance: gf - go,
    efficiency: Number((100 * (points / (totalGames * 3))).toFixed(2)),
  };
  return obj;
};

export default leaderboardOBJ;
