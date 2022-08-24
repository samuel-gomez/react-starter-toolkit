import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { act } from '@testing-library/react';
import SlashDesignSystem from '../SlashDesignSystem';

describe('<SlashDesignSystem page/>', () => {
  it('Renders SlashDesignSystem page component without crashing', async () => {
    await act(async () => {
      const { asFragment } = renderWithWrapperStaticRouter(<SlashDesignSystem />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
