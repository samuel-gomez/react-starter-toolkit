export const isEmptyObject = (elt: unknown = {}) => elt !== null && typeof elt === 'object' && Object.keys(elt).length === 0;
export const isEmptyArray = (elt: unknown = []) => Array.isArray(elt) && elt.length === 0;

const isEmptyOrNull = (elt: unknown) => elt === undefined || elt === null || elt === '' || isEmptyArray(elt) || isEmptyObject(elt);

export default isEmptyOrNull;
