import React from 'react';
import { storiesOf } from '@storybook/react';
import notes from 'App/App.md';

storiesOf('Get Started', module).add('Informations', () => <h1>Projet OASIS</h1>, {
  notes: { markdown: notes },
});
