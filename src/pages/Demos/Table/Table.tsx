import { ReactNode } from 'react';
import JsxParser from 'react-jsx-parser';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const generateItems = (nbLines = 10, nbCells = 3) =>
  [...Array(nbLines).keys()].map(line => ({
    id: `line-${line}`,
    cells: [...Array(nbCells).keys()].map(cell => ({
      id: `cell-${line}-${cell}`,
      label: `some text for ${line}-${cell}`,
    })),
  }));

const INITIAL_STATE = {
  classModifier: '',
  className: 'af-table',
  headers: [
    { label: 'Prénom', id: 'firstname' },
    {
      label: `<span><strong>Nom</strong>
    <i className="glyphicon glyphicon-ok"></i></span>`,
      id: 'lastname',
    },
    { label: 'Date de naissance', id: 'birthdate' },
  ],
  items: generateItems(),
};

type Props = Omit<Partial<typeof INITIAL_STATE>, 'headers'> & {
  headers: Theaders;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

type Theaders = {
  label: ReactNode;
  id: string;
}[];

const parseHeaders = (headers: Theaders) =>
  headers?.map(header => ({
    ...header,
    // @ts-ignore: Unreachable code error
    label: <JsxParser jsx={`${header.label}`} />,
  }));

export const code = ({ className, classModifier }: Props) => `<Table className="${className}" classModifier="${classModifier}">
  <Table.Header>
    <Table.Tr>
      {headers.map(item => <Table.Th key={item.id}>
        <span className="af-table-th-content">{item.label}</span>
      </Table.Th>)}
    </Table.Tr>
  </Table.Header>
  <Table.Body>
    {items.map(item => <Table.Tr key={item.id}>
      {item.cells.map(cell => <Table.Td key={cell.id}>
        <span className="af-table-th-content">{cell.label}</span>
      </Table.Td>) }     
    </Table.Tr>)}
  </Table.Body>
</Table>
  `;

const TableWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(({ openEditor, ...props }) => {
  console.log(props);
  const parsedHeaders = parseHeaders(props.headers as Theaders);

  return (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode classModifier="with-editor" code={code(props)} scope={{ ...props, headers: parsedHeaders }} />
    </>
  );
}, knobs as unknown as Tknobs);

const TableEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <TableWithEditor {...state} onChange={onChange} />;
};

type TTablePage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const TableDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TTablePage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <TableEditable />
  </Layout>
);

export default TableDemo;
