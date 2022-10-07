import setLoaderMode from '../setLoaderMode';

describe('setLoaderMode', () => {
  it.each`
    isLoading | expected
    ${true}   | ${'get'}
    ${false}  | ${'none'}
  `('Should return $expected when isLoading: $isLoading', ({ isLoading, expected }) => {
    const result = setLoaderMode({ isLoading });
    expect(result).toEqual(expected);
  });
});
