import React from 'react';
import { render } from '@testing-library/react';
import LoaderContainer from '../Loader.container';

const defaultProps = {
  classModifier: '',
  text: '',
  mode: 'none',
};
describe('<LoaderContainer />', () => {
  it('Should render LoaderContainer', () => {
    const { asFragment } = render(<LoaderContainer {...defaultProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render LoaderContainer active', () => {
    const { asFragment } = render(<LoaderContainer {...defaultProps} mode="get" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render LoaderContainer with custom text', () => {
    const { asFragment, getByText } = render(<LoaderContainer {...defaultProps} mode="get" text="texte de chargement" />);
    expect(getByText(/texte de chargement/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
