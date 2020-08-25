import { isEmpty } from 'lodash';

const setLoaderMode = (isLoading, items, LoaderModes) => (isLoading && isEmpty(items) ? LoaderModes.get : LoaderModes.none);

export default setLoaderMode;
