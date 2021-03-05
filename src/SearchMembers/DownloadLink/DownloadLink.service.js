export default ({ fetchCustom, signal, distributorId }) => fetchCustom(`distributeurs/${distributorId}/details-contrats`, { signal, blob: true });
