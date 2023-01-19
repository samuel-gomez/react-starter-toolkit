import type { ClickEvent } from '@axa-fr/react-toolkit-core/dist/esm/index';
import Layout, { TLayoutPage } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  children: `<ArticleRestitution>
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
</ArticleRestitution>`,
};

type Props = typeof INITIAL_STATE & {
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ children }: Props) => children;

const RestitutionWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        openEditor={openEditor}
        npmName={NPM_NAME}
      />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const RestitutionEditable = () => {
  const { state, onClick, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <RestitutionWithEditor {...state} onClick={onClick('onClick démo Restitution')} onChange={onChange} />;
};

const RestitutionPage = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <RestitutionEditable />
  </Layout>
);

export default RestitutionPage;
