import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ButtonPage, { code } from '../Button';

describe('<ButtonPage/>', () => {
  it('Should render ButtonPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ButtonPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const icon = 'ok';

  const defaultProps = {
    onChange: jest.fn(),
    label: 'valider',
    className: 'af-btn',
    classModifier: '',
    id: 'uniqueid',
    disabled: true,
  };

  it('Should render ButtonPage with icon', () => {
    const result = code({ ...defaultProps, icon });
    expect(clearString(result)).toEqual(
      clearString(`<Button id="${defaultProps.id}" disabled={${defaultProps.disabled}} className="${defaultProps.className}" classModifier="${defaultProps.classModifier}" type="submit" onClick={onClick} >
          <i className="glyphicon glyphicon-${icon}"></i><span className="af-btn__text">${defaultProps.label}</span>
        </Button>
    `),
    );
  });

  it('Should render ButtonPage without icon', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<Button id="${defaultProps.id}" disabled={${defaultProps.disabled}} className="${defaultProps.className}" classModifier="${defaultProps.classModifier}" type="submit" onClick={onClick} >
          <span className="af-btn__text">${defaultProps.label}</span>
        </Button>
    `),
    );
  });
});
