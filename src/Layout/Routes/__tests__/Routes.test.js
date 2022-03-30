import React, { createContext } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserProvider from 'App/UserProvider';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Routes, { WithAuth } from '..';

const defaultPropsMock = {
  SlashDesignSystemCmpt: () => <div>SlashDesignSystemCmpt</div>,
  MembersCmpt: () => <div>MembersCmpt</div>,
  SearchMembersCmpt: () => <div>SearchMembersCmpt</div>,
  DashboardCmpt: () => <div>DashboardCmpt</div>,
  ModalCmpt: () => <div>ModalCmpt</div>,
  ButtonCmpt: () => <div>ButtonCmpt</div>,
  PageUnauthorizeCmpt: () => <div>PageUnauthorizeCmpt</div>,
};

const renderRoute = ({ role, name, route, defaultProps = defaultPropsMock }) => {
  const useOidcUser = jest.fn().mockReturnValue({
    oidcUser: {
      name,
      profile: {
        member_of: [`CN=${role}`],
      },
    },
  });

  return render(
    <MemoryRouter initialEntries={[route]}>
      <UserProvider useOidcUser={useOidcUser} isEnabled>
        <Routes {...defaultProps} />
      </UserProvider>
    </MemoryRouter>,
  );
};

describe('<Routes />', () => {
  it.each`
    role  | name        | route
    ${''} | ${'Samuel'} | ${'/'}
    ${''} | ${'Samuel'} | ${'/members'}
    ${''} | ${'Samuel'} | ${'/dashboard'}
    ${''} | ${'Samuel'} | ${'/search-members'}
    ${''} | ${'Samuel'} | ${'/demos/modal'}
    ${''} | ${'Samuel'} | ${'/demos/button'}
    ${''} | ${'Samuel'} | ${'/forbidden'}
  `('Should render page when user profil is authorized, role: $role, name: $name, route: $route', ({ role, name, route }) => {
    const { asFragment } = renderRoute({ role, name, route });
    expect(asFragment()).toMatchSnapshot();
  });

  it.each`
    role                   | name     | route
    ${'user unauthorized'} | ${'sam'} | ${'/'}
    ${'user unauthorized'} | ${'sam'} | ${'/members'}
    ${'user unauthorized'} | ${'sam'} | ${'/dashboard'}
    ${'user unauthorized'} | ${'sam'} | ${'/search-members'}
    ${'user unauthorized'} | ${'sam'} | ${'/demos/modal'}
    ${'user unauthorized'} | ${'sam'} | ${'/demos/button'}
  `('Should render forbidden page when user profil is unauthorized, authRole: $authRole, route: $route', ({ role, name, route }) => {
    const { getByText } = renderRoute({ role, name, route, defaultProps: { WithAuthCmpt: props => <WithAuth {...props} authorized={['admin']} /> } });
    expect(getByText('403')).toBeInTheDocument();
  });

  it.each`
    route
    ${'/no-exist-route'}
  `('Should render 404 when election route: $route is not correct', ({ route }) => {
    const { getByText } = renderRoute({ route, role: '', name: 'samuel', defaultProps: {} });
    expect(getByText('404')).toBeInTheDocument();
  });
});

describe('Render WithAuth', () => {
  it.each`
    authRole | authName
    ${''}    | ${'Samuel'}
  `('Should render RouteCmpt when user profile is authorized (authRole, authName)', ({ authRole, authName }) => {
    const UserContextObjMock = createContext({ authRole, authName, isEnabled: true });
    const Component = () => <p>component</p>;
    const { getByText } = renderWithWrapperStaticRouter(<WithAuth UserContextObj={UserContextObjMock} Component={Component} />);
    expect(getByText('component')).toBeInTheDocument();
  });

  it('Should render NavigateCmpt when user profile is unauthorized', () => {
    const UserContextObjMock = createContext({ isEnabled: true });
    const NavigateCmpt = () => <p>redirect component</p>;
    const { getByText } = renderWithWrapperStaticRouter(<WithAuth UserContextObj={UserContextObjMock} NavigateCmpt={NavigateCmpt} />);
    expect(getByText('redirect component')).toBeInTheDocument();
  });
});
