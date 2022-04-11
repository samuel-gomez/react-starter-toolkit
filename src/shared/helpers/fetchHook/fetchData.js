import { setResponses } from 'shared/helpers/fetchHook/setResponses';

const fetchData = async ({ fetchCustom, setLoading, setError, setSuccess, fetchServices, setResponsesFn = setResponses, callbackSuccess = null }) => {
  setLoading();
  try {
    const responsesFetch = await Promise.all(
      Object.keys(fetchServices).map(async keyService =>
        fetchServices[keyService].service({ fetchCustom, ...(fetchServices[keyService]?.args ?? {}) }),
      ),
    );

    const responsesServices = Object.keys(fetchServices).reduce(
      (acc, currentNameService, index) => ({
        ...acc,
        [currentNameService]: responsesFetch[index],
      }),
      {},
    );

    setResponsesFn({ responsesServices, setError, setSuccess, callbackSuccess });
  } catch (error) {
    setError(error);
  }
};

export default fetchData;
