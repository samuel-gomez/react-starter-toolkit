import { setDate, TsetDate } from './formatDate';

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
