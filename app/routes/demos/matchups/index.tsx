import { useState, useEffect } from 'react';
import { Link, useLoaderData, Outlet } from 'remix';
import { week14Data } from '~/secrets';

export function meta() {
  return { title: 'Actions Demo' };
}

export type Team = {
  name: string;
  team_logos: {
    team_logo: {
      url: string;
    };
  };
  team_projected_points: {
    total: string;
  };
  team_points: {
    coverage_type: string;
    season: string;
    total: string;
  };
  clinched_playoffs?: string;
};

export type Score = {
  week: string;
  week_start: string;
  week_end: string;
  status: string;
  is_playoffs: string;
  is_consolation: string;
  is_matchup_recap_available: string;
  teams: {
    count: string;
    team: Team[];
  };
};

export type Data = {
  standings: Team[];
  scoreboard: Score[];
};

export let loader = () => {
  const { standings } = week14Data;
  const scoreboard = week14Data['my scoreboard'];

  return {
    scoreboard,
    standings,
  };
};

export default function MatchupIndex() {
  const { scoreboard, standings } = useLoaderData<Data>();

  const [selected, setSelected] = useState(scoreboard[0]);

  useEffect(() => {
    localStorage.getItem('selected') &&
      setSelected(JSON.parse(localStorage.getItem('selected') || 'null'));
  }, []);

  useEffect(() => {
    localStorage.setItem('selected', JSON.stringify(selected));
  }, [selected]);

  const teamInfo = (teamName: string): Team => {
    const info = standings.filter((team) => {
      return team.name === teamName;
    });

    return info[0];
  };

  return (
    <div className='remix__page'>
      <aside>
        <h2 className='matchup-header'>
          Matchups for week {scoreboard[0].week}
        </h2>
        <ul className='matchup-list'>
          {scoreboard.map((item) => (
            <li
              onClick={() => {
                setSelected(item);
              }}
              className={
                selected === item
                  ? 'matchup-list-selected'
                  : 'matchup-list-item'
              }
            >
              <span
                className={item.teams.team[0].clinched_playoffs && 'clinched'}
              >
                {item.teams.team[0].name}
              </span>

              <span className='matchup-list-item'> vs </span>
              <span
                className={item.teams.team[1].clinched_playoffs && 'clinched'}
              >
                {item.teams.team[1].name}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <aside>
        <h3 className='matchup-header'>Selected Matchup</h3>
        <div className='matchup-container'>
          {selected.teams.team.map((team) => {
            const info = teamInfo(team.name);
            return (
              <div className='matchup-card'>
                <img
                  className='matchup-avatar'
                  src={team.team_logos.team_logo.url}
                />

                <Link to={team.name} prefetch='render'>
                  <h4 className={team.clinched_playoffs && 'clinched'}>
                    {team.name}
                  </h4>
                </Link>
                <div className='projected'>
                  <h5>projected: {team.team_projected_points.total}</h5>

                  <h5>total: {info.team_points.total}</h5>
                </div>
              </div>
            );
          })}
        </div>
        <h5 className='matchup-header'>
          <span className='clinched'>clinched</span>
        </h5>
      </aside>
      <Outlet />
    </div>
  );
}
