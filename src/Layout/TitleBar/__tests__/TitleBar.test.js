import React from 'react';
import { render } from '@testing-library/react';
import { WrapperStaticRouter } from 'shared/testsUtils';
import TitleBar from '../TitleBar';

describe('<TitleBar/>', () => {
  it('Render <TitleBar />', () => {
    const { asFragment } = render(<TitleBar />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should not contain <Link /> when backHome is false', () => {
    const { getByTitle } = render(<TitleBar backHome />, { wrapper: WrapperStaticRouter });
    expect(getByTitle("Retour à l'accueil")).toBeDefined();
  });
});
