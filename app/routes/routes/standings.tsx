import { Link, Outlet, useLoaderData } from 'remix';
import type { MetaFunction } from 'remix';

import { week14Data } from '~/secrets';

export let meta: MetaFunction = () => {
  return {
    title: 'Standings',
  };
};

export type Team = {
  name: string;
  rank: string;
  manager: {
    image_url: string;
  };
};

export let loader = () => {
  const mappedData = week14Data.standings.map((item: any) => {
    return {
      name: item.name,
      rank: item.team_standings.rank,
      manager: item.managers.manager,
    };
  });

  return mappedData;
};

export default function Index() {
  const data = useLoaderData<Team[]>();

  return (
    <div className='about'>
      <div className='about__intro'>
        <h2 className='matchup-header'>Leaderboard</h2>
        <ul className='leaderboard'>
          {data.map((item) => {
            return (
              <li key={item.name}>
                {item.rank}{' '}
                <Link to={`/routes/matchups/${item.name}`} prefetch='render'>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <hr /> */}
        {/* <Outlet /> */}
      </div>
    </div>
  );
}
