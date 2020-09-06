const setLoaderMode = ({ isLoading, LoaderModes }) => (isLoading ? LoaderModes.get : LoaderModes.none);

export default setLoaderMode;
