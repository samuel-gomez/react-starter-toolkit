import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  labelFirstTab: '<i className="glyphicon glyphicon-briefcase" /> Title with left icon',
  labelSecondTab: '<i className="glyphicon glyphicon-user" /> Title with right icon',
  labelThirdTab: 'Title with badge <Badge classModifier="info"> 21 </Badge>',
  contentFirstTab: 'Content first tab',
  contentSecondTab: 'Content second tab',
  contentThirdTab: 'Content third tab',
  classModifierFirstTab: 'has-icon-left',
  classModifierSecondTab: 'has-icon-right',
  className: 'af-tabs',
  activeIndex: '1',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onChangeTab: (arg: string) => void;
};

export const code = ({
  labelFirstTab,
  labelSecondTab,
  labelThirdTab,
  contentFirstTab,
  contentSecondTab,
  contentThirdTab,
  className,
  classModifierFirstTab,
  classModifierSecondTab,
  activeIndex,
}: Props) => `
    <Tabs className="${className}" onChange={onChangeTab} activeIndex="${activeIndex}">
        <Tabs.Tab title={<>${labelFirstTab}</>} classModifier="${classModifierFirstTab}">
            ${contentFirstTab}
        </Tabs.Tab>
        <Tabs.Tab title={<>${labelSecondTab}</>} classModifier="${classModifierSecondTab}" >
            ${contentSecondTab}
        </Tabs.Tab>
        <Tabs.Tab title={<>${labelThirdTab}</>}>
            ${contentThirdTab}
        </Tabs.Tab>
    </Tabs>
  `;

const TabsWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode styleLivePreview={{ textAlign: 'left' }} code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

export const onChangeTabFn = (key: string, onChangeFn: (key: string) => (e: TEvent) => void) => (e: string) => onChangeFn(key)({ value: e });

const TabsEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <TabsWithEditor {...state} onChange={onChange} onChangeTab={onChangeTabFn('activeIndex', onChange)} />;
};

type TTabsPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const TabsDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TTabsPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <TabsEditable />
  </Layout>
);

export default TabsDemo;
