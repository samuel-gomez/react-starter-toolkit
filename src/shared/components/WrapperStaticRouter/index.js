import { StaticRouter } from 'react-router-dom/server';

export default ({ context = {}, children }) => <StaticRouter context={context}>{children}</StaticRouter>;
