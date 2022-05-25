import Line from './Line';

const LineContainer = ({ idKey, modifier, actions: Actions, ...cols }) => {
  const columns = Object.keys(cols).map(keyCol => ({ keyCol, label: cols[keyCol]?.label, hover: cols[keyCol]?.hover }));
  return <Line {...cols} modifier={modifier} columns={columns} actions={Actions ? <Actions idKey={idKey} {...cols} /> : null} />;
};

export default LineContainer;
