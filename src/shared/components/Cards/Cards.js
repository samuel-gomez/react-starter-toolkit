import { shape, arrayOf } from 'prop-types';
import Card, { cardPropTypes } from 'shared/components/Cards/Card';
import './Cards.scss';

const Cards = ({ items }) => (
  <div className="af-cards">
    {items.map(({ id, ...rest }) => (
      <Card key={id} {...rest} />
    ))}
  </div>
);

export const cardsPropTypes = {
  items: arrayOf(
    shape({
      ...cardPropTypes,
    }),
  ).isRequired,
};

Cards.propTypes = cardsPropTypes;

export default Cards;
