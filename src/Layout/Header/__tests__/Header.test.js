import { render } from '@testing-library/react';
import { HeaderApp as Header, HeaderInfo } from '../Header';

const defaultProps = {
  title: 'title',
  subtitle: 'subtitle',
};
describe('<Header/>', () => {
  it('Render <Header/>', () => {
    const { asFragment } = render(<Header {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should contain <Infos /> with "mydefinition" text when infos equal [{ word: "word", definition: "mydefinition" }]', () => {
    const { getByText } = render(<Header {...defaultProps} infos={[{ word: 'word', definition: 'mydefinition' }]} />);
    expect(getByText('mydefinition')).toBeDefined();
  });

  it('Should contain <User /> with when authName="FDS" authRole="ADMIN"', () => {
    const { getByText } = render(<Header {...defaultProps} authName="FDS" authRole="ADMIN" />);
    expect(getByText('FDS')).toBeDefined();
    expect(getByText(/ADMIN/)).toBeDefined();
  });

  it('Should contain <User /> with "Non Connecté" and "Profil" when authName and/or authRole are undefined', () => {
    const { getByText } = render(<Header {...defaultProps} />);
    expect(getByText('Non Connecté')).toBeDefined();
    expect(getByText(/Profil/)).toBeDefined();
  });
});

describe('<HeaderInfo/>', () => {
  it('Should contain Skeleton when isLoader false', () => {
    const { getByRole } = render(<HeaderInfo />);
    expect(getByRole('status')).toBeDefined();
  });

  it('Should contain Custom when isLoader true', () => {
    const Custom = () => <span>Mon composant</span>;
    const { getByText } = render(
      <HeaderInfo isLoaded>
        <Custom />
      </HeaderInfo>,
    );
    expect(getByText('Mon composant')).toBeDefined();
  });
});
