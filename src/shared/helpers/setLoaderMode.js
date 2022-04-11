import { MODES } from 'shared/components/Loader';

const setLoaderMode = ({ isLoading, LoaderModes = MODES }) => (isLoading ? LoaderModes.get : LoaderModes.none);

export default setLoaderMode;
