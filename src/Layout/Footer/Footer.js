import React from 'react';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import { Footer } from '@axa-fr/react-toolkit-all';
import packageJson from '../../../package.json';

export default () => <Footer icon={logo} copyright={`© 2020 AXA Tous droits réservés - v${packageJson.version}`} />;
