import { setDate, TsetDate, isValidDate, TisValidDate, formatDate } from './formatDate';

type TsetDateTest = TsetDate & {
  expected: ReturnType<typeof setDate>;
};

describe('setDate', () => {
  it.each`
    date                     | expected
    ${undefined}             | ${''}
    ${null}                  | ${''}
    ${''}                    | ${''}
    ${1982}                  | ${''}
    ${'1983-03-30T00:00:00'} | ${'30/03/1983'}
  `('Should return expected : $expected when date: $date', ({ date, expected }: TsetDateTest) => {
    const result = setDate({ date });
    expect(result).toEqual(expected);
  });
});

type TisValidDateTest = {
  date: TisValidDate;
  expected: ReturnType<typeof isValidDate>;
};

describe('isValidDate', () => {
  it.each`
    date                     | expected
    ${undefined}             | ${false}
    ${null}                  | ${false}
    ${''}                    | ${false}
    ${1982}                  | ${false}
    ${'1983-03-30T00:00:00'} | ${true}
  `('Should return expected : $expected when date: $date', ({ date, expected }: TisValidDateTest) => {
    const result = isValidDate(date);
    expect(result).toEqual(expected);
  });
});

describe('formatDate', () => {
  it.each`
    date                     | expected
    ${undefined}             | ${'01/01/1970'}
    ${null}                  | ${'01/01/1970'}
    ${''}                    | ${''}
    ${1982}                  | ${'01/01/1970'}
    ${'1983-03-30T00:00:00'} | ${'30/03/1983'}
  `('Should return expected : $expected when date: $date', ({ date, expected }: TisValidDateTest) => {
    const result = formatDate(date);
    expect(result).toEqual(expected);
  });
});
