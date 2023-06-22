import { Model } from "sequelize";

const matches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  }
]

const matchesInProgress = [matches[1]];

const matchesFineshed = [matches[0]];

const createdMatchResponse = {
  dataValues: {
    id: 49,
    homeTeamId: 5,
    homeTeamGoals: 2,
    awayTeamId: 1,
    awayTeamGoals: 2,
    inProgress: true,
},
} as Model

const createdMatch = {
  id: 49,
  homeTeamId: 5,
  homeTeamGoals: 2,
  awayTeamId: 1,
  awayTeamGoals: 2,
  inProgress: true,
}

const createdMatchSend = {
  homeTeamId: 5,
  homeTeamGoals: 2,
  awayTeamId: 1,
  awayTeamGoals: 2,
}

export {
  matches,
  matchesInProgress,
  matchesFineshed,
  createdMatchResponse,
  createdMatch,
  createdMatchSend,
}