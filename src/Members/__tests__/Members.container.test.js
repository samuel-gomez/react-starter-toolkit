import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'shared/testsUtils/customRender';
import { totals, oneMember, defaultProps } from './Members.mock';
import MembersContainer from '../Members.container';

describe('Component <MembersEnhanced />', () => {
  it('Should render <MembersEnhanced /> with one member', async () => {
    render(<MembersContainer {...defaultProps} />, {}, { responseBody: { totals, data: [oneMember] } });
    expect(await screen.findByText('Vivianna')).toBeInTheDocument();
  });

  it('Should render <MembersEnhanced /> with empty members', async () => {
    render(<MembersContainer {...defaultProps} />, {}, { responseBody: { totals, data: [] } });
    expect(await screen.findByText('Info : Aucune donnée trouvée')).toBeInTheDocument();
  });
});
