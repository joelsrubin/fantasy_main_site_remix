export type Player = {
  name: {
    full: string;
  };
  player_key: string;
  headshot: {
    url: string;
  };
  display_position: string;
  editorial_team_full_name: string;
};

export type PlayerCardProps = {
  player: Player;
};

export default function PlayerCard(props: PlayerCardProps) {
  const { player } = props;
  return (
    <div className='player-card'>
      <img src={player.headshot.url} alt={player.name.full} />
      <div className='player-card__name'>{player.name.full}</div>
      <div className='player-card__position'>{player.display_position}</div>
      <div className='player-card__team'>{player.editorial_team_full_name}</div>
    </div>
  );
}
