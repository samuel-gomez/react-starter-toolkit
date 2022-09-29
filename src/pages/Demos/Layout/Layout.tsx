import { withEditor, useEditable, TEvent, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import Layout from 'Layout';

const INITIAL_STATE = {
  className: 'af-main',
  classModifier: 'demo',
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

export const code = ({ titleBar, title, className, classModifier, disabledHeader, disabledMenu, disabledTitle, disabledFooter }: Props) => `
<Layout propsTitle={{ title: '${titleBar}' }} disabled={{ header: ${disabledHeader}, menu: ${disabledMenu}, title: ${disabledTitle}, footer: ${disabledFooter} }} className="${className}" classModifier="${classModifier}" >
  <section className="container">
    <h1 className="af-title--content">${title}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sunt repudiandae corporis expedita illo minima, aut nostrum vitae. Fuga quo
      facilis dolorum fugit? Cumque necessitatibus unde nostrum possimus voluptas nisi.
    </p>
  </section>
</Layout> 
`;

const LayoutWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader openEditor={openEditor} />
      <LiveCode
        styleLivePreview={{}}
        classModifier="with-editor"
        code={code(props)}
        scope={{
          Layout,
          ...props,
        }}
      />
    </>
  ),
  {},
  '',
);

const LayoutEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <LayoutWithEditor {...state} onChange={onChange} />;
};

export default LayoutEditable;
