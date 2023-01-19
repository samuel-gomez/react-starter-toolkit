import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

const mergeObj = (baseObj = {}, customObj: object | unknown = {}, mergeFn = merge, cloneDeepFn = cloneDeep) =>
  mergeFn(cloneDeepFn(baseObj), customObj);

export default mergeObj;
