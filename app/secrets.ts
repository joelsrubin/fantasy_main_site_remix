export const CONFIG = {
  CLIENT_ID:
    'dj0yJmk9aEFjd08za0lxRVJtJmQ9WVdrOWFXazNjVnBXWkhnbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWMz',
  CLIENT_SECRET: 'a5311f09526d829b6b956d7e592fddae2442f8dd',

  LEAGUE_KEY: '390.l.34014',
};
export const AUTH_URL =
  'https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9aEFjd08za0lxRVJtJmQ9WVdrOWFXazNjVnBXWkhnbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWMz&redirect_uri=oob&response_type=code&language=en-us';

export const week14Data = require('./data/week14.json');

type Team = {
  [key: string]: string;
};

type TeamCounter = {
  [key: string]: number;
};

export const teamsMap: Team = {
  '406.l.891371.t.1': 'Mattison Bullard',
  '406.l.891371.t.2': 'Crab Sticks',
  '406.l.891371.t.3': 'Colin Robinson',
  '406.l.891371.t.4': 'Judge Jeudy',
  '406.l.891371.t.5': 'Dark Sister',
  '406.l.891371.t.6': 'The Stomp Rockets',
  '406.l.891371.t.7': 'EZokiel BREAD$$$',
  '406.l.891371.t.8': 'Brazilian Blowouts',
  '406.l.891371.t.9': 'Kelce Grammer',
  '406.l.891371.t.10': "Fuckin' Emkaye",
  '406.l.891371.t.11': 'Sea Bass!',
  '406.l.891371.t.12': "Jonny's Team",
};

export const teamsCounter: TeamCounter = {
  '406.l.891371.t.1': 0,
  '406.l.891371.t.2': 0,
  '406.l.891371.t.3': 0,
  '406.l.891371.t.4': 0,
  '406.l.891371.t.5': 0,
  '406.l.891371.t.6': 0,
  '406.l.891371.t.7': 0,
  '406.l.891371.t.8': 0,
  '406.l.891371.t.9': 0,
  '406.l.891371.t.10': 0,
  '406.l.891371.t.11': 0,
  '406.l.891371.t.12': 0,
};

export type WeeklyScore = {
  week: number;
  scores: TeamCounter;
};

export type Matchup = {
  week: string;
  winner_team_key: string;
};

export type Week = {
  week: number;
  matchups: {
    matchup: Array<Matchup>;
  };
};

const scoreGenerator = (scoreCard: TeamCounter, week: Week) => {
  for (const key in scoreCard) {
    for (const match of week.matchups.matchup) {
      if (match.winner_team_key === key) {
        scoreCard[key] += 1;
      }
    }
  }
  return scoreCard;
};

export const weeklyScores = (): WeeklyScore[] => {
  let results: any = [];
  week14Data.allScores.slice(0, 13).forEach((week: Week, i: number) => {
    let curScores =
      i === 0 ? { ...teamsCounter } : { ...results[i - 1].scores };
    let weekResults = {
      week: i + 1,
      scores: scoreGenerator(curScores, week),
    };

    results.push(weekResults);
  });

  return results;
};
