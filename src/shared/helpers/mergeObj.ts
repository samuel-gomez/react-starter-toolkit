import { merge, cloneDeep } from 'lodash';

const mergeObj = (baseObj = {}, customObj: object | unknown = {}, mergeFn = merge, cloneDeepFn = cloneDeep) =>
  mergeFn(cloneDeepFn(baseObj), customObj);

export default mergeObj;
