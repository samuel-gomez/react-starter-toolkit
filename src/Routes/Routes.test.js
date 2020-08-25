import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Environment from 'App/Environment';
/* import MembersPage from 'Members';
import PageNotFound from 'NotFound';
import { renderLayoutMembers } from './Routes'; */
import Routes from '.';

describe('Route', () => {
  it('Should render Routes', () => {
    const { asFragment } = render(
      <Environment>
        <Router>
          <Routes />
        </Router>
      </Environment>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('NotFound Page', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/random']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
  /*
  it('Should return <MembersPage /> with props when call renderLayoutMembers', () => {
    const customProps = {
      myProp: 'property members',
    };
    const result = renderLayoutMembers({ ...customProps });
    expect(result.type).toEqual(MembersPage);
    expect(result.props.myProp).toEqual('property members');
  });*/
});
