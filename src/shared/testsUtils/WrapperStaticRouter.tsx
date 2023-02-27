/* eslint-disable react/display-name */
import { ReactNode } from 'react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const WrapperStaticRouter =
  (route = '/') =>
  ({ children }: { children: ReactNode }) =>
    <MemoryRouterProvider url={route}>{children}</MemoryRouterProvider>;

export default WrapperStaticRouter;
