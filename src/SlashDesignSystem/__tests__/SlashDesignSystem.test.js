import React from 'react';
import { WrapperStaticRouter, emptyFunction } from 'shared/testsUtils';
import { render, act } from '@testing-library/react';
import SlashDesignSystem from '../SlashDesignSystem';

const defaultProps = {
  header: emptyFunction,
  title: emptyFunction,
  footer: emptyFunction,
  menu: emptyFunction,
};
describe('<SlashDesignSystem page/>', () => {
  it('Renders SlashDesignSystem page component without crashing', async () => {
    await act(async () => {
      const { asFragment } = render(<SlashDesignSystem {...defaultProps} />, { wrapper: WrapperStaticRouter });
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
