import Card, { TCard } from 'shared/components/Cards/Card';
import './Cards.scss';

type TCards = {
  items: (TCard & { id: string })[];
};

const Cards = ({ items }: TCards) => <div className="af-cards">{!!items.length && items.map(({ id, ...rest }) => <Card key={id} {...rest} />)}</div>;

export default Cards;
