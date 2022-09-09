import { setTextTooltip, setDisplay } from '../formatDataTable';

describe('setTextTooltip', () => {
  it('Should return {"": {"label": ""}} when call with no params', () => {
    const result = setTextTooltip({});
    expect(result).toEqual({ '': { label: '' } });
  });

  it('Should return {"item1": {"label": "txt"}} for when call text.length <= maxDisplay[item1]', () => {
    const result = setTextTooltip({ text: 'txt', name: 'item1', maxDisplay: 5 });
    expect(result).toEqual({ item1: { label: 'txt' } });
  });

  it('Should return text troncate and text hover when when call text.length > maxDisplay[item2]', () => {
    const result = setTextTooltip({ text: 'txt', name: 'item2', maxDisplay: 2 });
    const expected = {
      item2: {
        hover: 'txt',
        label: 'tx...',
      },
    };
    expect(result).toEqual(expected);
  });
});

describe('setDisplay', () => {
  it('Should return {} when call with no column', () => {
    const columns = {};
    const result = setDisplay(columns);
    expect(result).toEqual({});
  });

  it('Should return {name: {"label": "sam"}} when call with one column', () => {
    const columns = {
      name: 'sam',
    };
    const result = setDisplay(columns);
    expect(result).toEqual({ name: { label: 'sam' } });
  });
});
