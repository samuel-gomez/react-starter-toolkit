import { WrapperStaticRouter } from 'shared/testsUtils';
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

const renderWithWrapperStaticRouter = (Component: ReactElement, route = '/', options = {}) =>
  render(Component, { wrapper: WrapperStaticRouter(route), ...options });

export default renderWithWrapperStaticRouter;
