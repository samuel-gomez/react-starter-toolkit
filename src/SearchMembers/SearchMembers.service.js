import { JSON_CONTENT_HEADER } from 'shared/constants';

const searchMembers = ({ fetchCustom, signal, body = {} }) =>
  fetchCustom('members', {
    signal,
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      ...JSON_CONTENT_HEADER,
    },
  });

export default searchMembers;
