import React from 'react';
import WrapperStaticRouter from 'shared/components/WrapperStaticRouter';
import { render, act } from '@testing-library/react';
import Form from './Form';

const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  menu: () => {},
};
describe('<Form page/>', () => {
  it('Renders Form page component without crashing', async () => {
    await act(async () => {
      const { asFragment } = render(<Form {...defaultProps} />, { wrapper: WrapperStaticRouter });
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
