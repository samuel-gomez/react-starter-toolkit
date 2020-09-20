import withEnvAndAuth from 'shared/hoc/withEnvAndAuth';

const Autorize = ({ authorized, authRole, children }) => (authorized !== undefined && !authorized.includes(authRole) ? null : children);

export default withEnvAndAuth(Autorize);
