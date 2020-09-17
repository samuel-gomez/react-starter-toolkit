import React from 'react';
import { StaticRouter } from 'react-router-dom';

export default ({ context = {}, children }) => <StaticRouter context={context}>{children}</StaticRouter>;
