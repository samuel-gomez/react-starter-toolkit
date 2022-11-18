import { ReactNode } from 'react';
import { Accordion, CollapseCardBase, CollapseCard } from '@axa-fr/react-toolkit-all';
import { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: '',
  className: '',
  onlyOne: true,
  header1: 'Header 1',
  header2: 'Header 2',
  header3: 'Header 3',
  content1: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
  Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
  soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
  content2: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
  Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
  soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
  content3: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
  Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
  soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ classModifier, className, onlyOne, header1, header2, header3, content1, content2, content3 }: Props) => `
    <Accordion
      classModifier="${classModifier}"
      className="${className}"
      onlyOne={${onlyOne}} id="test">

      <CollapseCardBase onToggle={onClick} id="id1">
        <CollapseCard.Header>
          ${header1}
        </CollapseCard.Header>
        <CollapseCard.Body>
          ${content1}
        </CollapseCard.Body>
      </CollapseCardBase>

      <CollapseCardBase onToggle={onClick} id="id2">
        <CollapseCard.Header>
          ${header2}
        </CollapseCard.Header>
        <CollapseCard.Body>
          ${content2}
        </CollapseCard.Body>
      </CollapseCardBase>

      <CollapseCardBase onToggle={onClick} id="id3">
        <CollapseCard.Header>
          ${header3}
        </CollapseCard.Header>
        <CollapseCard.Body>
          ${content3}
        </CollapseCard.Body>
      </CollapseCardBase>

    </Accordion>
`;

const AccordionWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode
        classModifier="with-editor"
        styleLivePreview={{ textAlign: 'left' }}
        code={code(props)}
        scope={{
          Accordion,
          CollapseCardBase,
          CollapseCard,
          ...props,
        }}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const AccordionEditable = () => {
  const { state, onChange, onClick } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <AccordionWithEditor {...state} onClick={onClick('onClick Accordion')} onChange={onChange} />;
};

type TAccordionPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const AccordionDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TAccordionPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <AccordionEditable />
  </Layout>
);

export default AccordionDemo;
