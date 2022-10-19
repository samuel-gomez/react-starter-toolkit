import { withEditor, useEditable, TEvent, EditorHeader, TReturnUseToggleEditor, Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import { useToggleModal } from 'shared/components/ModalCommon';
import Layout from 'Layout';
import knobs from './knobs.json';
import './Layout.scss';

const INITIAL_STATE = {
  className: 'af-main',
  classModifier: '',
  children: `
  <h1 className="af-title--content">{title}</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sunt repudiandae corporis expedita illo minima, aut nostrum vitae. Fuga quo
    facilis dolorum fugit? Cumque necessitatibus unde nostrum possimus voluptas nisi.
  </p>
`,
  fullScreen: false,
  disabledHeader: false,
  disabledMenu: false,
  disabledFooter: false,
  disabledTitle: false,
  titleBar: 'Layout demo',
  title: 'Layout playground',
};

type Props = Omit<typeof INITIAL_STATE, 'icon'> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({
  fullScreen,
  titleBar,
  children,
  className,
  classModifier,
  disabledHeader,
  disabledMenu,
  disabledTitle,
  disabledFooter,
}: Props) => `
<Layout fullScreen={${fullScreen}} propsTitle={{ title: '${titleBar}' }} disabled={{ header: ${disabledHeader}, menu: ${disabledMenu}, title: ${disabledTitle}, footer: ${disabledFooter} }} className="${className}" classModifier="${classModifier}" >
  ${children}
</Layout> 
`;

const LayoutWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(({ openEditor, ...props }) => {
  const modalProps = useToggleModal();
  return (
    <>
      <EditorHeader openEditor={openEditor} />
      <LiveCode
        styleLivePreview={{}}
        classModifier="with-editor layout"
        code={code(props)}
        scope={{
          Layout,
          ...props,
        }}
        modalProps={modalProps}
      />
    </>
  );
}, knobs as unknown as Tknobs);

const LayoutEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <LayoutWithEditor {...state} onChange={onChange} />;
};

export default LayoutEditable;
