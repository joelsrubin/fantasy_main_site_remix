import { Outlet, useLoaderData } from 'remix';
import type { MetaFunction, LinksFunction } from 'remix';

import { week14Data } from '~/secrets';

export let meta: MetaFunction = () => {
  return {
    title: 'About Remix',
  };
};

export type Team = {
  name: string;
  rank: string;
  manager: {
    manager_id: string;
    nickname: string;
    guid: string;
    image_url: string;
    felo_score: string;
    felo_tier: string;
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
        <h2>Leaderboard</h2>
        <ul className='leaderboard'>
          {data.map((item) => {
            return (
              <li key={item.name}>
                {item.rank} {item.name}
              </li>
            );
          })}
        </ul>
        <hr />
        <Outlet />
      </div>
    </div>
  );
}
