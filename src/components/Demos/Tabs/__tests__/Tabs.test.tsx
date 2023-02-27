import { clearString } from 'shared/testsUtils';
import { code, onChangeTabFn } from '../Tabs';

describe('onChangeTabFn', () => {
  it('Should called onChangeFn', () => {
    const onChangeFn = jest.fn().mockImplementation(() => () => ({}));
    onChangeTabFn('active', onChangeFn)('test');
    expect(onChangeFn).toBeCalledWith('active');
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

  it('Should render Tabs with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
        <Tabs className="${defaultProps.className}" onChange={onChangeTab} activeIndex="${defaultProps.activeIndex}">
            <Tabs.Tab title={<>${defaultProps.labelFirstTab}</>} classModifier="${defaultProps.classModifierFirstTab}">
                ${defaultProps.contentFirstTab}
            </Tabs.Tab>
            <Tabs.Tab title={<>${defaultProps.labelSecondTab}</>} classModifier="${defaultProps.classModifierSecondTab}" >
                ${defaultProps.contentSecondTab}
            </Tabs.Tab>
            <Tabs.Tab title={<>${defaultProps.labelThirdTab}</>}>
                ${defaultProps.contentThirdTab}
            </Tabs.Tab>
        </Tabs>
      `),
    );
  });
});
