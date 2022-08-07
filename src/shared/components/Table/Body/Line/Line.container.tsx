import Line from './Line';

export type TLineContainer = {
  className?: string;
  modifier?: string;
  LineCmpt?: typeof Line;
  cols: [string, { label: string; hover?: string; children?: string; classModifier?: string }][];
};

const LineContainer = ({ className, modifier = '', LineCmpt = Line, cols }: TLineContainer) => {
  const columns = cols.map(([keyCol, value]) => ({
    keyCol,
    ...value,
  }));
  return <LineCmpt className={className} modifier={modifier} columns={columns} />;
};

export default LineContainer;
