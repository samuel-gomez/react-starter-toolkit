import { merge, cloneDeep } from 'lodash';

export default (baseObj = {}, customObj = {}, mergeFn = merge, cloneDeepFn = cloneDeep) => mergeFn(cloneDeepFn(baseObj), customObj);
