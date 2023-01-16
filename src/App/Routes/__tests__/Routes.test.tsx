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

jest.mock('pages/Demos/SearchMembers', () => () => <div>SearchMembers</div>);
jest.mock('pages/Demos/Members', () => () => <div>Members</div>);
jest.mock('pages/Demos/ModalCustom', () => () => <div>ModalCustom</div>);
jest.mock('pages/Demos/Notification', () => () => <div>Notification</div>);
jest.mock('pages/Demos/Accordion', () => () => <div>Accordion</div>);
jest.mock('pages/Demos/Action', () => () => <div>Action</div>);
jest.mock('pages/Demos/Alert', () => () => <div>Alert</div>);
jest.mock('pages/Demos/Badge', () => () => <div>Badge</div>);
jest.mock('pages/Demos/Button', () => () => <div>Button</div>);
jest.mock('pages/Demos/CheckboxInput', () => () => <div>CheckboxInput</div>);
jest.mock('pages/Demos/DateInput', () => () => <div>DateInput</div>);
jest.mock('pages/Demos/FileInput', () => () => <div>FileInput</div>);
jest.mock('pages/Demos/Footer', () => () => <div>Footer</div>);
jest.mock('pages/Demos/FooterClient', () => () => <div>FooterClient</div>);
jest.mock('pages/Demos/Header', () => () => <div>Header</div>);
jest.mock('pages/Demos/Help', () => () => <div>Help</div>);
jest.mock('pages/Demos/Infos', () => () => <div>Infos</div>);
jest.mock('pages/Demos/Layout', () => () => <div>Layout</div>);
jest.mock('pages/Demos/Loader', () => () => <div>Loader</div>);
jest.mock('pages/Demos/Modal', () => () => <div>Modal</div>);
jest.mock('pages/Demos/NavBar', () => () => <div>NavBar</div>);
jest.mock('pages/Demos/NumberInput', () => () => <div>NumberInput</div>);
jest.mock('pages/Demos/Popover', () => () => <div>Popover</div>);
jest.mock('pages/Demos/RadioInput', () => () => <div>RadioInput</div>);
jest.mock('pages/Demos/Restitution', () => () => <div>Restitution</div>);
jest.mock('pages/Demos/SelectInput', () => () => <div>SelectInput</div>);
jest.mock('pages/Demos/SelectMulti', () => () => <div>SelectMulti</div>);
jest.mock('pages/Demos/Slider', () => () => <div>Slider</div>);
jest.mock('pages/Demos/Stepper', () => () => <div>Stepper</div>);
jest.mock('pages/Demos/Switch', () => () => <div>Switch</div>);
jest.mock('pages/Demos/Table', () => () => <div>Table</div>);
jest.mock('pages/Demos/Tabs', () => () => <div>Tabs</div>);
jest.mock('pages/Demos/TextareaInput', () => () => <div>TextareaInput</div>);
jest.mock('pages/Demos/TextInput', () => () => <div>TextInput</div>);
jest.mock('pages/Demos/Title', () => () => <div>Title</div>);
jest.mock('pages/Demos/TitleBar', () => () => <div>TitleBar</div>);

describe('<Routes />', () => {
  jest.useFakeTimers();

  it.each`
    role  | name        | route                      | expected
    ${''} | ${'Samuel'} | ${'/'}                     | ${'Bienvenue sur la démo du starter Slash Design System'}
    ${''} | ${'Samuel'} | ${'/forbidden'}            | ${'403'}
    ${''} | ${'Samuel'} | ${'/demos'}                | ${'Liste des composants'}
    ${''} | ${'Samuel'} | ${'/demos/members'}        | ${'Members'}
    ${''} | ${'Samuel'} | ${'/demos/search-members'} | ${'SearchMembers'}
    ${''} | ${'Samuel'} | ${'/demos/modal-custom'}   | ${'ModalCustom'}
    ${''} | ${'Samuel'} | ${'/demos/notification'}   | ${'Notification'}
    ${''} | ${'Samuel'} | ${'/demos/accordion'}      | ${'Accordion'}
    ${''} | ${'Samuel'} | ${'/demos/action'}         | ${'Action'}
    ${''} | ${'Samuel'} | ${'/demos/alert'}          | ${'Alert'}
    ${''} | ${'Samuel'} | ${'/demos/badge'}          | ${'Badge'}
    ${''} | ${'Samuel'} | ${'/demos/button'}         | ${'Button'}
    ${''} | ${'Samuel'} | ${'/demos/checkbox-input'} | ${'CheckboxInput'}
    ${''} | ${'Samuel'} | ${'/demos/date-input'}     | ${'DateInput'}
    ${''} | ${'Samuel'} | ${'/demos/file-input'}     | ${'FileInput'}
    ${''} | ${'Samuel'} | ${'/demos/footer'}         | ${'Footer'}
    ${''} | ${'Samuel'} | ${'/demos/footerClient'}   | ${'FooterClient'}
    ${''} | ${'Samuel'} | ${'/demos/header'}         | ${'Header'}
    ${''} | ${'Samuel'} | ${'/demos/help'}           | ${'Help'}
    ${''} | ${'Samuel'} | ${'/demos/infos'}          | ${'Infos'}
    ${''} | ${'Samuel'} | ${'/layout'}               | ${'Layout'}
    ${''} | ${'Samuel'} | ${'/demos/loader'}         | ${'Loader'}
    ${''} | ${'Samuel'} | ${'/demos/modal'}          | ${'Modal'}
    ${''} | ${'Samuel'} | ${'/demos/navbar'}         | ${'NavBar'}
    ${''} | ${'Samuel'} | ${'/demos/number-input'}   | ${'NumberInput'}
    ${''} | ${'Samuel'} | ${'/demos/popover'}        | ${'Popover'}
    ${''} | ${'Samuel'} | ${'/demos/radio-input'}    | ${'RadioInput'}
    ${''} | ${'Samuel'} | ${'/demos/restitution'}    | ${'Restitution'}
    ${''} | ${'Samuel'} | ${'/demos/select-input'}   | ${'SelectInput'}
    ${''} | ${'Samuel'} | ${'/demos/select-multi'}   | ${'SelectMulti'}
    ${''} | ${'Samuel'} | ${'/demos/slider'}         | ${'Slider'}
    ${''} | ${'Samuel'} | ${'/demos/stepper'}        | ${'Stepper'}
    ${''} | ${'Samuel'} | ${'/demos/switch'}         | ${'Switch'}
    ${''} | ${'Samuel'} | ${'/demos/table'}          | ${'Table'}
    ${''} | ${'Samuel'} | ${'/demos/tabs'}           | ${'Tabs'}
    ${''} | ${'Samuel'} | ${'/demos/textarea-input'} | ${'TextareaInput'}
    ${''} | ${'Samuel'} | ${'/demos/text-input'}     | ${'TextInput'}
    ${''} | ${'Samuel'} | ${'/demos/title'}          | ${'Title'}
    ${''} | ${'Samuel'} | ${'/demos/titlebar'}       | ${'TitleBar'}
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
    ${'user unauthorized'} | ${'sam'} | ${'/demos'}
    ${'user unauthorized'} | ${'sam'} | ${'/demos/members'}
    ${'user unauthorized'} | ${'sam'} | ${'/demos/search-members'}
    ${'user unauthorized'} | ${'sam'} | ${'/demos/modal'}
    ${'user unauthorized'} | ${'sam'} | ${'/demos/button'}
    ${'user unauthorized'} | ${'sam'} | ${'/demos/notification'}
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
