import { Link, Outlet, useLoaderData } from 'remix';
import type { MetaFunction } from 'remix';

import { weeklyScores } from '~/secrets';
import type { WeeklyScore } from '~/secrets';

export let meta: MetaFunction = () => {
  return {
    title: 'Graphs',
  };
};

export let loader = () => {
  const weeklyScore = weeklyScores();

  return weeklyScore;
};

export default function GraphsIndex() {
  const data = useLoaderData<WeeklyScore[]>();

  return (
    <div className='about'>
      <aside>
        <h2>Graphs</h2>
      </aside>
      <hr />
      <Outlet />
    </div>
  );
}
