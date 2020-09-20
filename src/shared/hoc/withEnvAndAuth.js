import { withEnvironment } from 'App/Environment';
import compose from 'shared/helpers/compose';
import withAuthentication from 'shared/hoc/withAuthentication';

export default compose(withEnvironment, withAuthentication);
