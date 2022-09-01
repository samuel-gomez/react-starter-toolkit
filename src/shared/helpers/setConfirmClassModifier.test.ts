import setConfirmClassModifier from './setConfirmClassModifier';

describe('setConfirmClassModifier', () => {
  it('Should return "confirm success" when setConfirmClassModifier called with false', () => {
    const result = setConfirmClassModifier(false);
    const expected = 'confirm success';
    expect(result).toEqual(expected);
  });

  it('Should return "confirm disabled" when setConfirmClassModifier called with true', () => {
    const result = setConfirmClassModifier(true);
    const expected = 'confirm disabled';
    expect(result).toEqual(expected);
  });
});
