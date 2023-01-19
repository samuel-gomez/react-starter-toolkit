import { ComponentType, createContext } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, act } from '@testing-library/react';
import UserProvider from 'App/UserProvider';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { TUserContext } from 'App/UserProvider/UserProvider';
import Routes, { withAuth } from '..';

type TrenderRoute = {
  role?: string;
  name?: string;
  route?: string;
  defaultProps?: object;
};

const renderRoute = ({ role = '', name = '', route = '/', defaultProps = {} }: TrenderRoute) => {
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
  jest.useFakeTimers();

  it.each`
    role  | name        | route           | expected
    ${''} | ${'Samuel'} | ${'/'}          | ${'Bienvenue sur la démo du starter Slash Design System'}
    ${''} | ${'Samuel'} | ${'/forbidden'} | ${'403'}
  `('Should render page when user profil is authorized, role: $role, name: $name, route: $route', async ({ role, name, route, expected }) => {
    const { getByText } = renderRoute({ role, name, route });
    await act(() => {
      getByText('Chargement de la page...');
    });
    jest.advanceTimersByTime(1000);

    await waitFor(() => expect(getByText(expected)).toBeInTheDocument());
  });

  it.each`
    role                   | name     | route
    ${'user unauthorized'} | ${'sam'} | ${'/'}
  `('Should render forbidden page when user profil is unauthorized, role: $role, name: $name, route: $route', async ({ role, name, route }) => {
    const UserContextObjMock = createContext<TUserContext>({ authName: '', authRole: role, authUid: '', isEnabled: true, isLoading: false });
    const { getByText } = renderRoute({
      role,
      name,
      route,
      defaultProps: { withAuthFn: (...args: ComponentType<object>[]) => withAuth(args[0], UserContextObjMock, ['admin']) },
    });
    await waitFor(() => expect(getByText('The page you are looking for is forbidden !')).toBeInTheDocument());
  });

  it.each`
    route
    ${'/no-exist-route'}
  `('Should render 404 when route: $route is not correct', async ({ route }) => {
    const { getByText } = renderRoute({ route, role: '', name: 'samuel' });
    await act(() => {
      getByText('Chargement de la page...');
    });
    jest.advanceTimersByTime(1000);

    await waitFor(() => expect(getByText('404')).toBeInTheDocument());
  });
});

describe('Render withAuth', () => {
  const Component = () => <p>component</p>;
  it.each`
    authRole | authName
    ${''}    | ${'Samuel'}
  `('Should render RouteCmpt when user profile is authorized (authRole, authName)', ({ authRole, authName }) => {
    const UserContextObjMock = createContext<TUserContext>({ authRole, authName, authUid: '', isEnabled: true, isLoading: false });
    const { getByText } = renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock));
    expect(getByText('component')).toBeInTheDocument();
  });

  it('Should render NavigateCmpt when user profile is unauthorized', () => {
    const UserContextObjMock = createContext<TUserContext>({
      authName: '',
      authRole: 'unauthorized',
      authUid: '',
      isEnabled: true,
      isLoading: false,
    });
    const NavigateCmpt = jest.fn().mockReturnValue(null);
    renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock, [''], NavigateCmpt));
    expect(NavigateCmpt).toHaveBeenCalled();
  });

  it('Should render LoaderCmpt when user profile is loading', () => {
    const LoaderCmpt = jest.fn();
    const UserContextObjMock = createContext<TUserContext>({ authName: '', authRole: '', authUid: '', isEnabled: true, isLoading: true });
    const NavigateCmpt = jest.fn().mockReturnValue(null);
    renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock, [''], NavigateCmpt, LoaderCmpt));
    expect(LoaderCmpt).toHaveBeenCalled();
  });
});
