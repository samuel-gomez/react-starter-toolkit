import { merge, cloneDeep } from 'lodash';

export default (baseObj = {}, customObj: object | unknown = {}, mergeFn = merge, cloneDeepFn = cloneDeep) => mergeFn(cloneDeepFn(baseObj), customObj);
