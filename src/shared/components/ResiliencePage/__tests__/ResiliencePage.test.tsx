import { screen } from '@testing-library/react';
import { render } from 'shared/testsUtils';
import ResiliencePage from '../ResiliencePage';

describe('<ResiliencePage/>', () => {
  it('Render <ResiliencePage/> with default props', () => {
    const { asFragment } = render(<ResiliencePage title="title" />);

    expect(screen.getByRole('main', { name: 'page error 404' })).toHaveClass('container af-container');
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: "Retour à l'accueil" })).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <ResiliencePage/> with other props', () => {
    const { asFragment } = render(<ResiliencePage title="mytitle" code="500" message="mymessage" backhome={false} />);

    expect(screen.getByRole('main', { name: 'page error 500' })).toHaveClass('container af-container');
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('mytitle')).toBeInTheDocument();
    expect(screen.getByText('mymessage')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
