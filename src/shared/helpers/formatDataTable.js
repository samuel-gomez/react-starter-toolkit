export const setTextTooltip = ({ text = '', name = '', maxDisplay = {} }) =>
  !text || text.length <= maxDisplay[name] || text === '' || !maxDisplay[name]
    ? {
        [name]: {
          label: text,
        },
      }
    : {
        [name]: {
          label: `${text.substring(0, maxDisplay[name])}...`,
          hover: text,
        },
      };

export const setDisplay = (column, setTextTooltipFn = setTextTooltip) =>
  Object.keys(column).map(keyColumn => setTextTooltipFn({ text: column[keyColumn], name: keyColumn }))[0];
