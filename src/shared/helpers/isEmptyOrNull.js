export default elt => elt === '' || (Array.isArray(elt) && elt.length === 0) || elt === {} || elt === null;
