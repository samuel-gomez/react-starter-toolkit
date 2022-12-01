import { ReactNode } from 'react';
import { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { TLayout } from 'Layout';
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
      <Restitution label="TA" value="99,99 %" />
      <Restitution label="EURO" value="EURO" />
      <Restitution label="TT" value="100,00 %" />
    </SectionRestitutionColumn>
  </SectionRestitutionRow>
 </SectionRestitution>
</ArticleRestitution> `,
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
      <LiveCode classModifier="with-editor" code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const RestitutionEditable = () => {
  const { state, onClick, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <RestitutionWithEditor {...state} onClick={onClick('onClick démo Restitution')} onChange={onChange} />;
};

type TRestitutionPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const RestitutionPage = ({ titleBar = TITLE_BAR, title = TITLE }: TRestitutionPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <RestitutionEditable />
  </Layout>
);

export default RestitutionPage;
