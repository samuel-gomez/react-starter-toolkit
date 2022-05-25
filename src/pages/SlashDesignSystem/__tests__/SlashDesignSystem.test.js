import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { act } from '@testing-library/react';
import SlashDesignSystem from '../SlashDesignSystem';

const defaultProps = {};

describe('<SlashDesignSystem page/>', () => {
  it('Renders SlashDesignSystem page component without crashing', async () => {
    await act(async () => {
      const { asFragment } = renderWithWrapperStaticRouter(<SlashDesignSystem {...defaultProps} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
