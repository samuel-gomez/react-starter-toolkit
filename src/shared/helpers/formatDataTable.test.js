import { setTextTooltip } from './formatDataTable';

describe('setTextTooltip', () => {
  const maxDisplay = {
    item1: 5,
    item2: 2,
  };

  it('Should return {"": {"label": ""}} when call with no params', () => {
    const result = setTextTooltip({});
    expect(result).toEqual({ '': { label: '' } });
  });

  it('Should return {"item1": {"label": null}} when call text === null', () => {
    const result = setTextTooltip({ text: null, name: 'item1', maxDisplay });
    expect(result).toEqual({ item1: { label: null } });
  });

  it('Should return {"item1": {"label": "txt"}} for when call text.length <= maxDisplay[item1]', () => {
    const result = setTextTooltip({ text: 'txt', name: 'item1', maxDisplay });
    expect(result).toEqual({ item1: { label: 'txt' } });
  });
  it('Should return text troncate and text hover when when call text.length > maxDisplay[item2]', () => {
    const result = setTextTooltip({ text: 'txt', name: 'item2', maxDisplay });
    const expected = {
      item2: {
        hover: 'txt',
        label: 'tx...',
      },
    };
    expect(result).toEqual(expected);
  });
});
