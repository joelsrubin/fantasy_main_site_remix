import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { week14Data } from '~/secrets';
// import { week14Data } from '~/secrets';

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  let data: IndexData = {
    // resources: [
    //   {
    //     name: 'Leaderboard',
    //     url: 'https://remix.run/docs',
    //   },
    //   {
    //     name: 'Losers',
    //     url: 'https://reactrouter.com/docs',
    //   },
    //   {
    //     name: 'More to Learn',
    //     url: 'https://discord.gg/VBePs6d',
    //   },
    // ],
    demos: [
      {
        to: 'demos/matchups',
        name: 'Matchups',
      },
      {
        to: 'demos/standings',
        name: 'Standings',
      },
    ],
  };
  const { allPlayers } = week14Data;

  // https://remix.runbod/api/remix#json
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
        <h2>Select a Season</h2>
        <ul>
          {data.demos.map((demo) => (
            <li key={demo.to} className='remix__page__resource'>
              <Link to={demo.to} prefetch='intent'>
                {demo.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
