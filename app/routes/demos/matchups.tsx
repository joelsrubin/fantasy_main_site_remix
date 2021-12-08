import { useEffect, useRef, useState } from 'react';
import { ActionFunction, useLoaderData } from 'remix';
import { Form, json, useActionData, redirect } from 'remix';
import { week14Data } from '~/secrets';

export function meta() {
  return { title: 'Actions Demo' };
}

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
    team: string[];
  };
};

export let loader = () => {
  return week14Data['my scoreboard'];
};

export default function Matchups() {
  const data = useLoaderData();
  const [selected, setSelected] = useState(data[0]);

  return (
    <div className='remix__page'>
      <aside>
        <h2 className='matchup-header'>Matchups for week {data[0].week}</h2>
        <ul className='matchup-list'>
          {data.map((item) => (
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
              {item.teams.team[0].name} vs {item.teams.team[1].name}
            </li>
          ))}
        </ul>
      </aside>

      <aside>
        <h3 className='matchup-header'>Selected Matchup</h3>
        <div className='matchup-container'>
          {selected.teams.team.map((team) => (
            <div className='matchup-card'>
              <img
                className='matchup-avatar'
                src={team.team_logos.team_logo.url}
              />
              <h4>{team.name}</h4>
              <div className='projected'>
                {team.team_projected_points.total}
                <h5>projected</h5>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
