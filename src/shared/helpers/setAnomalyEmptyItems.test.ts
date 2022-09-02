import setAnomalyEmptyItems from './setAnomalyEmptyItems';

describe('setAnomalyEmptyItems', () => {
  it('Should return null when receive items not empty', () => {
    const result = setAnomalyEmptyItems(['item']);
    expect(result).toBeNull();
  });

  it('Should  when receive items not empty', () => {
    const result = setAnomalyEmptyItems();
    const expected = { label: 'Info : Aucune donnée trouvée', type: 'info', iconName: 'exclamation-sign' };
    expect(result).toEqual(expected);
  });
});
