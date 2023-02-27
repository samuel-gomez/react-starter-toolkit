import { render } from '@testing-library/react';
import UserProvider, { UserContext, TUserContext } from 'providers/UserProvider';
import { createContext } from 'react';
import Authorize from '../Authorize';

describe('<Authorize/>', () => {
  it('Render <Authorize /> ', () => {
    const { asFragment } = render(<Authorize />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <Authorize /> with child', () => {
    const { asFragment } = render(
      <Authorize>
        <p>child</p>
      </Authorize>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  const oidcUser = {
    name: 'Bob Smith',
    given_name: 'Bob',
    family_name: 'Smith',
    email: 'BobSmith@email.com',
    email_verified: true,
    website: 'http://bob.com',
    sub: '11',
    member_of: ['CN=User'],
    axa_uid_racf: 'S000007',
  };

  it('Render null with child and unauthorize user role', () => {
    const useOidcUserMock = jest.fn().mockReturnValue({
      oidcUser,
    });
    const { asFragment } = render(
      <UserProvider useOidcUserFn={useOidcUserMock}>
        <Authorize authorized={['admin']} UserContextObj={UserContext}>
          <p>child</p>
        </Authorize>
      </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render child when user role is authorized', () => {
    const useOidcUserMock = jest.fn().mockReturnValue({
      oidcUser: {
        ...oidcUser,
        member_of: ['CN=Admin'],
      },
    });
    const UserContextMock = createContext<TUserContext>({
      authName: '',
      authRole: 'admin',
      authUid: '',
      isEnabled: true,
      isLoading: true,
    });
    const { asFragment } = render(
      <UserProvider useOidcUserFn={useOidcUserMock}>
        <Authorize authorized={['admin']} UserContextObj={UserContextMock}>
          <p>child</p>
        </Authorize>
      </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
