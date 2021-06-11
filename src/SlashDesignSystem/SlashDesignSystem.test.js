import React from 'react';
import { WrapperStaticRouter } from 'shared/testsUtils';
import { render, act } from '@testing-library/react';
import SlashDesignSystem from './SlashDesignSystem';

const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  menu: () => {},
};
describe('<SlashDesignSystem page/>', () => {
  it('Renders SlashDesignSystem page component without crashing', async () => {
    await act(async () => {
      const { asFragment } = render(<SlashDesignSystem {...defaultProps} />, { wrapper: WrapperStaticRouter });
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
