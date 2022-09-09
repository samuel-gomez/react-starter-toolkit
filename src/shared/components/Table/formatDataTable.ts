export const setTextTooltip = ({ text = '', name = '', maxDisplay = 0 }) =>
  !text || text.length <= maxDisplay || text === '' || !maxDisplay
    ? {
        [name]: {
          label: text,
        },
      }
    : {
        [name]: {
          label: `${text.substring(0, maxDisplay)}...`,
          hover: text,
        },
      };

type Tcolumn = {
  [key: string]: string;
};

export const setDisplay = (column: Tcolumn, maxDisplay?: number, setTextTooltipFn = setTextTooltip) =>
  Object.keys(column)?.map(keyColumn => setTextTooltipFn({ text: column[keyColumn], name: keyColumn, maxDisplay }))[0] ?? {};
