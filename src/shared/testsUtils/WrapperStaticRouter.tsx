import { ReactNode } from 'react';
import { StaticRouter } from 'react-router-dom/server';

const WrapperStaticRouter =
  (route = '/') =>
  ({ children }: { children: ReactNode }) =>
    <StaticRouter location={route}>{children}</StaticRouter>;

export default WrapperStaticRouter;
