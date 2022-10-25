const twoColumns = `<ArticleRestitution>
  <HeaderRestitution
    title="Tarifs"
    subtitle="Tout adhérent, assuré, base (sans EAC ou sans PAC)"
    rightTitle={<a
        className="af-link af-link--hasIconLeft"
        href="#"
        onClick={onClick}>
        <i className="glyphicon glyphicon-pencil" />
        <span className="af-link__text">Modifier</span>
      </a>}
  />
  <SectionRestitution>
    <SectionRestitutionRow title="Base de calcul des prestations">
      <SectionRestitutionColumn>
        <Restitution label="TA" value="99,99 %" />
        <Restitution label="EURO" value="EURO" />
        <Restitution label="TT" value={null} />
        <Restitution
          label="Garanties complémentaires"
          classModifier="marge"
          values={[
            'Vol au domicile',
            'Vol étendu aux appareils nomades',
            'Bris des glaces',
            'Plomberie et électricité',
            'Jardin',
          ]}
        />
      </SectionRestitutionColumn>
      <SectionRestitutionColumn classModifier="test">
        <Restitution label="TA" value="99,99 %" />
        <Restitution label="EURO" value="EURO" />
        <Restitution label="TT" value={undefined} />
        <Restitution
          label="Garanties complémentaires"
          classModifier="marge"
          values={[
            'Vol au domicile',
            'Vol étendu aux appareils nomades',
            'Bris des glaces',
            'Plomberie et électricité',
            'Jardin',
          ]}
        />
      </SectionRestitutionColumn>
    </SectionRestitutionRow>
  </SectionRestitution>
</ArticleRestitution>`;

const oneColumn = `<ArticleRestitution>
    <HeaderRestitution
      title="Tarif"
      subtitle="Tout adhérent, assuré, base (sans EAC ou sans PAC)"      
    />
    <SectionRestitution>
    <SectionRestitutionRow title="Base de calcul des prestations">
      <SectionRestitutionColumn>
        <Restitution label="TA" value="99,99 %" />
        <Restitution label="EURO" value="EURO" />
        <Restitution label="TT" value="100,00 %" />
        <Restitution
          label="Garanties complémentaires"
          classModifier="marge"
          values={[
            'Vol au domicile',
            'Vol étendu aux appareils nomades',
            'Bris des glaces',
            'Plomberie et électricité',
            'Jardin',
          ]}
        />
      </SectionRestitutionColumn>
    </SectionRestitutionRow>
    </SectionRestitution>
  </ArticleRestitution>`;

export { oneColumn, twoColumns };
