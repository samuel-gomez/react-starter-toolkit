import { WrapperStaticRouter } from 'shared/testsUtils';
import { render } from '@testing-library/react';

const renderWithWrapperStaticRouter = (Component, route = '/') => render(Component, { wrapper: WrapperStaticRouter(route) });

export default renderWithWrapperStaticRouter;
