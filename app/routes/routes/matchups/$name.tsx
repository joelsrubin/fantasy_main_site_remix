import { Link, useLoaderData } from 'remix';
import { week14Data } from '~/secrets';

import invariant from 'tiny-invariant';

export let loader = ({ params }: any) => {
  invariant(params.name, 'expected params.name');
  const { name } = params;
  const { allPlayers } = week14Data;
  const data = allPlayers.find((p: any) => p.name === name);
  const scoreboard = week14Data['my scoreboard'];
  return {
    data,
    week: scoreboard[0].week,
  };
};

export default function Team() {
  const { data, week } = useLoaderData();
  console.log(data);
  return (
    <div>
      <Link to={'../'}>Back</Link>
      <aside>
        <h2 className='matchup-header'>
          {data.name}'s Week {week} Roster
        </h2>
        <div className='roster-container'>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Player</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {data.roster.players.player.map((p: any) => (
                <>
                  <tr key={p.name.full}>
                    <td>{p.display_position}</td>
                    <td className='name-cell'>{p.name.full}</td>
                    <td>{p.editorial_team_full_name}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
}
