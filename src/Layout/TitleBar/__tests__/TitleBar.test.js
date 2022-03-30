import React from 'react';
import { render } from '@testing-library/react';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import TitleBar from '../TitleBar';

describe('<TitleBar/>', () => {
  it('Render <TitleBar />', () => {
    const { asFragment } = render(<TitleBar />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should not contain <Link /> when backHome is false', () => {
    const { getByTitle } = renderWithWrapperStaticRouter(<TitleBar backHome />);
    expect(getByTitle("Retour à l'accueil")).toBeDefined();
  });
});
