import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: '',
  className: 'af-table',
  headers: [
    { label: 'Prénom', id: 'firstname' },
    { label: 'Nom', id: 'lastname' },
    { label: 'Date de naissance', id: 'birthdate' },
  ],
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ className, classModifier }: Props) => `<Table className="${className}" classModifier="${classModifier}">
  <Table.Header>
    <Table.Tr>
      {headers.map(item => <Table.Th key={item.id}>
        <span className="af-table-th-content">{item.label}</span>
      </Table.Th>)}
    </Table.Tr>
  </Table.Header>
  <Table.Body>
    <Table.Tr>
      <Table.Td>
        <span className="af-table-body-content">Some text</span>
      </Table.Td>
      <Table.Td>
        <b>Some balised text</b>
      </Table.Td>
      <Table.Td>
        <span className="af-table-body-content">Some text</span>
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>
        <span className="af-table-body-content">Some text</span>
      </Table.Td>
      <Table.Td>
        <span className="af-table-body-content">Some text</span>
      </Table.Td>
      <Table.Td>
        <span className="af-table-body-content">Some text</span>
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>
        <span className="af-table-body-content">Some text</span>
      </Table.Td>
      <Table.Td>
        <span className="af-table-body-content">Some text</span>
      </Table.Td>
      <Table.Td>
        <span className="af-table-body-content">Some text</span>
      </Table.Td>
    </Table.Tr>
  </Table.Body>
</Table>
  `;

const TableWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode classModifier="with-editor" code={code(props)} scope={props} />
    </>
  ),
  knobs as unknown as Tknobs,
);

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
