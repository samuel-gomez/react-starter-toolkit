import isEmptyOrNull, { isEmptyObject, isEmptyArray } from './isEmptyOrNull';

type TisEmptyOrNullTest = {
  elt: Parameters<typeof isEmptyOrNull>[0];
  expected: ReturnType<typeof isEmptyOrNull>;
};

describe('isEmptyOrNull', () => {
  it.each`
    elt                 | expected
    ${undefined}        | ${true}
    ${null}             | ${true}
    ${''}               | ${true}
    ${1982}             | ${false}
    ${'1983'}           | ${false}
    ${{}}               | ${true}
    ${[]}               | ${true}
    ${{ name: 'name' }} | ${false}
    ${['name']}         | ${false}
  `('Should return expected : $expected when elt: $elt', ({ elt, expected }: TisEmptyOrNullTest) => {
    const result = isEmptyOrNull(elt);
    expect(result).toEqual(expected);
  });
});

describe('isEmptyObject', () => {
  it.each`
    elt                 | expected
    ${undefined}        | ${true}
    ${{}}               | ${true}
    ${{ name: 'name' }} | ${false}
  `('Should return expected : $expected when elt: $elt', ({ elt, expected }) => {
    const result = isEmptyObject(elt);
    expect(result).toEqual(expected);
  });
});

describe('isEmptyArray', () => {
  it.each`
    elt          | expected
    ${undefined} | ${true}
    ${[]}        | ${true}
    ${['name']}  | ${false}
  `('Should return expected : $expected when elt: $elt', ({ elt, expected }) => {
    const result = isEmptyArray(elt);
    expect(result).toEqual(expected);
  });
});
