import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { clearString } from 'shared/testsUtils';
import RestitutionPage, { code } from '../Restitution';

describe('<RestitutionPage/>', () => {
  it('Should render RestitutionPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<RestitutionPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();
  const children = `<ArticleRestitution>
  <HeaderRestitution
  title="Tarif"
  subtitle="Tout adhérent, assuré, base (sans EAC ou sans PAC)"
  rightTitle={<a
    className="af-link af-link--hasIconLeft"
    href="#"
    onClick={onClick}>
    <i className="glyphicon glyphicon-pencil" />
    <span className="af-link__text">Modifier</span>
  </a>}
  /><SectionRestitution>
  <SectionRestitutionRow title="Base de calcul des prestations">
    <SectionRestitutionColumn>
      <Restitution label="TA">99,99 %</Restitution>
      <Restitution label="EURO">EURO</Restitution>
      <Restitution label="TT">100,00 %</Restitution>
    </SectionRestitutionColumn>
  </SectionRestitutionRow>
 </SectionRestitution>
</ArticleRestitution>`;

  it('Should render RestitutionPage with icon', () => {
    const result = code({ children, onChange });
    expect(clearString(result)).toEqual(
      clearString(`<ArticleRestitution>
    <HeaderRestitution
    title="Tarif"
    subtitle="Tout adhérent, assuré, base (sans EAC ou sans PAC)"
    rightTitle={<a
      className="af-link af-link--hasIconLeft"
      href="#"
      onClick={onClick}>
      <i className="glyphicon glyphicon-pencil" />
      <span className="af-link__text">Modifier</span>
    </a>}
    /><SectionRestitution>
    <SectionRestitutionRow title="Base de calcul des prestations">
      <SectionRestitutionColumn>
        <Restitution label="TA">99,99 %</Restitution>
        <Restitution label="EURO">EURO</Restitution>
        <Restitution label="TT">100,00 %</Restitution>
      </SectionRestitutionColumn>
    </SectionRestitutionRow>
   </SectionRestitution>
  </ArticleRestitution>`),
    );
  });
});
