import { setResponses } from 'shared/helpers/setResponses';
import { get } from 'lodash';

const fetchData = async ({
  fetchCustom,
  setInit,
  setError,
  setSuccess,
  fetchServices,
  setResponsesFn = setResponses,
  callbackSuccess = null,
  getFn = get,
}) => {
  setInit();
  try {
    const responsesServices = [];
    const responsesFetch = await Promise.all(
      Object.keys(fetchServices).map(async keyService =>
        fetchServices[keyService].service({ fetchCustom, ...getFn(fetchServices, `${keyService}.args`, {}) }),
      ),
    );
    Object.keys(fetchServices).forEach((name, index) => {
      responsesServices[name] = responsesFetch[index];
    });

    setResponsesFn({ responsesServices, setError, setSuccess, callbackSuccess });
  } catch (error) {
    setError(error);
  }
};
export default fetchData;
