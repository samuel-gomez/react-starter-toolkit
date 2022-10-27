import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Table, { code } from '../Table';

describe('<Table />', () => {
  it('Should render Table', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Table />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();
  const onChangeTab = jest.fn();

  const defaultProps = {
    labelFirstTab: '<i className="glyphicon glyphicon-briefcase" /> Title with left icon',
    labelSecondTab: '<i className="glyphicon glyphicon-user" /> Title with right icon',
    labelThirdTab: 'Title with badge <Badge classModifier="info"> 21 </Badge>',
    contentFirstTab: 'Content first tab',
    contentSecondTab: 'Content second tab',
    contentThirdTab: 'Content second tab',
    classModifierFirstTab: 'has-icon-left',
    classModifierSecondTab: 'has-icon-right',
    className: 'af-tabs',
    activeIndex: '1',
    onChange,
    onChangeTab,
  };

  it('Should render Table with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
        <Table className="${defaultProps.className}" onChange={onChangeTab} activeIndex="${defaultProps.activeIndex}">
            <Table.Tab title={<>${defaultProps.labelFirstTab}</>} classModifier="${defaultProps.classModifierFirstTab}">
                ${defaultProps.contentFirstTab}
            </Table.Tab>
            <Table.Tab title={<>${defaultProps.labelSecondTab}</>} classModifier="${defaultProps.classModifierSecondTab}" >
                ${defaultProps.contentSecondTab}
            </Table.Tab>
            <Table.Tab title={<>${defaultProps.labelThirdTab}</>}>
                ${defaultProps.contentThirdTab}
            </Table.Tab>
        </Table>
      `),
    );
  });
});
