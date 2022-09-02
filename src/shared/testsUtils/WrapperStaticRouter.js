import { StaticRouter } from 'react-router-dom/server';

const WrapperStaticRouter =
  (route = '/') =>
  ({ context = {}, children }) =>
    (
      <StaticRouter location={route} context={context}>
        {children}
      </StaticRouter>
    );

export default WrapperStaticRouter;
