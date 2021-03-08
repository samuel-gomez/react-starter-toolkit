import mergeObj from 'shared/helpers/mergeObj';

const baseObjLevel0 = { label: 'label' };
const customObjLevel0 = { value: 'value' };

const baseObjLevel1 = {
  ...baseObjLevel0,
  level1: baseObjLevel0,
};

const customObjLevel1 = {
  ...customObjLevel0,
  level1: customObjLevel0,
};

const expectedLevel1 = {
  ...baseObjLevel0,
  ...customObjLevel0,
  level1: {
    ...baseObjLevel0,
    ...customObjLevel0,
  },
};

const baseObjLevel2 = {
  ...baseObjLevel0,
  level1: {
    ...baseObjLevel0,
    level2: baseObjLevel0,
  },
};

const customObjLevel2 = {
  ...customObjLevel0,
  level1: {
    ...customObjLevel0,
    level2: customObjLevel0,
  },
};

const expectedLevel2 = {
  ...baseObjLevel0,
  ...customObjLevel0,
  level1: {
    ...baseObjLevel0,
    ...customObjLevel0,
    level2: {
      ...baseObjLevel0,
      ...customObjLevel0,
    },
  },
};
describe('mergeObj', () => {
  it.each`
    baseObj          | customObj          | expected
    ${undefined}     | ${undefined}       | ${{}}
    ${{}}            | ${{}}              | ${{}}
    ${baseObjLevel0} | ${{}}              | ${baseObjLevel0}
    ${{}}            | ${customObjLevel0} | ${customObjLevel0}
    ${baseObjLevel0} | ${customObjLevel0} | ${{ ...baseObjLevel0, ...customObjLevel0 }}
    ${baseObjLevel1} | ${customObjLevel1} | ${expectedLevel1}
    ${baseObjLevel2} | ${customObjLevel2} | ${expectedLevel2}
  `(`Should return expected : $expected when baseObj: $baseObj and when customObj: $customObj`, ({ baseObj, customObj, expected }) => {
    const result = mergeObj(baseObj, customObj);
    expect(result).toEqual(expected);
  });
});
