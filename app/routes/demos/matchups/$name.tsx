import { Link, useLoaderData } from 'remix';
import { week14Data } from '~/secrets';
import PlayerCard, { Player } from './PlayerCard';
import invariant from 'tiny-invariant';

export let loader = ({ params }) => {
  invariant(params.name, 'expected params.name');
  const { name } = params;
  const { allPlayers } = week14Data;
  const data = allPlayers.find((p: Player) => p.name === name);
  return data;
};

export default function Team() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <Link to={'../'}>Back</Link>
      <aside>
        <h2 className='matchup-header'>{data.name}'s Roster</h2>
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
              {data.roster.players.player.map((p: Player) => (
                <>
                  <tr key={p.name.full}>
                    <td>{p.display_position}</td>
                    <td className='name-cell'>
                      {p.name.full}
                      <img
                        src={p.headshot.url}
                        alt={p.name.full}
                        className='avatar'
                      />
                    </td>
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
