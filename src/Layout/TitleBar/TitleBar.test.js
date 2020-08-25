import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom';
import TitleBar from './TitleBar';

const wrapper = ({ children }) => <StaticRouter context={{}}>{children}</StaticRouter>;

describe('<TitleBar/>', () => {
  it('Render <TitleBar />', () => {
    const { asFragment } = render(<TitleBar />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should not contain <Link /> when backHome is false', () => {
    const { getByTitle } = render(<TitleBar backHome />, { wrapper });
    expect(getByTitle("Retour à l'accueil")).toBeDefined();
  });
});
