import React from 'react';
import { render } from '@testing-library/react';
import { HeaderApp as Header, HeaderInfo } from './Header';

describe('<Header/>', () => {
  it('Render <Header/>', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should contain <Infos /> with "mydefinition" text when infos equal [{ word: "word", definition: "mydefinition" }]', () => {
    const { getByText } = render(<Header infos={[{ word: 'word', definition: 'mydefinition' }]} />);
    expect(getByText('mydefinition')).toBeDefined();
  });

  it('Should contain <User /> with when authName="FDS" authRole="IFRS_OASIS_ADMIN"', () => {
    const { getByText } = render(<Header authName="FDS" authRole="IFRS_OASIS_ADMIN" />);
    expect(getByText('FDS')).toBeDefined();
    expect(getByText(/IFRS_OASIS_ADMIN/)).toBeDefined();
  });

  it('Should contain <User /> with "Non Connecté" and "Profil" when authName and/or authRole are undefined', () => {
    const { getByText } = render(<Header />);
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
