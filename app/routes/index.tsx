import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { weeklyScores } from '~/secrets';

type IndexData = {
  routes: Array<{ name: string; to: string }>;
};

export let loader: LoaderFunction = async () => {
  let data: IndexData = {
    routes: [
      {
        to: 'routes/matchups',
        name: 'Matchups',
      },
      {
        to: 'routes/standings',
        name: 'Standings',
      },
      {
        to: '/routes/graphs',
        name: 'Graphs',
      },
    ],
  };

  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'BBSFFL',
    description: 'Play Ball!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <div className='remix__page'>
      <main>
        <h2>The Official BBSFFL App</h2>
        <p>The Docs for Historical Purposes 🏈</p>
        <p>Feel free to choose your own adventure</p>
      </main>
      <aside>
        <h2>Select a Page</h2>
        <ul>
          {data.routes.map((route) => (
            <li key={route.to} className='remix__page__resource'>
              <Link to={route.to} prefetch='intent'>
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
