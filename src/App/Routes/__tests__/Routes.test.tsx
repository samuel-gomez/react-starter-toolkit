import { ComponentType, createContext } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserProvider from 'App/UserProvider';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Loader from 'shared/components/Loader';
import Routes, { withAuth } from '..';

const defaultPropsMock = {
  SlashDesignSystemCmpt: () => <div>SlashDesignSystemCmpt</div>,
  MembersCmpt: () => <div>MembersCmpt</div>,
  SearchMembersCmpt: () => <div>SearchMembersCmpt</div>,
  DashboardCmpt: () => <div>DashboardCmpt</div>,
  ModalCmpt: () => <div>ModalCmpt</div>,
  ButtonCmpt: () => <div>ButtonCmpt</div>,
  PageUnauthorizeCmpt: () => <div>PageUnauthorizeCmpt</div>,
};

type TrenderRoute = {
  role?: string;
  name?: string;
  route?: string;
  defaultProps?: object;
};

const renderRoute = ({ role = '', name = '', route = '/', defaultProps = defaultPropsMock }: TrenderRoute) => {
  const useOidcUser = jest.fn().mockReturnValue({
    oidcUser: { name, member_of: [`CN=${role}`] },
  });

  return render(
    <MemoryRouter initialEntries={[route]}>
      <UserProvider useOidcUserFn={useOidcUser} isEnabled>
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
  `('Should render forbidden page when user profil is unauthorized, role: $role, name: $name, route: $route', ({ role, name, route }) => {
    const UserContextObjMock = createContext({ authName: '', authRole: role, authUid: '', isEnabled: true, isLoading: false });
    const { getByText } = renderRoute({
      role,
      name,
      route,
      defaultProps: { ...defaultPropsMock, withAuthFn: (...args: ComponentType<object>[]) => withAuth(args[0], UserContextObjMock, ['admin']) },
    });
    expect(getByText('PageUnauthorizeCmpt')).toBeInTheDocument();
  });

  it.each`
    route
    ${'/no-exist-route'}
  `('Should render 404 when election route: $route is not correct', ({ route }) => {
    const { getByText } = renderRoute({ route, role: '', name: 'samuel' });
    expect(getByText('404')).toBeInTheDocument();
  });
});

jest.mock('shared/components/Loader');

describe('Render withAuth', () => {
  const Component = () => <p>component</p>;
  it.each`
    authRole | authName
    ${''}    | ${'Samuel'}
  `('Should render RouteCmpt when user profile is authorized (authRole, authName)', ({ authRole, authName }) => {
    const UserContextObjMock = createContext({ authRole, authName, authUid: '', isEnabled: true, isLoading: false });
    const { getByText } = renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock));
    expect(getByText('component')).toBeInTheDocument();
  });

  it('Should render NavigateCmpt when user profile is unauthorized', () => {
    const UserContextObjMock = createContext({ authName: '', authRole: 'unauthorized', authUid: '', isEnabled: true, isLoading: false });
    const NavigateCmpt = jest.fn().mockReturnValue(null);
    renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock, [''], NavigateCmpt));
    expect(NavigateCmpt).toHaveBeenCalled();
  });

  it('Should render LoaderCmpt when user profile is loading', () => {
    const LoaderCmpt = Loader as jest.MockedFunction<typeof Loader>;
    const UserContextObjMock = createContext({ authName: '', authRole: '', authUid: '', isEnabled: true, isLoading: true });
    const NavigateCmpt = jest.fn().mockReturnValue(null);
    renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock, [''], NavigateCmpt, LoaderCmpt));
    expect(LoaderCmpt).toHaveBeenCalled();
  });
});
