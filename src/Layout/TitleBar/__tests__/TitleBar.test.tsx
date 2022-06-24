import { render } from '@testing-library/react';
import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import TitleBar from '../TitleBar';

const defaultProps = { title: 'title', handleClick: emptyFunction };

describe('<TitleBar/>', () => {
  it('Render <TitleBar />', () => {
    const { asFragment } = render(<TitleBar {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <TitleBar /> with other classname and child', () => {
    const { asFragment, getByText } = render(
      <TitleBar {...defaultProps} className="other">
        <p>child</p>
      </TitleBar>,
    );
    expect(getByText('child')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should contain back home <Link /> when backHome is true', () => {
    const { asFragment, getByTitle } = renderWithWrapperStaticRouter(<TitleBar {...defaultProps} backHome />);
    expect(getByTitle("Retour à l'accueil")).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
