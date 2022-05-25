import { StaticRouter } from 'react-router-dom/server';

export default (route = '/') =>
  ({ context = {}, children }) =>
    (
      <StaticRouter location={route} context={context}>
        {children}
      </StaticRouter>
    );
