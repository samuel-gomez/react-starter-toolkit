import { WrapperStaticRouter } from 'shared/testsUtils';
import { render } from '@testing-library/react';

const renderWithWrapperStaticRouter = (Component, route = '/', options = {}) =>
  render(Component, { wrapper: WrapperStaticRouter(route), ...options });

export default renderWithWrapperStaticRouter;
