import { LoaderModes } from '@axa-fr/react-toolkit-all';
import setLoaderMode from './setLoaderMode';

describe('setLoaderMode', () => {
  it.each`
    isLoading | transformations | LoaderModes    | expected
    ${true}   | ${[]}           | ${LoaderModes} | ${'get'}
    ${true}   | ${[1, 2]}       | ${LoaderModes} | ${'none'}
    ${false}  | ${[]}           | ${LoaderModes} | ${'none'}
    ${false}  | ${[1, 2]}       | ${LoaderModes} | ${'none'}
  `(
    'Should return $expected when isLoading: $isLoading and transformations: $transformations',
    ({ isLoading, transformations, LoaderModes, expected }) => {
      const result = setLoaderMode(isLoading, transformations, LoaderModes);
      expect(result).toEqual(expected);
    },
  );
});
